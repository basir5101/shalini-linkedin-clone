import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";

const CustomTextField = styled((props) => {
  const [secureText, setSecureText] = React.useState(
    props.type == 'password' ? true : false
  );
  //   useEffect(() => {
  //       setSecureText(props.type? true : false)
  //   },[props.type])
  const handleClickShowPassword = () => {
    setSecureText((prev) => !prev);
  };
  const EyeIcon = () => {
    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          edge="end"
        >
          {secureText ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    );
  };
  return (
    <TextField
      inputProps={{ style: { fontWeight: "bold" } }}
      sx={{ mb: 2 }}
      variant="outlined"
      fullWidth
      {...props}
      InputProps={
        props.type == 'password' ? {
          endAdornment: <EyeIcon />,
        } : {}
      }
      //: props.type === 'number' ? "number" : props.type === 'data' ? 'date' 
      type={secureText ? "password" : "text"}
    />
  );
})(({ theme }) => ({
  "& .MuiOutlinedInput-input::-webkit-input-placeholder": {
    color: "#767e89",
    opacity: "1",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: `${theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.12)" : "#dee3e9"
      }`,
  },
  "& .MuiOutlinedInput-input.Mui-disabled": {
    backgroundColor: `${theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.12) " : "#f8f9fb "
      }`,
  },
  "& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder": {
    color: "#767e89",
    opacity: "1",
  },
  '& :-webkit-autofill': {
    transitionDelay: "9999s"
  }
}));

export default CustomTextField;
