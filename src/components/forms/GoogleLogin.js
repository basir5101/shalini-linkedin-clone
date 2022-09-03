import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import GoogleIcon from '@mui/icons-material/Google';

import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from './refreshToken';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/userInfo/Action';
import { userData } from '../../utils/fakeData';
import { useNavigate } from 'react-router-dom';
import { gapi } from 'gapi-script';
// refresh token


const clientId = '124033126705-19um7c5iejbfmifpfma1te5mrcmdqi2p.apps.googleusercontent.com';

function GoogleSignin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });

    const onSuccess = (res) => {
        dispatch(updateUser(userData));
        localStorage.setItem("access_token", res.accessToken);
        navigate('/');
        console.log('Login Success: currentUser:', res);
        refreshTokenSetup(res);
    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
    };

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{
                    width: '100% !important',
                    borderColor: 'green',
                    borderWidth: '2px',
                    textAlign: 'center',
                    marginTop: 2,
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    '&:hover': {
                        borderColor: (theme) =>
                            `${theme.palette.mode === 'dark' ? '#42464d' : '#dde3e8'}`,
                        borderWidth: '2px',
                    },
                }}
                render={renderProps => (
                    <Button onClick={renderProps.onClick} variant="outlined"
                        size="large"
                        display="flex"
                        alignitems="center"
                        justifycontent="center"
                        sx={{
                            width: '100%',
                            borderColor: (theme) =>
                                `${theme.palette.mode === 'dark' ? '#42464d' : '#dde3e8'}`,
                            borderWidth: '2px',
                            textAlign: 'center',
                            mt: 2,
                            pt: '10px',
                            pb: '10px',
                            '&:hover': {
                                borderColor: (theme) =>
                                    `${theme.palette.mode === 'dark' ? '#42464d' : '#dde3e8'}`,
                                borderWidth: '2px',
                            },
                        }}><Box display="flex" alignItems="center">
                            <GoogleIcon
                                sx={{
                                    color: (theme) => theme.palette.error.main,
                                }}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    ml: 1,
                                    color: (theme) =>
                                        `${theme.palette.mode === 'dark' ? theme.palette.grey.A200 : '#13152a'
                                        }`,
                                }}
                            >
                                Sign in with  Google
                            </Typography>
                        </Box></Button>
                )}
                isSignedIn={true}
            />
        </div>
    );
}

export default GoogleSignin;