const GROUPS = [
    {
        name: "System Admins",
    },
    {
        name: "Administrator",
    },
    {
        name: "Tutors",
    },
    {
        name: "Students",
    },
    {
        name: "Coordinators",
    }
]

const CLASSES_MIGRATIONS = [
    { name: "9th" },
    { name: "10th" },
    { name: "11th" },
    { name: "12th" },
    { name: "IELTS" },
    { name: "IDP" },
    { name: "Computer Courses" },
]


const USERS_MIGRATIONS = [
    {
        name: "admin",
        email: "admin@admin.com",
        password: "P@ssw0rd123*",
        roleId: 1
    },
    {
        name: "superadmin",
        email: "superadmin@egc.edu.pk",
        password: "SuperAdmin@123,.",
        roleId: 1
    }
]


const LEAVES_MIGRATIONS = [
    {
        name: "leaves",
        config: JSON.stringify([
            { name: "casual", days: 10, gender: ['male', 'female'] },
            { name: "sick", days: 14, gender: ['male', 'female'] },
            { name: "maternity", days: 90, gender: ['female'] },
            { name: "paternity", days: 10, gender: ['male'] },
            { name: "hajj", days: 40, gender: ['male', 'female'] },
            { name: "marital", days: 10, gender: ['male', 'female'] },
        ])
    },
    {
        name: "email",
        config: "admin@admin.com"
    },
]

