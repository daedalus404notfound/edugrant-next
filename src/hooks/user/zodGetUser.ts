// import z from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect } from "react";
// import { UserProfileTypes } from "../types";
// import { format } from "date-fns";
// const userProfileSchema = z.object({
//   //Personal
//   firstName: z.string().min(1, "Required"),
//   middleName: z.string().min(1, "Required"),
//   lastName: z.string().min(1, "Required"),
//   gender: z.string().min(1, "Required"),
//   dateOfBirth: z.string().min(1, "Required"),
//   //Contact
//   email: z.string().min(1, "Required"),
//   contactNumber: z.string().min(1, "Required"),
//   address: z.string().min(1, "Required"),
//   //Academic
//   studentId: z.string().min(1, "Required"),
//   course: z.string().min(1, "Required"),
//   year: z.string().min(1, "Required"),
//   section: z.string().min(1, "Required"),
//   password: z.string().min(1, "Required"),
// });

// export type FormData = z.infer<typeof userProfileSchema>;

// export function useProfileZod(data: UserProfileTypes | null) {
//   const form = useForm<FormData>({
//     resolver: zodResolver(userProfileSchema),
//     defaultValues: {
//       firstName: "",
//       middleName: "",
//       lastName: "",
//       gender: "",
//       dateOfBirth: "",
//       //Contact
//       email: "",
//       contactNumber: "",
//       address: "",
//       //Academic
//       studentId: "",
//       course: "",
//       year: "",
//       section: "",
//       password: "************",
//     },
//   });

//   useEffect(() => {
//     if (data) {
//       form.reset({
//         firstName: data.firstName || "",
//         middleName: data.middleName || "",
//         lastName: data.lastName || "",
//         gender: data.gender || "",
//         dateOfBirth: format(data.dateOfBirth, "PPP") || "",
//         //Contact
//         email: data.studentEmail || "",
//         contactNumber: data.contactNumber || "",
//         address: data.address || "",
//         //Academic
//         studentId: data.studentId || "",
//         course: data.course,
//         year: data.year,
//         section: data.section,
//         password: "************",
//       });
//     }
//   }, [data, form]);

//   return { form, schema: userProfileSchema };
// }
