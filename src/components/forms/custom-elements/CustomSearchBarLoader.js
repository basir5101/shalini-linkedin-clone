import React from "react";
import { FormControl, IconButton, Input, InputAdornment ,CircularProgress} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import { Box } from "@mui/system";

export default function CustomSearchBarLoader({
  searchedValue,
  handleSearch,
  handleClick,
  searching,
}) {
  console.log(searching);
  return (
    <Box
      sx={{
        mb: 2,
        mt: 1,
      }}
    >
      <FormControl variant="standard">
        <Input
          placeholder="Search here"
          // size='small'
          style={{ height: "25px", width: "20vw" }}
          id="standard-adornment-password"
          type={"text"}
          value={searchedValue || ""}
          onChange={handleSearch}
          endAdornment={
            <InputAdornment position="end">
              {searching && searchedValue !== "" &&(
                <Box>
                  <CircularProgress size={16} />
                </Box>
              )}
              {!searching && searchedValue !== "" && (
                <IconButton onClick={handleClick}>
                  <FeatherIcon icon="x" width="16" />
                </IconButton>
              )}
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
}
