// "use client";
// import { useEffect } from "react";
// import { InfiniteData, useQueryClient } from "@tanstack/react-query";
// import socket from "@/lib/socketLib";
// import { ApplicationFormData } from "@/hooks/zod/application";
// import { MetaWithCounts } from "@/hooks/user/getApplications";

// import { scholarshipFormData } from "@/hooks/admin/zodUpdateScholarship";
// import { MetaWithCountsScholarship } from "@/store/scholarshipUserStore";

// import { displayScholarshipFormData } from "@/hooks/admin/displayScholarshipData";
// import StyledToast from "@/components/ui/toast-styled";
// import { useNotificationStore } from "@/store/userNotificationStore";
// import { NotificationPage } from "@/hooks/user/getNotfications";
// import confetti from "canvas-confetti";
// import { MetaTypes } from "@/hooks/zodMeta";
// import { AnnouncementFormDataGet } from "@/hooks/zod/announcement";
// import { useHeadScholarshipStatus } from "@/store/headStatusStore";
// import { useHeadScholarshipStore } from "@/store/headScholarshipMeta";
// import { useHeadInactiveScholarshipStore } from "@/store/headInactiveScholarshipStore";
// interface HeadApplicationsData {
//   data: ApplicationFormData[];
//   meta: MetaWithCounts;
// }
// interface HeadScholarshipsData {
//   data: scholarshipFormData[];
//   meta: MetaWithCountsScholarship;
// }
// interface HeadAnnouncementsData {
//   annoucements: AnnouncementFormDataGet[];
//   meta: MetaTypes;
// }

// export default function SocketListener() {
//   const queryClient = useQueryClient();
//   console.log(
//     "All cached keys:",
//     queryClient
//       .getQueryCache()
//       .getAll()
//       .map((q) => q.queryKey)
//   );
//   const { search, meta, status, pagination, sorting, columnFilters } =
//     useHeadScholarshipStore();

//   const {
//     searchInactive,
//     metaInactive,
//     statusInactive,
//     paginationInactive,
//     sortingInactive,
//     columnFiltersInactive,
//   } = useHeadInactiveScholarshipStore();

//   const paginationDefault = {
//     pageIndex: 0,
//     pageSize: pagination.pageSize,
//   };
//   useEffect(() => {
//     //AAPEND BAGONG POST NA SCHOLARSHIP
//     socket.on("adminAddScholarships", (data) => {
//       const scholarshipNew = data.newScholarship;
//       queryClient.setQueryData<HeadScholarshipsData>(
//         [
//           "adminScholarshipData",
//           paginationDefault,
//           sorting,
//           columnFilters,
//           status,
//           search,
//         ],
//         (old) => {
//           if (!old) return old;
//           console.log("gomana lopit");
//           console.log("gomana lopit");
//           return {
//             ...old,
//             data: [scholarshipNew, ...old.data],
//           };
//         }
//       );
//     });

//     socket.on("deleteScholarship", (data) => {
//       console.log("🎓 deleted:", data.deletedScholarship.scholarshipId);
//       const deletedId = data.deletedScholarship.scholarshipId;
//       queryClient.setQueryData<HeadScholarshipsData>(
//         [
//           "adminScholarshipData",
//           pagination,
//           sorting,
//           columnFilters,
//           status,
//           search,
//         ],
//         (old) => {
//           if (!old) return old;
//           console.log("gomana lopit");
//           return {
//             ...old,
//             data: old.data.filter((item) => item.scholarshipId !== deletedId),
//           };
//         }
//       );
//       queryClient.setQueryData<HeadScholarshipsData>(
//         [
//           "adminInactiveScholarshipData",
//           paginationInactive,
//           sortingInactive,
//           columnFiltersInactive,
//           statusInactive,
//           searchInactive,
//         ],
//         (old) => {
//           if (!old) return old;
//           console.log("gomana lopit");
//           return {
//             ...old,
//             data: old.data.filter((item) => item.scholarshipId !== deletedId),
//           };
//         }
//       );
//     });
//     // //EDIT SCHOLARSHIP UPDATE
//     socket.on("updateScholarship", (data) => {
//       console.log("edited:", data);
//       const editedData = data.update;
//       const editedId = editedData.scholarshipId;
//       console.log("editedId", editedId);
//       queryClient.setQueryData<HeadScholarshipsData>(
//         [
//           "adminScholarshipData",
//           pagination,
//           sorting,
//           columnFilters,
//           status,
//           search,
//         ],
//         (old) => {
//           if (!old) return old;
//           // console.log("Scholarship cache snapshot:", old.data);
//           const exists = old.data.some((s) => s.scholarshipId === editedId);
//           // console.log("exists", exists);
//           const updatedData = exists
//             ? old.data.map((s) =>
//                 s.scholarshipId === editedId ? editedData : s
//               )
//             : [editedData, ...old.data];
//           // console.log("updatedData", updatedData);
//           return { ...old, data: updatedData }; // Change 'scholarships' to 'data'
//         }
//       );

