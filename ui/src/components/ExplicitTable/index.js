import React, { memo } from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`& table .${tableCellClasses.head}`]: {
        color: theme.palette.primary.main,
        fontSize: 16,
        fontWeight: 'bold',
        borderBottom: `3px double ${theme.palette.secondary.main}`,
        // whiteSpace: 'nowrap',
        // borderLeft: '1px solid #222',
        // borderRight: '1px solid #222',
    },
    [`& table .${tableCellClasses.body}`]: {
        // fontSize: 14,
        // whiteSpace: 'nowrap',
        // borderLeft: '1px solid #222',
        // borderRight: '1px solid #222',
        borderBottom: '1px solid #222',
    },
    '& table :nth-of-type(odd)': {
        borderLeft: 0,
    },
    '& table :last-child': {
        borderRight: 0,
    },

    [`&.${tableCellClasses.head}`]: {
        color: theme.palette.primary.main,
        fontSize: 16,
        fontWeight: 'bold',
        borderBottom: `3px double ${theme.palette.secondary.main}`,
        // whiteSpace: 'nowrap',
        // borderLeft: '1px solid #222',
        // borderRight: '1px solid #222',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        // whiteSpace: 'nowrap',
        // borderLeft: '1px solid #222',
        // borderRight: '1px solid #222',
        borderBottom: '1px solid #222',
    },
    '&:nth-of-type(odd)': {
        borderLeft: 0,
    },
    '&:last-child': {
        borderRight: 0,
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme, styledRows }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: styledRows ? theme.palette.action.hover : null,
    },
    '&:last-child td': {
        borderBottom: 0,
    },
    'td, th': {
        border: !styledRows ? 0 : null,
    },
}));

const ExplicitTable = ({
    tableSize,
    columns,
    showHeader,
    children
}) => {

    return (
        <Table sx={{ borderRadius: '5px', overflow: 'hidden' }} size={tableSize} stickyHeader>
            {showHeader && (
            <TableHead>
                <TableRow>
                    {columns.map((col, index) => (
                        <StyledTableCell key={index} align={col.align ? col.align : 'left'}>{col.name}</StyledTableCell>
                    ))}
                </TableRow>
            </TableHead>
            )}
            <TableBody>
                {children}
            </TableBody>
        </Table>
    );
}

ExplicitTable.prototype = {
    tableSize: PropTypes.string,
    showHeader: PropTypes.bool,
    columns: PropTypes.array
}

ExplicitTable.defaultProps = {
    tableSize: '',
    showHeader: true,
    columns: [],
}

export default ExplicitTable;