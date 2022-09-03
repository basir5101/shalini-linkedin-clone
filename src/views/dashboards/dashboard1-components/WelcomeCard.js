import React from 'react';
import { Card, CardContent, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import imgsvg from '../../../assets/images/backgrounds/welcome-bg2-2x-svg.svg';

const WelcomeCard = () => {

  const user = useSelector((state) => state.UserInfoReducer);
  const { isLoading, userInfo, error } = useSelector(state => state.UserDataReducer);

  return (
    <Card
      elevation={0}
      sx={{
        position: 'relative',
        minHeight: '50%',
        backgroundColor: (theme) => `${theme.palette.mode === 'dark' ? '#32363e' : ''}`,
        '&:before': {
          content: `""`,
          position: 'absolute',
          width: '100%',
          height: '100%',
          // background: `url(${imgsvg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '45%',
          transform: (theme) => `${theme.direction === 'rtl' ? '' : 'unset'}`,
          backgroundPosition: {
            xs: 'top 0px right -9px',
          },
        },
        borderWidth: '0px',
      }}
    >
      <CardContent>
        <Typography
          sx={{
            marginTop: '8px',
            marginBottom: '0px',
            lineHeight: '35px',
            position: 'relative',
            zIndex: 9,
          }}
          variant="h3"
          gutterBottom
        >
          Hey {userInfo?.name || "Shalini."} , <br /> Download Latest Report
        </Typography>
        <Button
          sx={{
            marginTop: '15px',
          }}
          variant="contained"
          color="primary"
        >
          Download
        </Button>
      </CardContent>
    </Card>
  )
};

export default WelcomeCard;
