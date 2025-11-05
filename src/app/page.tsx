"use client";
import create from "@/assets/create-2.svg";
import browse from "@/assets/browse-2.svg";
import edugrant from "@/assets/edugrant-logo.png";
import BlurText from "@/components/ui/blur";
import { usePathname } from "next/navigation";
import Link from "next/link";
import apply from "@/assets/upload-2.svg";
import { ModeToggle } from "@/components/ui/dark-mode";

import track from "@/assets/track-2.svg";
import {
  ArrowRight,
  LogInIcon,
  Home,
  Settings,
  Mail,
  HelpCircle,
  Zap,
  Milestone,
  GraduationCap,
  ChevronRight,
  Megaphone,
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
import AppSection from "@/components/ui/feature-second";
import TitleReusable from "@/components/ui/title";
import AboutTheTeam from "@/components/ui/credits";

import Image from "next/image";
import PublicAnnouncement from "./public";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
const navItems = [
  { label: "Announcements", icon: Megaphone, href: "home" },
  { label: "Features", icon: Zap, href: "features" },
  { label: "How it works", icon: Settings, href: "how-it-works" },
  { label: "Contact", icon: Mail, href: "contact" },
  { label: "Faqs", icon: HelpCircle, href: "faqs" },
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
  // Define motion variants (same pattern as in AppSection)
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <div className="w-full space-y-12 py-20 px-6">
      <div className="relative z-10">
        <TitleReusable
          description="Follow these four simple steps to apply for scholarships seamlessly."
          title="How it works"
          Icon={Milestone}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {howItWorks.map((step, index) => (
          <motion.div
            key={index}
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
              delay: index * 0.1, // stagger effect
            }}
          >
            <SpotlightBorderWrapper>
              <div className="flex border dark:border-green-900/30 flex-col sm:flex-row items-start gap-6 p-6 shadow-sm dark:bg-green-950/20 rounded-lg">
                <div className="w-3/4 aspect-[16/8.5] min-h-40 overflow-hidden rounded-md dark:bg-transparent">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full object-cover h-full"
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
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const HowitworksComponentMobile = () => {
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

const FaqsComponent = () => {
  return (
    <div className="space-y-5 w-full py-25 lg:px-6">
      <h1
        id="faqs"
        className="font-semibold lg:text-3xl  text-xl  flex items-center gap-2"
      >
        Frequently Ask Questions
      </h1>
      <Accordion type="single" collapsible>
        {faqs.map((faq) => (
          <AccordionItem key={faq.value} value={faq.value}>
            <AccordionTrigger className="lg:!py-8 !py-6">
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
  const [openAnnouncement, setOpenAnnouncement] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    if (isMobile === undefined) return; // ✅ Wait for detection

    if (!isMobile) {
      const timer = setTimeout(() => {
        setOpenAnnouncement(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  console.log(pathname);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 0.2 }}
        className="gradient absolute inset-0 z-10 hidden dark:block h-[88dvh]"
      ></motion.div>
      <div
        className="absolute inset-0 z-0 dark:hidden lg:hidden h-100"
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
      <div className="relative w-full z-10 overflow-x-hidden">
        <motion.header
          className="py-7 w-[95%] mx-auto  lg:flex justify-between items-center hidden"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <span className="flex items-center gap-5 h-15 py-3">
            <motion.span
              className="flex items-center gap-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img className="h-10 w-10" src={bascLogo.src} alt="" />
              <img className="h-10 w-10" src={osas.src} alt="" />
              <img className="h-10 w-10" src={edugrant.src} alt="" />
            </motion.span>
            <Separator orientation="vertical" />
            <ul className="flex gap-2">
              {navItems.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => {
                      if (item.label === "Announcements") {
                        setOpenAnnouncement(true);
                      }
                    }}
                    variant="ghost"
                    className="cursor-pointer"
                    asChild
                  >
                    <Link href={`#${item.href}`}>
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  </Button>
                </motion.li>
              ))}
            </ul>
          </span>
          <motion.span
            className="flex gap-3 items-center"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href={"/user/login"} prefetch={true} scroll={false}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="secondary">
                  Login <LogInIcon />
                </Button>
              </motion.div>
            </Link>

            <ModeToggle />
          </motion.span>
        </motion.header>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="relative min-h-[75vh]  mx-auto w-[95%]   rounded-3xl overflow-hidden hidden lg:flex items-center dark:bg-primary-second/50  bg-green-800 shadow "
          >
            <div className="absolute inset-0 h-full w-full flex items-center rounded-3xl x">
              <motion.img
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 0.05, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="absolute opacity-3 h-[120%] [mask-image:linear-gradient(to_right,transparent,black_30%)] pointer-events-none left-10"
                src={bascLogo.src}
                alt=""
              />
              <motion.img
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.8 }}
                className="h-full w-[40%] object-cover absolute right-0 [mask-image:linear-gradient(to_right,transparent,black_80%)] z-10 opacity-90"
                src={bascImage.src}
                alt=""
              />
            </div>
            {/* <div className="absolute z-10 left-15 h-full w-full flex flex-col justify-center">
              <Link href={`https://basc.edu.ph/`} target="_blank">
                <Badge variant="outline" className="hidden dark:flex">
                  Bulacan Agricultural State College <ArrowRight />
                </Badge>
                <Badge variant="secondary" className="dark:hidden">
                  Bulacan Agricultural State College <ArrowRight />
                </Badge>
              </Link>
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
            </div> */}{" "}
            <motion.div
              className="absolute z-10 left-15 h-full w-full flex flex-col justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.9 }}
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.0 }}
              >
                <Link href={`https://basc.edu.ph/`} target="_blank">
                  <Badge variant="outline" className="hidden dark:flex">
                    Bulacan Agricultural State College <ArrowRight />
                  </Badge>
                  <Badge variant="secondary" className="dark:hidden">
                    Bulacan Agricultural State College <ArrowRight />
                  </Badge>
                </Link>
              </motion.div>

              <motion.span
                className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  dark:text-primary/70 text-gray-200
  text-6xl  havelock tracking-[-8px] py-5 -translate-x-2 
  "
                initial={{ backgroundPosition: "200% 0", opacity: 0, y: 20 }}
                animate={{ backgroundPosition: "-200% 0", opacity: 1, y: 0 }}
                transition={{
                  backgroundPosition: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    duration: 7,
                    ease: "linear",
                  },
                  opacity: { duration: 0.4, delay: 1.1 },
                  y: { duration: 0.4, delay: 1.1 },
                }}
              >
                Edugrant
              </motion.span>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.2 }}
              >
                <BlurText
                  text="Online scholarship application portal for BASC students."
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="text-2xl  text-white"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.3 }}
                className="mt-8"
              >
                <Link href={"/user/register"} prefetch={true}>
                  <Button variant="outline">
                    Get started <ArrowRight />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div className="p-4 lg:hidden">
          <header className=" flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                src={bascLogo.src}
                alt="bascLogo"
                unoptimized
                width={35}
                height={35}
              />
              <Image
                src={osas.src}
                alt="bascLogo"
                unoptimized
                width={35}
                height={35}
              />
            </div>
            <div className="flex items-center gap-3">
              <Button
                className="rounded-full"
                size="icon"
                onClick={() => setOpenAnnouncement(true)}
              >
                <Megaphone />
              </Button>

              <ModeToggle />
            </div>
          </header>
          <div className="text-center py-10">
            <div>
              <Badge variant="outline">
                Bulacan Agricultural State College
              </Badge>
            </div>
            <div className="text-center mt-8">
              <span
                className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-500/70
  text-4xl havelock tracking-[-3px]  font-bold 
  "
              >
                EDUGRANT
              </span>
            </div>
            <p className="mt-4 text-center">
              Apply for scholarships, track your progress, and unlock
              opportunities for your future at BASC.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-10 w-full">
            <Link className="col-span-2" href={`/user/login`}>
              <Button size="lg" className="w-full">
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
          </div>
        </div>
        <div className="mx-auto xl:w-3/4 p-4">
          <div id="features" className="">
            <AppSection />
          </div>
          <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
          <div id="how-it-works" className="hidden lg:block">
            <HowitworksComponent />
          </div>
          <div className="block lg:hidden">
            <HowitworksComponentMobile />
          </div>
          <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
          <div id="contact">
            <ContactSection />
          </div>
          <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
          <div id="faqs">
            <FaqsComponent />
          </div>
          <AboutTheTeam />
          <Footer />

          <PublicAnnouncement
            open={openAnnouncement}
            setOpen={setOpenAnnouncement}
          />
        </div>
      </div>
    </>
  );
}
