import { UserFormData } from "@/hooks/user/register";
import { ApplicationFormData } from "@/hooks/zod/application";
import { format } from "date-fns";
import {
  UserRound,
  Phone,
  Map,
  Briefcase,
  GraduationCap,
  PhilippinePeso,
  VenusAndMars,
  Calendar,
  Mail,
  Building2,
} from "lucide-react";

// Allow data to be null
export const getFatherDetails = (data: ApplicationFormData | null) => [
  {
    label: "Father Full Name",
    icon: UserRound,
    value: data?.Student.familyBackground.fatherFullName ?? "",
  },
  {
    label: "Status",
    icon: UserRound,
    value: data?.Student.familyBackground.fatherStatus ?? "",
  },
  {
    label: "Contact No.",
    icon: Phone,
    value: data?.Student.familyBackground.fatherContactNumber ?? "",
  },
  {
    label: "Address",
    icon: Map,
    value: data?.Student.familyBackground.fatherAddress ?? "",
  },
  {
    label: "Occupation",
    icon: Briefcase,
    value: data?.Student.familyBackground.fatherOccupation ?? "",
  },
  {
    label: "Highest Education Attainment",
    icon: GraduationCap,
    value: data?.Student.familyBackground.fatherHighestEducation ?? "",
  },
  {
    label: "Total Parents Taxable Income",
    icon: PhilippinePeso,
    value: data?.Student.familyBackground.fatherTotalParentsTaxableIncome ?? "",
  },
];

export const getMotherDetails = (data: ApplicationFormData | null) => [
  {
    label: "Mother Full Name",
    icon: UserRound,
    value: data?.Student.familyBackground.motherFullName ?? "",
  },
  {
    label: "Status",
    icon: Map,
    value: data?.Student.familyBackground.motherStatus ?? "",
  },
  {
    label: "Contact No.",
    icon: Phone,
    value: data?.Student.familyBackground.motherContactNumber ?? "",
  },
  {
    label: "Address",
    icon: UserRound,
    value: data?.Student.familyBackground.motherAddress ?? "",
  },
  {
    label: "Occupation",
    icon: Briefcase,
    value: data?.Student.familyBackground.motherOccupation ?? "",
  },
  {
    label: "Highest Education Attainment",
    icon: GraduationCap,
    value: data?.Student.familyBackground.motherHighestEducation ?? "",
  },
  {
    label: "Total Parents Taxable Income",
    icon: PhilippinePeso,
    value: data?.Student.familyBackground.motherTotalParentsTaxableIncome ?? "",
  },
];

export const getGuardianDetails = (data: ApplicationFormData | null) => [
  {
    label: "Guardian Full Name",
    icon: UserRound,
    value: data?.Student.familyBackground.guardianFullName ?? "",
  },
  {
    label: "Contact No.",
    icon: Phone,
    value: data?.Student.familyBackground.guardianContactNumber ?? "",
  },
  {
    label: "Occupation",
    icon: Briefcase,
    value: data?.Student.familyBackground.guardianOccupation ?? "",
  },
  {
    label: "Address",
    icon: Map,
    value: data?.Student.familyBackground.guardianAddress ?? "",
  },
  {
    label: "Highest Education Attainment",
    icon: GraduationCap,
    value: data?.Student.familyBackground.guardianHighestEducation ?? "",
  },
];

export const getPersonalInformation = (data: ApplicationFormData | null) => [
  {
    label: "First Name",
    icon: UserRound,
    value: data?.Student.fName ?? "",
  },
  {
    label: "Middle Name",
    icon: UserRound,
    value: data?.Student.mName ?? "",
  },
  {
    label: "Last Name",
    icon: UserRound,
    value: data?.Student.lName ?? "",
  },
  {
    label: "Gender",
    icon: VenusAndMars,
    value: data?.Student.gender ?? "",
  },
  {
    label: "Date of Birth",
    icon: Calendar,
    value: data?.Student?.dateOfBirth
      ? format(data.Student.dateOfBirth, "PPP")
      : "",
  },
  {
    label: "Contact No.",
    icon: Phone,
    value: data?.Student.contactNumber ?? "",
  },
  {
    label: "Address",
    icon: Map,
    value: data?.Student.address ?? "",
  },

  {
    label: "Email",
    icon: Mail,
    value: data?.Student.Account.email ?? "",
  },
  {
    label: "PWD",
    icon: Mail,
    value: data?.Student.PWD ?? "N/A",
  },
  {
    label: "Indigenous",
    icon: Mail,
    value: data?.Student.indigenous ?? "N/A",
  },
];

export const getAcademicInformation = (data: ApplicationFormData | null) => [
  {
    label: "Student Id",
    icon: Building2,
    value: data?.Student.Account.schoolId ?? "",
  },
  {
    label: "Institute",
    icon: Building2,
    value: data?.Student.institute ?? "",
  },
  {
    label: "Course",
    icon: Building2,
    value: data?.Student.course ?? "",
  },
  {
    label: "Year",
    icon: Building2,
    value: data?.Student.year ?? "",
  },
  {
    label: "Section",
    icon: Building2,
    value: data?.Student.section ?? "",
  },
];
