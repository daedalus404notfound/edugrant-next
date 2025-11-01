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
  type BlockedApplication = {
    applicationId: number;
    scholarshipId: number;
    ownerId: number;
    status: string;
    supabasePath: string[];
  };
  const paginationDefault = {
    pageIndex: 0,
    pageSize: 6,
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

      cache.findAll({ queryKey: ["staffScholarshipData"] }).forEach((query) => {
        queryClient.setQueryData<GetScholarshopTypes>(query.queryKey, (old) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: old.data.filter((item) => item.scholarshipId !== endedId),
          };
        });
      });

      queryClient.setQueryData<GetScholarshopTypes>(
        [
          "staffScholarshipData",
          paginationDefault,
          sortDefault,
          [],
          "ENDED",
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

      if (cache.findAll({ queryKey: ["staffScholarshipData"] }).length > 0) {
        queryClient.invalidateQueries({ queryKey: ["staffScholarshipData"] });
      }
      console.log("ended scholarship received:", data);
    });

    socket.on("applyScholarship", (data) => {
      console.log("you applied:", data);
      const pendingData = data.newApplication;
      console.log(data);
      const applicationId = data.newApplication.applicationId;
      const scholarshipId = pendingData.Scholarship.scholarshipId;
      const scholarshipData = pendingData.Scholarship;
      console.log("scholarshipData", scholarshipData);
      //AAPPEND SA PENDING
      queryClient.setQueryData<StaffApplicationsDataTypes>(
        [
          "staffApplicationData",
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
      queryClient.setQueryData(["adminApplication", applicationId], (old) => {
        if (!old) return pendingData;
      });
      if (cache.findAll({ queryKey: ["staffScholarshipData"] }).length > 0) {
        queryClient.invalidateQueries({ queryKey: ["staffScholarshipData"] });
      }
    });
    //AAPEND BAGONG POST NA SCHOLARSHIP
    socket.on("adminAddScholarships", (data) => {
      const scholarshipNew = data.newScholarship;
      const scholarshipId = data.newScholarship.scholarshipId;
      queryClient.setQueryData<GetScholarshopTypes>(
        [
          "staffScholarshipData",
          paginationDefault,
          sortDefault,
          [],
          "ACTIVE",
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

      queryClient.setQueryData<displayScholarshipFormData>(
        ["adminScholarship", scholarshipId],
        (old) => {
          if (!old) return scholarshipNew;
          console.log("meowww");
          return scholarshipNew;
        }
      );

      if (cache.findAll({ queryKey: ["staffScholarshipData"] }).length > 0) {
        queryClient.invalidateQueries({
          queryKey: ["staffScholarshipData"],
        });
      }
      StyledToast({
        status: "success",
        title: "1 new scholarship just posted",
        description: "",
      });
      playNotificationSound();
    });

    socket.on("deleteScholarship", (data) => {
      console.log("🎓 deleted:", data.deletedScholarship.scholarshipId);
      const deletedId = data.deletedScholarship.scholarshipId;
      cache.findAll({ queryKey: ["staffScholarshipData"] }).forEach((query) => {
        queryClient.setQueryData<GetScholarshopTypes>(query.queryKey, (old) => {
          if (!old?.data) return old;

          return {
            ...old,
            data: old.data.filter((item) => item.scholarshipId !== deletedId),
          };
        });
      });

      if (cache.findAll({ queryKey: ["staffScholarshipData"] }).length > 0) {
        queryClient.invalidateQueries({ queryKey: ["staffScholarshipData"] });
      }
    });

    // //EDIT SCHOLARSHIP UPDATE
    socket.on("updateScholarship", (data) => {
      console.log("edited:", data);
      const editedData = data.update;
      const editedId = editedData.scholarshipId;

      //UUPDATE PAG NAKITA SA CACHE
      cache.findAll({ queryKey: ["staffScholarshipData"] }).forEach((query) => {
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
      //UPDATE SCHOLARSHIPBYIDD

      queryClient.setQueryData<displayScholarshipFormData>(
        ["adminScholarship", editedId],
        (old) => {
          if (!old) return editedData; // do nothing if cache is empty
          console.log("lopit");
          return editedData;
        }
      );
      if (cache.findAll({ queryKey: ["staffScholarshipData"] }).length > 0) {
        queryClient.invalidateQueries({ queryKey: ["staffScholarshipData"] });
      }
      if (cache.findAll({ queryKey: ["adminScholarship"] }).length > 0) {
        queryClient.invalidateQueries({ queryKey: ["adminScholarship"] });
      }
    });
    // //RENEWAL

    socket.on("renewScholarship", (data) => {
      const renewData = data.renewScholar;
      const renewId = renewData.scholarshipId;
      console.log("renew scholarship received:", data);
      console.log("ID:", renewData);
      console.log("ID:", renewId);

      //AALISIN SA LHAT
      cache.findAll({ queryKey: ["staffScholarshipData"] }).forEach((query) => {
        queryClient.setQueryData<GetScholarshopTypes>(query.queryKey, (old) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: old.data.filter((item) => item.scholarshipId !== renewId),
          };
        });
      });

      queryClient.setQueryData<GetScholarshopTypes>(
        [
          "staffScholarshipData",
          paginationDefault,
          sortDefault,
          [],
          "RENEW",
          "",
        ],
        (old) => {
          if (!old) return { data: [renewData], meta: defaultMeta };
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

      queryClient.setQueryData<displayScholarshipFormData>(
        ["adminScholarship", renewId],
        (old) => {
          if (!old) return renewData;
          console.log("meowww");
          return renewData;
        }
      );

      if (cache.findAll({ queryKey: ["staffScholarshipData"] }).length > 0) {
        queryClient.invalidateQueries({ queryKey: ["staffScholarshipData"] });
      }
    });

    //--------------------------------------------------------------------- APPLICATION
    socket.on("approveApplication", (data) => {
      const approveData = data.approvedApplication;
      const approvedId = approveData.applicationId;
      const blockedWhenApproved =
        data.BlockedApplications?.map(
          (item: BlockedApplication) => item.applicationId
        ) || [];

      console.log("approveData scholarship received:", data);

      // 2. Remove from all list
      cache.findAll({ queryKey: ["staffApplicationData"] }).forEach((query) => {
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
          "staffApplicationData",
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
      cache.findAll({ queryKey: ["staffApplicationData"] }).forEach((query) => {
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
          "staffApplicationData",
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
      cache.findAll({ queryKey: ["staffApplicationData"] }).forEach((query) => {
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
          "staffApplicationData",
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
