"use client";
import {
  Activity,
  CalendarX2,
  CheckCheck,
  Edit,
  ExternalLink,
  File,
  FolderOpen,
  LoaderCircleIcon,
  Trash2,
  UsersRound,
  Wallet,
  X,
} from "lucide-react";

import "ldrs/react/Ring.css";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import EditScholarship from "./edit-form";
import axios from "axios";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import useScholarshipUserByIdAdmin from "@/hooks/admin/getScholarshipData";
import { format } from "date-fns";
import { BGPattern } from "@/components/ui/grid";
import AnimatedNumberCountdown from "@/components/ui/countdown";

export default function InterceptManageScholarship() {
  const [editMode, setEditMode] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const id = params.id as string;
  const { data } = useScholarshipUserByIdAdmin(id);

  const title = data?.scholarshipTitle || "N/A";
  const deadline = data?.scholarshipDealine;
  const provider = data?.scholarshipProvider || "unknown";
  const description = data?.scholarshipDescription;
  const amount = data?.scholarshipAmount;
  const scholarshipId = data?.scholarshipId;
  const scholarshipCover = data?.scholarshipCover;
  const scholarshipLogo = data?.scholarshipLogo;
  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      router.back();
    }
  };

  const onSubmit = async () => {
    try {
      setDeleteLoading(true);
      console.log(scholarshipId);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/deleteScholarship`,
        { scholarshipId },
        { withCredentials: true }
      );

      if (res.status === 200) {
        console.log("Scholarship deleted successfully!");
        toast("Scholarship has been deleted", {
          description:
            "The scholarship opportunity has been successfully deleted to the system.",
        });
        setDeleteLoading(false);
        setOpenAlert(false);
        setOpen(false);
        router.back();
      }
    } catch (error) {
      console.error(error);
      setDeleteLoading(false);
      setOpenAlert(false);
      setOpen(false);
      router.back();
    }
  };
  const summaryCards = [
    {
      label: "Applicants",
      data: 1,
      badge: 1,
      icon: <UsersRound />,
    },
    {
      label: "Approved",
      data: 1,
      badge: 1,
      icon: <CheckCheck />,
    },
    {
      label: "Pending",
      data: 1,
      badge: 1,
      icon: <X />,
      color: "yellow",
    },
  ];
  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent className="max-w-[1000px] w-full mx-auto h-[95vh] outline-0 border-0">
        <DrawerHeader className="sr-only">
          <DrawerTitle className="text-2xl">Edit Mode</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        {/* <BGPattern variant="dots" mask="fade-center" /> */}
        {!editMode ? (
          <div className="relative h-full w-full p-2 overflow-auto no-scrollbar pt-15">
            <div className="absolute top-0 left-0 h-60 w-full brightness-10  bg-black mask-gradient flex">
              <img
                className="w-full h-full object-cover  "
                src={scholarshipCover}
                alt=""
              />
            </div>

            <div className="relative gap-5 p-4 z-10">
              <div className=" space-y-8">
                <div className="flex flex-col items-center  w-full p-4 ">
                  <img
                    className="size-35 object-cover rounded-full  shadow-2xl shadow-background"
                    src={scholarshipLogo}
                    alt=""
                  />
                  <h1 className="mt-2 text-2xl font-semibold">{title}</h1>
                  <h3 className="mt-1">{provider}</h3>
                  <Button className=" mt-2 underline" variant="link">
                    View Image Details
                    <ExternalLink />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-5">
                  {summaryCards.map((meow, index) => (
                    <div
                      key={index}
                      className="relative  z-10 flex flex-col justify-between  rounded-lg  shadow-sm border border-green-950/80 p-3 bg-background"
                    >
                      {/* <BGPattern variant="dots" mask="fade-edges" /> */}
                      <div className="flex justify-between items-start ">
                        <span className="border p-1.5 rounded-md bg-card ">
                          {meow.icon}
                        </span>
                        <p className="flex text-xs border p-1 rounded-sm bg-green-800/10 text-green-600">
                          + {meow.badge} today
                        </p>
                      </div>
                      <div className="flex justify-between items-end">
                        <p className="text-sm text-muted-foreground">
                          {meow.label}
                        </p>
                        <span className="text-3xl font-semibold ">
                          {/* {loading ? (
                          <Ring
                            size={25}
                            stroke={2}
                            speed={2}
                            bgOpacity={0}
                            color="yellow"
                          />
                        ) : (
                          filterApplication.length
                        )} */}
                          0
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5">
                  <p className="text-sm text-muted-foreground">
                    About this scholarship
                  </p>
                  <p className="line-clamp-4">{description}</p>
                </div>
                {deadline && (
                  <AnimatedNumberCountdown endDate={new Date(deadline)} />
                )}
                <div className="grid grid-cols-1 gap-3">
                  <div className="relative border lg:p-4 p-2.5 rounded-md bg-background/50 flex justify-between items-end">
                    <div className="space-y-3">
                      <h1 className="text-xs text-muted-foreground">Amount</h1>
                      <Wallet />
                    </div>
                    <p className="line-clamp-4 text-2xl text-green-800 font-semibold">
                      ₱{amount}
                    </p>
                  </div>
                  <div className="border lg:p-4 p-2.5 rounded-md bg-background/50 flex justify-between items-end">
                    <div className="space-y-3">
                      <h1 className="text-xs text-muted-foreground">
                        Deadline
                      </h1>
                      <CalendarX2 />
                    </div>
                    <p className="line-clamp-4 text-2xl text-green-800 font-semibold">
                      {deadline && format(deadline, "PPP")}
                    </p>
                  </div>{" "}
                  <div className="border lg:p-4 p-2.5 rounded-md bg-background/50  flex justify-between items-end">
                    <div className="space-y-3">
                      <h1 className="text-xs text-muted-foreground">
                        Required Documents
                      </h1>
                      <File />
                    </div>
                    <p className="line-clamp-4 text-2xl text-green-800 font-semibold">
                      {data?.scholarshipDocuments.length}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h1 className="text-sm text-muted-foreground">
                    Required Documents
                  </h1>
                  <div className="grid grid-cols-3 gap-5">
                    {data?.scholarshipDocuments.map((meow) => (
                      <div
                        key={meow.label}
                        className="relative flex flex-col justify-center items-center"
                      >
                        <div className="relative size-30 flex justify-center items-center">
                          <BGPattern variant="grid" mask="fade-edges" />

                          <FolderOpen strokeWidth={1.5} size={50} />
                        </div>

                        <h1 className="text-sm line-clamp-1">{meow.label}</h1>
                        <div className="space-x-1.5">
                          <Badge className="mt-2 bg-green-800 text-gray-200 uppercase ">
                            PDF
                          </Badge>
                          <Badge className="mt-2 bg-green-800 text-gray-200 uppercase ">
                            DOCX
                          </Badge>
                          <Badge className="mt-2 bg-green-800 text-gray-200 uppercase ">
                            JPG
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className=" overflow-auto h-full no-scrollbar">
            {data && <EditScholarship data={data} setEditMode={setEditMode} />}
          </div>
        )}
        {!editMode && (
          <div className="p-4 sticky bottom-0 bg-black border-t">
            <div className="flex gap-3">
              <Button
                onClick={() => setEditMode(true)}
                className="flex-1 bg-blue-800 text-white hover:bg-blue-700"
              >
                <Edit /> Edit
              </Button>

              <Button
                className="flex-1"
                variant="destructive"
                onClick={() => setOpenAlert(true)}
              >
                <Trash2 /> Delete
              </Button>
              <Button className="flex-1" variant="outline">
                <Activity /> Generate Report
              </Button>
            </div>

            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={deleteLoading}>
                    Cancel
                  </AlertDialogCancel>
                  <Button onClick={onSubmit} disabled={deleteLoading}>
                    {deleteLoading && (
                      <LoaderCircleIcon
                        className="-ms-1 animate-spin"
                        size={16}
                        aria-hidden="true"
                      />
                    )}{" "}
                    Continue
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}

// <div className="no-scrollbar overflow-auto h-full p-2 gap-3">
//   {/* <div className="bg-card rounded-lg"></div> */}
//   <div className="w-full">
//     <>
//       <div className=" relative flex flex-col justify-center items-center w-full">
//         <img
//           src={scholarshipCover}
//           alt=""
//           className=" object-cover brightness-90 mask-gradient h-60 w-full mb-10"
//         />
//         <div className="absolute -bottom-8 flex flex-col justify-center items-center gap-2">
//           <img
//             src={scholarshipLogo}
//             alt=""
//             className=" rounded-full shadow-sm shadow-black border-emerald-800 size-30 object-cover"
//           />
//           <div className="text-center">
//             <h1 className="text-2xl uppercase  font-semibold">{title}</h1>
//             <h3 className="text-sm text-muted-foreground">{provider}</h3>
//           </div>
//         </div>
//       </div>
//       <div className="mt-13 p-2 space-y-8">
//         <div className="grid lg:grid-cols-3 grid-cols-2 gap-2.5">
//           <div className="border lg:p-4 p-2.5 rounded-md bg-card flex justify-between items-end">
//             <div className="space-y-3">
//               <h1 className="text-xs text-muted-foreground">Amount</h1>
//               <Wallet />
//             </div>
//             <p className="line-clamp-4 text-2xl text-emerald-700 font-semibold">
//               ₱{amount}
//             </p>
//           </div>
//           <div className="border lg:p-4 p-2.5 rounded-md bg-card flex justify-between items-end">
//             <div className="space-y-3">
//               <h1 className="text-xs text-muted-foreground">Deadline</h1>
//               <CalendarX2 />
//             </div>
//             <p className="line-clamp-4 text-2xl text-emerald-700 font-semibold">
//               {deadline && format(deadline, "MM-dd-yyy")}
//             </p>
//           </div>{" "}
//           <div className="border lg:p-4 p-2.5 rounded-md bg-card  lg:flex hidden justify-between items-end">
//             <div className="space-y-3">
//               <h1 className="text-xs text-muted-foreground">
//                 Required Documents
//               </h1>
//               <File />
//             </div>
//             <p className="line-clamp-4 text-2xl text-emerald-700 font-semibold">
//               {data?.scholarshipDocuments.length}
//             </p>
//           </div>
//         </div>

//         <p className="line-clamp-4">{description}</p>
//         <div>
//           <h1 className="text-sm text-muted-foreground">
//             Required Documents
//           </h1>
//           <div className="space-y-2 mt-2">
//             {data?.scholarshipDocuments.map((meow) => (
//               <div
//                 className="p-2.5 border bg-card rounded-sm flex justify-between items-center"
//                 key={meow.label}
//               >
//                 <div>{meow.label}</div>
//                 <div className="flex gap-2">
//                   <Badge className="bg-blue-800 text-gray-200">PDF</Badge>
//                   <Badge className="bg-blue-800 text-gray-200">DOCX</Badge>
//                   <Badge className="bg-blue-800 text-gray-200">JPG</Badge>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   </div>
// </div>;
