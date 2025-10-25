"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  AlertCircle,
  Briefcase,
  GraduationCap,
  Map,
  PhilippinePeso,
  Trash2,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Controller,
  UseFormReturn,
  UseFieldArrayReturn,
} from "react-hook-form";
import { UserFormData } from "@/hooks/user/zodUserProfile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FamilyForm({
  form,
  siblings,
}: {
  form: UseFormReturn<UserFormData>;
  siblings: UseFieldArrayReturn<
    UserFormData,
    "Student.familyBackground.siblings",
    "id"
  >;
}) {
  return (
    <div className=" w-full space-y-6">
      {" "}
      <p className="text-sm  p-4 dark:bg-blue-900 bg-blue-200 col-span-2 rounded-md flex gap-2 items-center">
        <AlertCircle size={15} /> If no information available, type{" "}
        <span className="font-medium">N/A.</span>
      </p>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 bg-card/40 dark:bg-gradient-to-br to-card from-card/50 lg:p-6 p-4 rounded-lg">
        <div className="lg:col-span-2 col-span-1 space-y-4">
          <div className="flex items-center gap-3 flex-col lg:flex-row">
            <h3 className="text-base font-medium flex gap-2 items-center">
              Father Information
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
            <Controller
              control={form.control}
              name="Student.familyBackground.fatherStatus" // matches Zod schema
              // default status
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex lg:p-0 p-2 w-full lg:w-[unset] justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="Separated"
                      id="fatherStatus-separated"
                    />
                    <Label htmlFor="fatherStatus-separated">Separated</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Living" id="fatherStatus-living" />
                    <Label htmlFor="fatherStatus-living">Living</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="Deceased"
                      id="fatherStatus-deceased"
                    />
                    <Label htmlFor="fatherStatus-deceased">Deceased</Label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>
        </div>

        {/* Father Full Name */}
        <FormField
          control={form.control}
          name="Student.familyBackground.fatherFullName"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel className="text-muted-foreground">
                  Full Name
                </FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <div className="flex items-center">
                  <Input {...field} className="rounded-r-none" />
                  <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                    <Button variant="ghost">
                      <UserRound />
                    </Button>
                  </span>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Father Address */}
        <FormField
          control={form.control}
          name="Student.familyBackground.fatherAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Address</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Input {...field} className="rounded-r-none" />
                  <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                    <Button variant="ghost">
                      <Map />
                    </Button>
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Father Contact Number */}
        <FormField
          control={form.control}
          name="Student.familyBackground.fatherContactNumber"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel className="text-muted-foreground">
                  Contact Number
                </FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <div className="flex">
                  {/* Fixed +639 prefix */}
                  <span className="flex items-center px-4  border border-input border-r-0 rounded-l-md text-sm">
                    +639
                  </span>
                  <Input
                    type="text"
                    placeholder=""
                    maxLength={9}
                    {...field}
                    // value={field.value?.replace("+63", "") || ""}
                    // onChange={(e) => {
                    //   const val = e.target.value
                    //     .replace(/\D/g, "")
                    //     .slice(0, 10);
                    //   field.onChange(`+63${val}`);
                    // }}
                    className="rounded-l-none"
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Father Occupation */}
        <FormField
          control={form.control}
          name="Student.familyBackground.fatherOccupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">
                Occupation
              </FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Input {...field} className="rounded-r-none" />
                  <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                    <Button variant="ghost">
                      <Briefcase />
                    </Button>
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Father Highest Education */}

        <FormField
          control={form.control}
          name="Student.familyBackground.fatherHighestEducation"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="text-muted-foreground">
                Highest Education Attainment
              </FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="rounded-r-none w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Elementary">Elementary</SelectItem>
                      <SelectItem value="High School">High School</SelectItem>
                      <SelectItem value="College">College</SelectItem>
                      <SelectItem value="ALS">
                        Alternative Learning System (ALS)
                      </SelectItem>
                      <SelectItem value="TESDA">
                        TESDA / Technical-Vocational
                      </SelectItem>
                      <SelectItem value="N/A">N/A</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                    <Button variant="ghost">
                      <GraduationCap />
                    </Button>
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Father Taxable Income */}

        <FormField
          control={form.control}
          name="Student.familyBackground.fatherTotalParentsTaxableIncome"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">
                Taxable Income
              </FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Input {...field} className="rounded-r-none" />
                  <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                    <Button variant="ghost">
                      <PhilippinePeso />
                    </Button>
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 bg-gradient-to-br to-card from-card/50 lg:p-6 p-4  rounded-lg">
        <div className="lg:col-span-2 col-span-1 space-y-4">
          <div className="flex items-center gap-3 flex-col lg:flex-row">
            <h3 className="text-base font-medium flex gap-2 items-center">
              Mother Information
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
            <Controller
              control={form.control}
              name="Student.familyBackground.motherStatus"
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex lg:p-0 p-2 w-full lg:w-[unset] justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="Separated"
                      id="motherStatus-separated"
                    />
                    <Label htmlFor="motherStatus-separated">Separated</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Living" id="motherStatus-living" />
                    <Label htmlFor="motherStatus-living">Living</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="Deceased"
                      id="motherStatus-deceased"
                    />
                    <Label htmlFor="motherStatus-deceased">Deceased</Label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="Student.familyBackground.motherFullName"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel className="text-muted-foreground">
                  Full Name
                </FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <div className="flex items-center">
                  <Input {...field} className="rounded-r-none" />
                  <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                    <Button variant="ghost">
                      <UserRound />
                    </Button>
                  </span>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Student.familyBackground.motherAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Address</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Input {...field} className="rounded-r-none" />
                  <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                    <Button variant="ghost">
                      <Map />
                    </Button>
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Student.familyBackground.motherContactNumber"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel className="text-muted-foreground">
                  Contact Number
                </FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <div className="flex">
                  {/* Fixed +639 prefix */}
                  <span className="flex items-center px-4  border border-input border-r-0 rounded-l-md text-sm">
                    +639
                  </span>
                  <Input
                    type="text"
                    placeholder=""
                    maxLength={9}
                    {...field}
                    className="rounded-l-none"
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Student.familyBackground.motherOccupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">
                Occupation
              </FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Input {...field} className="rounded-r-none" />
                  <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                    <Button variant="ghost">
                      <Briefcase />
                    </Button>
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Student.familyBackground.motherHighestEducation"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="text-muted-foreground">
                Highest Education Attainment
              </FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="rounded-r-none w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Elementary">Elementary</SelectItem>
                      <SelectItem value="High School">High School</SelectItem>
                      <SelectItem value="College">College</SelectItem>
                      <SelectItem value="ALS">
                        Alternative Learning System (ALS)
                      </SelectItem>
                      <SelectItem value="TESDA">
                        TESDA / Technical-Vocational
                      </SelectItem>
                      <SelectItem value="N/A">N/A</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                    <Button variant="ghost">
                      <GraduationCap />
                    </Button>
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Student.familyBackground.motherTotalParentsTaxableIncome"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">
                Taxable Income
              </FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Input {...field} className="rounded-r-none" />
                  <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                    <Button variant="ghost">
                      <PhilippinePeso />
                    </Button>
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 bg-gradient-to-br to-card from-card/50 lg:p-6 p-4  rounded-lg">
        <div className="lg:col-span-2 col-span-1 space-y-4">
          <div className="flex items-center gap-3 flex-col lg:flex-row">
            <h3 className="text-base font-medium flex gap-2 items-center">
              Guardian Information
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>
        </div>

        <FormField
          control={form.control}
          name="Student.familyBackground.guardianFullName"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel className="text-muted-foreground">
                  Full Name
                </FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <div className="flex items-center">
                  <Input {...field} className="rounded-r-none" />
                  <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                    <Button variant="ghost">
                      <UserRound />
                    </Button>
                  </span>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Student.familyBackground.guardianAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Address</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Input {...field} className="rounded-r-none" />
                  <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                    <Button variant="ghost">
                      <Map />
                    </Button>
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Student.familyBackground.guardianContactNumber"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel className="text-muted-foreground">
                  Contact Number
                </FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <div className="flex">
                  {/* Fixed +639 prefix */}
                  <span className="flex items-center px-4  border border-input border-r-0 rounded-l-md text-sm">
                    +639
                  </span>
                  <Input
                    type="text"
                    placeholder=""
                    maxLength={9}
                    {...field}
                    className="rounded-l-none"
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Student.familyBackground.guardianOccupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">
                Occupation
              </FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Input {...field} className="rounded-r-none" />
                  <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                    <Button variant="ghost">
                      <Briefcase />
                    </Button>
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Student.familyBackground.guardianHighestEducation"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="text-muted-foreground">
                Highest Education Attainment
              </FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="rounded-r-none w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Elementary">Elementary</SelectItem>
                      <SelectItem value="High School">High School</SelectItem>
                      <SelectItem value="College">College</SelectItem>
                      <SelectItem value="ALS">
                        Alternative Learning System (ALS)
                      </SelectItem>
                      <SelectItem value="TESDA">
                        TESDA / Technical-Vocational
                      </SelectItem>
                      <SelectItem value="N/A">N/A</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                    <Button variant="ghost">
                      <GraduationCap />
                    </Button>
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="w-full">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            Sibling(s) Information
          </h3>

          <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />

          <Button
            size="sm"
            type="button"
            onClick={() =>
              siblings.append({ fullName: "", age: "", occupation: "" })
            }
          >
            + Add fields
          </Button>
        </div>

        {/* Sibling Fields */}
        <div className="flex flex-col gap-4">
          {siblings.fields.map(
            (
              item: {
                id: string;
                fullName: string;
                age: string;
                occupation: string;
              },
              index
            ) => (
              <div
                key={item.id}
                className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 bg-gradient-to-br from-card/50 to-card p-4 lg:p-6 rounded-lg items-start"
              >
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name={`Student.familyBackground.siblings.${index}.fullName`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel className="text-muted-foreground">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="w-full bg-card" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Age */}
                <FormField
                  control={form.control}
                  name={`Student.familyBackground.siblings.${index}.age`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel className="text-muted-foreground">
                        Age
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="w-full bg-card" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Occupation */}
                <FormField
                  control={form.control}
                  name={`Student.familyBackground.siblings.${index}.occupation`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel className="text-muted-foreground">
                        Occupation
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full bg-card"
                          placeholder="Type N/A if not provided"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Delete Button */}
                <div className="flex items-start justify-end">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => siblings.remove(index)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
