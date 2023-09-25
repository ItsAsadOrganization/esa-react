import {
  API_ROUTE_CLASS,
  API_ROUTE_CLASSES,
  API_ROUTE_DESIGNATION,
  API_ROUTE_DESIGNATIONS,
  API_ROUTE_EXPIRING_VOUCHERS,
  API_ROUTE_GENERATE_PAYSLIPS,
  API_ROUTE_GENERATE_PAYSLIP_FOR_TUTOR,
  API_ROUTE_LOGIN,
  API_ROUTE_LOGS,
  API_ROUTE_PAYSLIP,
  API_ROUTE_PAYSLIPS,
  API_ROUTE_QUERIES,
  API_ROUTE_QUERY,
  API_ROUTE_QUERY_STUDENTS,
  API_ROUTE_ROLE,
  API_ROUTE_ROLES,
  API_ROUTE_SALARY,
  API_ROUTE_STUDENT,
  API_ROUTE_STUDENTS,
  API_ROUTE_STUDENT_VOUCHERS,
  API_ROUTE_TUTOR,
  API_ROUTE_TUTORS,
  API_ROUTE_UPDATE_NOTY_READ,
  API_ROUTE_USER,
  API_ROUTE_USERS,
  API_ROUTE_VOUCHER,
  API_ROUTE_VOUCHERS,
} from "./constants";

import { post, get, put, del } from "./utils";

export const loginUserApi = (username, password) => {
  return get(API_ROUTE_LOGIN, {}, { username, password });
};

export const getAllClasses = () => {
  return get(API_ROUTE_CLASSES, {}, {});
};

export const getAllStudents = () => {
  return get(API_ROUTE_STUDENTS, {}, {});
};

export const getAllVouchers = () => {
  return get(API_ROUTE_VOUCHERS, {}, {});
};

export const postStudent = (formData) => {
  return post(API_ROUTE_STUDENT, formData, {}, {
    "Content-Type": "multipart/form-data",
    "Accept": "multipart/form-data",
  });
};

export const updateStudent = (formData, id) => {
  return put(API_ROUTE_STUDENT, formData, { id }, {
    "Content-Type": "multipart/form-data",
    "Accept": "multipart/form-data",
  });
};

export const getStudentById = ({ class_id }) => {
  return get(API_ROUTE_STUDENT, {}, { class_id });
};

export const getStudentByStudentId = ({ id }) => {
  return get(API_ROUTE_STUDENT, {}, { id });
};


export const postVoucherApi = ({ date_issued, date_expiry, config, payment_mode, is_paid, classId, studentId }) => {
  return post(API_ROUTE_VOUCHER, { date_issued, date_expiry, config, payment_mode, is_paid, classId, studentId }, {});
};

export const putVoucherApi = ({ id, date_issued, date_expiry, config, payment_mode, is_paid, classId, studentId }) => {
  return put(API_ROUTE_VOUCHER, { date_issued, date_expiry, config, payment_mode, is_paid, classId, studentId }, { id });
};

export const deleteStudentApi = ({ id }) => {
  return del(API_ROUTE_STUDENT, {}, { id });
};

export const postClassesApi = ({ name }) => {
  return post(API_ROUTE_CLASS, { name }, {});
};

export const deleteClassesApi = ({ id }) => {
  return del(API_ROUTE_CLASS, {}, { id });
};

export const putClassesApi = ({ id, name }) => {
  return put(API_ROUTE_CLASS, { name }, { id });
};

export const getLogsApi = () => {
  return get(API_ROUTE_LOGS, {}, {});
};

export const getStudentVouchersApi = ({ student_id }) => {
  return get(API_ROUTE_STUDENT_VOUCHERS, {}, { student_id });
};

export const getTutorsApi = () => {
  return get(API_ROUTE_TUTORS, {}, {});
};

export const postTutorsApi = ({ tutor }) => {
  return post(API_ROUTE_TUTOR, { ...tutor }, {});
};

export const updateTutorApi = ({ tutor, id }) => {
  return put(API_ROUTE_TUTOR, { ...tutor }, { id });
};

export const postSalaryApi = ({ incrementValue, salary, tutorId }) => {
  return post(API_ROUTE_SALARY, { incrementValue, salary, tutorId }, {});
};

export const getTutortSalaryApi = ({ id }) => {
  return get(API_ROUTE_SALARY, {}, { id });
};

export const generatePaySlipsyApi = () => {
  return get(API_ROUTE_GENERATE_PAYSLIPS, {}, {});
};

export const getPaySlipsyApi = () => {
  return get(API_ROUTE_PAYSLIPS, {}, {});
};

export const deleteTutortSalaryApi = ({ id }) => {
  return del(API_ROUTE_SALARY, {}, { id });
};


export const getDesignationsApi = () => {
  return get(API_ROUTE_DESIGNATIONS, {}, {});
};

export const postDesignationsApi = ({ name }) => {
  return post(API_ROUTE_DESIGNATION, { name }, {});
};

export const updateDesignationsApi = ({ id, name }) => {
  return put(API_ROUTE_DESIGNATION, { name }, { id });
};

export const deleteDesignationsApi = ({ id }) => {
  return del(API_ROUTE_DESIGNATION, {}, { id });
};


export const updatePaySlipApi = ({ id, config }) => {
  return put(API_ROUTE_PAYSLIP, { config }, { id });
};

export const updateNotyApi = ({ id }) => {
  return put(API_ROUTE_UPDATE_NOTY_READ, {}, { id });
};

export const generateTutorPaySlipApi = ({ id }) => {
  return get(API_ROUTE_GENERATE_PAYSLIP_FOR_TUTOR, {}, { id });
};

export const getExpiringVouchersApi = () => {
  return get(API_ROUTE_EXPIRING_VOUCHERS, {}, {});
};

export const getQueriesApi = () => {
  return get(API_ROUTE_QUERIES, {}, {});
};

export const postQueryApi = ({ contact_medium, comment, studentId, userId, follow_up }) => {
  return post(API_ROUTE_QUERY, { contact_medium, comment, studentId, userId, follow_up }, {});
};

export const getQueryApi = ({ id }) => {
  return get(API_ROUTE_QUERY, {}, { id });
};

export const endQueryApi = ({ id, name }) => {
  return put(API_ROUTE_QUERY, { comment: `The query has been closed by ${name}` }, { id });
};


export const getStudentsQueryApi = () => {
  return get(API_ROUTE_QUERY_STUDENTS, {}, {});
};

export const postRoleApi = ({ name, permissions }) => {
  return post(API_ROUTE_ROLE, { name, permissions }, {});
};

export const putRoleApi = ({ id, name, permissions }) => {
  return put(API_ROUTE_ROLE, { name, permissions }, {id});
};

export const getRolesApi = () => {
  return get(API_ROUTE_ROLES, {}, {});
};

export const getUsersApi = () => {
  return get(API_ROUTE_USERS, {}, {});
};

export const postUserInfoApi = ({ name, email, roleId, password }) => {
  return post(API_ROUTE_USER, { name, email, roleId, password }, {});
};