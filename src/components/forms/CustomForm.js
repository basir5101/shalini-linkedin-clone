import { TabPanel } from '@mui/lab'
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Tooltip, IconButton, TextField } from '@mui/material'
import React from 'react'
import CustomTextField from './custom-elements/CustomTextField'
import FeatherIcon from 'feather-icons-react'
import CustomFormLabel from './custom-elements/CustomFormLabel'
import CustomSelect from './custom-elements/CustomSelect'

function CustomForm({ items }) {
    return (
        <Box sx={{ flexGrow: 1, }}>
            <Grid component={"span"} sx={{
                '& > .MuiGrid-item': {
                    paddingLeft: "40px",
                    paddingTop: "0px",
                },
            }} container spacing={5} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    items.map((data, index) => (
                        <Grid component={"span"} item xs={3} sm={5} md={4} key={index}>
                            <Box component={"span"} sx={{
                                position: 'relative',
                            }}>
                                {
                                    data.type === 'text' ? <CustomTextField label={data.label} />
                                        :
                                        data.type === 'select' ? <FormControl size='small' fullWidth>
                                            <InputLabel id="demo-simple-select-label"> {data.label} </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value=""
                                                label={data.label}
                                            // onChange={handleChange}
                                            >
                                                {
                                                    data.menuItems && data.menuItems.map((item, indexKey) => (
                                                        <MenuItem key={indexKey} value={item}>{item}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                            :
                                            <CustomTextField label={data.label} />
                                }
                                {
                                    data.help &&
                                    <Tooltip title="Add User" style={{ position: 'absolute', top: -5, right: -30 }}>
                                        <IconButton>
                                            <FeatherIcon icon="info" width="18" />
                                        </IconButton>
                                    </Tooltip>
                                }
                            </Box>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>

    )
}

export default CustomForm