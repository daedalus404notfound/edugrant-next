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
      <div className="space-y-6 ">
        <div className="flex items-center justify-between  ">
          {/* Left side - Company info */}
          <div className="flex items-center gap-3">
            <img className="object-contain size-10" src={logo.src} alt="" />
            <span className="lg;text-lg text-base font-semibold text-foreground havelock tracking-tighter">
              Edugrant
            </span>
          </div>
        </div>

        <div className="flex lg:justify-center justify-between lg:gap-8 gap-4 lg:text-base text-sm items-center">
          {navItems.map((item, index) => (
            <li key={index} className="flex items-center">
              <Link className="hover:underline" href={`#${item.href}`}>
                {item.label}
              </Link>
            </li>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row justify-between text-muted-foreground lg:text-sm text-xs gap-3">
          <div className="flex gap-3 items-center">
            <p>© 2025 BASC </p>|<p> Edugrant</p>
          </div>

          <div className="flex items-center  gap-3">
            <Link
              href="/privacy-policy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            |
            <Link
              href="/terms&conditions"
              scroll={false}
              prefetch={true}
              className="hover:text-foreground transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
