import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";



const FormTextField = styled((props) => {
    return (
        <TextField
            inputProps={{
                style: { fontWeight: 600 },
                inputMode: 'numeric',
            }}
            sx={{ mb: 2 }}
            size="small"
            variant="outlined"
            fullWidth
            {...props}
        />
    );
})(({ theme }) => ({
    "& .MuiOutlinedInput-input::-webkit-input-placeholder": {
        color: "#767e89",
        opacity: "1",
    },
    "& .MuiFormLabel-asterisk.MuiInputLabel-asterisk":
    {
        color: 'red',
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: `${theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.12)" : "#dee3e9"
            }`,
    },
    // "& .MuiOutlinedInput-input.Mui-disabled": {
    //     backgroundColor: `${theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.12) " : "#f8f9fb "
    //         }`,
    // },
    "& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder": {
        color: "#767e89",
        opacity: "1",
    },
    '& :-webkit-autofill': {
        transitionDelay: "9999s"
    },
    '& input[type=number]': {
        '-moz-appearance': 'textfield'
    },
    '& input[type=number]::-webkit-outer-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0
    },
    '& input[type=number]::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0
    }
}));

export default FormTextField;
