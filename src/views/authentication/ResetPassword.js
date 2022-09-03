import React, { useCallback, useEffect } from 'react';
import { Grid, Box, Typography, Button, Alert, LinearProgress, Experimental_CssVarsProvider } from '@mui/material';
import { Link, NavLink, useLocation } from 'react-router-dom';
// import img1 from '../../assets/images/backgrounds/login-bg.svg';
import img1 from '../../assets/images/backgrounds/auth_background.jpg';
import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';
import PageContainer from '../../components/container/PageContainer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Config from '../../utils/Config';
import { useState } from 'react';
import FeatherIcon from 'feather-icons-react'
import { useSelector } from 'react-redux';
import FullPageContainer from '../../components/container/FullPageContainer';


const resendOptTime = 120; //second

const maxOtpAttempt = 5;


const ResetPassword = () => {
  const location = useLocation();
  const newUser = location?.state?.newUser || false;
  const [nextForm, setNextForm] = React.useState({ firstPage: newUser || false, secondPage: newUser || false });
  const navigate = useNavigate();
  const [email, setEmail] = React.useState(null);
  const [otp, setOtp] = React.useState('');
  const [pass, setPass] = React.useState("");
  const [cnfrmPass, setCnfrmPass] = React.useState("");
  const [lenghtError, setLenghtError] = React.useState(true);
  const [smallCharError, setSmallCharError] = React.useState(true);
  const [capitalCharError, setCapitalCharError] = React.useState(true);
  const [atLeastOneNumberError, setAtLeastOneNumberError] = React.useState(true);
  const [atLeastOneSymbolError, setAtLeastOneSymbolError] = React.useState(true);
  const [allError, setAllError] = React.useState(true);
  const [passMatch, setPassMatch] = React.useState(false);

  const [emailFormBtnEnable, setEmailFormBtnEnable] = React.useState(false);
  const [otpFormBtnEnable, setOtpFormBtnEnable] = React.useState(false);
  const [otpError, setOtpError] = React.useState("")
  const [emailError, setEmailError] = React.useState("")
  const [limitOfSendingOtp, setLimitOfSendingOtp] = React.useState(maxOtpAttempt)
  const [passwordStrength, setPasswordStrength] = React.useState({
    strength: 'weak',
    value: 20,
    variant: 'danger'
  })

  const ui_config = useSelector((state) => state.ConfigReducer);

  useEffect(() => {
    const smCheck = (/[a-z]/.test(pass));
    const cpCheck = (/[A-Z]/.test(pass));
    const lgCheck = (pass.length > 7);
    const numCheck = (/[0-9]/.test(pass));
    const syCheck = (/[!@#$%^&*]/.test(pass));
    setSmallCharError(!smCheck);
    setCapitalCharError(!cpCheck);
    setLenghtError(!lgCheck);
    setAtLeastOneNumberError(!numCheck);
    setAtLeastOneSymbolError(!syCheck);
    const errorList = [smCheck, cpCheck, lgCheck, numCheck, syCheck];
    const errorSolve = errorList.filter(error => error);
    if (errorList.length === errorSolve.length) setAllError(false)
    setPasswordStrength({ value: errorSolve.length * 20 });
  }, [pass])


  const handleEmailValue = (e) => {
    setEmail(e.target.value.trim());
    setEmailFormBtnEnable((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value.trim())));
    setEmailError("");
  }

  const handleOTPvalue = (e) => {
    setOtp(e.target.value.trim());
    setOtpFormBtnEnable((e.target.value.trim().length > 5 && e.target.value.trim().length < 7));
    setOtpError("");
  }


  const handleCnfrmPassChange = e => {
    setCnfrmPass(e.target.value.trim());
    if (pass === e.target.value.trim() && pass.trim() !== '') {
      setPassMatch(true);
      return;
    }
    setPassMatch(false);

  }

  const handlePassChanger = (e) => {
    setAllError(true)
    setPass(e.target.value.trim());
    if (cnfrmPass === e.target.value.trim() && pass.trim() !== '') {
      setPassMatch(true);
      return;
    }
    setPassMatch(false);

  }

  const getStrength = value => {
    switch (value) {
      case 0:
        return 'Very Weak'
      case 20:
        return 'Very Weak'
      case 40:
        return 'Weak'
      case 60:
        return 'Good'
      case 80:
        return 'Strong'
      case 100:
        return 'Very Strong'
      default:
        return 'Very Week'
    }
  }

  const secondsToTime = (secs) => {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    let diffTime
    if (minutes > 9) {
      diffTime = minutes;
    } else {
      diffTime = '0' + minutes;
    }
    if (seconds > 9) {
      diffTime = diffTime + ":" + seconds;
    } else {
      diffTime = diffTime + ":0" + seconds;
    }
    return diffTime;
  }



  // timer for sending otp
  const [timerCount, setTimerCount] = useState(resendOptTime);
  const startTimerWrapper = useCallback((func) => {
    let timeInterval;
    return () => {
      if (timeInterval) {
        clearInterval(timeInterval)
      }
      setTimerCount(resendOptTime)
      timeInterval = setInterval(() => {
        func(timeInterval)
      }, 1000)
    }
  }, [])

  const timer = useCallback(startTimerWrapper((intervalfn) => {
    setTimerCount((val) => {
      if (val === 0) {
        clearInterval(intervalfn);
        return val
      }
      return val - 1
    })
  }), [])


  const handleFirstForm = (e) => {
    e.preventDefault()
    // setNextForm({ ...nextForm, firstPage: !nextForm.firstPage });
    // return;
    //timer()

    axios.post(Config.getUrl('forgotPassword') + `?email=${email}`).then((res) => {
      console.log("check:", res.status)
      if (res.status === 200) {
        timer()
        console.log(res.data)
        setNextForm({ ...nextForm, firstPage: !nextForm.firstPage });
      } else {
        setEmailError("The entered email id is not valid")
      }
    }).catch((err) => {
      setEmailError("Email entered is invalid.")
      console.log("unable to reset:", err)
    })
  }

  const resendOtp = () => {
    setLimitOfSendingOtp(limitOfSendingOtp - 1);
    timer()
    axios.post(Config.getUrl('forgotPassword') + `?email=${email}`).then((res) => {
      if (res.status === 200) {
        console.log(res.data)
        //  setNextForm({ ...nextForm, firstPage: !nextForm.firstPage });
      }
    }).catch((err) => {
      setOtpError("OTP entered is invalid.")
      console.log("unable to reset:", err)
    })
  }

  const handleSecondForm = (e) => {
    e.preventDefault()
    // setNextForm({ ...nextForm, secondPage: !nextForm.secondPage });
    // return;
    axios.post(Config.getUrl('validateOtp'), { userEmail: email, otp: otp }).then((res) => {
      if (res.status === 200) {
        console.log(res.data)
        setNextForm({ ...nextForm, secondPage: !nextForm.secondPage });
      }
    }).catch((err) => {
      setOtpError('You have entered incorrect OTP. Please try again!')
      console.log("unable to set otp:", err)
    })
  }

  const handleBtnClick = () => {
    const payload = {
      userEmail: email,
      newPassword: pass,
      otp: otp
    }
    if (passMatch && newUser) {
      console.log({
        userEmail: location?.state?.username || email,
        newPassword: pass,
      });
      axios.post(Config.getUrl('resetPassNewUser'), {
        userEmail: location?.state?.username,
        newPassword: pass,
      }).then((res) => {
        if (res.status === 200) {
          navigate('/login');
        }
      }).catch((err) => {
        console.log("unable to set pass:", err)
      })
    }
    if (passMatch && otp) {
      axios.post(Config.getUrl('resetPasswordByOtp'), payload).then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          navigate('/login');
        }
      }).catch((err) => {
        console.log("unable to set pass:", err)
      })
    }

  }

  return (
    <FullPageContainer title="Reset Pass" description="this is password reset page">
      <Grid container spacing={0} sx={{ height: '100vh', justifyContent: 'center', position: 'relative' }}>
        <Grid sx={{ position: 'relative' }} item mt={10} xs={10} sm={8} lg={6} display="flex" alignItems="center">
          <Grid container spacing={0} display="flex" justifyContent="center">
            <Grid item xs={12} lg={9} xl={6}>
              {!nextForm.firstPage ?
                <Box
                  sx={{
                    p: 0,

                  }}
                >
                  <Typography fontWeight="700" variant="h2" color='primary'>
                    Forgot your password?
                  </Typography>

                  <Typography
                    color="textSecondary"
                    variant="h5"
                    fontWeight="400"
                    sx={{
                      mt: 2,
                    }}
                  >
                    Please enter the email address associated with your account and we will email you an
                    OTP to reset your password.
                  </Typography>

                  <Box
                    sx={{
                      mt: 4,
                    }}
                    component='form'

                  >
                    <CustomTextField label="Email Address" id="reset-email-pass" value={email} onChange={handleEmailValue} variant="outlined" fullWidth />

                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      size="large"
                      fullWidth
                      disabled={!emailFormBtnEnable}
                      onClick={handleFirstForm}
                      sx={{
                        pt: '10px',
                        pb: '10px',
                        mt: 4,
                      }}
                    >
                      Submit
                    </Button>
                    <Button
                      color="primary"
                      size="large"
                      fullWidth
                      component={Link}
                      to="/auth/login"
                      sx={{
                        pt: '10px',
                        pb: '10px',
                        mt: 2,
                      }}
                    >
                      Back to Login
                    </Button>
                    {
                      emailError && <Alert severity="error">
                        {emailError}
                      </Alert>
                    }
                    <Box sx={{
                      position: 'absolute', top: {
                        lg: -50,
                        xs: -70,
                      },
                    }}>
                      <NavLink to='/'>
                        <img src={ui_config.configData.logo} height={60} width='auto' alt="logo" />
                      </NavLink>
                    </Box>

                  </Box>
                </Box>
                : !nextForm.secondPage ?
                  <Box
                    sx={{
                      p: 0,
                    }}
                  >
                    <Typography fontWeight="700" variant="h2" color='primary'>
                      One Time Password
                    </Typography>

                    <Typography
                      color="textSecondary"
                      variant="h5"
                      fontWeight="400"
                      sx={{
                        mt: 2,
                      }}
                    >
                      Enter one time password sent to your register email address <span style={{ cursor: "pointer", color: 'blue', fontWeight: 'bold' }} onClick={handleFirstForm}>{email}</span>
                    </Typography>

                    <Box
                      sx={{
                        mt: 4,
                      }}
                      component='form'
                      onSubmit={otpFormBtnEnable ? handleSecondForm : {}}
                    >
                      <CustomTextField id="set-otp" type="number" value={otp} onChange={handleOTPvalue} variant="outlined" label="Enter your OTP" fullWidth />

                      <Box component={'div'} display='flex' alignItems={'flex-end'} justifyContent='flex-end'>
                        <FeatherIcon icon={'clock'} color='#8E8E8E' />
                        <Typography ml={2} color="#8E8E8E">
                          {/* {`0${minutes}: ${timerCount.toString().length > 1 && timerCount > 60 ? timerCount - 60 : timerCount.toString().length > 1 ? timerCount : '0' + timerCount}`} */}
                          {secondsToTime(timerCount)}
                        </Typography>
                      </Box>

                      <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        fullWidth
                        type='submit'
                        disabled={!otpFormBtnEnable}
                        onClick={handleSecondForm}
                        to="/"
                        sx={{
                          pt: '10px',
                          pb: '10px',
                          mt: 2,
                        }}
                      >
                        Confirm
                      </Button>
                      <Button
                        color="primary"
                        size="large"
                        fullWidth
                        disabled={timerCount !== 0 || limitOfSendingOtp === 0}
                        sx={{
                          pt: '10px',
                          pb: '10px',
                          mt: 2,
                        }}
                        onClick={resendOtp}
                      >
                        {/* Resend OTP {`( ${limitOfSendingOtp} attempt remaining )`} */}
                        Resend OTP
                      </Button>
                      {
                        otpError && <Alert severity="error">
                          {otpError}
                        </Alert>
                      }
                      <Box sx={{
                        position: 'absolute', top: {
                          lg: -50,
                          xs: -70,
                        },
                      }}>
                        <NavLink to='/'>
                          <img src={ui_config.configData.logo} height={60} width='auto' alt="logo" />
                        </NavLink>
                      </Box>

                    </Box>
                  </Box>
                  :
                  <Box
                    sx={{
                      p: 0,
                      mt: 4,
                    }}

                  >
                    <Typography fontWeight="700" variant="h2" color='primary'>
                      Choose a new Password
                    </Typography>

                    <Typography
                      color="textSecondary"
                      variant="h5"
                      fontWeight="400"
                      sx={{
                        mt: 2,
                      }}
                    >
                      Set and confirm your Password
                    </Typography>

                    <Box
                      sx={{
                        mt: 4,
                      }}
                      component='form'
                      onSubmit={handleBtnClick}
                    >

                      <CustomTextField sx={{ display: "none" }} type="hidden" id="passNull" variant="outlined" />
                      <CustomTextField type="password" id="pass1" variant="outlined" value={pass} label="your password" fullWidth onChange={handlePassChanger} />
                      <CustomTextField type="password" id="pass2" variant="outlined" value={cnfrmPass} label="confirm your password" fullWidth onChange={handleCnfrmPassChange} />
                      {
                        pass && <Box sx={{ width: '100%' }}>
                          <Typography mb={0.3} fontWeight="200" variant="h4" >
                            Password Strength: <Typography fontWeight={600} color={passwordStrength.value > 79 ? '#00c292' : 'error'} variant='span'>
                              {/* {passwordStrength.strength} */}
                              {getStrength(passwordStrength.value)}
                            </Typography>
                          </Typography>
                          <LinearProgress color={passwordStrength.value > 79 ? 'success' : 'error'} sx={{ height: 8 }} variant="determinate" value={passwordStrength.value} />
                        </Box>
                      }
                      <Box>
                        <Box sx={{ display: "flex", alignItems: 'end' }}>
                          {lenghtError ? <ClearIcon color="error" fontSize='13px' /> : <CheckIcon color='success' fontSize='13px' />}
                          <Typography
                            color="textSecondary"
                            variant="h5"
                            fontWeight="100"
                            fontSize='13px'
                            ml={1}
                            sx={{ mt: 1 }}
                          >
                            At least 8 characters
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: 'end' }}>
                          {smallCharError ? <ClearIcon color="error" fontSize='13px' /> : <CheckIcon color='success' fontSize='13px' />}
                          <Typography
                            color="textSecondary"
                            variant="h5"
                            fontWeight="100"
                            fontSize='13px'
                            ml={1}
                          >
                            At least one small letter
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: 'end' }}>
                          {capitalCharError ? <ClearIcon color="error" fontSize='13px' /> : <CheckIcon color='success' fontSize='13px' />}
                          <Typography
                            color="textSecondary"
                            variant="h5"
                            fontWeight="100"
                            fontSize='13px'
                            ml={1}
                          >
                            At least one capital letter
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: 'end' }}>
                          {atLeastOneNumberError ? <ClearIcon color="error" fontSize='13px' /> : <CheckIcon color='success' fontSize='13px' />}
                          <Typography
                            color="textSecondary"
                            variant="h5"
                            fontWeight="100"
                            fontSize='13px'
                            ml={1}
                          >
                            At least one number
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: 'end' }}>
                          {atLeastOneSymbolError ? <ClearIcon color="error" fontSize='13px' /> : <CheckIcon color='success' fontSize='13px' />}
                          <Typography
                            color="textSecondary"
                            variant="span"
                            fontWeight="100"
                            fontSize='13px'
                            ml={1}
                          >
                            At least one symbol
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: 'end' }}>
                          {pass !== '' && cnfrmPass !== '' && !passMatch ? (
                            <>
                              <ClearIcon color="error" fontSize='13px' />
                              {/* {!passMatch ? <ClearIcon color="error" fontSize='13px' /> : <CheckIcon color='success' fontSize='13px' />} */}
                              <Typography
                                color="textSecondary"
                                variant="h5"
                                fontWeight="100"
                                fontSize='13px'
                                ml={1}
                              >
                                Password mismatched!
                              </Typography>
                            </>) : null}
                        </Box>
                      </Box>

                      <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        type="submit"
                        fullWidth
                        onClick={handleBtnClick}
                        disabled={!passMatch || allError}
                        to="/"
                        sx={{
                          pt: '10px',
                          pb: '10px',
                          mt: 4,
                          mb: 3,
                        }}
                      >
                        Confirm
                      </Button>
                      {/* disable this functionality */}
                      {
                        (!passMatch || allError) && false && <Alert severity="error">
                          Password didn't matched
                        </Alert>
                      }

                      <Box sx={{
                        position: 'absolute', top: {
                          lg: -50,
                          xs: -70,
                        },
                      }}>
                        <NavLink to='/'>
                          <img src={ui_config.configData.logo} height={60} width='auto' alt="logo" />
                        </NavLink>
                      </Box>

                    </Box>
                  </Box>
              }

            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          lg={6}
        >
          <Box
            sx={{
              position: 'relative',
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{
                position: {
                  xs: 'relative',
                  lg: 'absolute',
                },
                height: { xs: 'auto', lg: '100vh' },
                margin: '0 auto',
                padding: 3,
                marginTop: 3,
              }}
            >
              <img
                src={img1}
                alt="bg"
                style={{
                  width: '100%',
                  maxWidth: '812px',
                }}
              />
            </Box>

            <Box
              sx={{
                p: 4,
                position: 'absolute',
                top: '0',
              }}
            >
              {/* <LogoIcon /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </FullPageContainer >

  )
};

export default ResetPassword;
