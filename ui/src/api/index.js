import {
  API_ROUTE_CLASS,
  API_ROUTE_CLASSES,
  API_ROUTE_LOGIN,
  API_ROUTE_LOGS,
  API_ROUTE_STUDENT,
  API_ROUTE_STUDENTS,
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

export const postStudent = ({
  name, father_name, email_address, phone_1, phone_2, phone_3, avatar, address = "Encore Star Group Of Colleges", classId
}) => {
  return post(API_ROUTE_STUDENT, { name, father_name, email_address, phone_1, phone_2, phone_3, avatar, address, classId }, {});
};

export const updateStudent = ({
  id, name, father_name, email_address, phone_1, phone_2, phone_3, avatar, address = "Encore Star Group Of Colleges", classId
}) => {
  return put(API_ROUTE_STUDENT, { name, father_name, email_address, phone_1, phone_2, phone_3, avatar, address, classId }, { id });
};

export const getStudentById = ({ class_id }) => {
  return get(API_ROUTE_STUDENT, {}, { class_id });
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
