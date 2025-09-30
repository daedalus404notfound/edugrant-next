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
  <Card className=" dark:border-green-800/10 dark:bg-green-900/10 p-0 overflow-hidden">
    <div className="flex flex-col md:flex-row">
      <div className="relative md:w-48 h-64 md:h-auto flex-shrink-0">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 192px"
        />
      </div>
      <div className="lg:p-6 p-4 flex-1">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold ">{name}</h3>
            <p className="text-muted-foreground text-sm">{role}</p>
          </div>
          <p className=" leading-relaxed text-sm">{description}</p>
          <div className="flex gap-2">
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
          </div>
        </div>
      </div>
    </div>
  </Card>
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
      role: "Full Stack Developer",
      description:
        "Mikko is a problem-solver who thrives in both frontend and backend development. He loves building scalable solutions, tackling tough challenges, and making sure the product works flawlessly end to end.",
      image: pena.src,
      socialLinks: {
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      name: "Joemar Ferraren",
      role: "Documentation Specialist",
      description:
        "Joemar ensures that every detail of the project is well-documented and easy to understand. His eye for clarity and structure helps the team maintain consistency and accuracy throughout the workflow.",
      image: ferraren.src,
      socialLinks: {
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      name: "Neal Eleazar Ramos",
      role: "Backend Developer / Database Engineer",
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
      role: "Frontend Developer / UI Designer",
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
    <div className="py-25  lg:px-6 flex flex-col lg:flex-row">
      <div className="mb-16">
        <h2 className="text-2xl md:text-5xl font-bold  mb-6">About the team</h2>
        <p className="text-lg max-w-md leading-relaxed">
          We're a dynamic group of individuals who are passionate about what we
          do and dedicated to delivering the best results for our clients.
        </p>
      </div>

      <div className="space-y-8 flex-1">
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
