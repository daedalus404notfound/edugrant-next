"use client";
import create from "@/assets/create-2.svg";
import browse from "@/assets/browse-2.svg";
import BlurText from "@/components/ui/blur";
import { usePathname } from "next/navigation";
import Link from "next/link";
import apply from "@/assets/upload-2.svg";
import { ModeToggle } from "@/components/ui/dark-mode";

import track from "@/assets/track-2.svg";
import {
  ArrowRight,
  LogInIcon,
  MessageCircleQuestion,
  MonitorCog,
  Home,
  Settings,
  Mail,
  HelpCircle,
  Zap,
  Building,
  Milestone,
} from "lucide-react";
import bascLogo from "@/assets/basclogo.png";
import osas from "@/assets/osasa.png";
import bascImage from "@/assets/BASCjf5989_03 copy.jpg";
import { AnimatePresence, motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Footer } from "@/components/ui/footer";
import SpotlightBorderWrapper from "@/components/ui/border";
import { Badge } from "@/components/ui/badge";
import ContactSection from "@/components/ui/contact-section";
import { FeaturesSection } from "@/components/ui/features-section";
import AppSection from "@/components/ui/feature-second";
import TitleReusable from "@/components/ui/title";
import AboutTheTeam from "@/components/ui/credits";
const navItems = [
  { label: "Home", icon: Home },
  { label: "Features", icon: Zap },
  { label: "How it works", icon: Settings },
  { label: "Contact", icon: Mail },
  { label: "Faqs", icon: HelpCircle },
];
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
      "Yes, you can still edit your application after submitting. Make sure to save changes properly before the deadline.",
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
const HowitworksComponent = () => {
  return (
    <div className="w-full space-y-12 py-20 px-6">
      <div className="relative z-10 ">
        <TitleReusable
          description="Follow these four simple steps to apply for scholarships seamlessly."
          title=" How it works"
          Icon={Milestone}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-8 ">
        {howItWorks.map((step, index) => (
          <SpotlightBorderWrapper key={index}>
            <div className="flex  border dark:border-green-900/30 flex-col sm:flex-row items-start gap-6 p-6 shadow-sm  dark:bg-green-950/20  rounded-lg ">
              <div className="w-3/4 aspect-[16/8.5] min-h-40 overflow-hidden rounded-md dark:bg-transparent">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full   object-cover h-full"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium">{step.title}</h3>
                <p className="text-sm mt-1 text-muted-foreground">
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

const FaqsComponent = () => {
  return (
    <div className="space-y-5 w-full py-25 px-6">
      <h1
        id="faqs"
        className="font-semibold text-3xl   flex items-center gap-2"
      >
        Frequently Ask Questions
      </h1>
      <Accordion type="single" collapsible>
        {faqs.map((faq) => (
          <AccordionItem key={faq.value} value={faq.value}>
            <AccordionTrigger className="!py-8">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default function DesktopLandingPage() {
  const pathname = usePathname();
  console.log(pathname);
  const HeaderComponent = () => {
    return (
      <header className="py-7 w-[95%] mx-auto  flex justify-between items-center">
        <span className="flex items-center gap-5 h-15 py-3">
          <span className="flex items-center gap-2">
            <img className="h-10 w-10" src={bascLogo.src} alt="" />
            <img className="h-10 w-10" src={osas.src} alt="" />
            <p className="font-semibold text-xl ">BASC</p>
          </span>
          <Separator orientation="vertical" />
          <ul className="flex gap-2">
            {navItems.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  const sectionId = item.label
                    .toLowerCase()
                    .replace(/\s+/g, "-");
                  const section = document.getElementById(sectionId);
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className=" flex items-center"
              >
                <Button variant="ghost" className="cursor-pointer">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </span>
        <span className="flex gap-3 items-center">
          <Link href={"/user/login"} prefetch={true}>
            <Button variant="secondary">
              Login <LogInIcon />
            </Button>
          </Link>
          <ModeToggle />
        </span>
      </header>
    );
  };

  return (
    <>
      <div className="gradient absolute inset-0 z-10 hidden dark:block h-[88dvh]"></div>
      <div className="relative w-full z-10 ">
        <HeaderComponent />
        <AnimatePresence mode="wait">
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="relative min-h-[75vh]  mx-auto w-[95%]   rounded-3xl overflow-hidden  flex items-center dark:bg-primary-second/50  bg-green-800 shadow "
          >
            <div className="absolute inset-0 h-full w-full flex items-center rounded-3xl x">
              <img
                className="absolute opacity-3 h-[120%] [mask-image:linear-gradient(to_right,transparent,black_30%)] pointer-events-none left-10"
                src={bascLogo.src}
                alt=""
              />
              <img
                className="h-full w-[40%] object-cover absolute right-0 [mask-image:linear-gradient(to_right,transparent,black_80%)] z-10 opacity-90"
                src={bascImage.src}
                alt=""
              />
            </div>

            <div className="absolute z-10 left-15 h-full w-full flex flex-col justify-center">
              <motion.span
                className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  dark:text-primary/70 text-gray-200
  text-6xl  havelock tracking-[-8px] py-5 -translate-x-2 
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
                Edugrant
              </motion.span>
              <BlurText
                text="Online scholarship application portal for BASC students."
                delay={150}
                animateBy="words"
                direction="top"
                className="text-2xl  text-white"
              />
              <Link href={"/user/register"} prefetch={true} className="mt-8">
                <Button variant="outline">
                  Get started <ArrowRight />
                </Button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mx-auto w-3/4 ">
          <AppSection />
          <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
          <HowitworksComponent />
          <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
          <ContactSection />
          <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
          <FaqsComponent />
          <AboutTheTeam />
          <Footer />
        </div>
      </div>
    </>
  );
}
