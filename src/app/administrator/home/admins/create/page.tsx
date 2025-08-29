"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ArrowRight, Loader, RefreshCcw, UserPen } from "lucide-react";

import { DragAndDropArea } from "@/components/ui/upload";

import { useCreateAdmin } from "@/hooks/admin/postCreateAdminHandler";
import TitleReusable from "@/components/ui/title";

export default function CreateAdmin() {
  const {
    reset,
    setReset,
    open,
    setOpen,
    handleSubmit,
    loading,
    resetCreateState,
    form,
    handleTriggerClick,
  } = useCreateAdmin();

  return (
    <div className="px-4">
      <div className="mx-auto max-w-3xl w-full py-10">
        <TitleReusable
          title="Add New Admininstrator"
          description="Fill out the form below to add a new administrator."
          Icon={UserPen}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleTriggerClick();
          }}
          className="space-y-8 py-10"
        >
          <Form {...form}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-3"
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-center">
                      First Name <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-center">
                      Middle Name <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-3"
            >
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-center">
                      Last Name <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-center">
                      Contact
                      <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-center">
                      Email
                      <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-center">
                      Password
                      <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-center">
                      Profile Image <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <DragAndDropArea
                        label="profile image"
                        reset={reset}
                        setReset={setReset}
                        accept={["image/png", "image/jpeg", "image/jpg"]}
                        onFilesChange={(files) => field.onChange(files[0])} // Single file
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </motion.div>
          </Form>
          <div className="flex gap-3">
            <Button className="flex-1" type="button" onClick={resetCreateState}>
              <RefreshCcw />
              Clear Form
            </Button>
            <AlertDialog open={open} onOpenChange={setOpen}>
              <Button className="flex-1" type="submit">
                Continue <ArrowRight />
              </Button>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Create new admin</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to create this admin?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={loading}>
                    Cancel
                  </AlertDialogCancel>
                  <Button
                    onClick={form.handleSubmit(handleSubmit)}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        Creating ...
                        <Loader className="animate-spin" />
                      </>
                    ) : (
                      "Create"
                    )}
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </form>
      </div>
    </div>
  );
}
