import { Button } from "@/components/ui/button";
import { ArrowRight, Map } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";
import TitleReusable from "@/components/ui/title";
export default function WelcomeCard({ loading }: { loading: boolean }) {
  const { user } = useUserStore();
  return (
    <div className=" relative overflow-hidden flex flex-col gap-12  px-2">
      {/* <img
        className="absolute object-contain shadow lg:-right-8 -right-20 lg:h-full h-3/4 lg:-bottom-15 -bottom-0 opacity-20"
        src={logo.src || "/placeholder.svg"}
        alt=""
      /> */}
      <div>
        <TitleReusable
          title={` Welcome back,${
            loading ? " —" : ` ${user?.Student.fName} ${user?.Student.lName}!`
          }`}
          description=""
          titleSize="text-base"
        />

        <h2 className="lg:text-4xl text-3xl font-extrabold tracking-wide text-foreground mb-2 text-balance montserrat">
          Ready to find a <span className="text-emerald-700">scholarship</span>?
        </h2>
      </div>
      <div className="  gap-3 z-10 hidden lg:flex">
        <Link href={`/user/home/scholarships`} className="flex-1 md:flex-0">
          <Button className="w-full">
            Browse Scholarships
            <ArrowRight />
          </Button>
        </Link>
        <Link href={`/user/home/applications`} className="flex-1 md:flex-0">
          <Button className="w-full" variant="secondary">
            Track Applications <Map />
          </Button>
        </Link>
      </div>{" "}
      <div className="flex  gap-3 z-10 lg:hidden">
        <Link href={`/user/home/scholarships`} className="flex-1 md:flex-0">
          <Button className="w-full">
            Browse
            <ArrowRight />
          </Button>
        </Link>
        <Link href={`/user/home/applications`} className="flex-1 md:flex-0">
          <Button className="w-full" variant="secondary">
            Track <Map />
          </Button>
        </Link>
      </div>
    </div>
  );
}
