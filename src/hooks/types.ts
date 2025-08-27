export type scholarshipDocumentTypes = {
  label: string;
  formats: string[];
};

export type ScholarshipTypes = {
  scholarshipId: string;
  scholarshipTitle: string;
  scholarshipProvider: string;
  status: string;
  scholarshipDeadline: string;
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
export type AdminProfileTypes = {
  adminId: string;
  cloudinaryId: string;
  dateCreate: string;
  email: string;
  firstName: string;
  lastLogin: string;
  lastName: string;
  middleName: string;
  passwordHash: string;
  phone: string;
  profileImage: string;
  role: string;
};
export type ApplicationTypes = {
  applicationId: string;
  applicationResponseDate: string;
  scholarship: ScholarshipTypes;
  scholarshipId: string;
  status: string;
  student: UserProfileTypes;
  userDocuments: Record<string, UserDocument>;
  rejectMessage: Record<
    string,
    {
      status: string;
      comment: string;
    }
  >;
  userId: string;
  admin: AdminProfileTypes;
  applicationDate: string;
};
export type UserDocument = {
  fileFormat: string;
  resourceType: string;
  fileUrl: string;
  document: string;
  cloudinaryId: string;
  rejectMessage: { status: string; comment: string };
};

type OptionItem = {
  label: string;
  value: string[];
};

// Application-specific fields
type OptionsApplication = {
  distinctCourse: OptionItem;
  distinctSection: OptionItem;
  distinctTitle: OptionItem;
  distinctYear: OptionItem;
};

// Scholarship-specific fields
type OptionsScholarship = {
  scholarshipAmount: OptionItem;
  scholarshipProvider: OptionItem;
  scholarshipTitle: OptionItem;
};

// Final combined type
export type FilterOptions = {
  optionsApplication: OptionsApplication;
  optionsScholarship: OptionsScholarship;
};

export type MetaTypes = {
  filters: string | undefined;
  order: string | undefined;
  page: number | undefined;
  pageSize: number | undefined;
  sortBy: string | undefined;
  totalPage: number | undefined;
  totalRows: number | undefined;
  search: string | undefined;
};
type AnnouncementTypes = {
  announcements: AnnouncementDataTypes[];
  meta: MetaTypes;
};
export type AnnouncementDataTypes = {
  announcementId: number;
  adminId: number;
  title: string;
  description: string;
  tags: { data: string[] };
  startDate: string; // ISO date string
  expiredDate: string; // ISO date string
};
