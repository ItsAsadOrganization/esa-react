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
                "page": "Dashboard",
                "permissions": [
                    {
                        "label": "Show In Navigation",
                        "checked": true,
                        "permission": "show-in-nav"
                    }
                ]
            },
            {
                "page": "Students",
                "permissions": [
                    {
                        "label": "Show In Navigation",
                        "checked": true,
                        "permission": "show-in-nav"
                    },
                    {
                        "label": "Create",
                        "checked": true,
                        "permission": "add-student"
                    },
                    {
                        "label": "Read",
                        "checked": true,
                        "permission": "view-student"
                    },
                    {
                        "label": "Update",
                        "checked": true,
                        "permission": "update-student"
                    },
                    {
                        "label": "Delete",
                        "checked": true,
                        "permission": "delete-student"
                    },
                    {
                        "label": "Comment on Query",
                        "checked": true,
                        "permission": "query-comment"
                    },
                    {
                        "label": "Close Query",
                        "checked": true,
                        "permission": "query-close"
                    },
                    {
                        "label": "View Query Logs",
                        "checked": true,
                        "permission": "query-read"
                    },
                    {
                        "label": "Can Mature",
                        "checked": true,
                        "permission": "mature-student"
                    }
                ]
            },
            {
                "page": "Tutors",
                "permissions": [
                    {
                        "label": "Show In Navigation",
                        "checked": true,
                        "permission": "show-in-nav"
                    },
                    {
                        "label": "Create",
                        "checked": true,
                        "permission": "add-tutor"
                    },
                    {
                        "label": "Read",
                        "checked": true,
                        "permission": "view-tutor"
                    },
                    {
                        "label": "Update",
                        "checked": true,
                        "permission": "update-tutor"
                    },
                    {
                        "label": "Delete",
                        "checked": true,
                        "permission": "delete-tutor"
                    },
                    {
                        "label": "Salary Setting",
                        "checked": true,
                        "permission": "salary-setting"
                    }
                ]
            },
            {
                "page": "Vouchers",
                "permissions": [
                    {
                        "label": "Show In Navigation",
                        "checked": true,
                        "permission": "show-in-nav"
                    },
                    {
                        "label": "Create",
                        "checked": true,
                        "permission": "add-vouchers"
                    },
                    {
                        "label": "Read",
                        "checked": true,
                        "permission": "view-vouchers"
                    },
                    {
                        "label": "Update",
                        "checked": true,
                        "permission": "update-vouchers"
                    },
                    {
                        "label": "Delete",
                        "checked": true,
                        "permission": "delete-vouchers"
                    },
                    {
                        "label": "Salary Setting",
                        "checked": true,
                        "permission": "salary-setting"
                    },
                    {
                        "label": "View Single Voucher",
                        "checked": true,
                        "permission": "view-voucher"
                    },
                    {
                        "label": "Print",
                        "checked": true,
                        "permission": "print-voucher"
                    }
                ]
            },
            {
                "page": "Class",
                "permissions": [
                    {
                        "label": "Show In Navigation",
                        "checked": true,
                        "permission": "show-in-nav"
                    },
                    {
                        "label": "Create",
                        "checked": true,
                        "permission": "add-voucher"
                    },
                    {
                        "label": "Read",
                        "checked": true,
                        "permission": "view-voucher"
                    },
                    {
                        "label": "Update",
                        "checked": true,
                        "permission": "update-voucher"
                    },
                    {
                        "label": "Delete",
                        "checked": true,
                        "permission": "delete-voucher"
                    }
                ]
            },
            {
                "page": "Designation",
                "permissions": [
                    {
                        "label": "Show In Navigation",
                        "checked": true,
                        "permission": "show-in-nav"
                    },
                    {
                        "label": "Create",
                        "checked": true,
                        "permission": "add-designation"
                    },
                    {
                        "label": "Read",
                        "checked": true,
                        "permission": "view-designation"
                    },
                    {
                        "label": "Update",
                        "checked": true,
                        "permission": "update-designation"
                    },
                    {
                        "label": "Delete",
                        "checked": true,
                        "permission": "delete-designation"
                    }
                ]
            },
            {
                "page": "PaySlips",
                "permissions": [
                    {
                        "label": "Show In Navigation",
                        "checked": true,
                        "permission": "show-in-nav"
                    },
                    {
                        "label": "Read",
                        "checked": true,
                        "permission": "view-payslip"
                    },
                    {
                        "label": "Update",
                        "checked": true,
                        "permission": "update-payslip"
                    },
                    {
                        "label": "Delete",
                        "checked": true,
                        "permission": "delete-payslip"
                    }
                ]
            },
            {
                "page": "PaySlips",
                "permissions": [
                    {
                        "label": "Show In Navigation",
                        "checked": true,
                        "permission": "show-in-nav"
                    },
                    {
                        "label": "Read",
                        "checked": true,
                        "permission": "view-payslip"
                    },
                    {
                        "label": "Update",
                        "checked": true,
                        "permission": "update-payslip"
                    },
                    {
                        "label": "Delete",
                        "checked": true,
                        "permission": "delete-payslip"
                    }
                ]
            }
        ]
    },
    {
        name: 'admin',
        permissions: [
            {
                "page": "Dashboard",
                "permissions": [
                    {
                        "label": "Show In Navigation",
                        "checked": true,
                        "permission": "show-in-nav"
                    }
                ]
            },
            {
                "page": "Students",
                "permissions": [
                    {
                        "label": "Show In Navigation",
                        "checked": true,
                        "permission": "show-in-nav"
                    },
                    {
                        "label": "Create",
                        "checked": true,
                        "permission": "add-student"
                    },
                    {
                        "label": "Read",
                        "checked": true,
                        "permission": "view-student"
                    },
                    {
                        "label": "Update",
                        "checked": true,
                        "permission": "update-student"
                    },
                    {
                        "label": "Delete",
                        "checked": true,
                        "permission": "delete-student"
                    },
                    {
                        "label": "Comment on Query",
                        "checked": true,
                        "permission": "query-comment"
                    },
                    {
                        "label": "Close Query",
                        "checked": true,
                        "permission": "query-close"
                    },
                    {
                        "label": "View Query Logs",
                        "checked": true,
                        "permission": "query-read"
                    },
                    {
                        "label": "Can Mature",
                        "checked": true,
                        "permission": "mature-student"
                    }
                ]
            },
            {
                "page": "Tutors",
                "permissions": [
                    {
                        "label": "Show In Navigation",
                        "checked": true,
                        "permission": "show-in-nav"
                    },
                    {
                        "label": "Create",
                        "checked": true,
                        "permission": "add-tutor"
                    },
                    {
                        "label": "Read",
                        "checked": true,
                        "permission": "view-tutor"
                    },
                    {
                        "label": "Update",
                        "checked": true,
                        "permission": "update-tutor"
                    },
                    {
                        "label": "Delete",
                        "checked": true,
                        "permission": "delete-tutor"
                    },
                    {
                        "label": "Salary Setting",
                        "checked": true,
                        "permission": "salary-setting"
                    }
                ]
            },
            {
                "page": "Vouchers",
                "permissions": [
                    {
                        "label": "Show In Navigation",
                        "checked": true,
                        "permission": "show-in-nav"
                    },
                    {
                        "label": "Create",
                        "checked": true,
                        "permission": "add-vouchers"
                    },
                    {
                        "label": "Read",
                        "checked": true,
                        "permission": "view-vouchers"
                    },
                    {
                        "label": "Update",
                        "checked": true,
                        "permission": "update-vouchers"
                    },
                    {
                        "label": "Delete",
                        "checked": true,
                        "permission": "delete-vouchers"
                    },
                    {
                        "label": "Salary Setting",
                        "checked": true,
                        "permission": "salary-setting"
                    },
                    {
                        "label": "View Single Voucher",
                        "checked": true,
                        "permission": "view-voucher"
                    },
                    {
                        "label": "Print",
                        "checked": true,
                        "permission": "print-voucher"
                    }
                ]
            },
            {
                "page": "Class",
                "permissions": [
                    {
                        "label": "Show In Navigation",
                        "checked": true,
                        "permission": "show-in-nav"
                    },
                    {
                        "label": "Create",
                        "checked": true,
                        "permission": "add-voucher"
                    },
                    {
                        "label": "Read",
                        "checked": true,
                        "permission": "view-voucher"
                    },
                    {
                        "label": "Update",
                        "checked": true,
                        "permission": "update-voucher"
                    },
                    {
                        "label": "Delete",
                        "checked": true,
                        "permission": "delete-voucher"
                    }
                ]
            },
            {
                "page": "Designation",
                "permissions": [
                    {
                        "label": "Show In Navigation",
                        "checked": true,
                        "permission": "show-in-nav"
                    },
                    {
                        "label": "Create",
                        "checked": true,
                        "permission": "add-designation"
                    },
                    {
                        "label": "Read",
                        "checked": true,
                        "permission": "view-designation"
                    },
                    {
                        "label": "Update",
                        "checked": true,
                        "permission": "update-designation"
                    },
                    {
                        "label": "Delete",
                        "checked": true,
                        "permission": "delete-designation"
                    }
                ]
            },
            {
                "page": "PaySlips",
                "permissions": [
                    {
                        "label": "Show In Navigation",
                        "checked": true,
                        "permission": "show-in-nav"
                    },
                    {
                        "label": "Read",
                        "checked": true,
                        "permission": "view-payslip"
                    },
                    {
                        "label": "Update",
                        "checked": true,
                        "permission": "update-payslip"
                    },
                    {
                        "label": "Delete",
                        "checked": true,
                        "permission": "delete-payslip"
                    }
                ]
            },
            {
                "page": "PaySlips",
                "permissions": [
                    {
                        "label": "Show In Navigation",
                        "checked": true,
                        "permission": "show-in-nav"
                    },
                    {
                        "label": "Read",
                        "checked": true,
                        "permission": "view-payslip"
                    },
                    {
                        "label": "Update",
                        "checked": true,
                        "permission": "update-payslip"
                    },
                    {
                        "label": "Delete",
                        "checked": true,
                        "permission": "delete-payslip"
                    }
                ]
            }
        ]
    }
]


module.exports = {
    GROUPS, CLASSES_MIGRATIONS, USERS_MIGRATIONS, LEAVES_MIGRATIONS, PERMISSIONS_MIGRATIONS
}