import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { checkUserSession, userSignOut } from '../redux/userInfo/Action';
import axios from 'axios';
import Config from "../utils/Config";


export const ProtectedRoute = (props) => {

  // const [validate, setValidate] = React.useState(true);

  const navigate = useNavigate();

  const user = useSelector((state) => state.UserInfoReducer);
  const dispatch = useDispatch();



  // // fetching configuration
  // useEffect(() => {
  //   if (!configuration.configLoaded) {
  //     axios.get(Config.getUrl('config')).then(res => {
  //       if (res.status === 200) {
  //         let newData = {};
  //         res.data.data.map((item) => {
  //           newData[item.key] = item.value
  //         })
  //         dispatch(configLoad(newData));
  //       }

  //     }).catch((err) => {
  //       console.log(err, 'unable to load config');
  //     })
  //   }

  // }, [])


  // useEffect(() => {
  //   if (!validate) navigate('/login');
  // }, [validate])


  if (!user.Islogin) {
    let access_token = localStorage.getItem("access_token");

    if (access_token) {
      axios.get(Config.getUrl('sessionMe'), {
        headers: Config.header
      }).then(res => {
        if (res.status === 200) {
          console.log("restored from session");
          dispatch(checkUserSession(res.data));
        }

      }).catch((err) => {
        navigate('/login')
        console.log(err, 'unable to restore from token, moving to login');
        // setValidate(false);
      })

    }
    else {
      console.log("token not found, moving to login");
      return <Navigate to="/login" />;
    }

  }
  return <>{props.children}</>;
};
