import { Separator } from "@/components/ui/separator";
import TitleReusable from "@/components/ui/title";
import { UsersRound } from "lucide-react";
import {
  getFatherDetails,
  getMotherDetails,
  getGuardianDetails,
  getPersonalInformation,
  getAcademicInformation,
} from "./details";
import { ApplicationFormData } from "@/hooks/zod/application";
export default function FamilyStaff(data: ApplicationFormData) {
  const fatherDetails = getFatherDetails(data);
  const motherDetails = getMotherDetails(data);
  const guardianDetails = getGuardianDetails(data);
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <h3 className="text-lg font-medium flex gap-2 items-center">
          <UsersRound className="h-5 w-5" /> Family Composition
        </h3>
        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
      </div>

      {/* Father Details */}
      <div className="space-y-4">
        <TitleReusable title="Father" description="" />
        <div className="">
          <div className="grid grid-cols-3 gap-4">
            {fatherDetails.map((detail, index) => (
              <div
                key={index}
                className={` ${
                  detail.label === "Address" ? "md:col-span-3" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-muted-foreground mb-1">
                      {detail.label}
                    </p>
                    <div className=" bg-card p-2 rounded-md flex gap-3 items-center">
                      <detail.icon size={16} />
                      <p className="">{detail.value}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
      {/* Mother Details */}
      <div className="space-y-4">
        <TitleReusable title="Mother" description="" />
        <div className="">
          <div className="grid grid-cols-3 gap-4">
            {motherDetails.map((detail, index) => (
              <div
                key={index}
                className={` ${
                  detail.label === "Address" ? "md:col-span-3" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-muted-foreground mb-1">
                      {detail.label}
                    </p>
                    <div className=" bg-card p-2 rounded-md flex gap-3 items-center">
                      <detail.icon size={16} />
                      <p className="">{detail.value}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
      {/* Guardian Details */}
      <div className="space-y-4 lg:col-span-2">
        <TitleReusable title="Guardian" description="" />
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {guardianDetails.map((detail, index) => (
              <div
                key={index}
                className={` ${
                  detail.label === "Address" ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-muted-foreground mb-1">
                      {detail.label}
                    </p>
                    <div className=" bg-card p-2 rounded-md flex gap-3 items-center">
                      <detail.icon size={16} />
                      <p className="">{detail.value}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
