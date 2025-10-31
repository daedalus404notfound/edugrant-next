// "use client";

// import { Ring } from "ldrs/react";
// import "ldrs/react/Ring.css";
// import { GitCompare, GitFork, GitMerge, GitPullRequest } from "lucide-react";

// import { useParams, useRouter } from "next/navigation";
// import { useState } from "react";
// import {
//   Timeline,
//   TimelineContent,
//   TimelineDate,
//   TimelineHeader,
//   TimelineIndicator,
//   TimelineItem,
//   TimelineSeparator,
//   TimelineTitle,
// } from "@/components/ui/timeline";

// import useGetStaffLogs from "@/hooks/admin/getStaffByHeadById";
// import { useAdminStore } from "@/store/adminUserStore";
// import { Button } from "@/components/ui/button";
// import {
//   Mail,
//   UserRound,
//   Check,
//   Loader,
//   UserRoundCog,
//   ArrowLeft,
//   CircleUserRound,
//   UserRoundCheck,
//   VenusAndMars,
//   Calendar1,
//   Activity,
// } from "lucide-react";
// import { Tabs } from "@/components/ui/vercel-tabs";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { useUpdateProfileStaff } from "@/hooks/updateStaffProfile";
// import { Input } from "@/components/ui/input";
// import { AnimatePresence, motion } from "motion/react";
// import { DragAndDropAreaProfile } from "@/components/ui/upload-profile";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { format } from "date-fns";
// import { ProfileInfoSkeleton } from "../../all-application/[id]/profile-skeleton";
// import { TourStep } from "@/components/tour-2/tour-step";
// import { Badge } from "@/components/ui/badge";
// export default function InterceptManageStaff() {
//   const router = useRouter();
//   const params = useParams();
//   const staffId = params.id as string;
//   const { data, isLoading } = useGetStaffLogs(staffId);
//   const {
//     form,
//     handleSubmit,
//     reset,
//     setReset,
//     loading: loadingUpdate,
//     isChanged,
//   } = useUpdateProfileStaff(data);
//   const items = [
//     {
//       id: 1,

//       title: "Personal Information",
//     },
//     {
//       id: 2,

//       title: "Account Details",
//     },
//     {
//       id: 3,

//       title: "Activity logs",
//     },
//   ];

//   return (
//     <div className="mx-auto w-[80%] lg:py-10  py-4 space-y-8">
//       <Button variant="secondary" onClick={() => router.back()}>
//         <ArrowLeft /> Back
//       </Button>
//       {isLoading ? (
//         <ProfileInfoSkeleton />
//       ) : (
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(handleSubmit)}>
//             <div>
//               <div className="flex justify-between items-end">
//                 <div className="relative flex-1 flex flex-col items-start gap-4   py-4 ">
//                   <FormField
//                     control={form.control}
//                     name="profileImg.publicUrl"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="flex justify-between items-center">
//                           <FormMessage />
//                         </FormLabel>
//                         <FormControl>
//                           <DragAndDropAreaProfile
//                             isSuccess={reset}
//                             setIsSuccess={setReset}
//                             label="backdrop image"
//                             accept={["image/png", "image/jpeg"]}
//                             initialImageUrl={
//                               data?.profileImg?.publicUrl ||
//                               "https://github.com/shadcn.png"
//                             }
//                             onFilesChange={(files) =>
//                               field.onChange(
//                                 files[0]
//                                   ? files[0]
//                                   : data?.profileImg?.publicUrl ||
//                                       "https://github.com/shadcn.png"
//                               )
//                             } // Single file
//                           />
//                         </FormControl>
//                       </FormItem>
//                     )}
//                   />