//       //UPDATE SCHOLARSHIPBYIDD

//       queryClient.setQueryData<displayScholarshipFormData>(
//         ["adminScholarship", editedId],
//         (old) => {
//           if (!old) return old; // do nothing if cache is empty
//           console.log("lopit");
//           return editedData;
//         }
//       );
//     });
//     // //RENEWAL
//     socket.on("renewScholarship", (data) => {
//       const renewData = data.renewScholar;
//       const renewId = renewData.scholarshipId;
//       console.log("renew scholarship received:", data);
//       console.log("ID:", renewData);
//       console.log("ID:", renewId);
//       queryClient.setQueryData<HeadScholarshipsData>(
//         ["adminScholarshipData", paginationDefault, [], [], "RENEW", ""],
//         (old) => {
//           if (!old) return old;

//           return {
//             ...old,
//             data: [renewData, ...old.data],
//           };
//         }
//       );

//       queryClient.setQueryData<HeadScholarshipsData>(
//         [
//           "adminInactiveScholarshipData",
//           paginationInactive,
//           sortingInactive,
//           columnFiltersInactive,
//           statusInactive,
//           searchInactive,
//         ],
//         (old) => {
//           if (!old) return old;

//           return {
//             ...old,
//             data: old.data.filter((item) => item.scholarshipId !== renewId),
//           };
//         }
//       );
//     });

//     socket.on("approveApplication", (data) => {
//       const approveData = data.approvedApplication;
//       const approvedId = approveData.applicationId;
//       const notificationData = data.notification;
//       const blockedWhenApproved = data.blockedApplicationIDs;

//       console.log("approveData scholarship received:", data);
//       // 1. Add to APPROVED list
//       queryClient.setQueryData<HeadApplicationsData>(
//         ["adminApplicationData", paginationDefault, [], [], "APPROVED", ""],
//         (old) => {
//           if (!old) return old;

//           return {
//             ...old,
//             data: [approveData, ...old.data],
//           };
//         }
//       );
//       // 2. Remove from PENDING list
//       queryClient.setQueryData<HeadApplicationsData>(
//         ["adminApplicationData", paginationDefault, [], [], "PENDING", ""],
//         (old) => {
//           if (!old) return old;

//           return {
//             ...old,
//             data: old.data.filter(
//               (item) =>
//                 item.applicationId !== approvedId &&
//                 !blockedWhenApproved.includes(item.applicationId)
//             ),
//           };
//         }
//       );
//       queryClient.setQueryData<HeadApplicationsData>(
//         ["adminApplicationData", paginationDefault, [], [], "INTERVIEW", ""],
//         (old) => {
//           if (!old) return old;

//           return {
//             ...old,
//             data: old.data.filter((item) => item.applicationId !== approvedId),
//           };
//         }
//       );
//       playNotificationSound();
//     });

//     socket.on("declineApplication", (data) => {
//       const declinedData = data.declineApplication;
//       const declinedId = declinedData.applicationId;

//       // 1. Add to declinedD list
//       queryClient.setQueryData<HeadApplicationsData>(
//         ["adminApplicationData", paginationDefault, [], [], "DECLINED", ""],
//         (old) => {
//           if (!old) return old;

