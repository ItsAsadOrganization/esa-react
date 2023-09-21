import React from "react"
import { getRolesApi } from "../../api"


const Roles = () => {
    const loadRoles = async() => {
        await getRolesApi()
    }
    React.useEffect(() => {
        loadRoles()
    }, [])
    return(
        <>Roles</>
    )
}

export default Roles