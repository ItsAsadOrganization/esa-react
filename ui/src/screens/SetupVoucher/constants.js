
export const BREADCRUMBS = [
    {
        name: "Vouchers",
        icon: "",
        path: `/vouchers`
    },
    {
        name: "Setup Vouchers",
        icon: "",
        path: `/setup-vouchers`
    },
]


export const FEE_TYPES = ["Tuition Fee",
    "Admission Fee",
    "Books",
    "Exam Fee",
    "Mock Test",
    "Security",
    "Others"]
export const SETUP_VOUCHER_SLICE_NAME = "setupVoucherSlice"
export const CLASSES_REQUESTED = `${SETUP_VOUCHER_SLICE_NAME}/classesRequested`
export const STUDENT_BY_CLASSES_REQUESTED = `${SETUP_VOUCHER_SLICE_NAME}/studentByClassesRequested`