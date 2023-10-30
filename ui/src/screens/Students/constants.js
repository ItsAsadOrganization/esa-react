export const TABLE_HEADS = [
    { name: "Image" },
    { name: "Name" },
    { name: "Class" },
    { name: "Father Name" },
    { name: "Email Address" },
    { name: "CNIC" },
    { name: "" },
]



export const TABLE_HEADS_SA = [
    { name: "Image" },
    { name: "Name" },
    { name: "Class" },
    { name: "Father Name" },
    { name: "Email Address" },
    { name: "CNIC" },
    { name: "Status" },
    { name: "" },
]

export const BREADCRUMBS = [
    {
        name: "Students",
        icon: "",
        path: `/students`
    },
]


export const STUDENTS_SLICE = 'studentSlice'
export const STUDENTS_LIST_REQUESTED = `${STUDENTS_SLICE}/studentsRequested`
export const CLASSES_LIST_REQUESTED = `${STUDENTS_SLICE}/classesRequested`