//           return {
//             ...old,
//             data: [declinedData, ...old.data],
//           };
//         }
//       );
//       // 2. Remove from PENDING list
//       queryClient.setQueryData<HeadApplicationsData>(
//         ["adminApplicationData", paginationDefault, [], [], "PENDING", ""],
//         (old) => {
//           if (!old) return old;

//           return {
//             ...old,
//             data: old.data.filter((item) => item.applicationId !== declinedId),
//           };
//         }
//       );
//       // 2. Remove from APPROVED list
//       queryClient.setQueryData<HeadApplicationsData>(
//         ["adminApplicationData", paginationDefault, [], [], "APPROVED", ""],
//         (old) => {
//           if (!old) return old;

//           return {
//             ...old,
//             data: old.data.filter((item) => item.applicationId !== declinedId),
//           };
//         }
//       );
//       // 2. Remove from INTEVIEW list
//       queryClient.setQueryData<HeadApplicationsData>(
//         ["adminApplicationData", paginationDefault, [], [], "INTERVIEW", ""],
//         (old) => {
//           if (!old) return old;

//           return {
//             ...old,
//             data: old.data.filter((item) => item.applicationId !== declinedId),
//           };
//         }
//       );
//     });
//     socket.on("forInterview", (data) => {
//       const interviewData = data.interviewApplication;
//       const interviewId = interviewData.applicationId;

//       console.log("interviewData scholarship received:", data);
//       // 1. Add to interviewD list
//       queryClient.setQueryData<HeadApplicationsData>(
//         ["adminApplicationData", paginationDefault, [], [], "INTERVIEW", ""],
//         (old) => {
//           if (!old) return old;

//           return {
//             ...old,
//             data: [interviewData, ...old.data],
//           };
//         }
//       );

//       // 2. Remove from PENDING list
//       queryClient.setQueryData<HeadApplicationsData>(
//         ["adminApplicationData", paginationDefault, [], [], "PENDING", ""],
//         (old) => {
//           if (!old) return old;

//           return {
//             ...old,
//             data: old.data.filter((item) => item.applicationId !== interviewId),
//           };
//         }
//       );

//       playNotificationSound();
//     });

//     // socket.on("createAnnouncement", (data) => {
//     //   const announcementData = data.newAnnouncement;
//     //   console.log("announcement received:", data);

//     //   queryClient.setQueryData<ClientAnnouncementsData>(
//     //     ["announcements", 1, pageSize, sortBy, order, search],
//     //     (old) => {
//     //       if (!old) return old;
//     //       console.log("meow");
//     //       return {
//     //         ...old,
//     //         annoucements: [announcementData, ...old.annoucements],
//     //       };
//     //     }
//     //   );

//     //   StyledToast({
//     //     status: "success",
//     //     title: "1 new announcement just posted",
//     //     description: "",
//     //   });
//     //   playNotificationSound();
//     // });

//     // socket.on("endScholarship", (data) => {
//     //   console.log("ended scholarship received:", data);
//     //   // // 1. Add to APPROVED list
//     //   // queryClient.setQueryData<ClientApplicationsData>(
//     //   //   [
//     //   //     "clientApplications",
//     //   //     page,
//     //   //     pageSize,
//     //   //     sortBy,
//     //   //     order,
//     //   //     "APPROVED",
//     //   //     search,
//     //   //   ],
//     //   //   (old) => {
//     //   //     if (!old) return old;

//     //   //     return {
//     //   //       ...old,
//     //   //       applications: [approveData, ...old.applications],
//     //   //     };
//     //   //   }
//     //   // );
//     //   // // 2. Remove from PENDING list
//     //   // queryClient.setQueryData<ClientApplicationsData>(
//     //   //   [
//     //   //     "clientApplications",
//     //   //     page,
//     //   //     pageSize,
//     //   //     sortBy,
//     //   //     order,
//     //   //     "PENDING",
//     //   //     search,
//     //   //   ],
//     //   //   (old) => {
//     //   //     if (!old) return old;

//     //   //     return {
//     //   //       ...old,
//     //   //       applications: old.applications.filter(
//     //   //         (item) =>
//     //   //           item.applicationId !== approvedId &&
//     //   //           !blockedWhenApproved.includes(item.applicationId)
//     //   //       ),
//     //   //     };
//     //   //   }
//     //   // );

