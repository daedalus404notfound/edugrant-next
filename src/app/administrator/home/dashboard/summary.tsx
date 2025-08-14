import useScholarshipData from "@/hooks/admin/getScholarship";
import { Activity, CheckCheck, CloudUpload, TrendingUp } from "lucide-react";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";
export default function ApplicationSummary() {
  const { data, loading } = useScholarshipData({
    currentPage: 1,
    rowsPerPage: 100,
    sort: "",
    active: true,
  });
  const filterApproved = data.filter((meow) => meow.totalApproved);
  const filterApplication = data.filter((meow) => meow.totalApplicants);

  const summaryCards = [
    {
      label: " Total Applicants",
      data: filterApplication,
      icon: <TrendingUp />,
      color: "blue",
    },
    {
      label: " Approved Applicants",
      data: filterApplication,
      icon: <CheckCheck />,
      color: "green",
    },
    {
      label: "Pending Applicants",
      data: filterApproved,
      icon: <CloudUpload />,
      color: "yellow",
    },
    {
      label: "Active Scholarships",
      data: filterApplication,
      icon: <Activity />,
      color: "white",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 ">
      {summaryCards.map((meow, index) => (
        <div
          key={index}
          className=" bg-background/40 z-10 flex flex-col justify-between  rounded-lg  shadow-sm border aspect-[16/8] p-3"
        >
          <div className="flex justify-between items-start ">
            <span className="border p-2 rounded-md">{meow.icon}</span>
            <p
              className={`flex text-xs border p-1 rounded-sm bg-${meow.color}-800/10 text-${meow.color}-600`}
            >
              + 100 today
            </p>
          </div>
          <div className="flex justify-between items-end">
            <p className="text-sm text-muted-foreground">{meow.label}</p>
            <span className={`text-3xl font-semibold text-${meow.color}-600`}>
              {loading ? (
                <Ring
                  size={25}
                  stroke={2}
                  speed={2}
                  bgOpacity={0}
                  color="yellow"
                />
              ) : (
                filterApplication.length
              )}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
