"use client";
import {
  Calendar,
  Check,
  Clock,
  Download,
  Edit,
  Loader,
  StickyNote,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import useScholarshipUserByIdAdmin from "@/hooks/admin/getScholarshipData";
import { format } from "date-fns";
import AnimatedNumberCountdown from "@/components/ui/countdown";
import { Separator } from "@/components/ui/separator";
import { BorderBeam } from "@/components/ui/beam";
import useDeleteScholarship from "@/hooks/admin/postDeleteScholarship";

export default function InterceptManageScholarship() {
  const searchParams = useSearchParams();
  const edit = searchParams.get("edit");
  const [editMode, setEditMode] = useState(edit === "true");
  const [openAlert, setOpenAlert] = useState(false);
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const id = params.id as string;
  const { data } = useScholarshipUserByIdAdmin(id);
  console.log(data);

  const deadline = data?.scholarshipDeadline;

  const scholarshipId = data?.scholarshipId ? [data.scholarshipId] : [];

  const scholarshipCover = data?.scholarshipCover;
  const scholarshipLogo = data?.scholarshipLogo;
  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 250);
    }
  };
  const { onSubmit, isSuccess, loading } = useDeleteScholarship({
    scholarshipId,
  });

  useEffect(() => {
    if (isSuccess) {
      setOpenAlert(false);
      router.back();
    }
  }, [isSuccess]);

  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent className="max-w-[1000px] w-full mx-auto h-[98vh] outline-0 border-0">
        <DrawerHeader className="sr-only">
          <DrawerTitle className="text-2xl">Edit Mode</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <button className="p-1 hover:bg-gray-900 rounded">
              <X size={16} />
            </button>
            <h1 className="text-sm font-medium">Scholarship Details</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button className="relative" variant="outline" size="sm">
              <BorderBeam
                size={60}
                duration={4}
                delay={0}
                colorFrom="#f97316"
                colorTo="#ec4899"
                reverse={false}
                initialOffset={0}
                borderThickness={2}
                opacity={1}
                glowIntensity={4}
                beamBorderRadius={60}
                pauseOnHover={false}
                speedMultiplier={1.5}
                className="z-10"
              />
              Download Form <Download />
            </Button>
          </div>
        </div>

        {/* <BGPattern variant="dots" mask="fade-center" /> */}
        {!editMode ? (
          <div className="relative h-full w-full overflow-auto no-scrollbar">
            <div className="px-4">
              <Separator />
            </div>
            <div className="absolute top-0 left-0 h-80 w-full brightness-10  bg-black mask-gradient flex">
              <img
                className="w-full h-full object-cover blur-md "
                src={scholarshipCover}
                alt=""
              />
            </div>

            <div className="relative gap-5 p-4 z-10">
              <div className=" space-y-8">
                <div className=" border-b border-neutral-800 overflow-hidden">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80 border-b-2 border-black" />
                    {scholarshipCover && (
                      <img
                        className="w-full h-35 object-cover   rounded-t-md"
                        src={scholarshipCover}
                        alt=""
                      />
                    )}
                  </div>

                  <div className="relative z-10 py-5 px-4">
                    <div className="flex items-start gap-6">
                      <div className="relative">
                        <div className="size-28 rounded-full bg-neutral-800 border border-neutral-700 overflow-hidden">
                          {scholarshipLogo && (
                            <img
                              className="w-full h-full object-cover"
                              src={scholarshipLogo}
                              alt=""
                            />
                          )}
                        </div>
                      </div>

                      <div className="w-full flex justify-between">
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <motion.span
                              className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-600/70
                                       flex items-center gap-1.5 text-3xl font-semibold tracking-tight
                                      "
                              initial={{ backgroundPosition: "200% 0" }}
                              animate={{ backgroundPosition: "-200% 0" }}
                              transition={{
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 7,
                                ease: "linear",
                              }}
                            >
                              {data?.scholarshipTitle}
                            </motion.span>
                            <p className="text-muted-foreground text-sm">
                              by {data?.scholarshipProvider}
                            </p>
                          </div>

                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                              ₱{data?.scholarshipAmount}.00
                            </div>
                            |
                            <div className="flex items-center gap-1.5">
                              <Calendar size={14} />
                              {data?.scholarshipDeadline &&
                                format(data?.scholarshipDeadline, "PPP")}
                            </div>
                            <Badge className="bg-green-800 text-gray-200">
                              Active
                            </Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View image details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-15 px-4">
                  {/* Hero Section */}

                  {/* Description */}
                  <div className="space-y-3">
                    <h2 className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                      About scholarship
                    </h2>
                    <p className="text-gray-300 leading-relaxed max-w-2xl">
                      {data?.scholarshipDescription}
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-8">
                    <div className="space-y-2 border p-4 rounded-md">
                      <div className="text-2xl font-semibold">
                        {data?.totalApplicants}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <Users size={14} />
                        Total Applicants
                      </div>
                    </div>

                    <div className="space-y-2 border p-4 rounded-md bg-neutral-950">
                      <div className="text-2xl font-semibold">
                        {data?.totalApproved}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <Check size={14} />
                        Approved
                      </div>
                    </div>

                    <div className="space-y-2 border p-4 rounded-md bg-neutral-900">
                      <div className="text-2xl font-semibold">
                        {data?.totalApplicants}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <Clock size={14} />
                        Under Review
                      </div>
                    </div>
                  </div>

                  {/* Requirements */}

                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Academic Requirement
                      </h3>
                      <div className="text-lg font-semibold">
                        {data?.gwa} GWA minimum
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Required Documents
                        </h3>
                        <p className="font-medium text-lg">
                          {data?.scholarshipDocuments.length}
                        </p>
                      </div>
                      <Separator className="bg-neutral-200 dark:bg-neutral-800" />

                      <div className="space-y-1.5">
                        {data?.scholarshipDocuments.map((doc) => (
                          <div
                            key={doc.label}
                            className="flex items-center gap-3 rounded-md  py-4  "
                          >
                            <StickyNote
                              size={16}
                              className="text-neutral-400 dark:text-neutral-500 shrink-0"
                            />
                            <span className="truncate text-sm text-neutral-700 dark:text-neutral-300">
                              {doc.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-card rounded-md">
                    <h1 className="text-center text-sm font-medium">
                      Hurry before it ends
                    </h1>
                    {deadline && (
                      <AnimatedNumberCountdown endDate={new Date(deadline)} />
                    )}
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
                className="flex-1"
                variant="outline"
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
            </div>

            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-red-700 dark:text-red-500">
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-neutral-600 dark:text-neutral-400">
                    This action cannot be undone. This will permanently delete.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={loading}>
                    Cancel
                  </AlertDialogCancel>
                  <Button
                    disabled={loading}
                    onClick={onSubmit}
                    variant="destructive"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader className="animate-spin" />
                        Deleting...
                      </span>
                    ) : (
                      "Delete"
                    )}
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
