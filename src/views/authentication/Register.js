import React from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';


import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';
import logo from '../../assets/images/logos/logo.png'
import { updateUser } from '../../redux/userInfo/Action';
import { userData } from '../../utils/fakeData';
import { useDispatch, useSelector } from 'react-redux';
import GoogleSignin from '../../components/forms/GoogleLogin';

const Register = () => {

  const [error, setError] = React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = React.useState(userData);
  const user = useSelector((state) => state.UserInfoReducer);
  console.log('user', user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newData = { ...userInfo };
    newData[name] = value;
    setUserInfo(newData);
    setError("")
  }



  const handleBtnClick = (e) => {
    e.preventDefault()
    if (userInfo.password && userInfo.email) {
      if (userInfo.password.length < 6) {
        alert('password should be at least 6 character')
      } else {
        dispatch(updateUser(userInfo))
        navigate('/login');
      }
    } else {
      alert('email and password required')
    }

  }

  return (
    (
      <Grid container spacing={0} sx={{ height: '100vh', justifyContent: 'center', position: 'relative' }}>
        <Grid item xs={12} sm={8} lg={6} display="flex" alignItems="center">
          <Grid container spacing={0} display="flex" justifyContent="center">
            <Grid item xs={12} lg={9} xl={6}>
              <Box
                sx={{
                  border: '1px solid #f3f2ef',
                  boxShadow: '0px 0px 10px 1px #f3f2ef',
                  p: 4,
                }}
              >
                <Typography fontWeight="700" variant="h2">
                  Make the most of your professional life
                </Typography>

                <Box
                  sx={{
                    mt: 4,
                  }}
                >

                  <CustomFormLabel htmlFor="email">Email Adddress</CustomFormLabel>
                  <CustomTextField onChange={handleChange} id="email" name={'email'} variant="outlined" fullWidth />
                  <CustomFormLabel htmlFor="password">Password (6 or more character)</CustomFormLabel>
                  <CustomTextField
                    onChange={handleChange}
                    id="password"
                    variant="outlined"
                    fullWidth
                    name='password'
                    sx={{
                      mb: 3,
                    }}
                  />

                  <Button
                    color="secondary"
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleBtnClick}
                    sx={{
                      pt: '10px',
                      pb: '10px',
                    }}
                  >
                    Agree & Join
                  </Button>
                  <Box
                    sx={{
                      position: 'relative',
                      textAlign: 'center',
                      mt: '20px',
                      mb: '20px',
                      '&::before': {
                        content: '""',
                        background: (theme) =>
                          `${theme.palette.mode === 'dark' ? '#42464d' : '#ecf0f2'}`,
                        height: '1px',
                        width: '100%',
                        position: 'absolute',
                        left: '0',
                        top: '13px',
                      },
                    }}
                  >
                    <Typography
                      component="span"
                      color="textSecondary"
                      variant="h6"
                      fontWeight="400"
                      sx={{
                        position: 'relative',
                        padding: '0 12px',
                        background: (theme) =>
                          `${theme.palette.mode === 'dark' ? '#282c34' : '#fff'}`,
                      }}
                    >
                      or
                    </Typography>
                  </Box>

                  <GoogleSignin />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Box
          display="flex"
          alignItems="center"
          sx={{
            p: 4,
            position: 'absolute',
            top: '0',
            left: 0
          }}
        >
          <img src={logo} alt="" />
        </Box>
      </Grid>
    )
  )
}

export default Register;