const PERMISSIONS_MIGRATIONS = [
    {
        name: 'superadmin',
        permissions: [
            {
                page: "Dashboard",
                permissions: [
                    { checked: true, label: "Create", permission: "add-student" },
                ]
            },
            {
                page: "Students",
                permissions: [
                    { checked: true, label: "Show In Navigation", permission: "show-in-nav" },
                    { checked: true, label: "Create", permission: "add-student" },
                    { checked: true, label: "Read", permission: "view-student" },
                    { checked: true, label: "Update", permission: "update-student" },
                    { checked: true, label: "Delete", permission: "delete-student" },
                    { checked: true, label: "Comment on Query", permission: "query-comment" },
                    { checked: true, label: "Close Query", permission: "query-close" },
                    { checked: true, label: "View Query Logs", permission: "query-read" },
                    { checked: true, label: "Can Mature", permission: "mature-student" },
                ]
            },
            {
                page: "Tutors",
                permissions: [
                    { checked: true, label: "Show In Navigation", permission: "show-in-nav" },
                    { checked: true, label: "Create", permission: "add-tutor" },
                    { checked: true, label: "Read", permission: "view-tutor" },
                    { checked: true, label: "Update", permission: "update-tutor" },
                    { checked: true, label: "Delete", permission: "delete-tutor" },
                    { checked: true, label: "Salary Setting", permission: "salary-setting" },
                ]
            },
            {
                page: "Vouchers",
                permissions: [
                    { checked: true, label: "Show In Navigation", permission: "show-in-nav" },
                    { checked: true, label: "Create", permission: "add-vouchers" },
                    { checked: true, label: "Read", permission: "view-vouchers" },
                    { checked: true, label: "Update", permission: "update-vouchers" },
                    { checked: true, label: "Delete", permission: "delete-vouchers" },
                    { checked: true, label: "Salary Setting", permission: "salary-setting" },
                    { checked: true, label: "View Single Voucher", permission: "view-voucher" },
                    { checked: true, label: "Print", permission: "print-voucher" },
                ]
            },
            {
                page: "Class",
                permissions: [
                    { checked: true, label: "Show In Navigation", permission: "show-in-nav" },
                    { checked: true, label: "Create", permission: "add-voucher" },
                    { checked: true, label: "Read", permission: "view-voucher" },
                    { checked: true, label: "Update", permission: "update-voucher" },
                    { checked: true, label: "Delete", permission: "delete-voucher" },
                ]
            },
            {
                page: "Designation",
                permissions: [
                    { checked: true, label: "Show In Navigation", permission: "show-in-nav" },
                    { checked: true, label: "Create", permission: "add-designation" },
                    { checked: true, label: "Read", permission: "view-designation" },
                    { checked: true, label: "Update", permission: "update-designation" },
                    { checked: true, label: "Delete", permission: "delete-designation" },
                ]
            },
            {
                page: "PaySlips",
                permissions: [
                    { checked: true, label: "Show In Navigation", permission: "show-in-nav" },
                    { checked: true, label: "Read", permission: "view-payslip" },
                    { checked: true, label: "Update", permission: "update-payslip" },
                    { checked: true, label: "Delete", permission: "delete-payslip" },
                ]
            }
        ]
    },
    {
        name: 'admin',
        permissions: [
            {
                page: "Dashboard",
                permissions: [
                    { checked: true, label: "Create", permission: "add-student" },
                ]
            },
            {
                page: "Students",
                permissions: [
                    { checked: true, label: "Show In Navigation", permission: "show-in-nav" },
                    { checked: true, label: "Create", permission: "add-student" },
                    { checked: true, label: "Read", permission: "view-student" },
                    { checked: true, label: "Update", permission: "update-student" },
                    { checked: false, label: "Delete", permission: "delete-student" },
                    { checked: true, label: "Comment on Query", permission: "query-comment" },
                    { checked: false, label: "Close Query", permission: "query-close" },
                    { checked: true, label: "View Query Logs", permission: "query-read" },
                    { checked: false, label: "Can Mature", permission: "mature-student" },
                ]
            },
            {
                page: "Tutors",
                permissions: [
                    { checked: true, label: "Show In Navigation", permission: "show-in-nav" },
                    { checked: true, label: "Create", permission: "add-tutor" },
                    { checked: true, label: "Read", permission: "view-tutor" },
                    { checked: true, label: "Update", permission: "update-tutor" },
                    { checked: false, label: "Delete", permission: "delete-tutor" },
                    { checked: true, label: "Salary Setting", permission: "salary-setting" },
                ]
            },
            {
                page: "Vouchers",
                permissions: [
                    { checked: true, label: "Show In Navigation", permission: "show-in-nav" },
                    { checked: true, label: "Create", permission: "add-vouchers" },
                    { checked: true, label: "Read", permission: "view-vouchers" },
                    { checked: true, label: "Update", permission: "update-vouchers" },
                    { checked: false, label: "Delete", permission: "delete-vouchers" },
                    { checked: false, label: "Salary Setting", permission: "salary-setting" },
                    { checked: true, label: "View Single Voucher", permission: "view-voucher" },
                    { checked: true, label: "Print", permission: "print-voucher" },
                ]
            },
            {
                page: "Class",
                permissions: [
                    { checked: true, label: "Show In Navigation", permission: "show-in-nav" },
                    { checked: true, label: "Create", permission: "add-voucher" },
                    { checked: true, label: "Read", permission: "view-voucher" },
                    { checked: false, label: "Update", permission: "update-voucher" },
                    { checked: false, label: "Delete", permission: "delete-voucher" },
                ]
            },
            {
                page: "Designation",
                permissions: [
                    { checked: true, label: "Show In Navigation", permission: "show-in-nav" },
                    { checked: false, label: "Create", permission: "add-designation" },
                    { checked: true, label: "Read", permission: "view-designation" },
                    { checked: false, label: "Update", permission: "update-designation" },
                    { checked: false, label: "Delete", permission: "delete-designation" },
                ]
            },
            {
                page: "PaySlips",
                permissions: [
                    { checked: true, label: "Show In Navigation", permission: "show-in-nav" },
                    { checked: true, label: "Read", permission: "view-payslip" },
                    { checked: false, label: "Update", permission: "update-payslip" },
                    { checked: false, label: "Delete", permission: "delete-payslip" },
                ]
            }
        ]
    }
]


module.exports = {
    GROUPS, CLASSES_MIGRATIONS, USERS_MIGRATIONS, LEAVES_MIGRATIONS, PERMISSIONS_MIGRATIONS
}