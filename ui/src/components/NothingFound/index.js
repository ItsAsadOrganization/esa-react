import { Box, Button, Typography } from "@mui/material"
import PropTypes from 'prop-types';


const NothingFound = ({ pageIcon, pageTitle, action }) => {
    return (
        <Box sx={{
            borderRadius: 4,
            border: theme => `1px solid ${theme.palette.primary.main}`,
            minHeight: 250,
            minWidth: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            p: 3,
            boxSizing: "border-box"
        }}>
            <Box sx={{
                background: "#eee",
                width: 90,
                height: 90,
                p: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
            }}>
                <Box sx={{
                    background: "#ccc",
                    width: 60,
                    height: 60,
                    p: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                }}>
                    <pageIcon.icon sx={{
                        width: 48,
                        height: 48,
                        color: "#555"
                    }} />
                </Box>
            </Box>
            <Typography sx={{
                fontFamily: theme => theme.typography.fontFamily,
                color: theme => theme.palette.customFontColor.main,
                fontWeight: 500,
                letterSpacing: "1px",
                fontSize: 14,
                textAlign: "center"
            }}>Nothing here yet.<br />Start adding {pageTitle.toLowerCase()} here</Typography>
            <Button variant="outlined" size="small" sx={{
                px: 4
            }} onClick={action} >
                Add New {pageTitle}
            </Button>
        </Box>
    )
}

NothingFound.prototype = {
    pageTitle: PropTypes.string,
    action: PropTypes.func,
    pageIcon: PropTypes.object
}

NothingFound.defaultProps = {
    pageTitle: '',
    action: () => { },
    pageIcon: {}

}

export default NothingFound