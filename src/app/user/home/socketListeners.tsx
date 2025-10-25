"use client";
import { useEffect } from "react";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import socket from "@/lib/socketLib";
import { ApplicationFormData } from "@/hooks/zod/application";
import { MetaWithCounts } from "@/hooks/user/getApplications";
import { useApplicationStore } from "@/store/applicationUsetStore";
import { scholarshipFormData } from "@/hooks/admin/zodUpdateScholarship";
import { MetaWithCountsScholarship } from "@/store/scholarshipUserStore";
import { useScholarshipUserStore } from "@/store/scholarshipUserStore";
import { ScholarshipByIdResponse } from "@/hooks/user/getScholarshipData";
import { ApplicatioByIdResponse } from "@/hooks/user/getApplicationData";
import StyledToast from "@/components/ui/toast-styled";
import { useNotificationStore } from "@/store/userNotificationStore";
import { NotificationPage } from "@/hooks/user/getNotfications";
import confetti from "canvas-confetti";
import { MetaTypes } from "@/hooks/zodMeta";
import { AnnouncementFormDataGet } from "@/hooks/zod/announcement";
interface ClientApplicationsData {
  applications: ApplicationFormData[];
  meta: MetaWithCounts;
}
interface ClientScholarshipsData {
  data: scholarshipFormData[];
  meta: MetaWithCountsScholarship;
}
interface ClientAnnouncementsData {
  annoucements: AnnouncementFormDataGet[];
  meta: MetaTypes;
}

