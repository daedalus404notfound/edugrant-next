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
import { defaultMeta } from "@/store/scholarshipUserStore";
import { defaultMeta as defaultMetaApplication } from "@/store/applicationUsetStore";
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

  const paginationDefault06 = {
    pageIndex: 0,
    pageSize: 6,
  };
  const sortDefault = [{ id: "dateCreated", desc: true }];
  const { incrementNotifications } = useNotificationStore();
  const queryKeyScholarshipActive = [
    "scholarshipData",
    paginationDefault06,
    sortDefault,
    [],
    "ACTIVE",
    "",
  ];
  const queryKeyScholarshipRenew = [
    "scholarshipData",
    paginationDefault06,
    sortDefault,
    [],
    "RENEW",
    "",
  ];
  const queryKeyScholarshipExpired = [
    "scholarshipData",
    paginationDefault06,
    sortDefault,
    [],
    "EXPIRED",
    "",
  ];
  const queryKeyScholarshipAll = ["scholarshipData"];
  const queryKeyApplicationAll = ["clientApplications"];
  const queryKeyApplicationPending = [
    "clientApplications",
    paginationDefault06,
    sortDefault,
    [],
    "PENDING",
    "",
  ];
  const queryKeyApplicationApproved = [
    "clientApplications",
    paginationDefault06,
    sortDefault,
    [],
    "APPROVED",
    "",
  ];
  const queryKeyApplicationDeclined = [
    "clientApplications",
    paginationDefault06,
    sortDefault,
    [],
    "DECLINED",
    "",
  ];
  const queryKeyApplicationInterview = [
    "clientApplications",
    paginationDefault06,
    sortDefault,
    [],
    "INTERVIEW",
    "",
  ];
  useEffect(() => {
    socket.on("endScholarship", (data) => {
      const endedId = data.endedScholarship.scholarshipId;
      console.log("ended scholarship received:", data);
      cache.findAll({ queryKey: queryKeyScholarshipAll }).forEach((query) =>
        queryClient.setQueryData<ClientScholarshipsData>(
          query.queryKey,
          (old) => {
            if (!old?.data) return old;
            return {
              ...old,
              data: old.data.filter((item) => item.scholarshipId !== endedId),
            };
          }
        )
      );
      playNotificationSound();
    });
    socket.on("applyScholarship", (data) => {
      console.log("you applied:", data);
      const pending = data.newApplication;
      const applicationId = data.newApplication.applicationId;
      const scholarshipId = pending.Scholarship.scholarshipId;
      const scholarshipData = pending.Scholarship;
      console.log("scholarshipData", scholarshipData);
      //APPLY TO PENDING
      queryClient.setQueryData<ClientApplicationsData>(
        queryKeyApplicationPending,
        (old) => {
          if (!old)
            return { applications: [pending], meta: defaultMetaApplication };
          console.log("lopit");
          return {
            ...old,
            applications: [pending, ...old.applications],
          };
        }
      );

      //SUBMITTED SIGN
      cache.findAll({ queryKey: queryKeyScholarshipAll }).forEach((query) =>
        queryClient.setQueryData<ClientScholarshipsData>(
          query.queryKey,
          (old) => {
            if (!old) return old;
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
        )
      );

      //AAPEND SA ID
      queryClient.setQueryData<ScholarshipByIdResponse>(
        ["scholarship", scholarshipId],
        (old) => {
          if (!old)
            return { scholarship: scholarshipData, inGovScholar: false }; // do nothing if cache is empty
          return { ...old, scholarship: scholarshipData }; // only update `scholarship`
        }
      );

      queryClient.setQueryData<ApplicatioByIdResponse>(
        ["application", applicationId],
        (old) => {
          if (!old) return { application: pending }; // do nothing if cache is empty
          return { ...old, application: pending }; // only update `scholarship`
        }
      );

      queryClient.invalidateQueries({
        queryKey: queryKeyScholarshipAll,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeyApplicationAll,
      });
      queryClient.invalidateQueries({
        queryKey: ["scholarship", scholarshipId],
        exact: true,
      });
    });
    //AAPEND BAGONG POST NA SCHOLARSHIP
    socket.on("adminAddScholarships", (data) => {
      const scholarshipNew = data.newScholarship;
      const scholarshipId = data.newScholarship.scholarshipId;
      console.log(data);
      queryClient.setQueryData<ClientScholarshipsData>(
        queryKeyScholarshipActive,
        (old) => {
          if (!old) {
            return { data: [scholarshipNew], meta: defaultMeta };
          }

          return {
            ...old,
            data: [scholarshipNew, ...old.data],
          };
        }
      );

      queryClient.setQueryData<ScholarshipByIdResponse>(
        ["scholarship", scholarshipId],
        (old) => {
          if (!old) {
            return { scholarship: scholarshipNew, inGovScholar: true };
          }
          return { ...old, scholarship: scholarshipNew };
        }
      );

      queryClient.invalidateQueries({
        queryKey: queryKeyScholarshipActive,
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["scholarship", scholarshipId],
        exact: true,
      });

      StyledToast({
        status: "success",
        title: "New Scholarship Posted",
        description: `Visit scholarship page to view details.`,
      });
    });

    //DELETE SCHOLARSHIP
    socket.on("deleteScholarship", (data) => {
      console.log("🎓 deleted:", data.deletedScholarship.scholarshipId);
      const deletedId = data.deletedScholarship.scholarshipId;
      cache.findAll({ queryKey: queryKeyScholarshipAll }).forEach((query) =>
        queryClient.setQueryData<ClientScholarshipsData>(
          query.queryKey,
          (old) => {
            if (!old?.data) return old;
            return {
              ...old,
              data: old.data.filter((item) => item.scholarshipId !== deletedId),
            };
          }
        )
      );
      queryClient.invalidateQueries({
        queryKey: queryKeyScholarshipAll,
      });
    });
    //EDIT SCHOLARSHIP UPDATE
    socket.on("updateScholarship", (data) => {
      console.log("edited:", data);
      const editedData = data.update;
      const editedId = editedData.scholarshipId;

      // 1️⃣ Update scholarship lists
      cache.findAll({ queryKey: queryKeyScholarshipAll }).forEach((query) => {
        queryClient.setQueryData<ClientScholarshipsData>(
          query.queryKey,
          (old) => {
            if (!old) return old;

            const updatedData = old.data.map((s) =>
              s.scholarshipId === editedId ? editedData : s
            );

            return { ...old, data: updatedData };
          }
        );
      });

      // 2️⃣ Update single scholarship cache
      queryClient.setQueryData<ScholarshipByIdResponse>(
        ["scholarship", editedId],
        (old) => (old ? { ...old, scholarship: editedData } : old)
      );

      // 3️⃣ Update applications referencing this scholarship
      cache.findAll({ queryKey: queryKeyApplicationAll }).forEach((query) => {
        queryClient.setQueryData<ClientApplicationsData>(
          query.queryKey,
          (old) => {
            if (!old) return old;

            const updatedApplications = old.applications.map((app) =>
              app.Scholarship.scholarshipId === editedId
                ? { ...app, Scholarship: editedData }
                : app
            );

            return { ...old, applications: updatedApplications };
          }
        );
      });

      cache.findAll({ queryKey: ["application"] }).forEach((query) => {
        queryClient.setQueryData<ApplicatioByIdResponse>(
          query.queryKey,
          (old) => {
            if (!old) return old;

            const applicationScholarshipId = old.application.scholarshipId;

            // Update the Scholarship field only if IDs match
            const updatedApplication =
              applicationScholarshipId === editedId
                ? { ...old.application, Scholarship: editedData }
                : old.application;

            return { ...old, application: updatedApplication };
          }
        );
      });

      // 4️⃣ Invalidate only caches that need refetching
      queryClient.invalidateQueries({ queryKey: queryKeyScholarshipAll });
      queryClient.invalidateQueries({ queryKey: queryKeyApplicationAll });
      queryClient.invalidateQueries({
        queryKey: ["scholarship", editedId],
        exact: true,
      });

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

      cache.findAll({ queryKey: queryKeyScholarshipAll }).forEach((query) =>
        queryClient.setQueryData<ClientScholarshipsData>(
          query.queryKey,
          (old) => {
            if (!old?.data) return old;
            return {
              ...old,
              data: old.data.filter((item) => item.scholarshipId !== renewId),
            };
          }
        )
      );

      cache.findAll({ queryKey: queryKeyApplicationAll }).forEach((query) =>
        queryClient.setQueryData<ClientApplicationsData>(
          query.queryKey,
          (old) => {
            if (!old) return old;
            return {
              ...old,
              applications: old.applications.filter(
                (item) => item.applicationId !== renewId
              ),
            };
          }
        )
      );

      queryClient.setQueryData<ClientScholarshipsData>(
        queryKeyScholarshipRenew,
        (old) => {
          if (!old) return old;

          return {
            ...old,
            data: [renewData, ...old.data],
          };
        }
      );

      //AAPEND SA ID
      queryClient.setQueryData<ScholarshipByIdResponse>(
        ["scholarship", renewId],
        (old) => {
          if (!old) return { scholarship: renewData, inGovScholar: false }; // do nothing if cache is empty
          return { ...old, scholarship: renewData }; // only update `scholarship`
        }
      );

      queryClient.invalidateQueries({ queryKey: queryKeyScholarshipAll });
      queryClient.invalidateQueries({ queryKey: ["scholarship", renewId] });
    });

    socket.on("approveApplication", (data) => {
      const approveData = data.approvedApplication;
      const approvedId = approveData.applicationId;
      const notificationData = data.notification;
      const blockedWhenApproved =
        data.BlockedApplications?.map(
          (item: BlockedApplication) => item.applicationId
        ) || [];
      // 1. Remove from all list
      cache.findAll({ queryKey: queryKeyApplicationAll }).forEach((query) =>
        queryClient.setQueryData<ClientApplicationsData>(
          query.queryKey,
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
        )
      );
      // 2. Add to APPROVED list
      queryClient.setQueryData<ClientApplicationsData>(
        queryKeyApplicationApproved,
        (old) => {
          if (!old)
            return {
              applications: [approveData],
              meta: defaultMetaApplication,
            };

          return {
            ...old,
            applications: [approveData, ...old.applications],
          };
        }
      );

      queryClient.setQueryData<InfiniteData<NotificationPage>>(
        ["notifications", 10],
        (old) => {
          if (!old) return old;

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
          if (!old) return { application: approveData };
          return { ...old, application: approveData };
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

      cache.findAll({ queryKey: queryKeyApplicationAll }).forEach((query) =>
        //REMOVE ALL
        queryClient.setQueryData<ClientApplicationsData>(
          query.queryKey,
          (old) => {
            if (!old) return old;
            return {
              ...old,
              applications: old.applications.filter(
                (item) => item.applicationId !== declinedId
              ),
            };
          }
        )
      );
      // 1. Add to declinedD list
      queryClient.setQueryData<ClientApplicationsData>(
        queryKeyApplicationDeclined,
        (old) => {
          if (!old)
            return {
              applications: [declinedData],
              meta: defaultMetaApplication,
            };

          return {
            ...old,
            applications: [declinedData, ...old.applications],
          };
        }
      );

      //NOTIFICATION
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
      //uupdate by id
      queryClient.setQueryData<ApplicatioByIdResponse>(
        ["application", declinedId],
        (old) => {
          if (!old) return { application: declinedData }; // do nothing if cache is empty
          return { ...old, application: declinedData }; // only update `scholarship`
        }
      );
      queryClient.invalidateQueries({ queryKey: queryKeyApplicationAll });
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

      cache.findAll({ queryKey: queryKeyApplicationAll }).forEach((query) =>
        queryClient.setQueryData<ClientApplicationsData>(
          query.queryKey,
          (old) => {
            if (!old?.applications) return old;
            return {
              ...old,
              data: old.applications.filter(
                (item) => item.applicationId !== interviewId
              ),
            };
          }
        )
      );
      // 1. Add to interviewD list

      queryClient.setQueryData<ClientApplicationsData>(
        queryKeyApplicationInterview,
        (old) => {
          if (!old)
            return {
              applications: [interviewData],
              meta: defaultMetaApplication,
            };

          return {
            ...old,
            applications: [interviewData, ...old.applications],
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
          if (!old) return { application: interviewData }; // do nothing if cache is empty
          return { ...old, application: interviewData }; // only update `scholarship`
        }
      );
      queryClient.invalidateQueries({ queryKey: queryKeyApplicationAll });
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
        ["announcements", 1, 6, "dateCreated", "desc", ""],
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
