import Icons from '../../common/icons';
import Classes from '../../screens/Classes';
import Dashboard from '../../screens/Dashboard';
import Logs from '../../screens/Logs';
import PreviewVoucher from '../../screens/PreviewVoucher';
import SetupVoucher from '../../screens/SetupVoucher';
import Students from '../../screens/Students';
import Vouchers from '../../screens/Vouchers';

export const LOGIN_ROUTE = '/';

export const ROUTES = {
    dashboard: 'dashboard',
    students: "students",
    vouchers: "vouchers",
    setupVoucher: "setup-voucher",
    previewVoucher: "view-voucher",
    classes: "class",
    systemLogs: "system-logs"
};

export const ROLES = {
    admin: 'admin',
    superadmin: 'superadmin'
};

export const APP_ROUTES = [
    {
        label: ROUTES.dashboard,
        icon: Icons.Dashboard,
        redirectPath: "/",
        url: `/${ROUTES.dashboard}`,
        isProtected: true,
        permission: ROUTES.dashboard,
        roles: [ROLES.admin, ROLES.superadmin],
        screen: Dashboard,
        showInNav: true,
    },
    {
        label: ROUTES.students,
        icon: Icons.School,
        redirectPath: "/",
        url: `/${ROUTES.students}`,
        isProtected: true,
        permission: ROUTES.dashboard,
        roles: [ROLES.admin, ROLES.superadmin],
        screen: Students,
        showInNav: true,
    },
    {
        label: ROUTES.vouchers,
        icon: Icons.ReceiptLong,
        redirectPath: "/",
        url: `/${ROUTES.vouchers}`,
        isProtected: true,
        permission: ROUTES.dashboard,
        roles: [ROLES.admin, ROLES.superadmin],
        screen: Vouchers,
        showInNav: true,
    },
    {
        label: ROUTES.classes,
        icon: Icons.ReceiptLong,
        redirectPath: "/",
        url: `/${ROUTES.classes}`,
        isProtected: true,
        permission: ROUTES.dashboard,
        roles: [ROLES.admin, ROLES.superadmin],
        screen: Classes,
        showInNav: true,
    },
    {
        label: ROUTES.systemLogs,
        icon: Icons.Timeline,
        redirectPath: "/",
        url: `/${ROUTES.systemLogs}`,
        isProtected: true,
        permission: ROUTES.dashboard,
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
        permission: ROUTES.dashboard,
        roles: [ROLES.admin, ROLES.superadmin],
        screen: SetupVoucher,
        showInNav: false,
    },
    {
        label: ROUTES.previewVoucher,
        icon: Icons.Dashboard,
        redirectPath: "/",
        url: `/${ROUTES.previewVoucher}`,
        isProtected: true,
        permission: ROUTES.dashboard,
        roles: [ROLES.admin, ROLES.superadmin],
        screen: PreviewVoucher,
        showInNav: false,
    },
];