//                   <div>
//                     <span className="flex gap-3 items-center">
//                       <h1 className="text-xl font-medium">
//                         {data?.lName || ""}, {data?.fName || ""}{" "}
//                         {data?.mName || ""}
//                       </h1>
//                       <Badge variant="secondary">ISPSU HEAD</Badge>
//                     </span>
//                     <p className="text-muted-foreground text-sm mt-2">
//                       Member Since:{" "}
//                       {data?.dateCreated && format(data?.dateCreated, "PPP p")}
//                     </p>
//                   </div>
//                 </div>{" "}
//                 <div className="">
//                   <div className="flex items-end ">
//                     <TourStep stepId="activate-2">
//                       <FormField
//                         control={form.control}
//                         name="validated"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormControl>
//                               <Select
//                                 value={field.value}
//                                 onValueChange={field.onChange}
//                               >
//                                 <SelectTrigger>
//                                   <SelectValue
//                                     placeholder={
//                                       data?.validated?.toString() === "true"
//                                         ? "Activated"
//                                         : "Deactivated"
//                                     }
//                                   />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                   {data?.validated?.toString() === "false" ? (
//                                     <SelectItem value="true">
//                                       Activate
//                                     </SelectItem>
//                                   ) : (
//                                     <SelectItem value="false">
//                                       Deactivated
//                                     </SelectItem>
//                                   )}
//                                 </SelectContent>
//                               </Select>
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </TourStep>
//                   </div>
//                 </div>
//               </div>
//               <div className="space-y-6  pt-4 pb-8 rounded-lg w-3/4">
//                 <div className="">
//                   <h3 className="text-base font-medium flex gap-2 items-center py-3">
//                     <UserRoundCog className="h-4.5 w-4.5" /> Personal
//                     Information
//                   </h3>
//                   <div className="w-full h-[2px] flex-1 bg-gradient-to-r from-border to-transparent" />
//                 </div>
//                 <div className="space-y-12">
//                   <FormField
//                     control={form.control}
//                     name="fName"
//                     render={({ field }) => (
//                       <FormItem className="flex justify-between">
//                         <FormLabel className="text-muted-foreground">
//                           First Name
//                         </FormLabel>
//                         <FormControl className="w-md">
//                           <div className="flex items-center">
//                             <Input {...field} className="rounded-r-none" />
//                             <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
//                               <Button variant="ghost">
//                                 <UserRound />
//                               </Button>
//                             </span>
//                           </div>
//                         </FormControl>

//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="mName"
//                     render={({ field }) => (
//                       <FormItem className="flex justify-between">
//                         <FormLabel className="text-muted-foreground">
//                           Middle Name
//                         </FormLabel>
//                         <FormControl className="w-md">
//                           <div className="flex items-center">
//                             <Input
//                               placeholder="(Optional)"
//                               {...field}
//                               className="rounded-r-none"
//                             />
//                             <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
//                               <Button variant="ghost">
//                                 <CircleUserRound />
//                               </Button>
//                             </span>
//                           </div>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="lName"
//                     render={({ field }) => (
//                       <FormItem className="flex justify-between">
//                         <FormLabel className="text-muted-foreground">
//                           Last Name
//                         </FormLabel>
//                         <FormControl className="w-md">
//                           <div className="flex items-center">
//                             <Input
//                               placeholder=""
//                               className="rounded-r-none"
//                               {...field}
//                             />
//                             <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
//                               <Button variant="ghost">
//                                 <UserRoundCheck />
//                               </Button>
//                             </span>
//                           </div>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="Account.email"
//                     render={({ field }) => (
//                       <FormItem className="flex justify-between">
//                         <FormLabel className="text-muted-foreground">
//                           Email
//                         </FormLabel>
//                         <FormControl className="w-md">
//                           <div className="flex items-center">
//                             <Input
//                               placeholder=""
//                               className="rounded-r-none"
//                               {...field}
//                               readOnly
//                             />
//                             <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
//                               <Button variant="ghost">
//                                 <Mail />
//                               </Button>
//                             </span>
//                           </div>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="gender"
//                     render={({ field }) => (
//                       <FormItem className="flex justify-between">
//                         <FormLabel className="text-muted-foreground">
//                           Gender
//                         </FormLabel>
//                         <FormControl className="w-md">
//                           <div className="flex items-center">
//                             <Select
//                               onValueChange={field.onChange}
//                               value={field.value}
//                             >
//                               <SelectTrigger className="rounded-r-none w-full">
//                                 <SelectValue placeholder="Select" />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 <SelectItem value="Male">Male</SelectItem>
//                                 <SelectItem value="Female">Female</SelectItem>
//                               </SelectContent>
//                             </Select>
//                             <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
//                               <Button variant="ghost">
//                                 <VenusAndMars />
//                               </Button>
//                             </span>
//                           </div>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>
//             </div>

//             <AnimatePresence>
//               {isChanged && (
//                 <div className="sticky bottom-16 lg:bottom-0 ">
//                   <motion.div
//                     className="bg-gradient-to-t from-background via-background/50 to-transparent w-full flex justify-center items-center py-8"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <motion.div
//                       initial={{ opacity: 0, y: 30 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: 30 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <Button
//                         size="lg"
//                         type="submit"
//                         className="cursor-pointer"
//                         disabled={loadingUpdate}
//                       >
//                         <Check />
//                         {loadingUpdate ? "Saving..." : "Save Changes"}
//                         {loadingUpdate && <Loader className="animate-spin" />}
//                       </Button>
//                     </motion.div>
//                   </motion.div>
//                 </div>
//               )}
//             </AnimatePresence>
//           </form>
//         </Form>
//       )}
//     </div>
//   );
// }

