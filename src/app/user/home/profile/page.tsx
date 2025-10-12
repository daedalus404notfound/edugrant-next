"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useUserStore } from "@/store/useUserStore";
import { Tabs } from "@/components/ui/vercel-tabs";
import { useUpdateProfile } from "@/hooks/user/postProfileUpdate";
import { Skeleton } from "@/components/ui/skeleton";
import PersonalProfile from "./personal";
import FamilyForm from "./family";
import SecurityForm from "./security";
export default function Profile() {
  const { user, loadingUser: useLoading } = useUserStore();
  const { form, siblings, handleSubmit, loading, isChanged } =
    useUpdateProfile(user);

  const [tab, setTab] = useState("personal");

  const tabs = [
    { id: "personal", label: "Student Information", indicator: null },
    { id: "family", label: "Family Composition", indicator: null },
    { id: "security", label: "Account Security", indicator: null },
  ];
  return (
    <div className=" z-10 bg-background lg:px-4 lg:min-h-[calc(100vh-80px)] min-h-[calc(100dvh-134px)] ">
      <div className=" lg:pb-10   w-full p-2 lg:p-0 mx-auto">
        <div className="py-8 space-y-8  mt-20 lg:w-[60%] w-full mx-auto">
          <div className="overflow-y-hidden overflow-x-auto py-3 no-scrollbar ">
            <Tabs tabs={tabs} onTabChange={(tabId) => setTab(tabId)} />
          </div>
          <div className="">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                {tab === "personal" && <PersonalProfile form={form} />}

                {tab === "family" && (
                  <FamilyForm form={form} siblings={siblings} />
                )}
                <AnimatePresence>
                  {isChanged && (
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
                            disabled={loading}
                          >
                            <Check />
                            {loading ? "Saving..." : "Save Changes"}
                            {loading && <Loader className="animate-spin" />}
                          </Button>
                        </motion.div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </form>
            </Form>

            {tab === "security" && <SecurityForm />}
          </div>
        </div>
      </div>
    </div>
  );
}

//  <Button
//    size="lg"
//    className="cursor-pointer"
//    onClick={async () => {
//      console.log("Button clicked - starting validation");

//      // Get current form values
//      const currentValues = form.getValues();
//      console.log("Current form values:", currentValues);

//      // Manually validate with Zod schema
//      try {
//        const validationResult = UserSchema.parse(currentValues);
//        console.log("✅ Zod validation passed:", validationResult);

//        // Now try react-hook-form validation
//        const isValid = await form.trigger();
//        console.log("React Hook Form validation result:", isValid);

//        if (isValid) {
//          console.log("Calling handleSubmit with validated data");
//          handleSubmit(currentValues);
//        } else {
//          console.log("❌ React Hook Form validation failed");
//          const formErrors = form.formState.errors;
//          console.log("Form errors:", formErrors);
//        }
//      } catch (zodError) {
//        console.log("❌ Zod validation failed:", zodError);
//        if (zodError instanceof z.ZodError) {
//          console.log("Detailed Zod errors:", zodError.errors);
//          zodError.errors.forEach((error) => {
//            console.log(`Field: ${error.path.join(".")} - ${error.message}`);
//          });
//        }
//      }
//    }}
//    disabled={loading}
//  >
//    <Check />
//    {loading ? "Saving..." : "Save Changes"}
//    {loading && <Loader className="animate-spin" />}
//  </Button>;
