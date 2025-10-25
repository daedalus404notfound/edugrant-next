import {
  Building,
  Facebook,
  Github,
  HelpCircle,
  Home,
  Landmark,
  Mail,
  Settings,
  Zap,
} from "lucide-react";
import Link from "next/link";
import next from "../../../public/next.svg";
import logo from "@/assets/edugrant-logo.png";
const navItems = [
  { label: "Home", icon: Home, href: "home" },
  { label: "Features", icon: Zap, href: "features" },
  { label: "How it works", icon: Settings, href: "how-it-works" },
  { label: "Contact", icon: Mail, href: "contact" },
  { label: "Faqs", icon: HelpCircle, href: "faqs" },
];
export function Footer() {
  return (
    <footer className=" border-t lg:py-8 py-4 lg:mt-20 mt-10">
      <div className="w-full  mx-auto lg:px-6 ">
        <div className="flex items-center justify-between  ">
          {/* Left side - Company info */}
          <div className="flex items-center space-x-3">
            <img className="object-contain size-13" src={logo.src} alt="" />
            <span className="text-lg font-semibold text-foreground havelock tracking-tighter">
              Edugrant
            </span>
          </div>

          {/* Right side - Social icons */}
          <div className="flex items-center space-x-4">
            <Link
              target="_blank"
              href="https://www.facebook.com/bascofficeofstudentaffairsandservices"
              className=" hover:text-foreground transition-colors"
            >
              <Facebook size={20} />
            </Link>
            <Link
              target="_blank"
              href="https://basc.edu.ph/"
              className=" hover:text-foreground transition-colors"
            >
              <Landmark size={20} />
            </Link>
          </div>
        </div>

        {/* Bottom section */}
        <div className="lg:space-y-8 space-y-6">
          <div className="mt-8 flex flex-col lg:flex-row items-center justify-between text-sm ">
            {/* Copyright */}
            <div className="space-y-1 hidden  lg:block">
              <p>© 2025 BASC | Edugrant</p>
            </div>

            {/* Navigation links */}
            <div className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <li key={index} className="flex items-center">
                  <Link className="hover:underline" href={`#${item.href}`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </div>

            {/* Legal links */}
            <div className="flex items-center space-x-6">
              <Link
                href="/privacy-policy"
                className="hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms&conditions"
                scroll={false}
                prefetch={true}
                className="hover:text-foreground transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
          <div className="flex gap-4 bg-muted rounded-sm p-4 justify-center items-center">
            <p className="  text-xs tracking-[2px] font-semibold">Powered by</p>
            <img className="object-contain w-20" src={next.src} alt="" />
          </div>
        </div>
      </div>
    </footer>
  );
}
