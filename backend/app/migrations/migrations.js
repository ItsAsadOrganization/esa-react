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
        role: "admin"
    },
    {
        name: "superadmin",
        email: "superadmin@egc.edu.pk",
        password: "SuperAdmin@123,.",
        role: "superadmin"
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


module.exports = {
    GROUPS, CLASSES_MIGRATIONS, USERS_MIGRATIONS, LEAVES_MIGRATIONS
}