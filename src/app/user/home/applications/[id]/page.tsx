// "use client";
// import "ldrs/react/Ring.css";
// import {
//   Drawer,
//   DrawerContent,
//   DrawerDescription,
//   DrawerHeader,
//   DrawerTitle,
// } from "@/components/ui/drawer";
// import { useParams } from "next/navigation";
// import { useRouter } from "next/navigation";
// import { useIsMobile } from "@/hooks/use-mobile";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import useClientApplications from "@/hooks/user/getApplications";
// import TitleReusable from "@/components/ui/title";
// import { Ban, CircleAlert, CircleCheck, Clock, PenLine, X } from "lucide-react";

import InterceptManageApplicationClient from "../../@modal/(.)applications/[id]/page";

// import { Separator } from "@/components/ui/separator";

// import { useUserStore } from "@/store/useUserStore";
// import { Tabs } from "@/components/ui/vercel-tabs";
// import DocsStudent from "../../@modal/(.)applications/meow/docs";
// import EditApplication from "../../@modal/(.)applications/meow/update-application-docs";
// import { Skeleton } from "@/components/ui/skeleton";
// import ScholarshipModal from "@/components/ui/scholarship-modal";
// import ModalHeader from "@/components/ui/modal-header";
// import ScholarshipModalLoading from "@/components/ui/scholarship-modal-loading";

// export default function InterceptManageApplicationClient() {
//   const [activeSection, setActiveSection] = useState("documents");
//   const [edit, setEdit] = useState(false);
//   const router = useRouter();
//   const params = useParams();
//   const [open, setOpen] = useState(true);
//   const id = params.id as string;

//   const user = useUserStore((state) => state.user);
//   const userId = user?.accountId;
//   const HandleCloseDrawer = (value: boolean) => {
//     setOpen(value);
//     if (!value) {
//       setTimeout(() => {
//         router.back();
//       }, 300);
//     }
//   };

//   const { data, loading, setUpdateDocument } = useClientApplications({
//     applicationId: id,
//     userId: userId?.toString(),
//   });

//   // const navigationTabs = [
//   //   { id: "documents", label: "Submitted Documents", indicator: null },

//   //   { id: "scholarship", label: "Scholarship Details", indicator: null },
//   // ];
//   const steps = [
//     {
//       step: 1,
//       title: "Step One",
//       description: "Choose Scholarship",
//     },
//     {
//       step: 2,
//       title: "Step Two",
//       description: "Upload Documents",
//     },
//     {
//       step: 3,
//       title: "Step Three",
//       description: "Wait for Approval",
//     },
//   ];
//   return (
//     <div
//       className={`lg:w-[56%] bg-card w-[98%] mx-auto outline-0 border-0 lg:p-1  ${
//         loading ? " lg:h-[75dvh] h-[68dvh]" : "h-auto !max-h-[90dvh]"
//       }`}
//     >
//       <ModalHeader HandleCloseDrawer={HandleCloseDrawer} scholarship={false} />
//       <div className=" h-full w-full overflow-auto  bg-background rounded-t-md">
//         {loading ? (
//           <ScholarshipModalLoading />
//         ) : edit ? (
//           <EditApplication
//             data={data[0]}
//             setEdit={setEdit}
//             setUpdateDocument={setUpdateDocument}
//           />
//         ) : (
//           <div>
//             <div className="lg:p-6 p-4 space-y-6">
//               {data[0]?.status === "DECLINED" && (
//                 <div className="relative z-20 bg-red-700/10 rounded-md  px-4 py-3 text-red-500">
//                   <p className="text-sm">
//                     <CircleAlert
//                       className="me-3 -mt-0.5 inline-flex opacity-60"
//                       size={16}
//                       aria-hidden="true"
//                     />
//                     Your application has been rejected
//                   </p>
//                 </div>
//               )}

//               {data[0]?.status === "APPROVED" && (
//                 <div className="relative z-20 bg-green-700/10 rounded-md  px-4 py-3 text-green-500">
//                   <p className="text-sm">
//                     <CircleCheck
//                       className="me-3 -mt-0.5 inline-flex opacity-60"
//                       size={16}
//                       aria-hidden="true"
//                     />
//                     Your application has been approved
//                   </p>
//                 </div>
//               )}

//               {data[0]?.status === "PENDING" && (
//                 <div className="relative z-20 bg-yellow-700/10 rounded-md  px-4 py-3 text-yellow-500">
//                   <p className="text-sm">
//                     <Clock
//                       className="me-3 -mt-0.5 inline-flex opacity-60"
//                       size={16}
//                       aria-hidden="true"
//                     />
//                     Your application is still pending
//                   </p>
//                 </div>
//               )}

//               {data[0]?.status === "BLOCKED" && (
//                 <div className="relative z-20 bg-gray-700/10 rounded-md  px-4 py-3 text-gray-500">
//                   <p className="text-sm">
//                     <Ban
//                       className="me-3 -mt-0.5 inline-flex opacity-60"
//                       size={16}
//                       aria-hidden="true"
//                     />
//                     Your application has been blocked
//                   </p>
//                 </div>
//               )}
//               {data[0]?.status === "INTERVIEW" && (
//                 <div className="relative z-20 bg-green-700/10 rounded-md  px-4 py-3 text-green-500">
//                   <p className="text-sm">
//                     <CircleCheck
//                       className="me-3 -mt-0.5 inline-flex opacity-60"
//                       size={16}
//                       aria-hidden="true"
//                     />
//                     Your application has been approved for interview
//                   </p>
//                 </div>
//               )}

//               <DocsStudent data={data[0]} />
//             </div>

//             <div className="sticky bottom-0 z-50">
//               <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
//               <div className="flex gap-3 bg-background lg:p-4 p-2">
//                 <Button
//                   className="flex-1"
//                   onClick={() => setEdit(true)}
//                   disabled={data[0]?.status !== "PENDING"}
//                 >
//                   <PenLine /> Edit Documents
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
export default function Meow() {
  return <InterceptManageApplicationClient />;
}
