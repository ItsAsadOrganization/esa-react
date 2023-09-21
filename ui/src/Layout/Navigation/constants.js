import Icons from '../../common/icons';
import Classes from '../../screens/Classes';
import Dashboard from '../../screens/Dashboard';
import Designations from '../../screens/Designations';
import Groups from '../../screens/Groups';
import Logs from '../../screens/Logs';
import Notifications from '../../screens/Notifications';
import Payslips from '../../screens/Payslips';
import PreviewStudent from '../../screens/PreviewStudent';
import PreviewVoucher from '../../screens/PreviewVoucher';
import Roles from '../../screens/Roles';
import SetupRole from '../../screens/SetupRole';
import SetupVoucher from '../../screens/SetupVoucher';
import Students from '../../screens/Students';
import Tutors from '../../screens/Tutors';
import Vouchers from '../../screens/Vouchers';

export const LOGIN_ROUTE = '/';

export const ROUTES = {
    dashboard: 'dashboard',
    students: "students",
    vouchers: "vouchers",
    setupVoucher: "setup-voucher",
    previewVoucher: "view-voucher",
    classes: "class",
    systemLogs: "system-logs",
    previewStudent: "preview-student",
    tutors: "tutors",
    payslips: 'payslips',
    groups: 'groups',
    designations: 'designations',
    notifications: 'notifications',
    queries: 'queries',
    roles: 'roles',
    setupRole: 'setup-role',
};

export const ROLES = {
    admin: 'admin',
    superadmin: 'superadmin',
    coordinator: 'coordinator',
};

export const APP_ROUTES = [
    {
        label: ROUTES.dashboard,
        icon: Icons.Dashboard,
        redirectPath: "/",
        url: `/${ROUTES.dashboard}`,
        isProtected: true,
        permission: ROUTES.dashboard,
        roles: [ROLES.admin, ROLES.superadmin, ROLES.coordinator],
        screen: Dashboard,
        showInNav: true,
    },
    {
        label: ROUTES.students,
        icon: Icons.School,
        redirectPath: "/",
        url: `/${ROUTES.students}`,
        isProtected: true,
        permission: ROUTES.students,
        roles: [ROLES.admin, ROLES.superadmin, ROLES.coordinator],
        screen: Students,
        showInNav: true,
    },
    {
        label: ROUTES.tutors,
        icon: Icons.CastForEducation,
        redirectPath: "/",
        url: `/${ROUTES.tutors}`,
        isProtected: true,
        permission: ROUTES.tutors,
        roles: [ROLES.admin, ROLES.superadmin],
        screen: Tutors,
        showInNav: true,
    },
    {
        label: ROUTES.vouchers,
        icon: Icons.ReceiptLong,
        redirectPath: "/",
        url: `/${ROUTES.vouchers}`,
        isProtected: true,
        permission: ROUTES.vouchers,
        roles: [ROLES.admin, ROLES.superadmin, ROLES.coordinator],
        screen: Vouchers,
        showInNav: true,
    },
    {
        label: ROUTES.payslips,
        icon: Icons.Receipt,
        redirectPath: "/",
        url: `/${ROUTES.payslips}`,
        isProtected: true,
        permission: ROUTES.payslips,
        roles: [ROLES.admin, ROLES.superadmin],
        screen: Payslips,
        showInNav: true,
    },
    {
        label: ROUTES.classes,
        icon: Icons.ReceiptLong,
        redirectPath: "/",
        url: `/${ROUTES.classes}`,
        isProtected: true,
        permission: ROUTES.classes,
        roles: [ROLES.admin, ROLES.superadmin],
        screen: Classes,
        showInNav: true,
    },
    {
        label: ROUTES.designations,
        icon: Icons.Group,
        redirectPath: "/",
        url: `/${ROUTES.designations}`,
        isProtected: true,
        permission: ROUTES.designations,
        roles: [ROLES.admin, ROLES.superadmin],
        screen: Designations,
        showInNav: true,
    },
    {
        label: ROUTES.notifications,
        icon: Icons.Group,
        redirectPath: "/",
        url: `/${ROUTES.notifications}`,
        isProtected: true,
        permission: ROUTES.dashboard,
        roles: [ROLES.admin, ROLES.superadmin, ROLES.coordinator],
        screen: Notifications,
        showInNav: false,
    },
    {
        label: ROUTES.roles,
        icon: Icons.Group,
        redirectPath: "/",
        url: `/${ROUTES.roles}`,
        isProtected: true,
        permission: ROUTES.roles,
        roles: [ROLES.admin, ROLES.superadmin],
        screen: Roles,
        showInNav: true,
    },
    {
        label: ROUTES.setupRole,
        icon: Icons.Group,
        redirectPath: "/",
        url: `/${ROUTES.setupRole}`,
        isProtected: true,
        permission: ROUTES.setupRole,
        roles: [ROLES.admin, ROLES.superadmin],
        screen: SetupRole,
        showInNav: true,
    },
    {
        label: ROUTES.systemLogs,
        icon: Icons.Timeline,
        redirectPath: "/",
        url: `/${ROUTES.systemLogs}`,
        isProtected: true,
        permission: ROUTES.systemLogs,
        roles: [ROLES.superadmin],
        screen: Logs,
        showInNav: true,
    },
    {
        label: ROUTES.setupVoucher,
        icon: Icons.Dashboard,
        redirectPath: "/",
        url: `/${ROUTES.setupVoucher}`,
        isProtected: true,
        permission: ROUTES.setupVoucher,
        roles: [ROLES.admin, ROLES.superadmin, ROLES.coordinator],
        screen: SetupVoucher,
        showInNav: false,
    },
    {
        label: ROUTES.previewVoucher,
        icon: Icons.Dashboard,
        redirectPath: "/",
        url: `/${ROUTES.previewVoucher}`,
        isProtected: true,
        permission: ROUTES.previewVoucher,
        roles: [ROLES.admin, ROLES.superadmin, ROLES.coordinator],
        screen: PreviewVoucher,
        showInNav: false,
    },
    {
        label: ROUTES.previewStudent,
        icon: Icons.Dashboard,
        redirectPath: "/",
        url: `/${ROUTES.previewStudent}`,
        isProtected: true,
        permission: ROUTES.previewStudent,
        roles: [ROLES.admin, ROLES.superadmin, ROLES.coordinator],
        screen: PreviewStudent,
        showInNav: false,
    },
];