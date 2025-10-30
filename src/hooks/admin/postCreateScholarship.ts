import axios, { AxiosError } from "axios";
import { useCreateScholarshipZod } from "./zodCreateScholarship";
import { scholarshipFormData } from "../zod/scholarship";
import { useMutation } from "@tanstack/react-query";
import StyledToast from "@/components/ui/toast-styled";
import { useState } from "react";

interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}
import { useAdminStore } from "@/store/adminUserStore";
type ApiError = AxiosError<ApiErrorResponse>;
const today = new Date().toISOString().split("T")[0];
const addScholarshipApi = async (data: scholarshipFormData) => {
  const { admin } = useAdminStore.getState();
  console.log(admin?.accountId);
  const formDataToSend = new FormData();
  formDataToSend.append("scholarshipType", data.type);
  formDataToSend.append("newScholarTitle", data.title);
  formDataToSend.append("newScholarProvider", data.providerName);
  if (data.requiredGWA) {
    formDataToSend.append("gwa", data.requiredGWA);
  }
  if (admin?.accountId) {
    formDataToSend.append("adminId", String(admin.accountId));
  }
  formDataToSend.append("newScholarDescription", data.description);
  formDataToSend.append("applicationStartDate", today);
  formDataToSend.append("newScholarDeadline", data.deadline.toISOString());
  if (data.amount) {
    formDataToSend.append("scholarshipAmount", data.amount.toString());
  }
  if (data.limit) {
    formDataToSend.append("scholarshipLimit", data.limit);
  }

  if (data.interview !== undefined) {
    formDataToSend.append("isForInterview", data.interview.toString());
  }

  if (data.cover) {
    formDataToSend.append("coverImg", data.cover);
  }
  if (data.logo) {
    formDataToSend.append("sponsorLogo", data.logo);
  }
  if (data.form) {
    formDataToSend.append("scholarshipForm", data.form);
  }

  const docs = {
    documents: data.documents.documents,
  };
  formDataToSend.append("scholarshipDocuments", JSON.stringify(docs));

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/adminAddScholarships`,
    formDataToSend,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const useAddScholarship = () => {
  return useMutation({
    mutationFn: addScholarshipApi,
    onSuccess: () => {
      StyledToast({
        status: "success",
        title: "Scholarship Posted",
        description: "Your scholarship has been successfully posted.",
      });
    },
    onError: (error: ApiError) => {
       if (axios.isAxiosError<ApiErrorResponse>(error)) {
         const status = error.response?.status;
         const message = error.response?.data?.message;

         if (!error.response) {
           StyledToast({
             status: "error",
             title: "Network Error",
             description:
               "No internet connection or the server is unreachable. Please check your connection and try again.",
           });
         } else if (status === 400) {
           StyledToast({
             status: "error",
             title: "Bad Request",
             description:
               message ?? "Invalid request. Please check your input.",
           });
         } else if (status === 401) {
           StyledToast({
             status: "error",
             title: "Unauthorized",
             description:
               message ?? "You are not authorized. Please log in again.",
           });
         } else if (status === 403) {
           StyledToast({
             status: "error",
             title: "Forbidden",
             description:
               message ?? "You do not have permission to perform this action.",
           });
         } else if (status === 404) {
           StyledToast({
             status: "warning",
             title: "No data found",
             description: message ?? "There are no records found.",
           });
         } else if (status === 500) {
           StyledToast({
             status: "error",
             title: "Server Error",
             description:
               message ?? "Internal server error. Please try again later.",
           });
         } else {
           StyledToast({
             status: "error",
             title: message ?? "Export CSV error occurred.",
             description: "Cannot process your request.",
           });
         }
       } else {
         StyledToast({
           status: "error",
           title: "Unexpected Error",
           description: "Something went wrong. Please try again later.",
         });
       }
      
    },
  });
};

export const useCreateScholarship = () => {
  const { form, formData, fields, append, remove } = useCreateScholarshipZod();
  const addScholarship = useAddScholarship();
  const [open, setOpen] = useState(false);
  const [reset, setReset] = useState(false);

  const handleSubmit = async (data: scholarshipFormData) => {
    try {
      const result = await addScholarship.mutateAsync(data);

      if (result) {
        setOpen(false);
        // setReset(true);
        // addScholarship.reset();
        // form.reset();
      }
    } catch (error) {
      // Error toast is already handled in useSendAuthCode onError
      console.error("Login error:", error);
    }
  };

  const handleTriggerClick = async () => {
    const isValid = await form.trigger();

    console.log(isValid);

    if (!isValid) {
      StyledToast({
        status: "error",
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
      });
      return; // ⛔ stop here if invalid
    }

    // ✅ only open when valid
    setOpen(true);
  };

  const resetCreateState = () => {
    addScholarship.reset();
    form.reset();
    setReset(true);
    StyledToast({
      status: "success",
      title: "Form Reset",
      description: "Form has been cleared and ready for new scholarship entry.",
    });
  };
  return {
    open,
    setOpen,
    loading: addScholarship.isPending,
    handleSubmit,
    handleTriggerClick,
    resetCreateState,
    reset,
    setReset,
    form,
    formData,
    fields,
    append,
    remove,
  };
};

// import axios, { AxiosError } from "axios";
// import {
//   creatScholarshipFormData,
//   useCreateScholarshipZod,
// } from "./zodCreateScholarship";
// import { useMutation } from "@tanstack/react-query";
// import StyledToast from "@/components/ui/toast-styled";
// import { useState } from "react";

// interface ApiErrorResponse {
//   message?: string;
//   error?: string;
//   statusCode?: number;
// }
// import { useAdminStore } from "@/store/adminUserStore";
// type ApiError = AxiosError<ApiErrorResponse>;
// const today = new Date().toISOString().split("T")[0];
// const addScholarshipApi = async (data: creatScholarshipFormData) => {
//   const { admin } = useAdminStore.getState();
//   const formDataToSend = new FormData();
//   formDataToSend.append("scholarshipType", data.scholarshipType);
//   formDataToSend.append("newScholarTitle", data.scholarshipTitle);
//   formDataToSend.append("newScholarProvider", data.providerName);
//   if (data.scholarshipGwa) {
//     formDataToSend.append("gwa", data.scholarshipGwa);
//   }
//   if (admin?.adminId) {
//     formDataToSend.append("adminId", String(admin.adminId));
//   }
//   console.log(data.scholarshipGwa);
//   formDataToSend.append("newScholarDescription", data.scholarshipDescription);
//   formDataToSend.append("applicationStartDate", today);
//   formDataToSend.append(
//     "newScholarDeadline",
//     data.applicationDeadline.toISOString()
//   );
//   formDataToSend.append("scholarshipAmount", data.scholarshipAmount);
//   if (data.scholarshipLimit) {
//     formDataToSend.append("scholarshipLimit", data.scholarshipLimit);
//   }

//   if (data.forInterview !== undefined) {
//     formDataToSend.append("isForInterview", data.forInterview.toString());
//   }

//   if (data.detailsImage) {
//     formDataToSend.append("coverImg", data.detailsImage);
//   }
//   if (data.sponsorImage) {
//     formDataToSend.append("sponsorLogo", data.sponsorImage);
//   }
//   if (data.scholarshipForm) {
//     formDataToSend.append("scholarshipForm", data.scholarshipForm);
//   }
//   const documentsPayload = {
//     documents: data.scholarshipDocuments.documents,
//   };
//   formDataToSend.append(
//     "scholarshipDocuments",
//     JSON.stringify(documentsPayload)
//   );

//   const res = await axios.post(
//     `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/adminAddScholarships`,
//     formDataToSend,
//     {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return res.data;
// };

// export const useAddScholarship = () => {
//   return useMutation({
//     mutationFn: addScholarshipApi,
//     onSuccess: () => {
//       StyledToast({
//         status: "success",
//         title: "Scholarship Created",
//         description: "Your scholarship has been successfully posted.",
//       });
//     },
//     onError: (error: ApiError) => {
//       console.error("Add scholarship error:", error);
//       if (error.response?.data.message) {
//         StyledToast({
//           status: "error",
//           title: error.response.data.message,
//           duration: 10000,
//           description: "Cannot process your request.",
//         });
//       }
//     },
//     retry: 1,
//     retryDelay: 1000,
//   });
// };

// export const useCreateScholarship = () => {
//   const { form, formData, fields, append, remove } = useCreateScholarshipZod();
//   const addScholarship = useAddScholarship();
//   const [open, setOpen] = useState(false);
//   const [reset, setReset] = useState(false);

//   const handleSubmit = async (data: creatScholarshipFormData) => {
//     try {
//       const result = await addScholarship.mutateAsync(data);

//       if (result) {
//         setOpen(false);
//         setReset(true);
//         addScholarship.reset();
//         form.reset();
//       }
//     } catch (error) {
//       // Error toast is already handled in useSendAuthCode onError
//       console.error("Login error:", error);
//     }
//   };

//   const handleTriggerClick = async () => {
//     // Trigger form validation
//     const isValid = await form.trigger(); // This validates all fields

//     if (isValid) {
//       setOpen(true); // Only open dialog if validation passes
//     } else {
//       // Optionally show a toast for validation errors
//       setOpen(false);
//       StyledToast({
//         status: "error",
//         title: "Validation Error",
//         description: "Please fill in all required fields correctly.",
//       });
//     }
//   };

//   const resetCreateState = () => {
//     addScholarship.reset();
//     form.reset();
//     setReset(true);
//     StyledToast({
//       status: "success",
//       title: "Form Reset",
//       description: "Form has been cleared and ready for new scholarship entry.",
//     });
//   };
//   return {
//     open,
//     setOpen,
//     loading: addScholarship.isPending,
//     handleSubmit,
//     handleTriggerClick,
//     resetCreateState,
//     reset,
//     setReset,
//     form,
//     formData,
//     fields,
//     append,
//     remove,
//   };
// };
