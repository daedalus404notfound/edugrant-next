"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export function ProfileInfoSkeleton() {
  return (
    <div className="space-y-12">
      {/* Profile Header Section */}
      <div className="space-y-6 bg-card/40 dark:bg-gradient-to-br to-card from-card/50 px-6 pb-8 pt-4 rounded-lg">
        <div className="flex justify-between items-end">
          <div className="relative flex items-end gap-4">
            {/* Profile Image Skeleton */}
            <Skeleton className="w-24 h-24 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          {/* Delete Button Skeleton */}
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="space-y-6 bg-card/40 dark:bg-gradient-to-br to-card from-card/50 px-6 pb-8 pt-4 rounded-lg">
        <div className="space-y-3">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-[2px] w-full" />
        </div>

        {/* Form Fields Grid */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
          {/* First Name */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Middle Name */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Address */}
          <div className="space-y-2 lg:col-span-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Contact Number */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Indigenous Group */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* PWD */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>

      {/* Account Information Section */}
      <div className="space-y-6 bg-card/40 dark:bg-gradient-to-br to-card from-card/50 px-6 pb-8 pt-4 rounded-lg">
        <div className="space-y-3">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-[2px] w-full" />
        </div>

        {/* Form Fields Grid */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
          {/* Student ID */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Course */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Email */}
          <div className="space-y-2 lg:col-span-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Year Level */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Section */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ScholarshipCardSkeleton() {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className=" relative rounded-md space-y-3 shadow-sm border bg-card"
    >
      <div className="relative lg:rounded-lg rounded-md bg-background overflow-hidden">
        {/* Cover Image Skeleton */}
        <Skeleton className="relative lg:aspect-[16/8.5] aspect-[16/10] w-full lg:rounded-md rounded-sm" />

        <div className="lg:p-4 p-2 space-y-2 lg:space-y-6">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
            <div className="w-full space-y-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="hidden lg:flex items-center justify-between">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ScholarshipsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[...Array(2)].map((_, index) => (
        <ScholarshipCardSkeleton key={index} />
      ))}
    </div>
  );
}
