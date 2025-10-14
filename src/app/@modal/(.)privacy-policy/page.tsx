"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function PrivacyPolicy() {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 250);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DialogContent className="max-w-4xl h-[85vh] p-0 border-0 rounded-lg overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle className="text-2xl font-semibold">
            Privacy Policy
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </DialogHeader>

        <div className="sticky top-0 z-10 bg-gradient-to-br to-background/40 from-background/80 px-8 py-6 rounded-lg">
          <h1 className="text-3xl font-semibold tracking-tight text-balance">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="px-6 py-6 space-y-8 overflow-auto">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              EduGrant values your privacy and is committed to protecting your
              personal data. This Privacy Policy explains how we collect, use,
              store, and safeguard your personal information in compliance with
              Republic Act No. 10173 (Data Privacy Act of 2012), the BASC Data
              Privacy Manual, and other applicable laws.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By using the EduGrant website or continuing to fill out our forms,
              you consent to the collection, processing, and storage of your
              personal information as described in this policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">2. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              EduGrant collects only the necessary personal information to
              process your scholarship application. This may include, but is not
              limited to:
            </p>
            <ul className="space-y-2 text-muted-foreground leading-relaxed ml-6">
              <li className="list-disc">Full name</li>
              <li className="list-disc">Email address</li>
              <li className="list-disc">Contact number</li>
              <li className="list-disc">Academic information</li>
              <li className="list-disc">
                Supporting documents (such as grades, certificates, and proof of
                income)
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              All collected information will be used solely for scholarship
              processing and related legal purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">
              3. Purpose of Data Collection
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Your personal data is collected and processed for the following
              purposes:
            </p>
            <ul className="space-y-2 text-muted-foreground leading-relaxed ml-6">
              <li className="list-disc">
                To evaluate scholarship applications
              </li>
              <li className="list-disc">
                To verify eligibility and qualifications
              </li>
              <li className="list-disc">
                To communicate updates, results, and related announcements
              </li>
              <li className="list-disc">
                To maintain accurate records for institutional and legal
                reporting
              </li>
              <li className="list-disc">
                To comply with the requirements of BASC and relevant government
                regulations
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">
              4. Data Protection and Confidentiality
            </h2>
            <ul className="space-y-2 text-muted-foreground leading-relaxed ml-6">
              <li className="list-disc">
                EduGrant ensures that all personal information collected is kept
                private, confidential, and secure.
              </li>
              <li className="list-disc">
                Only authorized personnel from the relevant offices are granted
                access to your data.
              </li>
              <li className="list-disc">
                Appropriate physical, electronic, and managerial procedures are
                implemented to safeguard your information from unauthorized
                access, disclosure, alteration, or destruction.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">
              5. Data Sharing and Disclosure
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              EduGrant does not share your personal information with third
              parties unless:
            </p>
            <ul className="space-y-2 text-muted-foreground leading-relaxed ml-6">
              <li className="list-disc">
                Required by law or authorized by a government agency;
              </li>
              <li className="list-disc">
                Necessary for legitimate institutional purposes; or
              </li>
              <li className="list-disc">With your express consent.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              All disclosures are made in accordance with the Data Privacy Act
              and the BASC Data Privacy Manual.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">
              6. Data Retention and Disposal
            </h2>
            <ul className="space-y-2 text-muted-foreground leading-relaxed ml-6">
              <li className="list-disc">
                Your personal information will be retained only for as long as
                necessary to fulfill the purposes stated above or as required by
                law.
              </li>
              <li className="list-disc">
                After the retention period, all records containing personal data
                will be securely disposed of in accordance with BASC's data
                retention and disposal policies.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">
              7. Your Rights as a Data Subject
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Under the Data Privacy Act of 2012, you have the right to:
            </p>
            <ul className="space-y-2 text-muted-foreground leading-relaxed ml-6">
              <li className="list-disc">
                Be informed of how your data is collected and processed;
              </li>
              <li className="list-disc">
                Access and request a copy of your personal information;
              </li>
              <li className="list-disc">
                Correct or update any inaccurate or incomplete data;
              </li>
              <li className="list-disc">
                Withdraw consent or object to data processing;
              </li>
              <li className="list-disc">
                File a complaint in case of any data privacy violation.
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Requests regarding your data may be addressed to the BASC Data
              Protection Officer.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">8. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              For concerns or inquiries regarding data privacy, you may contact:
            </p>
            <div className="bg-muted/50 rounded-lg p-4 space-y-1">
              <p className="font-medium">Data Protection Officer (DPO)</p>
              <p className="text-sm text-muted-foreground">
                Bulacan Agricultural State College (BASC)
              </p>
              <p className="text-sm text-muted-foreground">
                San Ildefonso, Bulacan
              </p>
              <p className="text-sm text-muted-foreground">
                Email: [Insert DPO email here]
              </p>
              <p className="text-sm text-muted-foreground">
                Phone: [Insert contact number]
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">9. Policy Updates</h2>
            <p className="text-muted-foreground leading-relaxed">
              EduGrant reserves the right to update or amend this Privacy Policy
              as needed to comply with changes in regulations or institutional
              requirements. Any updates will be posted on the EduGrant website.
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
