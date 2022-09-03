import { Avatar, Box, Button, MenuItem, Typography, Modal } from '@mui/material'
import React, { useEffect } from 'react'
import FeatherIcon from 'feather-icons-react';
import CustomFormLabel from '../../../components/forms/custom-elements/CustomFormLabel';
import CustomTextField from '../../../components/forms/custom-elements/CustomTextField';
import { useState } from 'react';
import PageContainer from '../../../components/container/PageContainer';
import { Link } from "react-router-dom";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import profile from '../../../assets/images/logos/profile.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, updateUser } from '../../../redux/userInfo/Action';
import AddIcon from '@mui/icons-material/Add';




function AddUser() {
    const dispatch = useDispatch()
    const { isLoading, userInfo, error } = useSelector(state => state.UserDataReducer)
    const [imageURL, setImageURL] = useState(profile); // for imageUpload
    const [userData, setUserData] = useState({
        name: userInfo.name || 'Shalini .',
        job: userInfo.name || 'Software Developer at Company',
        address: userInfo.name || 'Bengaluru, karnataka, India',
        connection: userInfo.connection || '500+'
    });  //payload (modifying fields also fetching user data 

    // basic data handle
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const userDataChange = (e) => {
        const { name, value } = e.target;
        let newData = { ...userInfo };
        newData[name] = value;
        setUserData(newData);
    }
    const handleSave = () => {
        dispatch(updateUser(userData))
        handleClose()
    }

    // more data handle
    const [openModal, setOpenModal] = React.useState(false);
    const [moreFormData, setMoreFormData] = React.useState({});
    const [addNewData, setAddNewData] = React.useState({
        title: "",
        company: "",
        time: ""
    })
    const handleModalOpen = (type, index, data) => {
        setAddNewData({ ...addNewData, type: type })
        if (data) {
            const newData = { ...moreFormData };
            newData.type = type;
            newData.index = index;
            newData.data = data;
            setMoreFormData(newData);
        } else {
            setMoreFormData({
                type: type,
                index: "",
                data: {
                    title: "",
                    company: "",
                    time: ""
                }
            })
        }
        setOpenModal(true);
    }
    const handleModalClose = () => setOpenModal(false);


    const handleChangeMoreData = (e) => {
        const { name, value } = e.target;
        const { type, index, } = moreFormData;
        let newData = { ...userInfo };
        if (index === "") {
            let newInfo = { ...addNewData };
            setAddNewData({ ...addNewData, [name]: value })
            newInfo[name] = value;
            newData[type] = [...newData[type], addNewData];
        } else {
            newData = { ...userInfo };
            newData[type][index][name] = value;
        }
        setUserData(newData);
    }
    const handleSaveMoreData = () => {
        dispatch(updateUser(userData))
        handleModalClose()
    }

    const handleDeleteMoreData = (type, index) => {
        const newData = { ...userInfo };
        newData[type].splice(index, 1);
        dispatch(updateUser(newData));
        handleModalClose()
    }

    // skill data handle
    const [openSkillModal, setSkillOpenModal] = React.useState(false);
    const [skillFormData, setSkillFormData] = React.useState({});
    const [addNewSkillData, setAddNewSkillData] = React.useState({
        title: "",
        value: "",
    })
    const handleSkillModalOpen = (type, index, data) => {
        setAddNewSkillData({ ...addNewSkillData, type: type })
        if (data) {
            const newData = { ...skillFormData };
            newData.type = type;
            newData.index = index;
            newData.data = data;
            setSkillFormData(newData);
        } else {
            setSkillFormData({
                type: type,
                index: "",
                data: {
                    title: "",
                    value: "",
                }
            })
        }
        setSkillOpenModal(true);
    }
    const handleSkillModalClose = () => setSkillOpenModal(false);

    const handleChangeSkillData = (e) => {
        const { name, value } = e.target;
        const { index, } = skillFormData;
        let newData = { ...userInfo };
        if (index === "") {
            let newInfo = { ...addNewSkillData };
            setAddNewSkillData({ ...addNewSkillData, [name]: value })
            newInfo[name] = value;
            newData.skill = [...newData.skill, addNewSkillData];
        } else {
            newData = { ...userInfo };
            newData.skill[index][name] = value;
        }
        setUserData(newData);
    }
    const handleSaveSkillData = () => {
        console.log(userData);
        dispatch(updateUser(userData))
        handleSkillModalClose()
    }

    const handleDeleteSkillData = (type, index) => {
        const newData = { ...userInfo };
        newData.skill.splice(index, 1);
        dispatch(updateUser(newData));
        handleSkillModalClose()
    }

    const handleProfilePic = (e) => {
        const file = e.target.files[0];
        setImageURL(URL.createObjectURL(file));
    }

    useEffect(() => {
        dispatch(getUserData());
    }, [])


    return (
        <PageContainer description="this is user registration page">
            {
                isLoading ? 'Loading...'
                    : <Box>
                        <Box sx={{ position: 'relative', paddingBottom: '25px', mb: 3, border: '1px solid #E1E1E1' }}>

                            <Box sx={{ backgroundColor: '#F7F7F9', minHeight: '150px' }} display="flex" alignItems="center" justifyContent="space-around">

                            </Box>
                            <Box sx={{ position: 'relative', }}>
                                <Avatar
                                    style={{ background: '#F4D150' }}
                                    sx={{ width: 130, height: 130, marginLeft: 2, marginTop: "-45px" }}
                                    src={imageURL}
                                >
                                    {imageURL}
                                </Avatar>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        left: 100,
                                        bottom: 0,
                                        width: '30px',
                                        minWidth: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        backgroundColor: '#3762d2',
                                    }}
                                >

                                    {/* <FeatherIcon icon="edit-2" width="18" /> */}
                                    <ModeEditIcon />
                                    <input
                                        type="file"
                                        accept='image/*'
                                        onChange={handleProfilePic}
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            bottom: 0,
                                            width: '40px',
                                            minWidth: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            opacity: 0,
                                        }}
                                    />
                                </Button>
                                <Button
                                    onClick={handleOpen}
                                    color="secondary"
                                    variant="contained"
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        right: 100,
                                        bottom: 0,
                                        minWidth: '30px',
                                        height: '30px',
                                        borderRadius: '5px',
                                        backgroundColor: '#3762d2',
                                    }}
                                >
                                    Edit Profile

                                </Button>
                            </Box>
                            <Box p={3}>
                                <Typography variant='h2'> {userInfo.name} </Typography>
                                <Typography >{userInfo.job}</Typography>
                                <Box display="flex" mt={4} alignItems="center">
                                    <Typography
                                        color="textSecondary"
                                        variant="h6"
                                        fontWeight="400"
                                        sx={{
                                            mr: 1,
                                        }}
                                    >
                                        {userInfo.address}
                                    </Typography>
                                    <Typography
                                        component={Link}
                                        to="#"
                                        fontWeight="500"
                                        sx={{
                                            display: 'block',
                                            textDecoration: 'none',
                                            color: 'primary.main',
                                        }}
                                    >
                                        Contact info
                                    </Typography>
                                </Box>
                                <Typography
                                    component={Link}
                                    to="#"
                                    fontWeight="500"
                                    sx={{
                                        display: 'block',
                                        textDecoration: 'none',
                                        color: 'primary.main',
                                    }}
                                >
                                    {userInfo.connection} connections
                                </Typography>
                            </Box>


                            {/* edit form  */}

                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: 400,
                                    bgcolor: 'background.paper',
                                    boxShadow: 24,
                                    p: 4,
                                }}>
                                    <Box
                                        sx={{
                                            mt: 4,
                                        }}
                                    >

                                        <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
                                        <CustomTextField onChange={userDataChange} name='name' defaultValue={userInfo.name} id="name" variant="outlined" fullWidth />

                                        <CustomFormLabel htmlFor="job">Job</CustomFormLabel>
                                        <CustomTextField onChange={userDataChange} name='job' defaultValue={userInfo.job} id="job" variant="outlined" fullWidth />

                                        <CustomFormLabel htmlFor="address">Address</CustomFormLabel>
                                        <CustomTextField onChange={userDataChange} name='address' defaultValue={userInfo.address} id="address" variant="outlined" fullWidth />

                                        <Button
                                            color="secondary"
                                            variant="contained"
                                            size="large"
                                            fullWidth
                                            onClick={handleSave}
                                            sx={{
                                                pt: '10px',
                                                pb: '10px',
                                            }}
                                        >
                                            save
                                        </Button>




                                    </Box>
                                </Box>
                            </Modal>

                        </Box>
                        {/* experience  */}
                        <Box sx={{ position: 'relative', paddingBottom: '25px', mb: 3, border: '1px solid #E1E1E1' }}>
                            <Box p={2} display='flex' justifyContent={"space-between"}>
                                <Typography variant='h3' fontWeight={'700'}>Experience</Typography>
                                <Box>
                                    <Button
                                        onClick={() => handleModalOpen('experience')}
                                        color="secondary"
                                        variant="contained"
                                        size="small"
                                        sx={{
                                            width: '30px',
                                            minWidth: '30px',
                                            height: '30px',
                                            borderRadius: '50%',
                                        }}
                                    >
                                        <AddIcon />
                                    </Button>
                                </Box>
                            </Box>
                            {
                                userInfo?.experience?.length > 0 &&
                                userInfo.experience.map((data, index) => (
                                    <Box key={index} px={2} py={1} display="flex" alignItems="center" justifyContent={'space-between'}>
                                        <Box display="flex" alignItems="center">
                                            <Button
                                                sx={{
                                                    backgroundColor: (theme) => theme.palette.primary.light,
                                                    color: (theme) => theme.palette.primary.main,
                                                    boxShadow: 'none',
                                                    minWidth: '50px',
                                                    width: '45px',
                                                    height: '40px',
                                                    borderRadius: '10px',
                                                }}
                                            >
                                                <FeatherIcon icon="dollar-sign" width="18" height="18" />
                                            </Button>
                                            <Box
                                                sx={{
                                                    ml: 2,
                                                    "& a": {
                                                        background: 'green'
                                                    }
                                                }}
                                            >
                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        lineHeight: '1.235',
                                                        fontWeight: '600'
                                                    }}
                                                >

                                                    {data.title}
                                                </Typography>
                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        lineHeight: '1.235',
                                                    }}
                                                >

                                                    {data.company}
                                                </Typography>
                                                <Typography color="textSecondary" variant="h6" fontWeight="400">
                                                    {data.time}
                                                </Typography>

                                            </Box>
                                        </Box>
                                        <Box>
                                            <Button
                                                onClick={() => handleModalOpen('experience', index, data)}
                                                color="secondary"
                                                variant="contained"
                                                size="small"
                                                sx={{
                                                    width: '30px',
                                                    minWidth: '30px',
                                                    height: '30px',
                                                    borderRadius: '50%',
                                                }}
                                            >
                                                <ModeEditIcon />
                                            </Button>
                                        </Box>
                                    </Box>
                                ))
                            }

                        </Box>

                        {/* education  */}
                        <Box sx={{ position: 'relative', paddingBottom: '25px', mb: 3, border: '1px solid #E1E1E1' }}>
                            <Box p={2} display='flex' justifyContent={"space-between"}>
                                <Typography variant='h3' fontWeight={'700'}>Education</Typography>
                                <Box>
                                    <Button
                                        onClick={() => handleModalOpen('education')}
                                        color="secondary"
                                        variant="contained"
                                        size="small"
                                        sx={{
                                            width: '30px',
                                            minWidth: '30px',
                                            height: '30px',
                                            borderRadius: '50%',
                                        }}
                                    >
                                        <AddIcon />
                                    </Button>
                                </Box>
                            </Box>
                            {
                                userInfo?.education?.length > 0 &&
                                userInfo.education.map((data, index) => (
                                    <Box key={index} px={2} py={1} display="flex" alignItems="center" justifyContent={'space-between'}>
                                        <Box display="flex" alignItems="center">
                                            <Button
                                                sx={{
                                                    backgroundColor: (theme) => theme.palette.primary.light,
                                                    color: (theme) => theme.palette.primary.main,
                                                    boxShadow: 'none',
                                                    minWidth: '50px',
                                                    width: '45px',
                                                    height: '40px',
                                                    borderRadius: '10px',
                                                }}
                                            >
                                                <FeatherIcon icon="dollar-sign" width="18" height="18" />
                                            </Button>
                                            <Box
                                                sx={{
                                                    ml: 2,
                                                    "& a": {
                                                        background: 'green'
                                                    }
                                                }}
                                            >
                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        lineHeight: '1.235',
                                                        fontWeight: '600'
                                                    }}
                                                >

                                                    {data.title}
                                                </Typography>
                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        lineHeight: '1.235',
                                                    }}
                                                >

                                                    {data.company}
                                                </Typography>
                                                <Typography color="textSecondary" variant="h6" fontWeight="400">
                                                    {data.time}
                                                </Typography>

                                            </Box>
                                        </Box>
                                        <Box>
                                            <Button
                                                onClick={() => handleModalOpen('education', index, data)}
                                                color="secondary"
                                                variant="contained"
                                                size="small"
                                                sx={{
                                                    width: '30px',
                                                    minWidth: '30px',
                                                    height: '30px',
                                                    borderRadius: '50%',
                                                }}
                                            >
                                                <ModeEditIcon />
                                            </Button>
                                        </Box>
                                    </Box>
                                ))
                            }

                        </Box>


                        {/* certifications  */}
                        <Box sx={{ position: 'relative', paddingBottom: '25px', mb: 3, border: '1px solid #E1E1E1' }}>
                            <Box p={2} display='flex' justifyContent={"space-between"}>
                                <Typography variant='h3' fontWeight={'700'}>Licenses & Certifications</Typography>
                                <Box>
                                    <Button
                                        onClick={() => handleModalOpen('certifications')}
                                        color="secondary"
                                        variant="contained"
                                        size="small"
                                        sx={{
                                            width: '30px',
                                            minWidth: '30px',
                                            height: '30px',
                                            borderRadius: '50%',
                                        }}
                                    >
                                        <AddIcon />
                                    </Button>
                                </Box>
                            </Box>
                            {
                                userInfo?.certifications?.length > 0 &&
                                userInfo.certifications.map((data, index) => (
                                    <Box key={index} px={2} py={1} display="flex" alignItems="center" justifyContent={'space-between'}>
                                        <Box display="flex" alignItems="center">
                                            <Button
                                                sx={{
                                                    backgroundColor: (theme) => theme.palette.primary.light,
                                                    color: (theme) => theme.palette.primary.main,
                                                    boxShadow: 'none',
                                                    minWidth: '50px',
                                                    width: '45px',
                                                    height: '40px',
                                                    borderRadius: '10px',
                                                }}
                                            >
                                                <FeatherIcon icon="dollar-sign" width="18" height="18" />
                                            </Button>
                                            <Box
                                                sx={{
                                                    ml: 2,
                                                    "& a": {
                                                        background: 'green'
                                                    }
                                                }}
                                            >
                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        lineHeight: '1.235',
                                                        fontWeight: '600'
                                                    }}
                                                >

                                                    {data.title}
                                                </Typography>
                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        lineHeight: '1.235',
                                                    }}
                                                >

                                                    {data.company}
                                                </Typography>
                                                <Typography color="textSecondary" variant="h6" fontWeight="400">
                                                    {data.time}
                                                </Typography>

                                            </Box>
                                        </Box>
                                        <Box>
                                            <Button
                                                onClick={() => handleModalOpen('certifications', index, data)}
                                                color="secondary"
                                                variant="contained"
                                                size="small"
                                                sx={{
                                                    width: '30px',
                                                    minWidth: '30px',
                                                    height: '30px',
                                                    borderRadius: '50%',
                                                }}
                                            >
                                                <ModeEditIcon />
                                            </Button>
                                        </Box>
                                    </Box>
                                ))
                            }

                        </Box>

                        {/* certifications  */}
                        <Box sx={{ position: 'relative', paddingBottom: '25px', mb: 3, border: '1px solid #E1E1E1' }}>
                            <Box p={2} display='flex' justifyContent={"space-between"}>
                                <Typography variant='h3' fontWeight={'700'}>Skills</Typography>
                                <Box>
                                    <Button
                                        onClick={() => handleSkillModalOpen('certifications')}
                                        color="secondary"
                                        variant="contained"
                                        size="small"
                                        sx={{
                                            width: '30px',
                                            minWidth: '30px',
                                            height: '30px',
                                            borderRadius: '50%',
                                        }}
                                    >
                                        <AddIcon />
                                    </Button>
                                </Box>
                            </Box>
                            {
                                userInfo?.skill?.length > 0 &&
                                userInfo.skill.map((data, index) => (
                                    <Box key={index} px={2} py={1} display="flex" alignItems="center" justifyContent={'space-between'}>
                                        <Box display="flex" alignItems="center">
                                            <Button
                                                sx={{
                                                    backgroundColor: (theme) => theme.palette.primary.light,
                                                    color: (theme) => theme.palette.primary.main,
                                                    boxShadow: 'none',
                                                    minWidth: '50px',
                                                    width: '45px',
                                                    height: '40px',
                                                    borderRadius: '10px',
                                                }}
                                            >
                                                <FeatherIcon icon="dollar-sign" width="18" height="18" />
                                            </Button>
                                            <Box
                                                sx={{
                                                    ml: 2,
                                                    "& a": {
                                                        background: 'green'
                                                    }
                                                }}
                                            >
                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        lineHeight: '1.235',
                                                        fontWeight: '600'
                                                    }}
                                                >

                                                    {data.title}
                                                </Typography>
                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        lineHeight: '1.235',
                                                    }}
                                                >

                                                    Expertise:   {data.value}%
                                                </Typography>

                                            </Box>
                                        </Box>
                                        <Box>
                                            <Button
                                                onClick={() => handleSkillModalOpen('certifications', index, data)}
                                                color="secondary"
                                                variant="contained"
                                                size="small"
                                                sx={{
                                                    width: '30px',
                                                    minWidth: '30px',
                                                    height: '30px',
                                                    borderRadius: '50%',
                                                }}
                                            >
                                                <ModeEditIcon />
                                            </Button>
                                        </Box>
                                    </Box>
                                ))
                            }

                        </Box>

                        {/* edit form  */}

                        <Modal
                            open={openModal}
                            onClose={handleModalClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >

                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 4,
                            }}>
                                <Box
                                    sx={{
                                        mt: 4,
                                    }}
                                >

                                    <CustomFormLabel htmlFor="title">Title</CustomFormLabel>
                                    <CustomTextField onChange={handleChangeMoreData} name='title' defaultValue={moreFormData?.data?.title} id="title" variant="outlined" fullWidth />

                                    <CustomFormLabel htmlFor="company">Company</CustomFormLabel>
                                    <CustomTextField onChange={handleChangeMoreData} name='company' defaultValue={moreFormData?.data?.company} id="company" variant="outlined" fullWidth />

                                    <CustomFormLabel htmlFor="time">Time</CustomFormLabel>
                                    <CustomTextField onChange={handleChangeMoreData} name='time' defaultValue={moreFormData?.data?.time} id="time" variant="outlined" fullWidth />

                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        onClick={handleSaveMoreData}
                                        sx={{
                                            pt: '10px',
                                            pb: '10px',
                                        }}
                                    >
                                        save
                                    </Button>
                                    {
                                        moreFormData?.data?.time && <Button
                                            color="error"
                                            variant="contained"
                                            size="large"
                                            fullWidth
                                            onClick={() => handleDeleteMoreData(moreFormData.type, moreFormData.index)}
                                            sx={{
                                                pt: '10px',
                                                pb: '10px',
                                                mt: '10px'
                                            }}
                                        >
                                            Delete {moreFormData.type}
                                        </Button>
                                    }



                                </Box>
                            </Box>
                        </Modal>

                        {/* modal for skill  */}
                        <Modal
                            open={openSkillModal}
                            onClose={handleSkillModalClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >

                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 4,
                            }}>
                                <Box
                                    sx={{
                                        mt: 4,
                                    }}
                                >

                                    <CustomFormLabel htmlFor="title">Title</CustomFormLabel>
                                    <CustomTextField onChange={handleChangeSkillData} name='title' defaultValue={skillFormData?.data?.title} id="title" variant="outlined" fullWidth />

                                    <CustomFormLabel htmlFor="value">Value</CustomFormLabel>
                                    <CustomTextField type="number"
                                        InputProps={{ inputProps: { min: 0, max: 10 } }} onChange={handleChangeSkillData} name='value' defaultValue={skillFormData?.data?.value} id="company" variant="outlined" fullWidth />


                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        onClick={handleSaveSkillData}
                                        sx={{
                                            pt: '10px',
                                            pb: '10px',
                                        }}
                                    >
                                        save
                                    </Button>
                                    {
                                        skillFormData?.data?.title && <Button
                                            color="error"
                                            variant="contained"
                                            size="large"
                                            fullWidth
                                            onClick={() => handleDeleteSkillData(skillFormData.type, skillFormData.index)}
                                            sx={{
                                                pt: '10px',
                                                pb: '10px',
                                                mt: '10px'
                                            }}
                                        >
                                            Delete {moreFormData.type}
                                        </Button>
                                    }



                                </Box>
                            </Box>
                        </Modal>
                    </Box>
            }
        </PageContainer >
    )
}

export default AddUser