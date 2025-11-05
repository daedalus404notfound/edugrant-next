"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import ModalHeader from "@/components/ui/modal-header";

export default function Termss() {
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
      <DialogContent
        showCloseButton={false}
        className="max-w-4xl w-[98%] mx-auto p-1 border-0 outline-0"
      >
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
        <ModalHeader
          text="Terms & Conditions"
          HandleCloseDrawer={HandleCloseDrawer}
        />
        {/* <div className="sticky top-0 z-10 bg-gradient-to-br to-background/40 from-background/80 lg:px-8 lg:py-6 rounded-lg">
          <h1 className="lg:text-3xl text-lg font-semibold tracking-tight text-balance">
            Terms & Conditions
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            EduGrant Scholarship Application System
          </p>
        </div> */}

        <ScrollArea className="h-[80dvh] bg-background p-4">
          <div className="space-y-4 mt-8">
            <h2 className="lg:text-xl text-base font-semibold tracking-tight">
              1. Introduction
            </h2>
            <p className="text-[15px] leading-relaxed text-foreground/90 text-sm lg:text-base">
              Welcome to EduGrant, the official online platform for scholarship
              applications at Bulacan Agricultural State College (BASC). By
              accessing or using this website, you agree to comply with and be
              bound by the following Terms and Conditions. Please read them
              carefully before proceeding. If you do not agree with any part of
              these terms, you are advised not to continue using the system.
            </p>
          </div>

          <div className="space-y-4 mt-8">
            <h2 className="lg:text-xl text-base font-semibold tracking-tight">
              2. Acceptance of Terms
            </h2>
            <p className="text-[15px] leading-relaxed text-foreground/90 text-sm lg:text-base">
              By using the EduGrant website, you acknowledge that:
            </p>
            <ul className="space-y-2 text-[15px] leading-relaxed text-foreground/90 ml-4">
              <li className="flex gap-3">
                <span className="text-muted-foreground mt-1.5">•</span>
                <span>
                  You have read, understood, and agreed to these Terms and
                  Conditions
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-muted-foreground mt-1.5">•</span>
                <span>
                  You consent to the collection and processing of your personal
                  information as stated in the EduGrant Privacy Policy
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-muted-foreground mt-1.5">•</span>
                <span>
                  You understand that violation of these terms may result in
                  account suspension, disqualification from scholarship
                  consideration, or other appropriate actions
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 mt-8">
            <h2 className="lg:text-xl text-base font-semibold tracking-tight">
              3. User Responsibilities
            </h2>
            <p className="text-[15px] leading-relaxed text-foreground/90 text-sm lg:text-base">
              As a user of EduGrant, you agree to:
            </p>
            <ul className="space-y-2 text-[15px] leading-relaxed text-foreground/90 ml-4">
              <li className="flex gap-3">
                <span className="text-muted-foreground mt-1.5">•</span>
                <span>
                  Provide accurate, complete, and truthful information in all
                  application forms
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-muted-foreground mt-1.5">•</span>
                <span>
                  Keep your login credentials confidential and not share them
                  with others
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-muted-foreground mt-1.5">•</span>
                <span>
                  Use the website only for lawful and intended purposes related
                  to scholarship application and processing
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-muted-foreground mt-1.5">•</span>
                <span>
                  Immediately report any unauthorized access or suspicious
                  activity on your account
                </span>
              </li>
            </ul>
            <p className="text-[15px] leading-relaxed text-foreground/90 mt-4">
              You are responsible for any actions performed under your account.
            </p>
          </div>

          <div className="space-y-4 mt-8">
            <h2 className="lg:text-xl text-base font-semibold tracking-tight">
              4. System Usage
            </h2>
            <p className="text-[15px] leading-relaxed text-foreground/90 text-sm lg:text-base">
              EduGrant is designed to facilitate scholarship applications and is
              accessible via the web. Users agree not to:
            </p>
            <ul className="space-y-2 text-[15px] leading-relaxed text-foreground/90 ml-4">
              <li className="flex gap-3">
                <span className="text-muted-foreground mt-1.5">•</span>
                <span>
                  Attempt to hack, alter, or disrupt the functionality of the
                  system
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-muted-foreground mt-1.5">•</span>
                <span>
                  Upload, transmit, or distribute malicious files or content
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-muted-foreground mt-1.5">•</span>
                <span>
                  Use the website to impersonate another individual or entity
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-muted-foreground mt-1.5">•</span>
                <span>
                  Misuse the platform for purposes other than scholarship
                  application and review
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 mt-8">
            <h2 className="lg:text-xl text-base font-semibold tracking-tight">
              5. Application Evaluation
            </h2>
            <p className="text-[15px] leading-relaxed text-foreground/90 text-sm lg:text-base">
              All applications submitted through EduGrant will undergo review by
              authorized BASC offices. The evaluation process follows
              institutional guidelines and scholarship criteria. Submission of
              an application does not guarantee approval or award. The decision
              of the BASC Scholarship Office is final and binding.
            </p>
          </div>

          <div className="space-y-4 mt-8">
            <h2 className="lg:text-xl text-base font-semibold tracking-tight">
              6. Intellectual Property Rights
            </h2>
            <p className="text-[15px] leading-relaxed text-foreground/90 text-sm lg:text-base">
              All content, materials, designs, logos, and information on the
              EduGrant website are the property of Bulacan Agricultural State
              College. Users are prohibited from copying, modifying,
              distributing, or using any materials from the system without prior
              written consent from BASC.
            </p>
          </div>

          <div className="space-y-4 mt-8">
            <h2 className="lg:text-xl text-base font-semibold tracking-tight">
              7. Data Privacy and Security
            </h2>
            <p className="text-[15px] leading-relaxed text-foreground/90 text-sm lg:text-base">
              EduGrant values your privacy. All personal information collected
              is processed in accordance with the Data Privacy Act of 2012 (RA
              10173) and the BASC Data Privacy Manual. For details, please refer
              to our Privacy Policy.
            </p>
          </div>

          <div className="space-y-4 mt-8">
            <h2 className="lg:text-xl text-base font-semibold tracking-tight">
              8. Limitation of Liability
            </h2>
            <p className="text-[15px] leading-relaxed text-foreground/90 text-sm lg:text-base">
              While EduGrant strives to provide a secure and reliable service,
              BASC shall not be held liable for:
            </p>
            <ul className="space-y-2 text-[15px] leading-relaxed text-foreground/90 ml-4">
              <li className="flex gap-3">
                <span className="text-muted-foreground mt-1.5">•</span>
                <span>Any technical issues, downtime, or system errors</span>
              </li>
              <li className="flex gap-3">
                <span className="text-muted-foreground mt-1.5">•</span>
                <span>
                  Loss or damage resulting from unauthorized access or use
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-muted-foreground mt-1.5">•</span>
                <span>
                  Any consequences arising from the user's failure to comply
                  with these Terms and Conditions
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 mt-8">
            <h2 className="lg:text-xl text-base font-semibold tracking-tight">
              9. Modification of Terms
            </h2>
            <p className="text-[15px] leading-relaxed text-foreground/90 text-sm lg:text-base">
              EduGrant reserves the right to amend or update these Terms and
              Conditions at any time without prior notice. Users are encouraged
              to review this page regularly to stay informed of any changes.
            </p>
          </div>

          <div className="space-y-4 mt-8">
            <h2 className="lg:text-xl text-base font-semibold tracking-tight">
              10. Governing Law
            </h2>
            <p className="text-[15px] leading-relaxed text-foreground/90 text-sm lg:text-base">
              These Terms and Conditions shall be governed by and interpreted in
              accordance with the laws of the Republic of the Philippines. Any
              disputes shall be resolved within the proper jurisdiction of
              Bulacan.
            </p>
          </div>

          <div className="space-y-4 mt-8">
            <h2 className="lg:text-xl text-base font-semibold tracking-tight">
              11. Contact Information
            </h2>
            <p className="text-[15px] leading-relaxed text-foreground/90 text-sm lg:text-base">
              For questions, concerns, or feedback regarding these Terms and
              Conditions, please contact:
            </p>
            <div className="mt-4 rounded-lg border bg-muted/30 p-4 space-y-1 text-[15px]">
              <p className="font-medium">
                Bulacan Agricultural State College – Scholarship Office
              </p>
              <p className="text-muted-foreground">San Ildefonso, Bulacan</p>
              <p className="text-muted-foreground">
                Email: [Insert official email here]
              </p>
              <p className="text-muted-foreground">
                Phone: [Insert contact number]
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
