"use client";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import socket from "@/lib/socketLib";
import { displayScholarshipFormData } from "@/hooks/admin/displayScholarshipData";
import StyledToast from "@/components/ui/toast-styled";
import {
  defaultMeta,
  GetScholarshopTypes,
} from "@/hooks/staff/getScholarshipStaff";
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
      const scholarshipId = data.newScholarship.scholarshipId;
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
          if (!old) return { data: [scholarshipNew], meta: defaultMeta };

          return {
            ...old,
            data: [scholarshipNew, ...old.data],
          };
        }
      );
      queryClient.setQueryData<GetScholarshopTypes>(
        ["adminScholarship", scholarshipId],
        (old) => {
          if (!old) return scholarshipNew;
          return {
            ...old,
            data: scholarshipNew,
          };
        }
      );

      queryClient.invalidateQueries({ queryKey: ["adminScholarshipData"] });
      playNotificationSound();
    });

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
  const audio = new Audio("/mixkit-long-pop-2358.wav");
  audio.volume = 0.7; // optional
  audio.play().catch((err) => console.warn("Sound play blocked:", err));
}
