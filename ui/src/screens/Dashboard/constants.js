export const DASHBOARD_SLICE_NAME = 'dashboard';


export const BREADCRUMBS = [
    {
        name: "Dashboard",
        icon: "",
        path: `/vouchers`
    },
  
]



export const STUDENTS_LIST_REQUESTED = `${DASHBOARD_SLICE_NAME}/studentsRequested`
export const USERS_LIST_REQUESTED = `${DASHBOARD_SLICE_NAME}/usersListRequested`
export const QUERIES_LIST_REQUESTED = `${DASHBOARD_SLICE_NAME}/queriesListRequested`
export const EXPIRING_VOUCHERS_REQUESTED = `${DASHBOARD_SLICE_NAME}/expiringVouchersRequested`