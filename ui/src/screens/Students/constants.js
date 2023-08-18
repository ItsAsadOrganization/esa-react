export const TABLE_HEADS = [
    { name: "Avatar" },
    { name: "Name" },
    { name: "Father Name" },
    { name: "Emergency Contact" },
    { name: "Address" },
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