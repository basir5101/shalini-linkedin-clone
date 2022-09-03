import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Menu,
  Typography,
  Chip,
  Avatar,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';
// Dropdown Component
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { userSignOut } from '../../../redux/userInfo/Action';
import logo from '../../../assets/images/logos/logo.png';
import profile from '../../../assets/images/logos/profile.jpg';
import GoogleSignout from '../../../components/forms/GoogleLogout';

const Header = ({ sx, customClass, toggleSidebar, toggleMobileSidebar }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl5, setAnchorEl5] = React.useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl4(null)
    setAnchorEl5(null)
    setAnchorEl(event.currentTarget);
    if (anchorEl === event.currentTarget) {
      setAnchorEl(null)
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const closeDropDown = () => {
    setAnchorEl4(null)
    setAnchorEl5(null)
  }

  const handleClose = () => {
    setAnchorEl(null);
  };


  // 4
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl(null)
    setAnchorEl5(null)
    if (anchorEl4 === event.currentTarget) {
      setAnchorEl4(null)
    } else {
      setAnchorEl4(event.currentTarget);
    }
  };

  const handleClick5 = (event) => {
    setAnchorEl(null)
    setAnchorEl4(null)
    if (anchorEl5 === event.currentTarget) {
      setAnchorEl5(null)
    } else {
      setAnchorEl5(event.currentTarget);
    }
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  const handleSignout = () => {
    localStorage.removeItem('access_token');
    dispatch(userSignOut());
  }



  return (
    <AppBar sx={sx} elevation={4} className={customClass}>
      <Toolbar sx={{ mx: { lg: 10 }, p: 0 }}>
        <NavLink to='/'>
          <img src={logo} style={{ marginTop: '10px', marginLeft: '5px' }} height={30} width='auto' alt="logo" />
        </NavLink>


        {/* ------------------------------------------- */}
        {/* Search Dropdown */}
        {/* ------------------------------------------- */}

        <Box flexGrow={1} />

        {/* ------------------------------------------- */}
        {/* Notifications Dropdown */}
        {/* ------------------------------------------- */}
        <IconButton
          size="small"
          aria-label="menu"
          color="inherit"
          aria-controls="notification-menu"
          aria-haspopup="true"
          onClick={handleClick}
          sx={{ ml: 1 }}
        >
          <Badge variant="dot" color="primary">
            <FeatherIcon icon="bell" width="22" height="22" />
          </Badge>
        </IconButton>
        <Menu
          id="notification-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          sx={{
            '& .MuiMenu-paper': {
              width: '385px',
              right: 0,
              top: '60px !important',
            },
            '& .MuiList-padding': {
              p: '5px',
            },
          }}
        >
          <Box
            sx={{
              mb: 0,
            }}
          >
            <Box display="flex" alignItems="center">
              <Typography sx={{
                ml: 2,
              }} variant="h4" fontWeight="500">
                Notifications
              </Typography>
              <Box
                sx={{
                  ml: 2,
                }}
              >
                <Chip
                  size="small"
                  label="4 new"
                  sx={{
                    borderRadius: '6px',
                    pl: '5px',
                    pr: '5px',
                    backgroundColor: (theme) => theme.palette.warning.main,
                    color: '#fff',
                  }}
                />
              </Box>
            </Box>
          </Box>
          <NotificationDropdown />
          <Button
            sx={{
              mt: 0,
              display: 'block',
              width: '100%',
            }}
            variant="contained"
            color="primary"
            onClick={handleClose}
          >
            <Link
              to="/email"
              style={{
                color: '#fff',
                width: '100%',
                display: 'block',
                textDecoration: 'none',
              }}
            >
              See all notifications
            </Link>
          </Button>
        </Menu>

        {/* ------------------------------------------- */}
        {/* End Notifications Dropdown */}
        {/* ------------------------------------------- */}







        {/* vertical divider  */}
        <Box
          sx={{
            width: '1px',
            backgroundColor: 'rgba(0,0,0,0.1)',
            height: '25px',
            ml: 1,
            mr: 1,
          }}
        />
        {/* ------------------------------------------- */}
        {/* Profile Dropdown */}
        {/* ------------------------------------------- */}
        <Button
          aria-label="menu"
          color="inherit"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleClick4}
        >
          <Box display="flex" alignItems="center">
            <Avatar src={profile} sx={{
              width: 30,
              height: 30,
            }}> </Avatar>
            <Box
              sx={{
                display: {
                  xs: 'none',
                  sm: 'flex',
                },
                alignItems: 'center',
              }}
            >
              <Typography color="textSecondary" variant="h5" fontWeight="400" sx={{ ml: 1 }}>
                {"Me"}
              </Typography>
              <FeatherIcon icon="chevron-down" width="20" height="20" />
            </Box>
          </Box>
        </Button>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl4}
          keepMounted
          open={Boolean(anchorEl4)}
          onClose={handleClose4}
          sx={{
            '& .MuiMenu-paper': {
              width: '385px',
              right: 0,
              top: '60px !important',
            },
            '& .MuiList-padding': {
              p: '5px',
            },
          }}
        >


          <ProfileDropdown closeDropDown={closeDropDown} />
          <GoogleSignout />
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
  customClass: PropTypes.string,
  toggleSidebar: PropTypes.func,
  toggleMobileSidebar: PropTypes.func,
};

export default Header;
