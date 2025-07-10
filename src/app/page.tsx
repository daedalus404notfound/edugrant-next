"use client";
import create from "@/assets/create.svg";
import browse from "@/assets/browse.svg";
import BlurText from "@/components/ui/blur";
import Link from "next/link";
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
} from "lucide-react";
import bascLogo from "@/assets/basclogo.png";
import bascImage from "@/assets/BASCjf5989_03 copy.jpg";
import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
    title: "3. Apply Online",
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
const HeaderComponent = () => {
  return (
    <header className="py-7 w-[95%] mx-auto hidden lg:flex justify-between items-center ">
      <span className="flex items-center gap-5 h-15 py-3">
        <span className="flex items-center gap-2">
          <img className="h-10 w-10" src={bascLogo.src} alt="" />
          <p className="font-semibold text-xl ">basc edugrant</p>
        </span>
        <Separator orientation="vertical" />
        <ul className="flex gap-2">
          {navItems.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                const sectionId = item.label.toLowerCase().replace(/\s+/g, "-");
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
        <Link href={"/login"} prefetch={true}>
          <Button variant="outline">
            Login <LogInIcon />
          </Button>
        </Link>
        <ModeToggle />
      </span>
    </header>
  );
};
const HeroLanding = () => {
  return (
    <div className="relative h-[75vh] w-[95%] mx-auto justify-center items-start flex-col border rounded-3xl p-10 overflow-hidden bg-[var(--green)] flex shadow-md">
      <img
        className="absolute opacity-3 h-[120%] [mask-image:linear-gradient(to_right,transparent,black_30%)] pointer-events-none"
        src={bascLogo.src}
        alt=""
      />
      <img
        className="h-full w-[40%] object-cover absolute right-0 [mask-image:linear-gradient(to_right,transparent,black)] z-10"
        src={bascImage.src}
        alt=""
      />

      <motion.span
        className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-green-500/70 
text-6xl  zxczxc tracking-[-8px] -translate-x-2
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

      <Link href={"/register"} prefetch={true} className="mt-8">
        <Button variant="outline">
          Get started <ArrowRight />
        </Button>
      </Link>
    </div>
  );
};

const HowitworksComponent = () => {
  return (
    <div className="w-3/4 mx-auto mt-15 space-y-5">
      <h1
        id="how-it-works"
        className="font-semibold text-xl border-l-4 border-green-600 pl-5 flex items-center gap-2"
      >
        How It Works <MonitorCog />
      </h1>
      <div className="grid md:grid-cols-2 gap-6">
        {howItWorks.map((step, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-sm flex flex-col sm:flex-row items-start gap-4 backdrop:backdrop-blur-2xl bg-muted-foreground/5"
          >
            <img
              src={step.image}
              alt={step.title}
              className="w-full h-40  object-cover rounded-md"
            />
            <div>
              <h3 className="text-lg font-medium">{step.title}</h3>
              <p className="text-sm mt-1 text-muted-foreground">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FaqsComponent = () => {
  return (
    <div className="space-y-5 w-3/4 mx-auto mt-15">
      <h1
        id="faqs"
        className="font-semibold text-xl border-l-4 border-green-600 pl-5 flex items-center gap-2"
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
  return (
    <>
      <div className="relative w-full your-class ">
        <HeaderComponent />
        <HeroLanding />
        <HowitworksComponent />
        <FaqsComponent />
      </div>
    </>
  );
}
