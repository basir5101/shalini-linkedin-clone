import React from 'react';
import { Grid, Box, Typography, Button, Divider } from '@mui/material';
import { Link, Navigate, NavLink } from 'react-router-dom';

import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import GoogleIcon from '@mui/icons-material/Google';
import logo from '../../assets/images/logos/logo.png'
import Config from '../../utils/Config';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserInfo, updateUser } from '../../redux/userInfo/Action';
import { useNavigate } from 'react-router-dom'
import FullPageContainer from '../../components/container/FullPageContainer';
import { userData } from '../../utils/fakeData';
import GoogleSignin from '../../components/forms/GoogleLogin';

function Login() {
  const { isLoading, userInfo } = useSelector(state => state.UserDataReducer);
  console.log('userInfo', userInfo);
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
    console.log(e);
    if (username !== userInfo.email) {
      alert('incorrect email')
    } else if (password !== userInfo.password) {
      alert('incorrect password')
    } else {
      dispatch(updateUser(userData));
      localStorage.setItem("access_token", userInfo.accessToken);
      navigate('/');
    }
    // axios.post(Config.getUrl('login'), { username: username, password: password }).then(res => {
    //   if (res.status === 200) {
    //     if (res.data.isFirstTime) {
    //       navigate('/reset-password', { state: { newUser: true, username: username } })
    //     } else {
    //       dispatch(updateUser(userData));
    //       localStorage.setItem("access_token", res.data.accessToken);
    //       navigate('/');
    //     }

    //   }
    //   setError('Unable to login')
    // }).catch((err) => {
    //   setError("Incorrect Username or Password")
    //   console.log("unable to login:", err)
    // })
  }

  return (
    !user.Islogin ?
      <FullPageContainer title="Login" description="this is Login page">
        <Grid container spacing={0} sx={{ minHeight: '100vh', justifyContent: 'center', position: 'relative' }}>
          <Grid item mt={10} xs={10} sm={8} lg={6} display="flex" alignItems="center">
            <Grid container spacing={0} display="flex" justifyContent="center">
              <Grid sx={{
                border: '1px solid gray',
                py: 7,
                px: 8,
                boxShadow: '0px 0px 10px 2px gray'
              }} item xs={12} lg={8} xl={6}>
                <Box
                  sx={{
                    p: 0,

                  }}

                >
                  <Typography fontWeight="700" variant="h2" color='primary'>
                    Sign In
                  </Typography>
                  <Typography>Stay updated on your professional world</Typography>

                  <Box component='form'
                    onSubmit={handleBtnClick}
                    mt={5}>
                    <CustomTextField label="Email" id="email" variant="outlined" fullWidth value={username} onChange={handleUsername} />
                    <CustomTextField
                      label="Password"
                      id="password"
                      type="password"
                      variant="outlined"
                      value={password} onChange={handlePassword}
                      fullWidth
                      sx={{
                        mb: 3,
                      }}
                    />
                    <Box
                      sx={{
                        display: {
                          xs: 'block',
                          sm: 'flex',
                          lg: 'flex',
                        },
                        alignItems: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          ml: 'auto',
                        }}
                      >
                        <Typography
                          component={Link}
                          to="/reset-password"
                          fontWeight="500"
                          sx={{
                            display: 'block',
                            textDecoration: 'none',
                            mb: '16px',
                            color: 'primary.main',
                          }}
                        >
                          Forgot Password ?
                        </Typography>
                      </Box>
                    </Box>

                    <Button
                      disabled={!username || !password}
                      color="primary"
                      variant="contained"
                      size="large"
                      fullWidth
                      type='submit'
                      onSubmit={(e) => handleBtnClick(e)}
                      sx={{
                        py: '10px',
                        mb: '15px',
                        pb: '10px',
                      }}
                    >
                      Sign In
                    </Button>

                    <Divider>or</Divider>
                    <GoogleSignin />


                  </Box>
                </Box>
                <Box sx={{
                  position: 'absolute', top: {
                    lg: 50,
                    xs: 70,
                  },
                  left: 50
                }}>
                  <NavLink to='/'>
                    <img src={logo} height={60} width='auto' alt="logo" />
                  </NavLink>
                </Box>
                <Box display="flex" mt={4} alignItems="center">
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="400"
                    sx={{
                      mr: 1,
                    }}
                  >
                    New to LinkedIn ?
                  </Typography>
                  <Typography
                    component={Link}
                    to="/register"
                    fontWeight="500"
                    sx={{
                      display: 'block',
                      textDecoration: 'none',
                      color: 'primary.main',
                    }}
                  >
                    Join now
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </FullPageContainer > :
      <Navigate to='/' />
  );
}





export default Login;
