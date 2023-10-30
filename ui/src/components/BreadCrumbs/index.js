import { Box, Breadcrumbs, Container, Typography } from "@mui/material"
import React, { Fragment } from "react"
import { useLocation, useNavigate } from "react-router"
import { Link } from "react-router-dom"
import PropTypes from 'prop-types'
import { useTheme } from "@emotion/react"
import Icons from "../../common/icons"

const AppBreadCrumbs = ({ pageTitle, paths, counts }) => {
    const theme = useTheme()
    const [crumbs, setCrumbs] = React.useState([
        {
            name: "Dashboard",
            icon: Icons.Home,
            path: "/dashboard"
        },
    ])
    React.useEffect(() => {

        setCrumbs(curr => [...curr, ...paths])

        return () => setCrumbs([
            {
                name: "Dashboard",
                icon: Icons.Home,
                path: "/dashboard"
            },
        ])
    }, [paths])
    return (
        <Box sx={{
            bgcolor: theme => theme.palette.background.paper,
            padding: 2,
            boxShadow: theme => theme.shadows[4],
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        }}>
            <Typography sx={{
                fontFamily: theme => theme.typography.fontFamily,
                color: theme => theme.typography.headingColor,
                fontWeight: 700,
                fontSize: 24
            }}>{pageTitle} {counts && <span style={{ fontSize: 12 }}>{counts} Records Found</span>}</Typography>
            <Breadcrumbs sx={{
                display: "flex",
                alignItems: "center"
            }}>
                {crumbs && crumbs.map((c, i) => (
                    i !== crumbs.length - 1 ? (
                        <Box key={c.name}>
                            <Link style={{
                                display: "flex",
                                fontSize: 14,
                                fontWeight: 600
                            }} to={c.path}  >
                                {i === 0 ? <c.icon sx={{
                                    width: 18,
                                    height: 18,
                                    color: theme.palette.customFontColor.main,
                                }} /> : c.name}
                            </Link>
                        </Box>
                    ) : <Typography key={c.name} sx={{
                        fontSize: 14,
                        fontWeight: 600,
                        fontFamily: theme => theme.typography.fontFamily,
                    }}>
                        {c.name.replaceAll("-", " ").split(" ").map(e => e.charAt(0).toUpperCase() + e.slice(1)).join(" ")}
                    </Typography>
                ))}
            </Breadcrumbs>
        </Box>
    )
}

AppBreadCrumbs.propType = {
    pageTitle: PropTypes.string,
    paths: PropTypes.array
}

AppBreadCrumbs.defaultProps = {
    pageTitle: "",
    paths: []
}
export default AppBreadCrumbs