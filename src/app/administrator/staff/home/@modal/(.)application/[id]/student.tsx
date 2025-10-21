import { ApplicationFormData } from "@/hooks/zod/application";
import {
  getFatherDetails,
  getMotherDetails,
  getGuardianDetails,
  getPersonalInformation,
  getAcademicInformation,
} from "./details";
import { GraduationCap, UserRound } from "lucide-react";
import { Separator } from "@/components/ui/separator";
export default function StudentStaff(data: ApplicationFormData | null) {
  const personalInformation = getPersonalInformation(data);
  const academicInformation = getAcademicInformation(data);
  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-medium flex gap-2 items-center">
            <UserRound className="h-5 w-5" /> Personal Information
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {personalInformation.map((info, index) => (
            <div
              key={index}
              className={` ${
                info.label === "Address" || info.label === "Email"
                  ? "md:col-span-2"
                  : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground mb-1">
                    {info.label}
                  </p>
                  <div className=" bg-card p-2 rounded-md flex gap-3 items-center">
                    <info.icon size={16} />
                    <p className="">{info.value}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-medium flex gap-2 items-center">
            <GraduationCap className="h-5 w-5" /> Academic Information
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {academicInformation.map((info, index) => (
            <div
              key={index}
              className={` ${
                info.label === "Address" || info.label === "Email"
                  ? "md:col-span-2"
                  : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground mb-1">
                    {info.label}
                  </p>
                  <div className=" bg-card p-2 rounded-md flex gap-3 items-center">
                    <info.icon size={16} />
                    <p className="">{info.value}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
