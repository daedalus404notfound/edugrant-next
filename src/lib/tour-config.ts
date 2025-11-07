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
      id: "text-forms",
      title: "Text Form",
      description:
        "Provide the scholarship details, including title, description, and other essential information.",
    },

    {
      id: "interview-form",
      title: "For Interview Checkbox",
      description:
        "Enable this option if the scholarship requires applicants to undergo an interview.",
    },
    {
      id: "image-forms",
      title: "Image Forms",
      description:
        "Upload the sponsor’s logo, cover image, and any related scholarship forms or visual materials.",
    },
    {
      id: "document-forms",
      title: "Required Documents",
      description:
        "List all the necessary documents. You can specify labels, formats, and whether each document is required or optional.",
    },
    {
      id: "submit-forms",
      title: "Post Scholarship Button",
      description:
        "Once all information is complete, click this button to publish your scholarship post.",
    },
  ],

  postAnnouncement: [
    {
      id: "post-1",
      title: "Announcement Title",
      description:
        "Enter a clear and concise title for your announcement to quickly inform readers of its purpose.",
    },
    {
      id: "post-2",
      title: "Tags",
      description:
        "Add relevant tags to help categorize and organize your announcement for easier searching and filtering.",
    },
    {
      id: "post-3",
      title: "Description",
      description:
        "Write a detailed description explaining the announcement, including important information and instructions.",
    },
    {
      id: "post-4",
      title: "Post Announcement Button",
      description:
        "Once all details are filled in, click this button to publish your announcement for everyone to see.",
    },
  ],

  editScholarship: [
    {
      id: "1",
      title: "Select Scholarship to Edit",
      description:
        "Choose the scholarship you wish to modify from the available list.",
    },
    {
      id: "2",
      title: "Edit Scholarship Button",
      description:
        "Click this button to open the editing panel for the selected scholarship.",
    },
    {
      id: "3",
      title: "Welcome to Edit Scholarship",
      description:
        "This guide will help you navigate through the process of editing an existing scholarship.",
    },
    {
      id: "4",
      title: "Edit Scholarship Information Form",
      description:
        "Update key details such as title, description, eligibility, and application deadlines.",
    },
    {
      id: "5",
      title: "Edit Scholarship Images Form",
      description:
        "Replace or update the images associated with the scholarship post.",
    },
    {
      id: "6",
      title: "Edit Scholarship Documents Form",
      description:
        "Upload or update the required documents for the scholarship application.",
    },
    {
      id: "7",
      title: "Save Changes Button",
      description:
        "Click this button to save your updates and apply the changes to the scholarship.",
    },
  ],

  //DONE
  renewScholarship: [
    {
      id: "renew-1",
      title: "Select Scholarship",
      description:
        "Choose an expired scholarship that you would like to renew.",
    },
    {
      id: "renew-2",
      title: "Renewal Button",
      description: "This button will appear when a scholarship has expired.",
    },
    {
      id: "renew-3",
      title: "Welcome to Scholarship Renewal",
      description:
        "This guide will walk you through the scholarship renewal process step by step.",
    },
    {
      id: "renew-4",
      title: "Renewal Form",
      description:
        "Provide the required renewal details and documents to continue.",
    },
    {
      id: "renew-5",
      title: "Submit Renewal",
      description:
        "Click this button to save your changes and renew the scholarship.",
    },
  ],

  generateReport: [
    {
      id: "generate-1",
      title: "Welcome to Post Scholarship",
      description:
        "This guide will walk you through the scholarship posting process step by step.",
    },
    {
      id: "generate-2",
      title: "Welcome to Post Scholarship",
      description:
        "This guide will walk you through the scholarship posting process step by step.",
    },
    {
      id: "generate-3",
      title: "Welcome to Post Scholarship",
      description:
        "This guide will walk you through the scholarship posting process step by step.",
    },
    {
      id: "generate-4",
      title: "Welcome to Post Scholarship",
      description:
        "This guide will walk you through the scholarship posting process step by step.",
    },
    {
      id: "generate-5",
      title: "Welcome to Post Scholarship",
      description:
        "This guide will walk you through the scholarship posting process step by step.",
    },
    {
      id: "generate-6",
      title: "Welcome to Post Scholarship",
      description:
        "This guide will walk you through the scholarship posting process step by step.",
    },
    {
      id: "generate-7",
      title: "Welcome to Post Scholarship",
      description:
        "This guide will walk you through the scholarship posting process step by step.",
    },
  ],
  addStaff: [
    {
      id: "staff-1",
      title: "Personal Information",
      description:
        "Fill out the staff member’s first, middle, and last name accurately to ensure proper identification.",
    },
    {
      id: "staff-2",
      title: "Contact Information",
      description:
        "Provide a valid email address and phone number so the staff member can receive important updates and notifications.",
    },
    {
      id: "staff-3",
      title: "Account Security",
      description:
        "Set a strong password and confirm it to secure the staff member’s account before proceeding.",
    },
  ],
  activateStaff: [
    {
      id: "activate-1",
      title: "Choose Staff",
      description:
        "Select the staff member you want to activate from the table.",
    },
    {
      id: "activate-2",
      title: "Select Activate",
      description:
        "Click on the activation option to enable the selected staff member.",
    },
    {
      id: "activate-3",
      title: "Save Changes",
      description:
        "Review your selection and click 'Save Changes' to complete the activation process.",
    },
  ],

  reviewApplication: [
    {
      id: "review-1",
      title: "Welcome to Post Scholarship",
      description:
        "This guide will walk you through the scholarship posting process step by step.",
    },
    {
      id: "review-2",
      title: "Welcome to Post Scholarship",
      description:
        "This guide will walk you through the scholarship posting process step by step.",
    },
    {
      id: "review-3",
      title: "Welcome to Post Scholarship",
      description:
        "This guide will walk you through the scholarship posting process step by step.",
    },
    {
      id: "review-4",
      title: "Welcome to Post Scholarship",
      description:
        "This guide will walk you through the scholarship posting process step by step.",
    },
    {
      id: "review-5",
      title: "Welcome to Post Scholarship",
      description:
        "This guide will walk you through the scholarship posting process step by step.",
    },
    {
      id: "review-6",
      title: "Welcome to Post Scholarship",
      description:
        "This guide will walk you through the scholarship posting process step by step.",
    },
    {
      id: "review-7",
      title: "Welcome to Post Scholarship",
      description:
        "This guide will walk you through the scholarship posting process step by step.",
    },
    {
      id: "review-8",
      title: "Welcome to Post Scholarship",
      description:
        "This guide will walk you through the scholarship posting process step by step.",
    },
  ],
};
