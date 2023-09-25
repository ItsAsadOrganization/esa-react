

export const Permissions = [
    {
        page: "Dashboard",
        permissions: [
            { checked: false, label: "Show In Navigation", permission: "show-in-nav"},
        ]
    },
    {
        page: "Students",
        permissions: [
            { checked: false, label: "Show In Navigation", permission: "show-in-nav"},
            { checked: false, label: "Create", permission: "add-student"},
            { checked: false, label: "Read", permission: "view-student"},
            { checked: false, label: "Update", permission: "update-student"},
            { checked: false, label: "Delete", permission: "delete-student"},
            { checked: false, label: "Comment on Query", permission: "query-comment"},
            { checked: false, label: "Close Query", permission: "query-close"},
            { checked: false, label: "View Query Logs", permission: "query-read"},
            { checked: false, label: "Can Mature", permission: "mature-student"},
        ]
    },
    {
        page: "Tutors",
        permissions: [
            { checked: false, label: "Show In Navigation", permission: "show-in-nav"},
            { checked: false, label: "Create", permission: "add-tutor"},
            { checked: false, label: "Read", permission: "view-tutor"},
            { checked: false, label: "Update", permission: "update-tutor"},
            { checked: false, label: "Delete", permission: "delete-tutor"},
            { checked: false, label: "Salary Setting", permission: "salary-setting"},
        ]
    },
    {
        page: "Vouchers",
        permissions: [
            { checked: false, label: "Show In Navigation", permission: "show-in-nav"},
            { checked: false, label: "Create", permission: "add-vouchers"},
            { checked: false, label: "Read", permission: "view-vouchers"},
            { checked: false, label: "Update", permission: "update-vouchers"},
            { checked: false, label: "Delete", permission: "delete-vouchers"},
            { checked: false, label: "Salary Setting", permission: "salary-setting"},
            { checked: false, label: "View Single Voucher", permission: "view-voucher"},
            { checked: false, label: "Print", permission: "print-voucher"},
        ]
    },
    {
        page: "Class",
        permissions: [
            { checked: false, label: "Show In Navigation", permission: "show-in-nav"},
            { checked: false, label: "Create", permission: "add-voucher"},
            { checked: false, label: "Read", permission: "view-voucher"},
            { checked: false, label: "Update", permission: "update-voucher"},
            { checked: false, label: "Delete", permission: "delete-voucher"},
        ]
    },
    {
        page: "Designations",
        permissions: [
            { checked: false, label: "Show In Navigation", permission: "show-in-nav"},
            { checked: false, label: "Create", permission: "add-designation"},
            { checked: false, label: "Read", permission: "view-designation"},
            { checked: false, label: "Update", permission: "update-designation"},
            { checked: false, label: "Delete", permission: "delete-designation"},
        ]
    },
    {
        page: "PaySlips",
        permissions: [
            { checked: false, label: "Show In Navigation", permission: "show-in-nav"},
            { checked: false, label: "Read", permission: "view-payslip"},
            { checked: false, label: "Update", permission: "update-payslip"},
            { checked: false, label: "Delete", permission: "delete-payslip"},
        ]
    },
    {
        page: "Roles",
        permissions: [
            { checked: false, label: "Show In Navigation", permission: "show-in-nav"},
            { checked: false, label: "Create", permission: "add-roles"},
            { checked: false, label: "Read", permission: "view-roles"},
            { checked: false, label: "Update", permission: "update-roles"},
            { checked: false, label: "Delete", permission: "delete-roles"},
        ]
    },
    {
        page: "Users",
        permissions: [
            { checked: false, label: "Show In Navigation", permission: "show-in-nav"},
            { checked: false, label: "Create", permission: "add-roles"},
            { checked: false, label: "Read", permission: "view-roles"},
            { checked: false, label: "Update", permission: "update-roles"},
            { checked: false, label: "Delete", permission: "delete-roles"},
        ]
    }
]

export const SETUP_ROLES_SLICE_NAME = 'setupRolesSlice'