//     //   playNotificationSound();
//     //   triggerConfetti();
//     // });

//     return () => {
//       socket.off("applyScholarship");
//       socket.off("adminAddScholarships");
//       socket.off("deleteScholarship");
//       socket.off("updateScholarship");
//       socket.off("renewScholarship");
//       socket.off("approveApplication");
//       socket.off("declineApplication");
//       socket.off("forInterview");
//       socket.off("createAnnouncement");
//       socket.off("endScholarship");
//     };
//   }, [
//     queryClient,
//     search,
//     meta,
//     status,
//     pagination,
//     sorting,
//     columnFilters,
//     paginationInactive,
//     sortingInactive,
//     columnFiltersInactive,
//     statusInactive,
//     searchInactive,
//     // id,
//   ]);

//   return null;
// }
// function playNotificationSound() {
//   const audio = new Audio("/gago-effect-by-cong-tv.mp3");
//   audio.volume = 0.7; // optional
//   audio.play().catch((err) => console.warn("Sound play blocked:", err));
// }
// function triggerConfetti() {
//   const duration = 5 * 1000;
//   const animationEnd = Date.now() + duration;
//   const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

//   const randomInRange = (min: number, max: number) =>
//     Math.random() * (max - min) + min;

//   const interval = window.setInterval(() => {
//     const timeLeft = animationEnd - Date.now();

//     if (timeLeft <= 0) {
//       clearInterval(interval);
//       return;
//     }

//     const particleCount = 50 * (timeLeft / duration);
//     confetti({
//       ...defaults,
//       particleCount,
//       origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
//     });
//     confetti({
//       ...defaults,
//       particleCount,
//       origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
//     });
//   }, 250);
// }
"use client";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import socket from "@/lib/socketLib";
import { displayScholarshipFormData } from "@/hooks/admin/displayScholarshipData";
import StyledToast from "@/components/ui/toast-styled";
import confetti from "canvas-confetti";
import { GetScholarshopTypes } from "@/hooks/staff/getScholarshipStaff";
import { StaffApplicationsDataTypes } from "@/hooks/staff/getApplicationStaff";
import { GetAnnouncementTypes } from "@/hooks/admin/getAnnouncement";

