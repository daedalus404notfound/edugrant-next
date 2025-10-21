import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/dark-mode";
import osas from "@/assets/osasa.png";
import create from "@/assets/create.svg";
import browse from "@/assets/browse.svg";
import BlurText from "@/components/ui/blur";
import { usePathname } from "next/navigation";
import track from "@/assets/track.svg";
import phone from "@/assets/Screenshot-2025-08-31-08-56-35-73-40deb401b9ffe8e1df2f1cc5ba480b12-portrait.png";
import apply from "@/assets/apply.svg";

const faqs = [
  {
    value: "item-1",
    question: "Who can apply for scholarships?",
    answer:
      "All currently enrolled BASC students who meet the specific scholarship's eligibility requirements are welcome to apply.",
  },
  {
    value: "item-2",
    question: "What documents are required?",
    answer:
      "Requirements vary by scholarship, but generally include your student ID, proof of enrollment, grades, and income documents. Always check each scholarship’s details.",
  },
  {
    value: "item-3",
    question: "How will I get notified?",
    answer: "You’ll receive updates through your student email and dashboard.",
  },
  {
    value: "item-4",
    question: "Can I apply to multiple scholarships?",
    answer:
      "Yes, you can apply to multiple scholarships, both government and private. However, once you are approved for a government scholarship, all your other government applications will be automatically cancelled. Private scholarships will not be affected.",
  },
  {
    value: "item-5",
    question: "Can I edit my application after submitting?",
    answer:
      "No, once an application is submitted, it cannot be edited. Please review all your information carefully before finalizing.",
  },
  {
    value: "item-6",
    question:
      "Can I still apply for private scholarships while waiting for government approval?",
    answer:
      "Yes, you may continue applying for private scholarships while your government scholarship application is pending. Even if you are approved for a government scholarship, your private scholarship applications will remain unaffected.",
  },
];

const howItWorks = [
  {
    title: "1. Create an Account",
    description:
      "Register using your BASC student email to get started on the scholarship portal.",
    image: create.src, // Replace with your own
  },
  {
    title: "2. Browse Scholarships",
    description:
      "Explore available scholarships and read their eligibility and requirements.",
    image: browse.src,
  },
  {
    title: "3. Upload Documents",
    description:
      "Fill out the application form and upload the required documents — all from your dashboard.",
    image: apply.src,
  },
  {
    title: "4. Track Your Status",
    description:
      "Get real-time updates on your application status and receive notifications via email and dashboard.",
    image: track.src,
  },
];
import {
  ChevronRight,
  FacebookIcon,
  GraduationCap,
  MessageCircleQuestion,
  MonitorCog,
} from "lucide-react";
import bascLogo from "@/assets/basclogo.png";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Footer } from "@/components/ui/footer";
import SpotlightBorderWrapper from "@/components/ui/border";
import { FeaturesSection } from "@/components/ui/features-section";
import ContactSection from "@/components/ui/contact-section";
import AppSection from "@/components/ui/feature-second";

const FaqsComponent = () => {
  return (
    <div className="w-full space-y-5 py-15">
      <h1 id="faqs" className="font-semibold   text-xl flex items-center gap-2">
        Frequently Ask Question
      </h1>
      <Accordion type="single" collapsible>
        {faqs.map((faq) => (
          <AccordionItem key={faq.value} value={faq.value}>
            <AccordionTrigger className="">{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
const HowitworksComponent = () => {
  return (
    <div className="w-full space-y-5  py-15">
      <h1
        id="how-it-works"
        className="font-semibold flex items-center gap-2 text-center w-full text-xl"
      >
        How It Works
      </h1>
      <div className="grid gap-3">
        {howItWorks.map((step, index) => (
          <SpotlightBorderWrapper key={index}>
            <div className="flex shadow items-start gap-4  p-2  bg-card rounded-md ">
              <div className=" overflow-hidden rounded-sm aspect-[16/13] w-30">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full object-cover h-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="lg:text-lg font-medium">{step.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          </SpotlightBorderWrapper>
        ))}
      </div>
    </div>
  );
};
export default function MobileLandingPage() {
  return (
    <div className="min-h-[100dvh] w-full relative bg-background">
      {/* Emerald Depths Background with Top Glow */}
      <div
        className="absolute inset-0 z-0 hidden dark:block "
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16, 185, 129, 0.25), transparent 70%), #000000",
        }}
      />
      <div
        className="fixed inset-0 z-0 dark:hidden h-100"
        style={{
          backgroundImage: `
        linear-gradient(to right, #d1d5db 1px, transparent 1px),
        linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
      `,
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
          opacity: 0.4,
        }}
      />

      <div className="relative z-10 space-y-8 p-4">
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex justify-between items-center"
        >
          <div className="flex items-center gap-2">
            <Image
              src={bascLogo.src}
              alt="bascLogo"
              unoptimized
              width={30}
              height={30}
            />
            <Image
              src={osas.src}
              alt="bascLogo"
              unoptimized
              width={30}
              height={30}
            />
          </div>
          <ModeToggle />
        </motion.header>
        <div className="flex flex-col items-center">
          <div className="text-center py-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Badge variant="outline">
                Bulacan Agricultural State College
              </Badge>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-8"
            >
              <motion.span
                className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-500/70
  text-4xl havelock tracking-[-3px]  font-bold 
  "
                initial={{ backgroundPosition: "200% 0" }}
                animate={{ backgroundPosition: "-200% 0" }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 7,
                  ease: "linear",
                }}
              >
                EDUGRANT
              </motion.span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-4 text-center"
            >
              Apply for scholarships, track your progress, and unlock
              opportunities for your future at BASC.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 gap-3 mt-10 w-full"
          >
            <Link className="col-span-2" href={`/user/login`}>
              <Button variant="outline" size="lg" className="w-full">
                <GraduationCap />
                Apply for Scholarship <ChevronRight />
              </Button>
            </Link>
            <Link className="" href={`/user/login`}>
              <Button className="w-full" size="lg" variant="outline">
                Login
              </Button>
            </Link>
            <Link className="" href={`/user/register`}>
              <Button className="w-full" size="lg" variant="outline">
                Register
              </Button>
            </Link>
          </motion.div>
          <HowitworksComponent />
          <AppSection />
          <FaqsComponent />
          <ContactSection />
          <Footer />
        </div>
      </div>
    </div>
  );
}
