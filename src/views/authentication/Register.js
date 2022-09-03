import React from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';
import logo from '../../assets/images/logos/logo.png'
import axios from 'axios';
import Config from '../../utils/Config';
import { updateUser } from '../../redux/userInfo/Action';
import { userData } from '../../utils/fakeData';
import { useDispatch, useSelector } from 'react-redux';
import GoogleSignin from '../../components/forms/GoogleLogin';

const Register = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.UserInfoReducer);

  const handleUsername = (e) => {
    setUsername(e.target.value.trim());
    setError("")
  }

  const handlePassword = (e) => {
    setPassword(e.target.value.trim());
    setError("")
  }

  const handleBtnClick = (e) => {
    e.preventDefault()
    axios.post(Config.getUrl('login'), { username: username, password: password }).then(res => {
      if (res.status === 200) {
        dispatch(updateUser(userData));
        localStorage.setItem("access_token", res.data.accessToken);
        navigate('/');
      }
      setError('Unable to register')
    }).catch((err) => {
      setError("Incorrect Username or Password")
      console.log("unable to login:", err)
    })

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
                  <CustomTextField onChange={handleUsername} id="email" variant="outlined" fullWidth />
                  <CustomFormLabel htmlFor="password">Password (6 or more character)</CustomFormLabel>
                  <CustomTextField
                    onChange={handlePassword}
                    id="password"
                    variant="outlined"
                    fullWidth
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
