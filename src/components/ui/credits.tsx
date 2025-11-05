import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin } from "lucide-react";
import tecson from "@/assets/tecson.jpg";
import ramos from "@/assets/ramos.jpg";
import ferraren from "@/assets/omar.jpg";
import sants from "@/assets/sants.jpg";
import pena from "@/assets/mikku.png";
// Define props type
interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  image: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
  };
}
const TeamMember = ({
  name,
  role,
  description,
  image,
  socialLinks,
}: TeamMemberProps) => (
  <div className="dark:bg-card bg-card/30 p-1 rounded-md overflow-hidden">
    <div className="flex flex-col ">
      <img
        src={image}
        alt={name}
        className="object-cover rounded-md aspect-square lg:aspect-video "
      />

      <div className="lg:p-4 p-2 flex-1">
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="lg:text-xl text-sm font-semibold line-clamp-1">
              {name}
            </h3>
            <p className="text-muted-foreground lg:text-sm text-xs">{role}</p>
          </div>
          <p className=" leading-relaxed text-sm hidden lg:block">
            {description}
          </p>
          {/* <div className="flex gap-2">
            {socialLinks.twitter && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground hover: hover:bg-slate-700"
                asChild
              >
                <a href={socialLinks.twitter} aria-label={`${name}'s Twitter`}>
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
            )}
            {socialLinks.linkedin && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground hover: hover:bg-slate-700"
                asChild
              >
                <a
                  href={socialLinks.linkedin}
                  aria-label={`${name}'s LinkedIn`}
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div> */}
        </div>
      </div>
    </div>
  </div>
);

const AboutTheTeam = () => {
  const teamMembers = [
    {
      name: "Reynald Darry Santos",
      role: "Project Manager",
      description:
        "Reynald keeps the team focused and on track. He’s responsible for planning, organizing, and ensuring every milestone is delivered with quality. With strong leadership and communication skills, he makes collaboration seamless.",
      image: sants.src,
      socialLinks: {
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      name: "Mikko Dela Pena",
      role: "Documentation Specialist", // corrected role
      description:
        "Mikko ensures that every detail of the project is well-documented and easy to understand. His eye for clarity and structure helps the team maintain consistency and accuracy throughout the workflow.",
      image: pena.src,
      socialLinks: {
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      name: "Joemar Ferraren",
      role: "Tester", // corrected role
      description:
        "Joemar is responsible for testing the product to ensure quality and functionality. He identifies bugs, validates features, and helps maintain the reliability of the project.",
      image: ferraren.src,
      socialLinks: {
        twitter: "#",
        linkedin: "#",
      },
    },

    {
      name: "Neal Eleazar Ramos",
      role: "Backend Developer",
      description:
        "Neal is the backbone of the system. He designs and maintains databases, optimizes server performance, and ensures everything runs smoothly behind the scenes to support the team’s applications.",
      image: ramos.src,
      socialLinks: {
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      name: "Jerome Tecson",
      role: "Frontend Developer",
      description:
        "Jerome focuses on creating clean, responsive, and user-friendly interfaces. With an eye for design and detail, he brings concepts to life and ensures users enjoy a seamless digital experience.",
      image: tecson.src,
      socialLinks: {
        twitter: "#",
        linkedin: "#",
      },
    },
  ];

  return (
    <div className=" lg:p-6 space-y-6">
      <div className="">
        <h2 className="text-lg lg:text-4xl font-medium">About the team</h2>
        <p className="text-muted-foreground leading-relaxed lg:text-base text-sm">
          We're a dynamic group of individuals who are passionate about what we
          do and dedicated to delivering the best results for our clients.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 grid-cols-2  lg:gap-6 gap-3">
        {teamMembers.map((member, index) => (
          <TeamMember
            key={index}
            name={member.name}
            role={member.role}
            description={member.description}
            image={member.image}
            socialLinks={member.socialLinks}
          />
        ))}
      </div>
    </div>
  );
};

export default AboutTheTeam;
