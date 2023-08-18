import Icons from '../../common/icons';
import Dashboard from '../../screens/Dashboard';
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
    previewVoucher: "view-voucher"
};

export const ROLES = {
    admin: 'admin',
    ai: 'ai'
};

export const APP_ROUTES = [
    {
        label: ROUTES.dashboard,
        icon: Icons.Dashboard,
        redirectPath: "/",
        url: `/${ROUTES.dashboard}`,
        isProtected: true,
        permission: ROUTES.dashboard,
        roles: [ROLES.admin, ROLES.ai],
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
        roles: [ROLES.admin, ROLES.ai],
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
        roles: [ROLES.admin, ROLES.ai],
        screen: Vouchers,
        showInNav: true,
    },
    {
        label: ROUTES.setupVoucher,
        icon: Icons.Dashboard,
        redirectPath: "/",
        url: `/${ROUTES.setupVoucher}`,
        isProtected: true,
        permission: ROUTES.dashboard,
        roles: [ROLES.admin, ROLES.ai],
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
        roles: [ROLES.admin, ROLES.ai],
        screen: PreviewVoucher,
        showInNav: false,
    },
];