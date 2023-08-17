import React from 'react'
import MuiDialog from '@mui/material/Dialog'
import MuiDialogTitle from '@mui/material/DialogTitle'
import MuiDialogContent from '@mui/material/DialogContent'
import MuiDialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography'
import { Button, styled, useTheme, Slide } from '@mui/material';
import PropTypes from 'prop-types'
import Icons from '../../common/icons';

const StyledDialog = styled(MuiDialog)(({ theme }) => ({
}))
const StyledDialogTitle = styled(MuiDialogTitle)(({ theme }) => ({
    // backgroundColor: theme.palette.background.paper,
}))
const StyledDialogContent = styled(MuiDialogContent)(({ theme }) => ({
    // backgroundColor: theme.palette.background.paper
}))
const StyledDialogActions = styled(MuiDialogActions)(({ theme }) => ({
    // backgroundColor: theme.palette.background.paper
}))

const Dialog = ({ dailogOpen, title, size, fullWidth, hasCloseIcon, children, actionsButtonArray, scroll, clickAwayListener, handleClose }) => {
    const theme = useTheme();

    return (
        <StyledDialog TransitionComponent={Slide} keepMounted scroll={scroll} open={dailogOpen} fullWidth={fullWidth} maxWidth={size} aria-labelledby="dialog-title" onClose={clickAwayListener ? () => handleClose() : () => { }} >
            <StyledDialogTitle sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: theme.palette.background.default
            }}>
                <Typography
                    sx={{
                        fontSize: '20px',
                        position: 'relative',
                        float: 'left',
                        fontWeight: 'bold',
                        color: theme.palette.primary.main,
                    }}
                >{title}</Typography>
                {hasCloseIcon ? <IconButton sx={{ '&:hover': { transform: 'rotate(90deg)' }, transitionProperty: 'transform', transitionDuration: '.1s' }} disableRipple color='primary' onClick={handleClose}>
                    <Icons.Close />
                </IconButton> : null}
            </StyledDialogTitle>
            <StyledDialogContent sx={{ background: theme.palette.background.default }}>
                <Box sx={{ width: '100%', mt: 1 }}>
                    {children}
                </Box>
            </StyledDialogContent>
            {actionsButtonArray && actionsButtonArray.length > 0 ?
                <StyledDialogActions sx={{ background: theme.palette.background.default }}>
                    {actionsButtonArray.map((button) => (
                        <Button
                            disabled={button.disabled}
                            key={button.label}
                            color={button.color}
                            variant={button.variant}
                            onClick={button.action}
                            className={button.className}
                            id={button.id}
                            sx={{ ...button.sx }}
                            size={button.size}
                            type={button.type}
                        >
                            {button.label}
                        </Button>
                    ))}
                </StyledDialogActions>
                : null}
        </StyledDialog>
    )
}

Dialog.propTypes = {
    dailogOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    size: PropTypes.string,
    fullWidth: PropTypes.bool,
    hasCloseIcon: PropTypes.bool,
    children: PropTypes.node,
    actionsButtonArray: PropTypes.array,
    scroll: PropTypes.string,
    clickAwayListener: PropTypes.bool,
    handleClose: PropTypes.func,
}

Dialog.defaultProps = {
    dailogOpen: false,
    title: "DEFAULT TITLE",
    size: "lg",
    fullWidth: true,
    hasCloseIcon: false,
    children: <></>,
    actionsButtonArray: [],
    scroll: "paper",
    clickAwayListener: true,
    handleClose: () => { },
}

export default Dialog