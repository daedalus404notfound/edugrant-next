import type { TourConfig } from "@/lib/use-tour2";

export const tourConfigs: TourConfig = {
  edugrantDashboard: [
    {
      id: "summary",
      title: "Summary Cards",
      description:
        "Displays key statistics including Total Applicants, Approved Applicants, Active Scholarships, and Pending Applications.",
    },
    {
      id: "bar",
      title: "Applications vs Approved",
      description:
        "Shows a bar chart comparing total applications (blue) against approved scholarships (green).",
    },
    {
      id: "pie",
      title: "Scholarship Applicants",
      description:
        "Illustrates the distribution of applicants across General, Indigenous, and PWD categories.",
    },
    {
      id: "bar-horizontal",
      title: "Applications by Institute",
      description:
        "Presents a horizontal bar chart showing the number of applications per institute.",
    },
    {
      id: "ongoing",
      title: "Ongoing Scholarships",
      description:
        "Displays a list of currently active and ongoing scholarship programs.",
    },
    {
      id: "recent",
      title: "Recently Processed Applications",
      description:
        "Shows the most recently reviewed and processed scholarship applications.",
    },
    {
      id: "guide",
      title: "User Guide",
      description:
        "Having trouble using Edugrant? Check out our helpful user guides for assistance.",
    },
  ],
  postScholarship: [
    {
      id: "post-scholarship",
      title: "Post Scholarship",
      description:
        "Learn how to create and publish a new scholarship opportunity.",
    },
    {
      id: "text-forms",
      title: "Welcome to Post Scholarship",
      description:
        "This guide will walk you through the scholarship posting process step by step.",
    },
    {
      id: "interview-form",
      title: "Welcome to Post Scholarship",
      description:
        "This guide will walk you through the scholarship posting process step by step.",
    },
    {
      id: "image-forms",
      title: "Welcome to Post Scholarship",
      description:
        "This guide will walk you through the scholarship posting process step by step.",
    },
    {
      id: "document-forms",
      title: "Welcome to Post Scholarship",
      description:
        "This guide will walk you through the scholarship posting process step by step.",
    },
    {
      id: "submit-forms",
      title: "Welcome to Post Scholarship",
      description:
        "This guide will walk you through the scholarship posting process step by step.",
    },
  ],
};