// // <div className="mx-auto w-[95%] lg:py-10  pt-3 space-y-8">
// //   <motion.div
// //     className="flex justify-between items-end"
// //     initial={{ opacity: 0, x: -20 }}
// //     animate={{ opacity: 1, x: 0 }}
// //     transition={{ duration: 0.3, delay: 0.4 }}
// //   >
// //     <Button onClick={() => router.back()}>
// //       <ArrowLeft /> Back
// //     </Button>
// //   </motion.div>

// //   <div className="mt-15 lg:w-[60%] min-w-5xl w-full mx-auto">
// //     {loading ? (
// //       <ProfileInfoSkeleton />
// //     ) : (
// //       <Form {...form}>
// //         <form onSubmit={form.handleSubmit(handleSubmit)}>
// //           <div className=" w-full space-y-12">
// //             <div className="space-y-6 bg-card/40 dark:bg-gradient-to-br to-card from-card/50  px-6 pb-8 pt-4 rounded-lg">
// //               <div className="flex items-end">
// //                 <div className="relative flex-1 flex items-end gap-4">
// //                   <FormField
// //                     control={form.control}
// //                     name="profileImg.publicUrl"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel className="flex justify-between items-center">
// //                           <FormMessage />
// //                         </FormLabel>
// //                         <FormControl>
// //                           <DragAndDropAreaProfile
// //                             isSuccess={reset}
// //                             setIsSuccess={setReset}
// //                             label="backdrop image"
// //                             accept={["image/png", "image/jpeg"]}
// //                             initialImageUrl={
// //                               data?.profileImg?.publicUrl ||
// //                               "https://github.com/shadcn.png"
// //                             }
// //                             onFilesChange={(files) =>
// //                               field.onChange(
// //                                 files[0]
// //                                   ? files[0]
// //                                   : data?.profileImg?.publicUrl ||
// //                                       "https://github.com/shadcn.png"
// //                               )
// //                             } // Single file
// //                           />
// //                         </FormControl>
// //                       </FormItem>
// //                     )}
// //                   />

// //                   <div>
// //                     <h1 className="text-lg font-medium">
// //                       {data?.lName || ""}, {data?.fName || ""}{" "}
// //                       {data?.mName || ""}
// //                     </h1>
// //                     <p className="text-muted-foreground text-sm">
// //                       Member Since:{" "}
// //                       {data?.dateCreated &&
// //                         format(data?.dateCreated, "PPP p")}
// //                     </p>
// //                   </div>
// //                 </div>
// //                 <TourStep stepId="activate-2">
// //                   <FormField
// //                     control={form.control}
// //                     name="validated"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormControl>
// //                           <Select
// //                             value={field.value}
// //                             onValueChange={field.onChange}
// //                           >
// //                             <SelectTrigger>
// //                               <SelectValue
// //                                 placeholder={
// //                                   data?.validated?.toString() === "true"
// //                                     ? "Activated"
// //                                     : "Deactivated"
// //                                 }
// //                               />
// //                             </SelectTrigger>
// //                             <SelectContent>
// //                               {data?.validated?.toString() === "false" ? (
// //                                 <SelectItem value="true">Activate</SelectItem>
// //                               ) : (
// //                                 <SelectItem value="false">
// //                                   Deactivated
// //                                 </SelectItem>
// //                               )}
// //                             </SelectContent>
// //                           </Select>
// //                         </FormControl>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />
// //                 </TourStep>
// //               </div>
// //             </div>
// //             <div className="space-y-6 bg-card/40 dark:bg-gradient-to-br to-card from-card/50  px-6 pb-8 pt-4 rounded-lg">
// //               <div className="">
// //                 <h3 className="text-base font-medium flex gap-2 items-center py-3">
// //                   <UserRoundCog className="h-4.5 w-4.5" /> Personal
// //                   Information
// //                 </h3>
// //                 <div className="w-full h-[2px] flex-1 bg-gradient-to-r from-border to-transparent" />
// //               </div>
// //               <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
// //                 <FormField
// //                   control={form.control}
// //                   name="fName"
// //                   render={({ field }) => (
// //                     <FormItem className="">
// //                       <FormLabel className="text-muted-foreground">
// //                         First Name
// //                       </FormLabel>
// //                       <FormControl>
// //                         <div className="flex items-center">
// //                           <Input {...field} className="rounded-r-none" />
// //                           <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
// //                             <Button variant="ghost">
// //                               <UserRound />
// //                             </Button>
// //                           </span>
// //                         </div>
// //                       </FormControl>

