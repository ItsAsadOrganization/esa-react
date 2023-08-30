import Icons from '../../common/icons';
import Classes from '../../screens/Classes';
import Dashboard from '../../screens/Dashboard';
import Designations from '../../screens/Designations';
import Groups from '../../screens/Groups';
import Logs from '../../screens/Logs';
import Payslips from '../../screens/Payslips';
import PreviewStudent from '../../screens/PreviewStudent';
import PreviewVoucher from '../../screens/PreviewVoucher';
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
    payslips:'payslips',
    groups:'groups',
    designations:'designations',
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
        label: ROUTES.tutors,
        icon: Icons.CastForEducation,
        redirectPath: "/",
        url: `/${ROUTES.tutors}`,
        isProtected: true,
        permission: ROUTES.dashboard,
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
        permission: ROUTES.dashboard,
        roles: [ROLES.admin, ROLES.superadmin],
        screen: Vouchers,
        showInNav: true,
    },
    {
        label: ROUTES.payslips,
        icon: Icons.Receipt,
        redirectPath: "/",
        url: `/${ROUTES.payslips}`,
        isProtected: true,
        permission: ROUTES.dashboard,
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
        permission: ROUTES.dashboard,
        roles: [ROLES.admin, ROLES.superadmin],
        screen: Classes,
        showInNav: true,
    },
    {
        label: ROUTES.groups,
        icon: Icons.Group,
        redirectPath: "/",
        url: `/${ROUTES.groups}`,
        isProtected: true,
        permission: ROUTES.dashboard,
        roles: [ROLES.admin, ROLES.superadmin],
        screen: Groups,
        showInNav: true,
    },
    {
        label: ROUTES.designations,
        icon: Icons.Group,
        redirectPath: "/",
        url: `/${ROUTES.designations}`,
        isProtected: true,
        permission: ROUTES.dashboard,
        roles: [ROLES.admin, ROLES.superadmin],
        screen: Designations,
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
    {
        label: ROUTES.previewStudent,
        icon: Icons.Dashboard,
        redirectPath: "/",
        url: `/${ROUTES.previewStudent}`,
        isProtected: true,
        permission: ROUTES.dashboard,
        roles: [ROLES.admin, ROLES.superadmin],
        screen: PreviewStudent,
        showInNav: false,
    },
];