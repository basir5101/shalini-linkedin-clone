import React from 'react';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  List,
  Typography,
  ListItem,
  Collapse,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import MiniDrawer from './MiniDrawer';
import { useSelector } from 'react-redux';

const Sidebar = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }) => {
  const [open, setOpen] = React.useState(false);
  const [sideBarOpen, setSidebarOpen] = React.useState(false);
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));
  const Modules = useSelector((state) => state.UserInfoReducer.modules);

  const handleClick = (index) => {
    console.log(index);
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
    if (!sideBarOpen) {
      setSidebarOpen(true)
    }
  };

  const handleDrawerToggle = () => {
    setSidebarOpen(!sideBarOpen);
    setOpen(false)
  };

  const SidebarContent = (
    <Box sx={{ mt: '-5px' }}>
      <List>
        {Modules.map((item, index) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return (
              <li key={item.subheader}>
                <Typography
                  variant="subtitle2"
                  fontWeight="500"
                  sx={{ my: 2, mt: 4, opacity: '0.4' }}
                >
                  {item.subheader}
                </Typography>
              </li>
            );
            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else if (item.submodules) {
            return (
              <React.Fragment key={item.mod_code}>
                <ListItem
                  button
                  component="li"
                  onClick={() => handleClick(index)}
                  selected={pathWithoutLastPart === item.mod_href}
                  sx={{
                    mx: 0, mb: '2px', py: 0, pr: 0, borderRadius: 0, position: 'relative',
                    ...(pathWithoutLastPart === item.mod_href && {
                      color: (theme) => `${theme.palette.sidebar.activeText}!important`,
                      backgroundColor: (theme) => `${theme.palette.sidebar.active}!important`,
                      borderColor: (theme) => `${theme.palette.sidebar.activeText}!important`,

                    }),
                  }}
                >
                  <Box component='span' sx={{
                    ...(pathWithoutLastPart === item.mod_href && {
                      height: '100%', left: 0, width: 5, bgcolor: (theme) => `${theme.palette.sidebar.activeText}!important`, position: 'absolute'
                    }),
                  }}></Box>
                  <ListItemIcon
                    sx={{
                      pr: 2,
                      ...(pathWithoutLastPart === item.mod_href && {
                        color: (theme) => `${theme.palette.sidebar.activeText}!important`,
                      }),
                    }}
                  >
                    <FeatherIcon icon={item.mod_icon_name} width="20" height="20" />
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{
                    ...(pathWithoutLastPart === item.mod_href && {
                      fontWeight: 500,
                    }),
                  }} >{item.mod_display_label}</ListItemText>
                  {index === open || pathWithoutLastPart === item.mod_href ? (
                    <FeatherIcon icon="chevron-down" size="16" />
                  ) : (
                    <FeatherIcon icon="chevron-right" size="16" />
                  )}
                </ListItem>
                <Collapse in={index === open} timeout="auto" unmountOnExit>
                  <List component="li" disablePadding>
                    {item.submodules.map((child) => {
                      return (
                        <ListItem
                          key={child.subm_code}
                          button
                          component={NavLink}
                          to={child.subm_href}
                          onClick={onSidebarClose}
                          selected={pathDirect === child.subm_href}
                          sx={{
                            mb: 0, mx: 0, py: 0, pr: 0, borderRadius: 0,
                            lineHeight: 1,
                            ...(pathDirect === child.subm_href && {
                              color: (theme) => `${theme.palette.sidebar.activeText}!important`,
                              backgroundColor: (theme) => `${theme.palette.sidebar.active}!important`,
                            }),
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              mr: '4', ml: 1,
                              svg: { width: '14px', marginLeft: '3px' },
                              ...(pathDirect === child.subm_href && {
                                color: 'primary.main',
                              }),
                            }}
                          >
                            {/* <FeatherIcon icon={child.subm_icon_name} width="20" height="20" /> */}
                          </ListItemIcon>
                          <ListItemText primaryTypographyProps={{
                            ml: '5px',
                            ...(pathDirect === child.subm_href && {
                              fontWeight: 500,
                            }),
                          }}>{child.subm_display_label}</ListItemText>
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              </React.Fragment>
            );
            // {/********If Sub No Menu**********/}
          } else {
            return (
              <List component="li" disablePadding key={item.mod_code}>
                <ListItem
                  onClick={() => handleClick(index)}
                  button
                  component={NavLink}
                  to={item.mod_href}
                  selected={pathDirect === item.mod_href}
                  sx={{
                    mb: 0, mx: 0, py: 0, pr: 0, borderRadius: 0, position: 'relative',
                    ...(pathDirect === item.mod_href && {
                      color: (theme) => `${theme.palette.sidebar.activeText}!important`,
                      backgroundColor: (theme) => `${theme.palette.sidebar.active}!important`,
                      borderColor: (theme) => `${theme.palette.sidebar.activeText}!important`,
                    }),
                  }}
                >
                  <Box component='span' sx={{
                    ...(pathDirect === item.mod_href && {
                      height: '100%', left: 0, width: 5, bgcolor: (theme) => `${theme.palette.sidebar.activeText}!important`, position: 'absolute'
                    }),
                  }}></Box>
                  <ListItemIcon
                    sx={{
                      pr: 2,
                      ...(pathDirect === item.mod_href && { color: (theme) => `${theme.palette.sidebar.text}!important`, }),
                    }}
                  >
                    <FeatherIcon icon={item.mod_icon_name} width="20" height="20" />
                  </ListItemIcon>
                  <ListItemText onClick={onSidebarClose}>{item.mod_display_label}</ListItemText>
                </ListItem>
              </List>
            );
          }
        })}
      </List>
    </Box >
  );
  return (
    <MiniDrawer handleDrawerToggle={handleDrawerToggle} open={sideBarOpen} setOpen={setSidebarOpen} > {SidebarContent} </MiniDrawer>
  );
};

Sidebar.propTypes = {
  isMobileSidebarOpen: PropTypes.bool,
  onSidebarClose: PropTypes.func,
  isSidebarOpen: PropTypes.bool,
};

export default Sidebar;
