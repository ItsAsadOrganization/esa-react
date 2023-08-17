import {
  API_ROUTE_CLASSES,
  API_ROUTE_LOGIN,
  API_ROUTE_STUDENT,
  API_ROUTE_STUDENTS,
  API_ROUTE_VOUCHER,
  API_ROUTE_VOUCHERS,
} from "./constants";

import { post, get } from "./utils";

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

export const getStudentById = ({ class_id }) => {
  return get(API_ROUTE_STUDENT, {}, {class_id});
};


export const postVoucherApi = ({date_issued, date_expiry, config, payment_mode, is_paid, classId, studentId}) => {
  return post(API_ROUTE_VOUCHER, { date_issued, date_expiry, config, payment_mode, is_paid, classId, studentId }, {});
};