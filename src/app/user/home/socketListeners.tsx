// import socket from "@/lib/socketLib";
// import { useApplicationStore } from "@/store/applicationStatusStore";
// import { useEffect } from "react";
// import { useQueryClient } from "@tanstack/react-query";
// import { ApplicationFormData } from "@/hooks/zod/application";
// import { MetaWithCounts } from "@/hooks/user/getApplications";

// interface ClientApplicationsData {
//   applications: ApplicationFormData[];
//   meta: MetaWithCounts;
// }
// export default function useScholarshipSocketListeners() {
//   console.log("socket listener initialized");
//   const { status } = useApplicationStore();
//   const queryClient = useQueryClient();
//   console.log(
//     "All cached keys:",
//     queryClient
//       .getQueryCache()
//       .getAll()
//       .map((q) => q.queryKey)
//   );

//   useEffect(() => {
//     socket.on("approveApplication", (data) => {
//       const approved = data.approvedApplication;
//       const approvedId = approved.applicationId;
//       const blockedIds = data.blockedApplicationIDs;
//       const isSameTab = approved.status === status;
//       console.log(data);

//       if (isSameTab) {
//         queryClient.setQueriesData<ClientApplicationsData>(
//           { queryKey: ["clientApplications"], exact: false },
//           (oldData) => {
//             if (!oldData) return oldData;
//             const exists = oldData.applications.some(
//               (app) => app.applicationId === approvedId
//             );
//             if (exists) return oldData;

//             return {
//               ...oldData,
//               applications: [approved, ...oldData.applications],
//               meta: {
//                 ...oldData.meta,
//                 totalRows: oldData.meta.totalRows + 1,
//                 counts: {
//                   ...oldData.meta.counts,
//                   APPROVED: oldData.meta.counts.APPROVED + 1,
//                 },
//               },
//             };
//           }
//         );
//       } else {
//         queryClient.setQueryData<ClientApplicationsData>(
//           ["clientApplications"],
//           (oldData) => {
//             if (!oldData) return oldData;
//             return {
//               ...oldData,
//               applications: oldData.applications.filter(
//                 (app) => app.applicationId !== approvedId
//               ),
//             };
//           }
//         );
//       }
//     });

//     socket.on("declineApplication", (data) => {
//       const decline = data.declineApplication;
//       const declineId = decline.applicationId;
//       const isSameTab = decline.status === status;

//       if (isSameTab) {
//       } else {
//       }
//     });

//     socket.on("forInterview", (data) => {
//       const interview = data.interviewApplication;
//       const interviewId = interview.applicationId;
//       const isSameTab = interview.status === status;

//       if (isSameTab) {
//       } else {
//       }
//     });

//     return () => {
//       socket.off("approveApplication");
//       socket.off("declineApplication");
//       socket.off("forInterview");
//     };
//   }, [status, queryClient]);
// }
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import socket from "@/lib/socketLib";
import { ApplicationFormData } from "@/hooks/zod/application";
import { MetaWithCounts } from "@/hooks/user/getApplications";
import { useApplicationStore } from "@/store/applicationUsetStore";
import { scholarshipFormData } from "@/hooks/admin/zodUpdateScholarship";
import { useScholarshipUserStore } from "@/store/scholarshipUserStore";
import { includes } from "zod";

