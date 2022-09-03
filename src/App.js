import React, { useEffect } from 'react';
import "./App.css";
import { useRoutes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import ThemeSettings from './layouts/full-layout/customizer/ThemeSettings';
import Router from './routes/Router';
import { configLoad } from './redux/configuration/Action';
import { useSelector, useDispatch } from 'react-redux';
import Config from './utils/Config';
import axios from 'axios';

import 'react-perfect-scrollbar/dist/css/styles.css';

const App = () => {

  const dispatch = useDispatch();
  const ui_config = useSelector((state) => state.ConfigReducer);

  useEffect(() => {
    // fetching configurations
    if (!ui_config.configLoaded) {
      axios.get(Config.getUrl('config')).then(res => {
        if (res.status === 200) {
          let newData = {};
          res.data.data.map((item) => {
            newData[item.key] = item.value
          })
          dispatch(configLoad(newData));
        }

      }).catch((err) => {
        console.log(err, 'unable to load config');
      })
    }
  }, [])


  useEffect(() => {
    // updating favicon dynamically
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = ui_config.configData.logo?.replace('logo', 'favicon');
  }, [ui_config.configLoaded])




  const routing = useRoutes(Router);
  const theme = ThemeSettings();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {routing}
    </ThemeProvider>
  );
};

export default App;
