export const TABLE_HEADS = [
    { name: "Voucher Id" },
    { name: "Student Name" },
    { name: "Class" },
    { name: "Date Issued" },
    { name: "Date Expiry" },
    { name: "Payment Status" },
    { name: "Payment Mode" },
    { name: "" },
]

export const BREADCRUMBS = [
    {
        name: "Vouchers",
        icon: "",
        path: `/vouchers`
    },
  
]

export const VOUCHER_SLICE_NAME = 'voucherSlice'
export const VOUCHERs_REQUESTED = `${VOUCHER_SLICE_NAME}/vouchersRequested`
export const STUDENTS_REQUESTED = `${VOUCHER_SLICE_NAME}/studentsRequested`
export const EXPIRING_VOUCHERS_REQUESTED = `${VOUCHER_SLICE_NAME}/expiringVouchersRequested`