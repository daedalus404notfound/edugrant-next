type FormatTypes = {
  formats: string;
};

export type scholarshipDocumentTypes = {
  label: string;
  formats: FormatTypes[];
};

export type ScholarshipTypes = {
  scholarshipId: string;
  scholarshipTitle: string;
  scholarshipProvider: string;
  status: string;
  scholarshipDealine: string;
  totalApplicants: number;
  totalApproved: number;
  scholarshipLogo: string;
  gwa: string;
  scholarshipLimit: string;
  scholarshipCover: string;
  scholarshipDescription: string;
  scholarshipAmount: string;
  scholarshipDocuments: scholarshipDocumentTypes[];
};

export type EditScholarshipTypes = {
  scholarshipId: string;
  scholarshipTitle: string;
  scholarshipProvider: string;
  scholarshipDealine: string;
  scholarshipDescription: string;
  scholarshipAmount: string;
  scholarshipLimit: string;
};
export type UserProfileTypes = {
  userId: string;
  userPassword: string;
  //Personal
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  //Contact
  studentEmail: string;
  contactNumber: string;
  address: string;
  //Academic
  studentId: string;
  password: string;
  course: string;
  year: string;
  section: string;
};
export type ApplicationTypes = {
  applicationId: string;
  applicationResponseDate: string;
  scholarship: ScholarshipTypes;
  scholarshipId: string;
  status: string;
  student: UserProfileTypes;
  userDocuments: Record<string, UserDocument>;
  userId: string;

  applicationDate: string;
};
export type UserDocument = {
  fileFormat: string;
  resourceType: string;
  fileUrl: string;
  document: string;
  cloudinaryId: string;
};

export type AdminUserType = {
  adminEmail: string;
  adminId: string;
  adminName: string;
  adminPassword: string;
};

export type FilterTypes = {
  FilterData: AcademicTypes;
  Scholarships: ScholarshipTypes[];
};

export type AcademicTypes = {
  distinctCourse: string[];
  distinctYear: string[];
  distinctSection: string[];
};
