import { Box, TableCell, Tooltip, Typography } from '@mui/material'
import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

function CustomTableCell({ cells = [], editUserPath }) {

    const cellMinWidth = '130px';
    return (
        <>
            {
                cells.length > 0 && cells.map((cell, index) => (
                    <TableCell sx={cell.minWidth ? {
                        minWidth: cellMinWidth,
                        textDecoration: 'none',
                    } : {
                        textDecoration: 'none',
                    }} component={editUserPath ? Link : ""} to={editUserPath || '/'} key={index}>
                        {
                            cell.type === String ?
                                <Typography variant="h6" fontWeight="500">
                                    {cell.value}
                                </Typography>
                                : cell.type === Number ?
                                    <Typography variant="h6" fontWeight="500">
                                        {cell.value}
                                    </Typography>
                                    : cell.type === Array ?
                                        //cell.value.map((item, index) => (
                                        <Tooltip title={cell.value.join(", ")}>
                                            <Typography variant="h6" fontWeight="500" key={index}>
                                                {cell.value[0]}{cell.value.length > 1 && '...'}
                                            </Typography>
                                        </Tooltip>
                                        //))
                                        : cell.type === Date ?
                                            <Typography variant="h6" fontWeight="500">
                                                {/* {cell.value && moment(moment.utc(cell.value)?.toDate())?.local()?.format('YYYY-MM-DD HH:mm:ss')} */}
                                                {cell.value && moment(moment.utc(cell.value).toDate()).local().fromNow()}

                                            </Typography>
                                            : cell.type === 'status' ?
                                                <Box display="flex" alignItems="center">
                                                    <Box
                                                        sx={{
                                                            backgroundColor:
                                                                cell.value === 0
                                                                    ? 'gray' :
                                                                    cell.value === 1
                                                                        ? 'green' :
                                                                        cell.value === 2
                                                                            ? (theme) => theme.palette.error.main :
                                                                            cell.value === 9
                                                                                ? 'black' :
                                                                                cell.value === 10 ? 'Gray' :
                                                                                cell.value === 11 ? 'Yellow' : (theme) => theme.palette.error.main,
                                                            borderRadius: '100%',
                                                            height: '10px',
                                                            width: '10px',
                                                        }}
                                                    />
                                                    <Typography
                                                        color="textSecondary"
                                                        variant="h6" fontWeight="500"
                                                        sx={{
                                                            ml: 1,
                                                        }}
                                                    >
                                                        {cell.value === 0 ? 'New ' : cell.value === 1 ? 'Active' : cell.value === 2 ? 'Inactive' : cell.value === 9 ? 'Deleted' : cell.value === 10 ? 'Draft' : cell.value === 11 ? 'Test in Progress' :'Disabled'  }
                                                    </Typography>
                                                </Box>
                                                :
                                                <Typography variant="h6" fontWeight="500">
                                                </Typography>
                        }
                    </TableCell>
                ))
            }
        </>
    )
}

export default CustomTableCell