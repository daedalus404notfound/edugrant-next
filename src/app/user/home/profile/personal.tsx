"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserFormData } from "@/hooks/user/zodUserProfile";
import { useUserStore } from "@/store/useUserStore";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accessibility,
  BookMarked,
  Calendar1,
  CircleUserRound,
  Feather,
  GraduationCap,
  IdCard,
  LayoutPanelTop,
  Mail,
  Map,
  UserRound,
  UserRoundCheck,
  UserRoundCog,
  VenusAndMars,
} from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { DragAndDropAreaProfile } from "@/components/ui/upload-profile";
export default function PersonalProfile({
  form,
  isSuccess,
  setIsSuccess,
}: {
  form: UseFormReturn<UserFormData>;
  isSuccess: boolean;
  setIsSuccess: (reset: boolean) => void;
}) {
  const { user, loadingUser: useLoading } = useUserStore();
  const [openCalendar, setOpenCalendar] = useState(false);
  const [isIndigenousChecked, setIsIndigenousChecked] = useState(
    !!user?.Student.indigenous
  );
  const [isPWDChecked, setIsPWDChecked] = useState(!!user?.Student.PWD);

  return (
    <div className=" w-full space-y-12">
      <div className="space-y-6 bg-card/40 dark:bg-gradient-to-br to-card from-card/50  px-6 pb-8 pt-4 rounded-lg">
        <div className="flex">
          <div className="relative flex items-end gap-4">
            <FormField
              control={form.control}
              name="Student.profileImg.publicUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between items-center">
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <DragAndDropAreaProfile
                      isSuccess={isSuccess}
                      setIsSuccess={setIsSuccess}
                      label="backdrop image"
                      accept={["image/png", "image/jpeg"]}
                      initialImageUrl={user?.Student.profileImg?.publicUrl}
                      onFilesChange={(files) =>
                        field.onChange(
                          files[0]
                            ? files[0]
                            : user?.Student.profileImg?.publicUrl
                        )
                      } // Single file
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div>
              <h1 className="text-xl font-medium">{`${user?.Student.lName}, ${user?.Student.fName} ${user?.Student.mName}`}</h1>
              <p className="text-muted-foreground">{user?.schoolId}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 bg-card/40 dark:bg-gradient-to-br to-card from-card/50  px-6 pb-8 pt-4 rounded-lg">
        <div className="">
          <h3 className="text-base font-medium flex gap-2 items-center py-3">
            <UserRoundCog className="h-4.5 w-4.5" /> Personal Information
          </h3>
          <div className="w-full h-[2px] flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
          <FormField
            control={form.control}
            name="Student.fName"
            render={({ field }) => (
              <FormItem className="">
                <div className="flex justify-between items-center">
                  <FormLabel className="text-muted-foreground">
                    First Name
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
            name="Student.mName"
            render={({ field }) => (
              <FormItem className="">
                <div className="flex justify-between items-center">
                  <FormLabel className="text-muted-foreground">
                    Middle Name
                  </FormLabel>
                  <FormMessage />
                </div>
                <FormControl className="">
                  <div className="flex items-center">
                    <Input
                      placeholder="(Optional)"
                      {...field}
                      className="rounded-r-none"
                    />
                    <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                      <Button variant="ghost">
                        <CircleUserRound />
                      </Button>
                    </span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Student.lName"
            render={({ field }) => (
              <FormItem className="">
                <div className="flex justify-between items-center">
                  <FormLabel className="text-muted-foreground">
                    Last Name
                  </FormLabel>
                  <FormMessage />
                </div>
                <FormControl className="">
                  <div className="flex items-center">
                    <Input
                      placeholder=""
                      className="rounded-r-none"
                      {...field}
                    />
                    <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                      <Button variant="ghost">
                        <UserRoundCheck />
                      </Button>
                    </span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="Student.gender"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-muted-foreground">Gender</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="rounded-r-none w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                      <Button variant="ghost">
                        <VenusAndMars />
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
            name="Student.address"
            render={({ field }) => (
              <FormItem className="lg:col-span-2">
                <div className="flex justify-between items-center">
                  <FormLabel className="text-muted-foreground">
                    Address
                  </FormLabel>
                  <FormMessage />
                </div>
                <FormControl className="">
                  <div className="flex items-center">
                    <Input
                      placeholder=""
                      className="rounded-r-none"
                      {...field}
                    />
                    <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                      <Button variant="ghost">
                        <Map />
                      </Button>
                    </span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Student.dateOfBirth"
            render={({ field }) => (
              <FormItem className="">
                <div className="flex justify-between items-center">
                  <FormLabel className="text-muted-foreground">
                    Date of Birth
                  </FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <div className="flex items-center">
                    <span className="flex items-center  border border-input border-r-0 rounded-l-md text-sm">
                      <Popover
                        open={openCalendar}
                        onOpenChange={setOpenCalendar}
                      >
                        <PopoverTrigger asChild>
                          <Button variant="ghost" id="date">
                            <Calendar1 />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto overflow-hidden p-0 pointer-events-auto"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            captionLayout="dropdown"
                            onSelect={(date) => {
                              field.onChange(
                                date ? format(date, "yyyy-MM-dd") : ""
                              );
                              setOpenCalendar(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </span>
                    <Input
                      value={field.value ? field.value : ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="rounded-l-none"
                      placeholder="YYYY-MM-DD"
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Student.contactNumber"
            render={({ field }) => (
              <FormItem className="">
                <div className="flex justify-between items-center">
                  <FormLabel className="text-muted-foreground">
                    Contact Number
                  </FormLabel>
                  <FormMessage />
                </div>
                <FormControl className="">
                  <div className="flex">
                    {/* Fixed +639 prefix */}
                    <span className="flex items-center px-4  border border-input border-r-0 rounded-l-md text-sm">
                      +639
                    </span>
                    <Input
                      type="text"
                      placeholder=""
                      maxLength={9}
                      value={field.value?.replace("+639", "") || ""}
                      onChange={(e) => {
                        const val = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 9);
                        field.onChange(`+639${val}`);
                      }}
                      className="rounded-l-none"
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Student.indigenous"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel
                  htmlFor="ind"
                  className="flex items-center justify-between line-clamp-1"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isIndigenousChecked}
                      id="ind"
                      onChange={(e) => setIsIndigenousChecked(e.target.checked)}
                    />
                    Indigenous Group (IG)
                  </div>
                  <FormMessage />
                </FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Input
                      className="rounded-r-none"
                      placeholder="Please specify your Indigenous group (if applicable)"
                      {...field}
                      disabled={!isIndigenousChecked}
                    />
                    <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                      <Button variant="ghost">
                        <Feather />
                      </Button>
                    </span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="Student.PWD"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel
                  htmlFor="pwdd"
                  className="flex items-center justify-between line-clamp-1"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isPWDChecked}
                      id="pwdd"
                      onChange={(e) => setIsPWDChecked(e.target.checked)}
                    />
                    Person with Disability (PWD)
                  </div>
                  <FormMessage />
                </FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Input
                      placeholder="Please specify your disability (if applicable)"
                      {...field}
                      className="rounded-r-none"
                      disabled={!isPWDChecked}
                    />
                    <span className="flex items-center  border border-input border-l-0 rounded-r-md text-sm">
                      <Button variant="ghost">
                        <Accessibility />
                      </Button>
                    </span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="space-y-6 bg-card/40 dark:bg-gradient-to-br to-card from-card/50 px-6 pb-8 pt-4 rounded-lg">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-4">
          <h3 className="text-base font-medium flex gap-2 items-center py-2">
            <Mail className="h-4.5 w-4.5" /> Account Information
          </h3>
          <div className="w-full lg:flex-1 h-[2px] bg-gradient-to-r from-border to-transparent" />
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Student ID */}
          <FormField
            control={form.control}
            name="schoolId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-muted-foreground">
                  Student ID
                </FormLabel>
                <FormControl>
                  <div className="flex w-full">
                    <Input
                      type="number"
                      {...field}
                      disabled
                      className="flex-1 rounded-r-none"
                    />
                    <span className="flex items-center border border-input border-l-0 rounded-r-md">
                      <Button variant="ghost">
                        <IdCard />
                      </Button>
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Course */}
          <FormField
            control={form.control}
            name="Student.course"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-muted-foreground">Course</FormLabel>
                <FormControl>
                  <div className="flex w-full">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="flex-1 rounded-r-none">
                        <SelectValue placeholder="Select Course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BSIT">
                          BSIT - Information Technology
                        </SelectItem>
                        <SelectItem value="BSCS">
                          BSCS - Computer Science
                        </SelectItem>
                        <SelectItem value="BSGE">
                          BSGE - Geodetic Engineering
                        </SelectItem>
                        <SelectItem value="BSFT">
                          BSFT - Food Technology
                        </SelectItem>
                        <SelectItem value="BSABEN">
                          BSABEN - Agricultural Engineering
                        </SelectItem>
                        <SelectItem value="BSED">
                          BSED - Secondary Education
                        </SelectItem>
                        <SelectItem value="BSBA">
                          BSBA - Business Administration
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="flex items-center border border-input border-l-0 rounded-r-md">
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

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full col-span-1 lg:col-span-2">
                <FormLabel className="text-muted-foreground">Email</FormLabel>
                <FormControl>
                  <div className="flex w-full">
                    <Input
                      type="email"
                      {...field}
                      disabled
                      className="flex-1 rounded-r-none"
                    />
                    <span className="flex items-center border border-input border-l-0 rounded-r-md">
                      <Button variant="ghost">
                        <Mail />
                      </Button>
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Year Level */}
          <FormField
            control={form.control}
            name="Student.year"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-muted-foreground">
                  Year Level
                </FormLabel>
                <FormControl>
                  <div className="flex w-full">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="flex-1 rounded-r-none">
                        <SelectValue placeholder="Select Year Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1st Year">1st Year</SelectItem>
                        <SelectItem value="2nd Year">2nd Year</SelectItem>
                        <SelectItem value="3rd Year">3rd Year</SelectItem>
                        <SelectItem value="4th Year">4th Year</SelectItem>
                        <SelectItem value="5th Year">5th Year</SelectItem>
                        <SelectItem value="6th Year">6th Year</SelectItem>
                        <SelectItem value="7th Year">7th Year</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="flex items-center border border-input border-l-0 rounded-r-md">
                      <Button variant="ghost">
                        <BookMarked />
                      </Button>
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Section */}
          <FormField
            control={form.control}
            name="Student.section"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-muted-foreground">Section</FormLabel>
                <FormControl>
                  <div className="flex w-full">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="flex-1 rounded-r-none">
                        <SelectValue placeholder="Select Section" />
                      </SelectTrigger>
                      <SelectContent>
                        {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map(
                          (s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <span className="flex items-center border border-input border-l-0 rounded-r-md">
                      <Button variant="ghost">
                        <LayoutPanelTop />
                      </Button>
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