export default function SocketListener() {
  const queryClient = useQueryClient();
  const cache = queryClient.getQueryCache();
  console.log(
    "All cached keys:",
    queryClient
      .getQueryCache()
      .getAll()
      .map((q) => q.queryKey)
  );

  const paginationDefault = {
    pageIndex: 0,
    pageSize: 10,
  };
  const sortDefault = [{ id: "dateCreated", desc: true }];
  const paginationDefaultApplication = {
    pageIndex: 0,
    pageSize: 10,
  };
  useEffect(() => {
    socket.on("endScholarship", (data) => {
      const endedData = data.endedScholarship;
      const endedId = endedData.scholarshipId;

      cache.findAll({ queryKey: ["adminScholarshipData"] }).forEach((query) => {
        queryClient.setQueryData<GetScholarshopTypes>(query.queryKey, (old) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: old.data.filter((item) => item.scholarshipId !== endedId),
            meta: {
              ...old.meta,
              count: {
                ...old.meta.count,
                countExpired:
                  old.meta.count.countExpired > 0
                    ? old.meta.count.countExpired - 1
                    : old.meta.count.countExpired,
                countEnded:
                  old.meta.count.countEnded > 0
                    ? old.meta.count.countEnded + 1
                    : old.meta.count.countEnded,
              },
            },
          };
        });
      });

      queryClient.setQueryData<GetScholarshopTypes>(
        [
          "adminScholarshipData",
          "ENDED",
          paginationDefault,
          sortDefault,
          [],

          "",
        ],
        (old) => {
          if (!old) return old;

          console.log("gomana lopit");
          return {
            ...old,
            data: [endedData, ...old.data],
          };
        }
      );
      console.log("ended scholarship received:", data);
    });

    socket.on("applyScholarship", (data) => {
      console.log("you applied:", data);
      const pendingData = data.newApplication;
      const scholarshipId = pendingData.Scholarship.scholarshipId;
      const scholarshipData = pendingData.Scholarship;
      console.log("scholarshipData", scholarshipData);
      //AAPPEND SA PENDING
      queryClient.setQueryData<StaffApplicationsDataTypes>(
        [
          "adminApplicationData",
          paginationDefaultApplication,
          [],
          [],
          "PENDING",
          "",
        ],
        (old) => {
          if (!old) return old;
          console.log("meow");
          return {
            ...old,
            data: [pendingData, ...old.data],
          };
        }
      );
    });
    //AAPEND BAGONG POST NA SCHOLARSHIP
    socket.on("adminAddScholarships", (data) => {
      const scholarshipNew = data.newScholarship;
      const isNewExpired = new Date(scholarshipNew.deadline) < new Date();
      console.log(data);
      if (isNewExpired) {
        queryClient.setQueryData<GetScholarshopTypes>(
          [
            "adminScholarshipData",
            "EXPIRED",
            paginationDefault,
            sortDefault,
            [],
            "",
          ],
          (old) => {
            if (!old) return old;
            console.log("gomana lopit EXPRIRED");
            return {
              ...old,
              data: [scholarshipNew, ...old.data],
            };
          }
        );
        cache
          .findAll({ queryKey: ["adminScholarshipData"] })
          .forEach((query) => {
            queryClient.setQueryData<GetScholarshopTypes>(
              query.queryKey,
              (old) => {
                if (!old?.data) return old;
                return {
                  ...old,
                  meta: {
                    ...old.meta,
                    count: {
                      ...old.meta.count,
                      countExpired:
                        old.meta.count.countExpired > 0
                          ? old.meta.count.countExpired + 1
                          : old.meta.count.countExpired,
                    },
                  },
                };
              }
            );
          });
      } else {
        queryClient.setQueryData<GetScholarshopTypes>(
          [
            "adminScholarshipData",
            "ACTIVE",
            paginationDefault,
            sortDefault,
            [],
            "",
          ],
          (old) => {
            if (!old) return old;

            console.log("gomana lopit");
            return {
              ...old,
              data: [scholarshipNew, ...old.data],
            };
          }
        );
        cache
          .findAll({ queryKey: ["adminScholarshipData"] })
          .forEach((query) => {
            queryClient.setQueryData<GetScholarshopTypes>(
              query.queryKey,
              (old) => {
                if (!old?.data) return old;
                return {
                  ...old,
                  meta: {
                    ...old.meta,
                    count: {
                      ...old.meta.count,
                      countActive:
                        old.meta.count.countActive > 0
                          ? old.meta.count.countActive + 1
                          : old.meta.count.countActive,
                    },
                  },
                };
              }
            );
          });
      }
      // playNotificationSound();
    });

    socket.on("deleteScholarship", (data) => {
      console.log("🎓 deleted:", data.deletedScholarship.scholarshipId);
      const deletedId = data.deletedScholarship.scholarshipId;
      cache.findAll({ queryKey: ["adminScholarshipData"] }).forEach((query) => {
        queryClient.setQueryData<GetScholarshopTypes>(query.queryKey, (old) => {
          if (!old?.data) return old;

          return {
            ...old,
            data: old.data.filter((item) => item.scholarshipId !== deletedId),
          };
        });
      });
    });

    // //EDIT SCHOLARSHIP UPDATE
    socket.on("updateScholarship", (data) => {
      console.log("edited:", data);
      const editedData = data.update;
      const editedId = editedData.scholarshipId;
      const isNewExpired = new Date(editedData.deadline) < new Date();
      console.log("isNewExpired", isNewExpired);
      console.log("editedId", editedId);

      //UUPDATE PAG NAKITA SA CACHE
      cache.findAll({ queryKey: ["adminScholarshipData"] }).forEach((query) => {
        queryClient.setQueryData<GetScholarshopTypes>(query.queryKey, (old) => {
          if (!old?.data) return old;
          const exists = old.data.some((s) => s.scholarshipId === editedId);
          const updatedData = exists
            ? old.data.map((s) =>
                s.scholarshipId === editedId ? editedData : s
              )
            : [editedData, ...old.data];
          return { ...old, data: updatedData };
        });
      });

      //AALISIN SA LAHAT IAAPPEND SA EXPIRED
      if (isNewExpired) {
        cache
          .findAll({ queryKey: ["adminScholarshipData"] })
          .forEach((query) => {
            queryClient.setQueryData<GetScholarshopTypes>(
              query.queryKey,
              (old) => {
                if (!old?.data) return old;
                return {
                  ...old,
                  data: old.data.filter(
                    (item) => item.scholarshipId !== editedId
                  ),
                  meta: {
                    ...old.meta,
                    count: {
                      ...old.meta.count,
                      countExpired:
                        old.meta.count.countExpired > 0
                          ? old.meta.count.countExpired + 1
                          : old.meta.count.countExpired,
                    },
                  },
                };
              }
            );
          });

        queryClient.setQueryData<GetScholarshopTypes>(
          [
            "adminScholarshipData",
            "EXPIRED",
            paginationDefault,
            sortDefault,
            [],
            "",
          ],
          (old) => old && { ...old, data: [editedData, ...old.data] }
        );
      }

      //UPDATE SCHOLARSHIPBYIDD

      queryClient.setQueryData<displayScholarshipFormData>(
        ["adminScholarship", editedId],
        (old) => {
          if (!old) return old; // do nothing if cache is empty
          console.log("lopit");
          return editedData;
        }
      );
    });
    // //RENEWAL

    socket.on("renewScholarship", (data) => {
      const renewData = data.renewScholar;
      const renewId = renewData.scholarshipId;
      console.log("renew scholarship received:", data);
      console.log("ID:", renewData);
      console.log("ID:", renewId);

      //AALISIN SA LHAT
      cache.findAll({ queryKey: ["adminScholarshipData"] }).forEach((query) => {
        queryClient.setQueryData<GetScholarshopTypes>(query.queryKey, (old) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: old.data.filter((item) => item.scholarshipId !== renewId),
            meta: {
              ...old.meta,
              count: {
                ...old.meta.count,
                countExpired:
                  old.meta.count.countExpired > 0
                    ? old.meta.count.countExpired - 1
                    : old.meta.count.countExpired,
                countRenew:
                  old.meta.count.countRenew > 0
                    ? old.meta.count.countRenew + 1
                    : old.meta.count.countRenew,
              },
            },
          };
        });
      });
      queryClient.setQueryData<GetScholarshopTypes>(
        [
          "adminScholarshipData",
          "RENEW",
          paginationDefault,
          sortDefault,
          [],
          "",
        ],
        (old) => {
          if (!old) return old;
          StyledToast({
            status: "success",
            title: "1 new scholarship just renewed",
            description: "",
          });
          return {
            ...old,
            data: [renewData, ...old.data],
          };
        }
      );
    });

    //--------------------------------------------------------------------- APPLICATION
    socket.on("approveApplication", (data) => {
      const approveData = data.approvedApplication;
      const approvedId = approveData.applicationId;
      const blockedWhenApproved = data.BlockedApplications;

      console.log("approveData scholarship received:", data);

      // 2. Remove from all list
      cache.findAll({ queryKey: ["adminApplicationData"] }).forEach((query) => {
        queryClient.setQueryData<StaffApplicationsDataTypes>(
          query.queryKey,
          (old) => {
            if (!old?.data) return old;
            return {
              ...old,
              data: old.data.filter(
                (item) =>
                  item.applicationId !== approvedId &&
                  !blockedWhenApproved.includes(item.applicationId)
              ),
            };
          }
        );
      });
      // 1. Add to APPROVED list
      queryClient.setQueryData<StaffApplicationsDataTypes>(
        [
          "adminApplicationData",
          paginationDefaultApplication,
          [],
          [],
          "APPROVED",
          "",
        ],
        (old) => {
          if (!old) return old;
          console.log("meow");
          return {
            ...old,
            data: [approveData, ...old.data],
          };
        }
      );

      playNotificationSound();
    });

    socket.on("declineApplication", (data) => {
      const declinedData = data.declineApplication;
      const declinedId = declinedData.applicationId;

      // 2. Remove from all list
      cache.findAll({ queryKey: ["adminApplicationData"] }).forEach((query) => {
        queryClient.setQueryData<StaffApplicationsDataTypes>(
          query.queryKey,
          (old) => {
            if (!old?.data) return old;
            return {
              ...old,
              data: old.data.filter(
                (item) => item.applicationId !== declinedId
              ),
            };
          }
        );
      });
      // 1. Add to declinedD list
      queryClient.setQueryData<StaffApplicationsDataTypes>(
        [
          "adminApplicationData",
          paginationDefaultApplication,
          [],
          [],
          "DECLINED",
          "",
        ],
        (old) => {
          if (!old) return old;

          return {
            ...old,
            data: [declinedData, ...old.data],
          };
        }
      );
    });
    socket.on("forInterview", (data) => {
      const interviewData = data.interviewApplication;
      const interviewId = interviewData.applicationId;

      //removve from all
      // 2. Remove from all list
      cache.findAll({ queryKey: ["adminApplicationData"] }).forEach((query) => {
        queryClient.setQueryData<StaffApplicationsDataTypes>(
          query.queryKey,
          (old) => {
            if (!old?.data) return old;
            return {
              ...old,
              data: old.data.filter(
                (item) => item.applicationId !== interviewId
              ),
            };
          }
        );
      });

      // 1. Add to interviewD list
      queryClient.setQueryData<StaffApplicationsDataTypes>(
        [
          "adminApplicationData",
          paginationDefaultApplication,
          [],
          [],
          "INTERVIEW",
          "",
        ],
        (old) => {
          if (!old) return old;
          console.log("meow");
          return {
            ...old,
            data: [interviewData, ...old.data],
          };
        }
      );

      playNotificationSound();
    });

    socket.on("createAnnouncement", (data) => {
      const announcementData = data.newAnnouncement;
      console.log("announcement received:", data);

      queryClient.setQueryData<GetAnnouncementTypes>(
        ["adminAnnouncement", paginationDefault, sortDefault, [], ""],
        (old) => {
          if (!old) return old;
          console.log("meow");
          return {
            ...old,
            announcements: [announcementData, ...old.announcements],
          };
        }
      );

      StyledToast({
        status: "success",
        title: "1 new announcement just posted",
        description: "",
      });
      playNotificationSound();
    });

    //
    //
    //   // // 1. Add to APPROVED list
    //   // queryClient.setQueryData<ClientApplicationsData>(
    //   //   [
    //   //     "clientApplications",
    //   //     page,
    //   //     pageSize,
    //   //     sortBy,
    //   //     order,
    //   //     "APPROVED",
    //   //     search,
    //   //   ],
    //   //   (old) => {
    //   //     if (!old) return old;

    //   //     return {
    //   //       ...old,
    //   //       applications: [approveData, ...old.applications],
    //   //     };
    //   //   }
    //   // );
    //   // // 2. Remove from PENDING list
    //   // queryClient.setQueryData<ClientApplicationsData>(
    //   //   [
    //   //     "clientApplications",
    //   //     page,
    //   //     pageSize,
    //   //     sortBy,
    //   //     order,
    //   //     "PENDING",
    //   //     search,
    //   //   ],
    //   //   (old) => {
    //   //     if (!old) return old;

    //   //     return {
    //   //       ...old,
    //   //       applications: old.applications.filter(
    //   //         (item) =>
    //   //           item.applicationId !== approvedId &&
    //   //           !blockedWhenApproved.includes(item.applicationId)
    //   //       ),
    //   //     };
    //   //   }
    //   // );

    //   playNotificationSound();
    //   triggerConfetti();
    // });

    return () => {
      socket.off("applyScholarship");
      socket.off("adminAddScholarships");
      socket.off("deleteScholarship");
      socket.off("updateScholarship");
      socket.off("renewScholarship");
      socket.off("approveApplication");
      socket.off("declineApplication");
      socket.off("forInterview");
      socket.off("createAnnouncement");
      socket.off("endScholarship");
    };
  }, [queryClient]);

  return null;
}
function playNotificationSound() {
  const audio = new Audio("/gago-effect-by-cong-tv.mp3");
  audio.volume = 0.7; // optional
  audio.play().catch((err) => console.warn("Sound play blocked:", err));
}
function triggerConfetti() {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const randomInRange = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
}
