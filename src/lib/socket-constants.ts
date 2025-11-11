export const paginationDefault06 = {
  pageIndex: 0,
  pageSize: 6,
};
export const sortDefault = [{ id: "dateCreated", desc: true }];
export const queryKeyApplicationAll = ["clientApplications"];

export const queryKeyApplicationApproved = [
  "clientApplications",
  paginationDefault06,
  sortDefault,
  [],
  "APPROVED",
  "",
];
export const queryKeyApplicationDeclined = [
  "clientApplications",
  paginationDefault06,
  sortDefault,
  [],
  "DECLINED",
  "",
];
export const queryKeyApplicationInterview = [
  "clientApplications",
  paginationDefault06,
  sortDefault,
  [],
  "INTERVIEW",
  "",
];

export const activeScholarshipKey = [
  "scholarshipData",
  paginationDefault06,
  sortDefault,
  [],
  "ACTIVE",
  "",
];
export const renewScholarshipKey = [
  "scholarshipData",
  paginationDefault06,
  sortDefault,
  [],
  "RENEW",
  "",
];
export const queryKeyScholarshipAll = ["scholarshipData"];
export const queryKeyApplicationPending = [
  "clientApplications",
  paginationDefault06,
  sortDefault,
  [],
  "PENDING",
  "",
];
