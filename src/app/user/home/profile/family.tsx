"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  AlertCircle,
  Briefcase,
  Check,
  GraduationCap,
  Loader,
  Map,
  PhilippinePeso,
  Trash2,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
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
import {
  FamilyBackgroundFormData,
  useFamilyBackgroundForm,
} from "@/hooks/user/zodFamilyBackground";
import { AnimatePresence, motion } from "motion/react";
import { useEditUserProfile } from "@/hooks/user/postProfileUpdate";
import { useEditUserProfileFamilyBackground } from "@/hooks/user/postProfileFamilyUpdatye";
import useAuthenticatedUser from "@/hooks/user/getTokenAuthentication";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { FormInputField } from "@/components/input-components/reusable-input";
import { FormPhoneField } from "@/components/input-components/reusable-contact-input";
import { FormSelectField } from "@/components/input-components/reusable-select";

export default function FamilyForm() {
  const mutation = useEditUserProfileFamilyBackground();
  const { data } = useAuthenticatedUser();
  const familyBackground = data?.userData.Student.familyBackground;
  const { fbForm, fbIsChanged, siblings } =
    useFamilyBackgroundForm(familyBackground);
  const [checked, setChecked] = useState(false);
  const fatherStatus = fbForm.watch("fatherStatus");
  const motherStatus = fbForm.watch("motherStatus");
  const fatherFormDisable =
    fatherStatus === "Deceased" || fatherStatus === "Unknown";
  const motherFormDisable =
    motherStatus === "Deceased" || motherStatus === "Unknown";

  useEffect(() => {
    if (fatherFormDisable) {
      fbForm.setValue("fatherFullName", "N/A");
      fbForm.setValue("fatherAddress", "N/A");
      fbForm.setValue("fatherContactNumber", "N/A");
      fbForm.setValue("fatherOccupation", "N/A");
      fbForm.setValue("fatherHighestEducation", "N/A");
      fbForm.setValue("fatherTotalParentsTaxableIncome", "N/A");
    } else {
      // Reset to empty or previous data if available
      fbForm.setValue(
        "fatherFullName",
        data?.userData.Student.familyBackground.fatherFullName ?? ""
      );
      fbForm.setValue(
        "fatherAddress",
        data?.userData.Student.familyBackground.fatherAddress ?? ""
      );
      fbForm.setValue(
        "fatherContactNumber",
        data?.userData.Student.familyBackground.fatherContactNumber ?? ""
      );
      fbForm.setValue(
        "fatherOccupation",
        data?.userData.Student.familyBackground.fatherOccupation ?? ""
      );
      fbForm.setValue(
        "fatherHighestEducation",
        data?.userData.Student.familyBackground.fatherHighestEducation ?? ""
      );
      fbForm.setValue(
        "fatherTotalParentsTaxableIncome",
        data?.userData.Student.familyBackground
          .fatherTotalParentsTaxableIncome ?? ""
      );
    }
  }, [fatherStatus, fbForm, data]);
  useEffect(() => {
    if (motherFormDisable) {
      fbForm.setValue("motherFullName", "N/A");
      fbForm.setValue("motherAddress", "N/A");
      fbForm.setValue("motherContactNumber", "N/A");
      fbForm.setValue("motherOccupation", "N/A");
      fbForm.setValue("motherHighestEducation", "N/A");
      fbForm.setValue("motherTotalParentsTaxableIncome", "N/A");
    } else {
      fbForm.setValue(
        "motherFullName",
        data?.userData.Student.familyBackground.motherFullName ?? ""
      );
      fbForm.setValue(
        "motherAddress",
        data?.userData.Student.familyBackground.motherAddress ?? ""
      );
      fbForm.setValue(
        "motherContactNumber",
        data?.userData.Student.familyBackground.motherContactNumber ?? ""
      );
      fbForm.setValue(
        "motherOccupation",
        data?.userData.Student.familyBackground.motherOccupation ?? ""
      );
      fbForm.setValue(
        "motherHighestEducation",
        data?.userData.Student.familyBackground.motherHighestEducation ?? ""
      );
      fbForm.setValue(
        "motherTotalParentsTaxableIncome",
        data?.userData.Student.familyBackground
          .motherTotalParentsTaxableIncome ?? ""
      );
    }
  }, [motherFormDisable, fbForm, data]);

  useEffect(() => {
    if (checked) {
      fbForm.setValue("guardianFullName", "N/A");
      fbForm.setValue("guardianAddress", "N/A");
      fbForm.setValue("guardianContactNumber", "N/A");
      fbForm.setValue("guardianOccupation", "N/A");
      fbForm.setValue("guardianHighestEducation", "N/A");
      fbForm.setValue("guardianTotalParentsTaxableIncome", "N/A");
    } else {
      // Reset to empty or previous data if available
      fbForm.setValue(
        "guardianFullName",
        data?.userData.Student.familyBackground.guardianFullName ?? ""
      );
      fbForm.setValue(
        "guardianAddress",
        data?.userData.Student.familyBackground.guardianAddress ?? ""
      );
      fbForm.setValue(
        "guardianContactNumber",
        data?.userData.Student.familyBackground.guardianContactNumber ?? ""
      );
      fbForm.setValue(
        "guardianOccupation",
        data?.userData.Student.familyBackground.guardianOccupation ?? ""
      );
      fbForm.setValue(
        "guardianHighestEducation",
        data?.userData.Student.familyBackground.guardianHighestEducation ?? ""
      );
      fbForm.setValue(
        "guardianTotalParentsTaxableIncome",
        data?.userData.Student.familyBackground
          .guardianTotalParentsTaxableIncome ?? ""
      );
    }
  }, [checked, fbForm, data]);

  useEffect(() => {
    if (fatherFormDisable && motherFormDisable) {
      setChecked(false);
    } else {
      setChecked(false);
    }
  }, [fatherFormDisable, motherFormDisable]);
  return (
    <div className=" w-full space-y-6">
      <Form {...fbForm}>
        <form
          onSubmit={fbForm.handleSubmit((values) => mutation.mutate(values))}
          className="space-y-8"
        >
          {fatherFormDisable && motherFormDisable && (
            <div className="dark:bg-blue-900 bg-blue-300 rounded-md p-4 flex justify-between text-sm">
              <p className="text-center  ">
                Guardian information is required if both parents are deceased or
                unknown.
              </p>
              <span className="flex gap-1.5">
                <Checkbox
                  id="meow"
                  checked={checked}
                  onCheckedChange={(value) => setChecked(value === true)}
                  className="translate-y-0.5"
                />{" "}
                <label htmlFor="meow">
                  {" "}
                  I do not have a parent or guardian available
                </label>
              </span>
            </div>
          )}
          <div className="space-y-3">
            <div className="flex items-center gap-3 ">
              <h3 className="text-base font-medium flex gap-2 items-center">
                Father Information
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />

              <FormField
                control={fbForm.control}
                name="fatherStatus"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Mother Status</FormLabel> */}
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full lg:w-[unset]">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Separated">Separated</SelectItem>
                          <SelectItem value="Living">Living</SelectItem>
                          <SelectItem value="Deceased">Deceased</SelectItem>
                          <SelectItem value="Unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 bg-card/40 dark:bg-gradient-to-br to-card from-card/50 lg:p-6 p-4 rounded-lg">
              {/* Father Full Name */}
              <FormInputField
                control={fbForm.control}
                name="fatherFullName"
                label="Full Name"
                type="text"
                icon={UserRound}
                disabled={mutation.isPending || fatherFormDisable}
                placeholder="Enter your father's full name"
                motionProps={{
                  transition: { duration: 0.3, delay: 0.1 },
                }}
              />
              <FormInputField
                control={fbForm.control}
                name="fatherAddress"
                label="Address"
                type="text"
                icon={Map}
                disabled={mutation.isPending || fatherFormDisable}
                placeholder="Ener your father's address"
                motionProps={{
                  transition: { duration: 0.3, delay: 0.1 },
                }}
              />

              <FormPhoneField
                control={fbForm.control}
                name="fatherContactNumber"
                label="Contact number"
                disabled={mutation.isPending || fatherFormDisable}
                motionProps={{
                  transition: { duration: 0.3, delay: 0.2 },
                }}
              />
              <FormInputField
                control={fbForm.control}
                name="fatherOccupation"
                label="Occupation"
                type="text"
                icon={Briefcase}
                disabled={mutation.isPending || fatherFormDisable}
                placeholder="Ener your father occupation"
                motionProps={{
                  transition: { duration: 0.3, delay: 0.1 },
                }}
              />
              {/* Father Highest Education */}
              <FormSelectField
                control={fbForm.control}
                name="fatherHighestEducation"
                label="Highest Education Attainment"
                disabled={mutation.isPending || fatherFormDisable}
                placeholder="Select father highest education"
                options={[
                  { label: "Elementary", value: "Elementary" },
                  { label: "High School", value: "High School" },
                  { label: "College", value: "College" },
                  { label: "Alternative Learning System (ALS)", value: "ALS" },
                  { label: "TESDA / Technical-Vocational", value: "TESDA" },
                  { label: "N/A", value: "N/A" },
                ]}
                icon={UserRound}
                motionProps={{
                  transition: { duration: 0.3, delay: 0.2 },
                }}
              />
              <FormInputField
                control={fbForm.control}
                name="fatherTotalParentsTaxableIncome"
                label="Taxable Income"
                type="text"
                icon={PhilippinePeso}
                disabled={mutation.isPending || fatherFormDisable}
                placeholder="Enter your father taxable income"
                motionProps={{
                  transition: { duration: 0.3, delay: 0.1 },
                }}
              />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 ">
              <h3 className="text-base font-medium flex gap-2 items-center">
                Mother Information
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
              <FormField
                control={fbForm.control}
                name="motherStatus"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Mother Status</FormLabel> */}
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full lg:w-[unset]">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Separated">Separated</SelectItem>
                          <SelectItem value="Living">Living</SelectItem>
                          <SelectItem value="Deceased">Deceased</SelectItem>
                          <SelectItem value="Unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 bg-gradient-to-br to-card from-card/50 lg:p-6 p-4  rounded-lg">
              <FormInputField
                control={fbForm.control}
                name="motherFullName"
                label="Full Name"
                type="text"
                icon={UserRound}
                disabled={mutation.isPending || motherFormDisable}
                placeholder="Enter your mother's full name"
                motionProps={{
                  transition: { duration: 0.3, delay: 0.1 },
                }}
              />
              <FormInputField
                control={fbForm.control}
                name="motherAddress"
                label="Address"
                type="text"
                icon={Map}
                disabled={mutation.isPending || motherFormDisable}
                placeholder="Ener your mother's address"
                motionProps={{
                  transition: { duration: 0.3, delay: 0.1 },
                }}
              />

              <FormPhoneField
                control={fbForm.control}
                name="motherContactNumber"
                label="Contact number"
                disabled={mutation.isPending || motherFormDisable}
                motionProps={{
                  transition: { duration: 0.3, delay: 0.2 },
                }}
              />
              <FormInputField
                control={fbForm.control}
                name="motherOccupation"
                label="Occupation"
                type="text"
                icon={Briefcase}
                disabled={mutation.isPending || motherFormDisable}
                placeholder="Ener your mother occupation"
                motionProps={{
                  transition: { duration: 0.3, delay: 0.1 },
                }}
              />
              {/* mother Highest Education */}
              <FormSelectField
                control={fbForm.control}
                name="motherHighestEducation"
                label="Highest Education Attainment"
                disabled={mutation.isPending || motherFormDisable}
                placeholder="Select mother highest education"
                options={[
                  { label: "Elementary", value: "Elementary" },
                  { label: "High School", value: "High School" },
                  { label: "College", value: "College" },
                  { label: "Alternative Learning System (ALS)", value: "ALS" },
                  { label: "TESDA / Technical-Vocational", value: "TESDA" },
                  { label: "N/A", value: "N/A" },
                ]}
                icon={UserRound}
                motionProps={{
                  transition: { duration: 0.3, delay: 0.2 },
                }}
              />
              <FormInputField
                control={fbForm.control}
                name="motherTotalParentsTaxableIncome"
                label="Taxable Income"
                type="text"
                icon={PhilippinePeso}
                disabled={mutation.isPending || motherFormDisable}
                placeholder="Enter your mother taxable income"
                motionProps={{
                  transition: { duration: 0.3, delay: 0.1 },
                }}
              />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 ">
              <h3 className="text-base font-medium flex gap-2 items-center">
                Guardian Information
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 bg-gradient-to-br to-card from-card/50 lg:p-6 p-4  rounded-lg">
              <FormInputField
                control={fbForm.control}
                name="guardianFullName"
                label="Full Name"
                type="text"
                icon={UserRound}
                disabled={mutation.isPending || checked}
                placeholder="Enter your guardian's full name"
                motionProps={{
                  transition: { duration: 0.3, delay: 0.1 },
                }}
              />
              <FormInputField
                control={fbForm.control}
                name="guardianAddress"
                label="Address"
                type="text"
                icon={Map}
                disabled={mutation.isPending || checked}
                placeholder="Ener your guardian's address"
                motionProps={{
                  transition: { duration: 0.3, delay: 0.1 },
                }}
              />

              <FormPhoneField
                control={fbForm.control}
                name="guardianContactNumber"
                label="Contact number"
                disabled={mutation.isPending || checked}
                motionProps={{
                  transition: { duration: 0.3, delay: 0.2 },
                }}
              />
              <FormInputField
                control={fbForm.control}
                name="guardianOccupation"
                label="Occupation"
                type="text"
                icon={Briefcase}
                disabled={mutation.isPending || checked}
                placeholder="Ener your guardian occupation"
                motionProps={{
                  transition: { duration: 0.3, delay: 0.1 },
                }}
              />
              {/* guardian Highest Education */}
              <FormSelectField
                control={fbForm.control}
                name="guardianHighestEducation"
                label="Highest Education Attainment"
                disabled={mutation.isPending || checked}
                placeholder="Select guardian highest education"
                options={[
                  { label: "Elementary", value: "Elementary" },
                  { label: "High School", value: "High School" },
                  { label: "College", value: "College" },
                  { label: "Alternative Learning System (ALS)", value: "ALS" },
                  { label: "TESDA / Technical-Vocational", value: "TESDA" },
                  { label: "N/A", value: "N/A" },
                ]}
                icon={UserRound}
                motionProps={{
                  transition: { duration: 0.3, delay: 0.2 },
                }}
              />
              <FormInputField
                control={fbForm.control}
                name="guardianTotalParentsTaxableIncome"
                label="Taxable Income"
                type="text"
                icon={PhilippinePeso}
                disabled={mutation.isPending || checked}
                placeholder="Enter your guardian taxable income"
                motionProps={{
                  transition: { duration: 0.3, delay: 0.1 },
                }}
              />
            </div>
          </div>
          <div className="w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium">Sibling(s) Information</h3>
                <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-border to-transparent" />
              </div>

              <Button
                size="sm"
                type="button"
                className="w-full sm:w-auto"
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
                    className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 bg-card/30 p-3 rounded-lg"
                  >
                    {/* Inputs wrapper */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                      {/* Full Name */}
                      <FormField
                        control={fbForm.control}
                        name={`siblings.${index}.fullName`}
                        render={({ field }) => (
                          <FormItem className="flex flex-col w-full">
                            <FormControl>
                              <Input
                                placeholder="Full name"
                                {...field}
                                className="w-full bg-card"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Age */}
                      <FormField
                        control={fbForm.control}
                        name={`siblings.${index}.age`}
                        render={({ field }) => (
                          <FormItem className="flex flex-col w-full">
                            <FormControl>
                              <Input
                                placeholder="Age"
                                {...field}
                                className="w-full bg-card"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Occupation */}
                      <FormField
                        control={fbForm.control}
                        name={`siblings.${index}.occupation`}
                        render={({ field }) => (
                          <FormItem className="flex flex-col w-full">
                            <FormControl>
                              <Input
                                {...field}
                                className="w-full bg-card"
                                placeholder="Occupation"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Remove button */}
                    <div className="flex justify-end sm:justify-center sm:items-center">
                      <Button
                        size="sm"
                        variant="destructive"
                        className="w-full sm:w-auto"
                        onClick={() => siblings.remove(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <AnimatePresence>
            {fbIsChanged && (
              <div className="sticky bottom-16 lg:bottom-0 ">
                <motion.div
                  className="bg-gradient-to-t from-background via-background/50 to-transparent w-full flex justify-center items-center py-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      size="lg"
                      className="cursor-pointer"
                      type="submit"
                      disabled={mutation.isPending}
                    >
                      <Check />
                      {mutation.isPending ? "Saving..." : "Save Changes"}
                      {mutation.isPending && (
                        <Loader className="animate-spin" />
                      )}
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </form>
      </Form>
    </div>
  );
}
