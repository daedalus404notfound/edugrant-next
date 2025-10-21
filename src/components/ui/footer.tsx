import { Facebook, Github } from "lucide-react";
import Link from "next/link";
import next from "../../../public/next.svg";

export function Footer() {
  return (
    <footer className=" border-t lg:py-8 py-4 lg:mt-20 mt-10">
      <div className="w-full  mx-auto lg:px-6 ">
        <div className="flex items-center justify-between  ">
          {/* Left side - Company info */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <span className="text-lg font-semibold text-foreground">
              Edugrant
            </span>
          </div>

          {/* Right side - Social icons */}
          <div className="flex items-center space-x-4">
            <Link href="#" className=" hover:text-foreground transition-colors">
              <Facebook size={20} />
            </Link>
            <Link href="#" className=" hover:text-foreground transition-colors">
              <Github size={20} />
            </Link>
          </div>
        </div>

        {/* Bottom section */}
        <div className="lg:space-y-8 space-y-6">
          <div className="mt-8 flex flex-col lg:flex-row items-center justify-between text-sm ">
            {/* Copyright */}
            <div className="space-y-1 hidden  lg:block">
              <p>© 2024 BASC Edugrant</p>
            </div>

            {/* Navigation links */}
            <div className="flex items-center space-x-8">
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                How it works
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Contact
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Credits
              </Link>
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
          <div className="flex gap-4 bg-card p-4 justify-center items-center">
            <p className="  text-xs tracking-[2px] font-semibold">Powered by</p>
            <img className="object-contain w-20" src={next.src} alt="" />
          </div>
        </div>
      </div>
    </footer>
  );
}
