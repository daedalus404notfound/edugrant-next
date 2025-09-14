"use client";
import { Button } from "@/components/ui/button";
import image from "@/assets/basclogo.png";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineItem,
  TimelineTitle,
} from "@/components/ui/timeline";
import TitleReusable from "@/components/ui/title";
import { CalendarIcon, Megaphone } from "lucide-react";
const announcements = [
  {
    id: 1,
    title: "Scholarship Application Deadline Extended",
    description:
      "The deadline for scholarship applications has been extended to June 30, 2025.",
    date: "Dec 12, 2024",
    priority: "high",
  },
  {
    id: 2,
    title: "Scholarship Application Deadline Extended",
    description:
      "The deadline for scholarship applications has been extended to June 30, 2025.",
    date: "Dec 12, 2024",
    priority: "high",
  },
];
import {
  Calendar,
  Crown,
  Edit,
  Mail,
  MapPin,
  PencilLine,
  Phone,
  User,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useAdminStore } from "@/store/adminUserStore";
import { format } from "date-fns";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const { admin } = useAdminStore();
  return (
    <div className="w-3/4 mx-auto py-10 gap-8 space-y-4">
      {/* Header */}
      <div className=" rounded-lg p-6 border py-10">
        {/* Profile Header */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary rounded-full flex items-center justify-center  font-bold text-2xl">
              JT
            </div>
            <div className="absolute bottom-1 right-1 size-4 bg-green-500 rounded-full border"></div>
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-semibold ">
                {admin?.ISPSU_Staff.fName} {admin?.ISPSU_Staff.mName}{" "}
                {admin?.ISPSU_Staff.lName}
              </h2>
              <Crown className="w-5 h-5 text-primary" />
            </div>
            <div className="flex items-center space-x-1 text-primary font-medium">
              <UserRound className="w-4 h-4" />
              <span>{admin?.role}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-400 text-sm mt-1">
              <Mail className="w-4 h-4" />
              <span>{admin?.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-2 gap-6 mt-8">
        <div className=" rounded-lg p-6 border ">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold ">Personal Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {/* First Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                First Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  defaultValue="Natashia"
                  className="w-full bg-card border  rounded-lg px-3 py-2  focus:outline-none focus:border-primary"
                />
              ) : (
                <p className=" bg-card rounded-lg px-3 py-2">
                  {admin?.ISPSU_Staff.fName}{" "}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Last Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  defaultValue="Khaleira"
                  className="w-full bg-card border  rounded-lg px-3 py-2  focus:outline-none focus:border-primary"
                />
              ) : (
                <p className=" bg-card rounded-lg px-3 py-2">
                  {admin?.ISPSU_Staff.lName}{" "}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Date Created
              </label>
              <div className="flex items-center space-x-2 bg-card rounded-lg px-3 py-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                {isEditing ? (
                  <input
                    type="date"
                    defaultValue="1990-10-12"
                    className="bg-transparent  focus:outline-none flex-1"
                  />
                ) : (
                  <span className="">
                    {admin?.dateCreated && format(admin?.dateCreated, "PPP p")}
                  </span>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Email Address
              </label>
              <div className="flex items-center space-x-2 bg-card rounded-lg px-3 py-2">
                <Mail className="w-4 h-4 text-gray-400" />
                {isEditing ? (
                  <input
                    type="email"
                    defaultValue="info@binary-fusion.com"
                    className="bg-transparent  focus:outline-none flex-1"
                  />
                ) : (
                  <span className="">{admin?.email}</span>
                )}
              </div>
            </div>

            {/* User Role */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                User Role
              </label>
              <div className="flex items-center space-x-2 bg-card rounded-lg px-3 py-2">
                <Crown className="w-4 h-4 text-primary" />
                {isEditing ? (
                  <select className="bg-transparent  focus:outline-none flex-1">
                    <option value="admin" selected>
                      Admin
                    </option>
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                  </select>
                ) : (
                  <span className="text-primary font-medium">
                    {admin?.role}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className=" rounded-lg p-6 border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold ">Activity Logs</h3>
          </div>
          <Timeline className="space-y-5">
            {announcements.map((item) => (
              <TimelineItem
                key={item.id}
                step={item.id}
                className="!m-0  bg-background/70  p-6! rounded-md border !mb-3"
              >
                <div className="flex items-start justify-between lg:flex-row flex-col gap-0.5">
                  <TimelineTitle className="font-medium text-base">
                    {item.title ?? "Win scholarship is now open."}
                  </TimelineTitle>
                  <TimelineDate className="lg:text-sm text-xs text-muted-foreground flex items-center gap-1.5">
                    <CalendarIcon size={13} /> {item.date}
                  </TimelineDate>
                </div>

                <TimelineContent className="text-foreground mt-1 font-light">
                  {item.description}
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </div>

      {/* Save Button (only visible when editing) */}
      {isEditing && (
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setIsEditing(false)}
            className="px-6 py-2 border  text-gray-300 rounded-lg hover:bg-card transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-6 py-2 bg-primary hover:bg-primary  rounded-lg transition-colors"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