// //                       <FormMessage />
// //                     </FormItem>
// //                   )}
// //                 />
// //                 <FormField
// //                   control={form.control}
// //                   name="mName"
// //                   render={({ field }) => (
// //                     <FormItem className="">
// //                       <FormLabel className="text-muted-foreground">
// //                         Middle Name
// //                       </FormLabel>
// //                       <FormControl className="">
// //                         <div className="flex items-center">
// //                           <Input
// //                             placeholder="(Optional)"
// //                             {...field}
// //                             className="rounded-r-none"
// //                           />
// //                           <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
// //                             <Button variant="ghost">
// //                               <CircleUserRound />
// //                             </Button>
// //                           </span>
// //                         </div>
// //                       </FormControl>
// //                       <FormMessage />
// //                     </FormItem>
// //                   )}
// //                 />

// //                 <FormField
// //                   control={form.control}
// //                   name="lName"
// //                   render={({ field }) => (
// //                     <FormItem className="col-span-2">
// //                       <FormLabel className="text-muted-foreground">
// //                         Last Name
// //                       </FormLabel>
// //                       <FormControl className="">
// //                         <div className="flex items-center">
// //                           <Input
// //                             placeholder=""
// //                             className="rounded-r-none"
// //                             {...field}
// //                           />
// //                           <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
// //                             <Button variant="ghost">
// //                               <UserRoundCheck />
// //                             </Button>
// //                           </span>
// //                         </div>
// //                       </FormControl>
// //                       <FormMessage />
// //                     </FormItem>
// //                   )}
// //                 />

// //                 <FormField
// //                   control={form.control}
// //                   name="Account.email"
// //                   render={({ field }) => (
// //                     <FormItem className="">
// //                       <FormLabel className="text-muted-foreground">
// //                         Email
// //                       </FormLabel>
// //                       <FormControl className="">
// //                         <div className="flex items-center">
// //                           <Input
// //                             placeholder=""
// //                             className="rounded-r-none"
// //                             {...field}
// //                             readOnly
// //                           />
// //                           <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
// //                             <Button variant="ghost">
// //                               <Mail />
// //                             </Button>
// //                           </span>
// //                         </div>
// //                       </FormControl>
// //                       <FormMessage />
// //                     </FormItem>
// //                   )}
// //                 />

// //                 <FormField
// //                   control={form.control}
// //                   name="gender"
// //                   render={({ field }) => (
// //                     <FormItem className="">
// //                       <FormLabel className="text-muted-foreground">
// //                         Gender
// //                       </FormLabel>
// //                       <FormControl>
// //                         <div className="flex items-center">
// //                           <Select
// //                             onValueChange={field.onChange}
// //                             value={field.value}
// //                           >
// //                             <SelectTrigger className="rounded-r-none w-full">
// //                               <SelectValue placeholder="Select" />
// //                             </SelectTrigger>
// //                             <SelectContent>
// //                               <SelectItem value="Male">Male</SelectItem>
// //                               <SelectItem value="Female">Female</SelectItem>
// //                             </SelectContent>
// //                           </Select>
// //                           <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
// //                             <Button variant="ghost">
// //                               <VenusAndMars />
// //                             </Button>
// //                           </span>
// //                         </div>
// //                       </FormControl>
// //                       <FormMessage />
// //                     </FormItem>
// //                   )}
// //                 />
// //               </div>
// //             </div>

// //             <AnimatePresence>
// //               {isChanged && (
// //                 <div className="sticky bottom-16 lg:bottom-0 ">
// //                   <motion.div
// //                     className="bg-gradient-to-t from-background via-background/50 to-transparent w-full flex justify-center items-center py-8"
// //                     initial={{ opacity: 0 }}
// //                     animate={{ opacity: 1 }}
// //                     exit={{ opacity: 0 }}
// //                     transition={{ duration: 0.3 }}
// //                   >
// //                     <motion.div
// //                       initial={{ opacity: 0, y: 30 }}
// //                       animate={{ opacity: 1, y: 0 }}
// //                       exit={{ opacity: 0, y: 30 }}
// //                       transition={{ duration: 0.3 }}
// //                     >
// //                       <Button
// //                         size="lg"
// //                         type="submit"
// //                         className="cursor-pointer"
// //                         disabled={loadingUpdate}
// //                       >
// //                         <Check />
// //                         {loadingUpdate ? "Saving..." : "Save Changes"}
// //                         {loadingUpdate && <Loader className="animate-spin" />}
// //                       </Button>
// //                     </motion.div>
// //                   </motion.div>
// //                 </div>
// //               )}
// //             </AnimatePresence>
// //           </div>
// //         </form>
// //       </Form>
// //     )}
// //   </div>
// // </div>;