interface ClientApplicationsData {
  applications: ApplicationFormData[];
  meta: MetaWithCounts;
}
interface ClientScholarshipsData {
  data: scholarshipFormData[];
  meta: MetaWithCounts;
}
export default function useScholarshipSocketListeners() {
  const queryClient = useQueryClient();
  console.log(
    "All cached keys:",
    queryClient
      .getQueryCache()
      .getAll()
      .map((q) => q.queryKey)
  );
  const {
    search,
    page,
    sortBy,
    status,
    order,
    pageSize,
    meta,
    setCounts,
    setStatus1,
  } = useApplicationStore();

  const {
    search: searchScholarship,
    page: pageScholarship,
    sortBy: sortByScholarship,
    order: orderScholarship,
    pageSize: pageSizeScholarship,
    meta: metaScholarship,
    setCounts: setCountsScholarship,
    status: statusScholarship,
    setStatus1: setStatus1Scholarship,
  } = useScholarshipUserStore();

  useEffect(() => {
    socket.on("applyScholarship", (data) => {
      console.log("you applied:", data.newApplication);
      const pending = data.newApplication;
      const scholarshipId = pending.Scholarship.scholarshipId;
      const scholarshipData = pending.Scholarship;
      console.log("scholarshipData", scholarshipData);
      //APPLY TO PENDING
      queryClient.setQueryData<ClientApplicationsData>(
        [
          "clientApplications",
          page,
          pageSize,
          sortBy,
          order,
          "PENDING",
          search,
        ],
        (old) => {
          if (!old) return old;

          return {
            ...old,
            applications: [pending, ...old.applications],
          };
        }
      );
      setCounts({
        PENDING: meta.counts.PENDING + 1,
      });
      //SUBMITTED SIGN
      queryClient.setQueryData<ClientScholarshipsData>(
        [
          "scholarshipData",
          pageScholarship,
          pageSizeScholarship,
          sortByScholarship,
          orderScholarship,
          "ACTIVE",
          searchScholarship,
        ],
        (old) => {
          if (!old) return old;
          console.log("Scholarship cache snapshot:", old.data);
          const exists = old.data.some(
            (s) => s.scholarshipId === scholarshipId
          );
          console.log("exists", exists);
          const updatedData = exists
            ? old.data.map((s) =>
                s.scholarshipId === scholarshipId ? scholarshipData : s
              )
            : [scholarshipData, ...old.data];
          console.log("updatedData", updatedData);
          return { ...old, data: updatedData }; // Change 'scholarships' to 'data'
        }
      );
    });
    //AAPEND BAGONG POST NA SCHOLARSHIP
    socket.on("adminAddScholarships", (data) => {
      const scholarshipNew = data.newScholarship;
      queryClient.setQueryData<ClientScholarshipsData>(
        [
          "scholarshipData",
          1,
          pageSizeScholarship,
          sortByScholarship,
          orderScholarship,
          "ACTIVE",
          searchScholarship,
        ],
        (old) => {
          if (!old) return old;

          return {
            ...old,
            data: [scholarshipNew, ...old.data],
          };
        }
      );
    });
    //DELETE SCHOLARSHIP
    socket.on("deleteScholarship", (data) => {
      console.log("🎓 deleted:", data.deletedScholarship.scholarshipId);
      const deletedId = data.deletedScholarship.scholarshipId;

      queryClient.setQueryData<ClientScholarshipsData>(
        [
          "scholarshipData",
          pageScholarship,
          pageSizeScholarship,
          sortByScholarship,
          orderScholarship,
          statusScholarship,
          searchScholarship,
        ],
        (old) => {
          if (!old) return old;

          return {
            ...old,
            data: old.data.filter((item) => item.scholarshipId !== deletedId),
          };
        }
      );
    });
    //EDIT SCHOLARSHIP UPDATE
    socket.on("updateScholarship", (data) => {
      console.log("edited:", data);
      const editedData = data.update;
      const editedId = editedData.scholarshipId;
      queryClient.setQueryData<ClientScholarshipsData>(
        [
          "scholarshipData",
          pageScholarship,
          pageSizeScholarship,
          sortByScholarship,
          orderScholarship,
          "ACTIVE",
          searchScholarship,
        ],
        (old) => {
          if (!old) return old;
          console.log("Scholarship cache snapshot:", old.data);
          const exists = old.data.some((s) => s.scholarshipId === editedId);
          console.log("exists", exists);
          const updatedData = exists
            ? old.data.map((s) =>
                s.scholarshipId === editedId ? editedData : s
              )
            : [editedData, ...old.data];
          console.log("updatedData", updatedData);
          return { ...old, data: updatedData }; // Change 'scholarships' to 'data'
        }
      );
    });
    //RENEWAL
    socket.on("renewScholarship", (data) => {
      const renewData = data.renewScholar;
      const renewId = renewData.scholarshipId;
      console.log("renew scholarship received:", data);
      console.log("ID:", renewData);
      console.log("ID:", renewId);
      queryClient.setQueryData<ClientScholarshipsData>(
        [
          "scholarshipData",
          1,
          pageSizeScholarship,
          sortByScholarship,
          orderScholarship,
          "RENEW",
          searchScholarship,
        ],
        (old) => {
          if (!old) return old;

          return {
            ...old,
            data: [renewData, ...old.data],
          };
        }
      );

      queryClient.setQueryData<ClientScholarshipsData>(
        [
          "scholarshipData",
          1,
          pageSizeScholarship,
          sortByScholarship,
          orderScholarship,
          "EXPIRED",
          searchScholarship,
        ],
        (old) => {
          if (!old) return old;

          return {
            ...old,
            data: old.data.filter((item) => item.scholarshipId !== renewId),
          };
        }
      );
    });

    socket.on("approveApplication", (data) => {
      const approveData = data.approvedApplication;
      const approvedId = approveData.applicationId;
      const blockedWhenApproved = data.blockedApplicationIDs;

      console.log("approveData scholarship received:", data);
      // 1. Add to APPROVED list
      queryClient.setQueryData<ClientApplicationsData>(
        [
          "clientApplications",
          page,
          pageSize,
          sortBy,
          order,
          "APPROVED",
          search,
        ],
        (old) => {
          if (!old) return old;

          return {
            ...old,
            applications: [approveData, ...old.applications],
          };
        }
      );
      // 2. Remove from PENDING list
      queryClient.setQueryData<ClientApplicationsData>(
        [
          "clientApplications",
          page,
          pageSize,
          sortBy,
          order,
          "PENDING",
          search,
        ],
        (old) => {
          if (!old) return old;

          return {
            ...old,
            applications: old.applications.filter(
              (item) =>
                item.applicationId !== approvedId &&
                !blockedWhenApproved.includes(item.applicationId)
            ),
          };
        }
      );
    });
    return () => {
      socket.off("applyScholarship");
      socket.off("adminAddScholarships");
      socket.off("deleteScholarship");
      socket.off("updateScholarship");
      socket.off("renewScholarship");
      socket.off("approveApplication");
    };
  }, [
    queryClient,
    page,
    pageSize,
    sortBy,
    order,
    search,
    setCounts,
    status,
    statusScholarship,
  ]);
}