export default function SocketListener() {
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
  type BlockedApplication = {
    applicationId: number;
    scholarshipId: number;
    ownerId: number;
    status: string;
    supabasePath: string[];
  };
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
    incrementActive,
    incrementExpired,
    incrementRenew,
  } = useScholarshipUserStore();

  const { incrementNotifications } = useNotificationStore();

  useEffect(() => {
    socket.on("applyScholarship", (data) => {
      console.log("you applied:", data);
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
            meta: {
              ...old.meta,
              counts: {
                ...old.meta.counts,
                PENDING: old.meta.counts.PENDING + 1,
              },
            },
          };
        }
      );

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

      //AAPEND SA ID
      queryClient.setQueryData<ScholarshipByIdResponse>(
        ["scholarship", scholarshipId],
        (old) => {
          if (!old) return old; // do nothing if cache is empty
          return { ...old, scholarship: scholarshipData }; // only update `scholarship`
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

      StyledToast({
        status: "success",
        title: "New Scholarship Posted",
        description: `Visit scholarship page to view details.`,
      });
      incrementActive();
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

      //UPDATE SCHOLARSHIPBYIDD

      queryClient.setQueryData<ScholarshipByIdResponse>(
        ["scholarship", editedId],
        (old) => {
          if (!old) return old; // do nothing if cache is empty
          return { ...old, scholarship: editedData }; // only update `scholarship`
        }
      );
      StyledToast({
        status: "success",
        title: "Scholarship updated",
        description: `Scholarship "${editedData.title}" was updated successfully.`,
      });
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
      const notificationData = data.notification;
      const blockedWhenApproved =
        data.BlockedApplications?.map(
          (item: BlockedApplication) => item.applicationId
        ) || [];

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
      queryClient.setQueryData<ClientApplicationsData>(
        [
          "clientApplications",
          page,
          pageSize,
          sortBy,
          order,
          "INTERVIEW",
          search,
        ],
        (old) => {
          if (!old) return old;

          return {
            ...old,
            applications: old.applications.filter(
              (item) => item.applicationId !== approvedId
            ),
          };
        }
      );

      queryClient.setQueryData<InfiniteData<NotificationPage>>(
        ["notifications", 10],
        (old) => {
          if (!old) return old;

          console.log("🟢 Found existing notifications — prepending new one");

          return {
            ...old,
            pages: old.pages.map((page, index) => {
              if (index === 0) {
                console.log("🧩 Adding to first page of notifications");
                return {
                  ...page,
                  notification: [notificationData, ...page.notification],
                };
              } else {
                return page;
              }
            }),
          };
        }
      );

      queryClient.setQueryData<ApplicatioByIdResponse>(
        ["application", approvedId],
        (old) => {
          if (!old) return old; // do nothing if cache is empty
          return { ...old, application: approveData }; // only update `scholarship`
        }
      );

      StyledToast({
        status: "success",
        title: "1 new notification recieved",
        description: "",
      });
      incrementNotifications(1);
      playNotificationSound();
      triggerConfetti();
    });

    socket.on("declineApplication", (data) => {
      const declinedData = data.declineApplication;
      const declinedId = declinedData.applicationId;
      const notificationData = data.notification;

      // 1. Add to declinedD list
      queryClient.setQueryData<ClientApplicationsData>(
        ["clientApplications", 1, pageSize, sortBy, order, "DECLINED", search],
        (old) => {
          if (!old) return old;

          return {
            ...old,
            applications: [declinedData, ...old.applications],
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
              (item) => item.applicationId !== declinedId
            ),
          };
        }
      );
      queryClient.setQueryData<ClientApplicationsData>(
        [
          "clientApplications",
          page,
          pageSize,
          sortBy,
          order,
          "INTERVIEW",
          search,
        ],
        (old) => {
          if (!old) return old;

          return {
            ...old,
            applications: old.applications.filter(
              (item) => item.applicationId !== declinedId
            ),
          };
        }
      );

      queryClient.setQueryData<InfiniteData<NotificationPage>>(
        ["notifications", 10],
        (old) => {
          if (!old) return old;

          console.log("🟢 Found existing notifications — prepending new one");

          return {
            ...old,
            pages: old.pages.map((page, index) => {
              if (index === 0) {
                console.log("🧩 Adding to first page of notifications");
                return {
                  ...page,
                  notification: [notificationData, ...page.notification],
                };
              } else {
                return page;
              }
            }),
          };
        }
      );

      queryClient.setQueryData<ApplicatioByIdResponse>(
        ["application", declinedId],
        (old) => {
          if (!old) return old; // do nothing if cache is empty
          return { ...old, application: declinedData }; // only update `scholarship`
        }
      );

      StyledToast({
        status: "success",
        title: "1 new notification recieved",
        description: "",
      });
      incrementNotifications(1);
      playNotificationSound();
    });
    socket.on("forInterview", (data) => {
      const interviewData = data.interviewApplication;
      const interviewId = interviewData.applicationId;
      const notificationData = data.notification;
      console.log("interviewData scholarship received:", data);
      // 1. Add to interviewD list
      queryClient.setQueryData<ClientApplicationsData>(
        ["clientApplications", 1, pageSize, sortBy, order, "INTERVIEW", search],
        (old) => {
          if (!old) return old;

          return {
            ...old,
            applications: [interviewData, ...old.applications],
          };
        }
      );

      queryClient.setQueryData<InfiniteData<NotificationPage>>(
        ["notifications", pageSize],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page, index) =>
              index === 0
                ? {
                    ...page,
                    notification: [notificationData, ...page.notification],
                  }
                : page
            ),
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
              (item) => item.applicationId !== interviewId
            ),
          };
        }
      );
      queryClient.setQueryData<InfiniteData<NotificationPage>>(
        ["notifications", 10],
        (old) => {
          if (!old) return old;

          console.log("🟢 Found existing notifications — prepending new one");

          return {
            ...old,
            pages: old.pages.map((page, index) => {
              if (index === 0) {
                console.log("🧩 Adding to first page of notifications");
                return {
                  ...page,
                  notification: [notificationData, ...page.notification],
                };
              } else {
                return page;
              }
            }),
          };
        }
      );
      queryClient.setQueryData<ApplicatioByIdResponse>(
        ["application", interviewId],
        (old) => {
          if (!old) return old; // do nothing if cache is empty
          return { ...old, application: interviewData }; // only update `scholarship`
        }
      );
      StyledToast({
        status: "success",
        title: "1 new notification recieved",
        description: "",
      });
      incrementNotifications(1);
      playNotificationSound();
    });

    socket.on("createAnnouncement", (data) => {
      const announcementData = data.newAnnouncement;
      console.log("announcement received:", data);

      queryClient.setQueryData<ClientAnnouncementsData>(
        ["announcements", 1, pageSize, sortBy, order, search],
        (old) => {
          if (!old) return old;
          console.log("meow");
          return {
            ...old,
            annoucements: [announcementData, ...old.annoucements],
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

    socket.on("endScholarship", (data) => {
      console.log("ended scholarship received:", data);
      // // 1. Add to APPROVED list
      // queryClient.setQueryData<ClientApplicationsData>(
      //   [
      //     "clientApplications",
      //     page,
      //     pageSize,
      //     sortBy,
      //     order,
      //     "APPROVED",
      //     search,
      //   ],
      //   (old) => {
      //     if (!old) return old;

      //     return {
      //       ...old,
      //       applications: [approveData, ...old.applications],
      //     };
      //   }
      // );
      // // 2. Remove from PENDING list
      // queryClient.setQueryData<ClientApplicationsData>(
      //   [
      //     "clientApplications",
      //     page,
      //     pageSize,
      //     sortBy,
      //     order,
      //     "PENDING",
      //     search,
      //   ],
      //   (old) => {
      //     if (!old) return old;

      //     return {
      //       ...old,
      //       applications: old.applications.filter(
      //         (item) =>
      //           item.applicationId !== approvedId &&
      //           !blockedWhenApproved.includes(item.applicationId)
      //       ),
      //     };
      //   }
      // );

      playNotificationSound();
    
    });

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
    // id,
  ]);

  return null;
}
function playNotificationSound() {
  const audio = new Audio("/mixkit-long-pop-2358.wav");
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
