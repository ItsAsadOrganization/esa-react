

export const Permissions = [
    {
        page: "Dashboard",
        permissions: [
            { checked: false, label: "Show In Navigation", permission: "show-in-nav" },
        ]
    },
    {
        page: "Students",
        permissions: [
            { checked: false, label: "Show In Navigation", permission: "show-in-nav" },
            { checked: false, label: "Create", permission: "add-student" },
            { checked: false, label: "Read", permission: "view-student" },
            { checked: false, label: "Update", permission: "update-student" },
            { checked: false, label: "Delete", permission: "delete-student" },
        ]
    },
    {
        page: "Tutors",
        permissions: [
            { checked: false, label: "Show In Navigation", permission: "show-in-nav" },
            { checked: false, label: "Create", permission: "add-tutor" },
            { checked: false, label: "Read", permission: "view-tutor" },
            { checked: false, label: "Update", permission: "update-tutor" },
            { checked: false, label: "Delete", permission: "delete-tutor" },
            { checked: false, label: "Salary Setting", permission: "salary-setting" },
        ]
    },
    {
        page: "Vouchers",
        permissions: [
            { checked: false, label: "Show In Navigation", permission: "show-in-nav" },
            { checked: false, label: "Create", permission: "add-vouchers" },
            { checked: false, label: "Read", permission: "view-vouchers" },
            { checked: false, label: "Update", permission: "update-vouchers" },
            { checked: false, label: "Delete", permission: "delete-vouchers" },
            { checked: false, label: "Salary Setting", permission: "salary-setting" },
            { checked: false, label: "View Single Voucher", permission: "view-voucher" },
            { checked: false, label: "Print", permission: "print-voucher" },
        ]
    },
    {
        page: "Class",
        permissions: [
            { checked: false, label: "Show In Navigation", permission: "show-in-nav" },
            { checked: false, label: "Create", permission: "add-class" },
            { checked: false, label: "Read", permission: "view-class" },
            { checked: false, label: "Update", permission: "update-class" },
            { checked: false, label: "Delete", permission: "delete-class" },
        ]
    },
    {
        page: "Designations",
        permissions: [
            { checked: false, label: "Show In Navigation", permission: "show-in-nav" },
            { checked: false, label: "Create", permission: "add-designation" },
            { checked: false, label: "Read", permission: "view-designation" },
            { checked: false, label: "Update", permission: "update-designation" },
            { checked: false, label: "Delete", permission: "delete-designation" },
        ]
    },
    {
        page: "PaySlips",
        permissions: [
            { checked: false, label: "Show In Navigation", permission: "show-in-nav" },
            { checked: false, label: "Read", permission: "view-payslip" },
            { checked: false, label: "Update", permission: "update-payslip" },
            { checked: false, label: "Delete", permission: "delete-payslip" },
        ]
    },
    {
        page: "Roles",
        permissions: [
            { checked: false, label: "Show In Navigation", permission: "show-in-nav" },
            { checked: false, label: "Create", permission: "add-roles" },
            { checked: false, label: "Read", permission: "view-roles" },
            { checked: false, label: "Update", permission: "update-roles" },
            { checked: false, label: "Delete", permission: "delete-roles" },
        ]
    },
    {
        page: "Users",
        permissions: [
            { checked: false, label: "Show In Navigation", permission: "show-in-nav" },
            { checked: false, label: "Create", permission: "add-roles" },
            { checked: false, label: "Read", permission: "view-roles" },
            { checked: false, label: "Update", permission: "update-roles" },
            { checked: false, label: "Delete", permission: "delete-roles" },
        ]
    },
    {
        page: "Queries",
        permissions: [
            { checked: false, label: "Show In Navigation", permission: "show-in-nav" },
            { checked: false, label: "Create", permission: "add-queries" },
            { checked: false, label: "Read", permission: "view-queries" },
            { checked: false, label: "Update", permission: "update-queries" },
            { checked: false, label: "Delete", permission: "delete-queries" },
            { checked: false, label: "View Others Queries", permission: "all" },
        ]
    }
]

export const SETUP_ROLES_SLICE_NAME = 'setupRolesSlice'