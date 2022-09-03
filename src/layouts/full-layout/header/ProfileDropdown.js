import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, MenuItem, Typography, Avatar, Button, Divider, Link } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import profile from '../../../assets/images/logos/profile.jpg'

const ProfileDropdown = (props) => {

  const user = useSelector((state) => state.UserInfoReducer);
  console.log(user);
  const getAvatarText = (user) => {
    let fName = user.firstName ? user.firstName : " ";
    let lName = user.lastName ? user.lastName : " ";
    return fName.split("")[0] + lName.split("")[0];
  }

  return (
    <Box>
      <Box
        sx={{
          pt: 0,
        }}
      >
        <Box display="flex" alignItems="center">
          <Avatar
            src={profile}
            sx={{
              width: '80px',
              height: '80px',
            }}
          > </Avatar>
          <Box
            sx={{
              ml: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                lineHeight: '1.235',
              }}
            >
              Salini .
            </Typography>
            <Typography color="textSecondary" variant="h6" fontWeight="400">
              {user.userTypeLabel}
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography color="textSecondary" variant="h6">
                Software Developer at doodleblue innovotions
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider
        style={{
          marginTop: 5,
          marginBottom: 0,
        }}
      />
      <Box>
        <Link onClick={props.closeDropDown} href={`/my-profile`} underline='none'>
          <MenuItem>
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
                  }}
                >

                  My Profile
                </Typography>
                <Typography color="textSecondary" variant="h6" fontWeight="400">
                  Account Settings
                </Typography>

              </Box>
            </Box>
          </MenuItem>
        </Link>
      </Box>
    </Box>
  )
};

export default ProfileDropdown;
