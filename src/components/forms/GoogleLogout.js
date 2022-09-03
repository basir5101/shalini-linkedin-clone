import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { GoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { userSignOut } from '../../redux/userInfo/Action';
import { gapi } from 'gapi-script';

const clientId =
    '124033126705-19um7c5iejbfmifpfma1te5mrcmdqi2p.apps.googleusercontent.com';

function GoogleSignout() {


    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });
    const dispatch = useDispatch();
    const onSuccess = () => {
        console.log('Logout made successfully');
        localStorage.removeItem('access_token');

        window.sessionStorage.removeItem("access_token");
        window.sessionStorage.removeItem("nama")
        dispatch(userSignOut());
    };

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
                render={renderProps => (
                    <Button
                        onClick={renderProps.onClick}
                        sx={{
                            display: 'block',
                            width: '100%',
                        }}
                        variant="contained"
                        color="primary">
                        Logout
                    </Button>
                )}
            ></GoogleLogout>
        </div>
    );
}

export default GoogleSignout;