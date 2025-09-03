"use client";
import create from "@/assets/create.svg";
import browse from "@/assets/browse.svg";
import BlurText from "@/components/ui/blur";
import { usePathname } from "next/navigation";
import Link from "next/link";
import phone from "@/assets/Screenshot-2025-08-31-08-56-35-73-40deb401b9ffe8e1df2f1cc5ba480b12-portrait.png";
import apply from "@/assets/apply.svg";
import { ModeToggle } from "@/components/ui/dark-mode";

import track from "@/assets/track.svg";
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
  MapPin,
  Github,
  GraduationCap,
  FacebookIcon,
  Menu,
} from "lucide-react";
import bascLogo from "@/assets/basclogo.png";
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
      "Yes, you can apply to multiple scholarships. However, once you're accepted for one, all your other active applications will be automatically withdrawn.",
  },
  {
    value: "item-5",
    question: "Can I edit my application after submitting?",
    answer:
      "No, once an application is submitted, it cannot be edited. Please review all your information carefully before finalizing.",
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
    <div className="lg:w-3/4 w-[90%] mx-auto mt-15 space-y-5">
      <h1
        id="how-it-works"
        className="font-semibold lg:text-xl border-l-4 border-emerald-800 lg:pl-5 pl-3 flex items-center gap-2"
      >
        How It Works <MonitorCog />
      </h1>
      <div className="grid md:grid-cols-2 lg:gap-6 gap-3">
        {howItWorks.map((step, index) => (
          <SpotlightBorderWrapper key={index}>
            <div className="flex  border flex-col sm:flex-row items-start gap-4 lg:p-4  p-3 shadow-black/10   dark:bg-primary/5 bg-card lg:rounded-lg rounded-md ">
              <div className="w-full lg:h-40 h-35  overflow-hidden rounded-md bg-background dark:bg-transparent">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full   object-cover h-full"
                />
              </div>
              <div>
                <h3 className="lg:text-lg font-medium">{step.title}</h3>
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
    <div className="lg:space-y-5 space-y-3 lg:w-3/4 w-[90%] mx-auto mt-15">
      <h1
        id="faqs"
        className="font-semibold lg:text-xl border-l-4 border-emerald-800 lg:pl-5 pl-3 flex items-center gap-2"
      >
        Frequently Ask Questions <MessageCircleQuestion />
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

export default function LandingPage() {
  const pathname = usePathname();
  console.log(pathname);
  const HeaderComponent = () => {
    return (
      <header className="py-7 w-[95%] mx-auto  lg:flex justify-between items-center hidden">
        <span className="flex items-center gap-5 h-15 py-3">
          <span className="flex items-center gap-2">
            <img className="h-10 w-10" src={bascLogo.src} alt="" />
            <p className="font-semibold text-xl uppercase">basc edugrant</p>
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
                <Button variant="link" className="cursor-pointer">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </span>
        <span className="flex gap-3 items-center">
          <Link href={"/user/login"} prefetch={true}>
            <Button variant="outline">
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
      <div className="your-class fixed inset-0"></div>
      <div className="relative w-full z-10">
        <HeaderComponent />
        <AnimatePresence mode="wait">
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="relative min-h-[75vh]  mx-auto w-[95%]   rounded-3xl overflow-hidden    lg:flex items-center bg-[var(--green)] hidden"
          >
            <div className="absolute inset-0 h-full w-full flex items-center rounded-3xl x">
              <img
                className="absolute opacity-3 h-[120%] [mask-image:linear-gradient(to_right,transparent,black_30%)] pointer-events-none left-10"
                src={bascLogo.src}
                alt=""
              />
              <img
                className="h-full w-[40%] object-cover absolute right-0 [mask-image:linear-gradient(to_right,transparent,black)] z-10"
                src={bascImage.src}
                alt=""
              />
            </div>

            <div className="absolute z-10 left-10 h-full w-full flex flex-col justify-center">
              <span className="  flex gap-1 items-center">
                <MapPin className=" text-yellow-500" size={18} />
                <p className=" text-yellow-500/70 text-lg">
                  BASC Office of Student Affairs and Services
                </p>
              </span>
              <motion.span
                className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-500/70
  text-6xl  zxczxc tracking-[-8px] -translate-x-2 mt-1.5
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
                className="text-2xl mt-3 text-white"
              />
              <Link href={"/user/register"} prefetch={true} className="mt-8">
                <Button variant="outline">
                  Get started <ArrowRight />
                </Button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="h-[100dvh] p-4 space-y-15 block lg:hidden relative">
          <div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <img className="size-10" src={bascLogo.src} alt="" />
                <p className="font-semibold text-xl uppercase">basc</p>
              </span>
              <Menu size={30} />
            </div>
          </div>
          <div className="">
            <p className=" dark:text-yellow-500/70 text-yellow-500 text-sm">
              BASC Office of Student Affairs and Services
            </p>

            <div className="transform -translate-x-1.5">
              <motion.span
                className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-emerald-600/70 font-bold
  text-4xl  zxczxc tracking-[-5px] 
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
            </div>
            <BlurText
              text="Online scholarship application portal for BASC students."
              delay={150}
              animateBy="words"
              direction="top"
              className=" mt-5"
            />
            <div className="flex gap-2 mt-8">
              <Link href={"/user/login"} prefetch={true} className="flex-1">
                <Button className="w-full" size="lg" variant="outline">
                  Login
                </Button>
              </Link>
              <Link href={"/user/register"} prefetch={true} className="flex-1">
                <Button className="w-full" size="lg" variant="outline">
                  Register
                </Button>
              </Link>
            </div>
          </div>

          <img
            className="w-full aspect-square object-cover object-top  overflow-hidden"
            src={phone.src}
            alt=""
          />
        </div>
        <HowitworksComponent />
        <FaqsComponent />
        <Footer
          logo={<GraduationCap className="h-10 w-10" />}
          brandName="BASC edugrant"
          socialLinks={[
            {
              icon: <FacebookIcon className="h-5 w-5" />,
              href: "https://twitter.com",
              label: "Facebook",
            },
            {
              icon: <Github className="h-5 w-5" />,
              href: "https://github.com",
              label: "GitHub",
            },
          ]}
          mainLinks={[
            { href: "/products", label: "Products" },
            { href: "/about", label: "About" },
            { href: "/blog", label: "Blog" },
            { href: "/contact", label: "Contact" },
          ]}
          legalLinks={[
            { href: "/privacy", label: "Privacy" },
            { href: "/terms", label: "Terms" },
          ]}
          copyright={{
            text: "© 2025 BASC edugrant",
            license: "All rights reserved",
          }}
        />
      </div>
    </>
  );
}
