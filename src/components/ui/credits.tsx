import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin } from "lucide-react";
import tecson from "@/assets/tecson.jpg";
import ramos from "@/assets/ramos.jpg";
import ferraren from "@/assets/ferraren.png";
import sants from "@/assets/sants.jpg";
import pena from "@/assets/pena.jpg";
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
  <Card className=" border-green-800/10 bg-green-900/10 p-0 overflow-hidden">
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
      <div className="p-6 flex-1">
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
      name: "Reynal Darry Santos",
      role: "Project Manager",
      description:
        "Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.",
      image: sants.src,
      socialLinks: {
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      name: "Mikko Dela Pena",
      role: "Full Stack Dota Player",
      description:
        "Turpis lectus et amet elementum. Mi duis integer sed in vitae consequat. Nam vitae, in felis mi dui tempus. Porta at turpis eu odio. Et, sed duis in blandit bibendum accumsan. Purus viverra facilisi suspendisse quis est.",
      image: pena.src,
      socialLinks: {
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      name: "Joemar Ferraren",
      role: "Paperist",
      description:
        "Aliquet adipiscing lectus praesent cras sed quis lectus egestas erat. Bibendum curabitur eget habitant feugiat nec faucibus eu lorem suscipit. Vitae vitae tempor enim eget lacus nulla leo.",
      image: ferraren.src,
      socialLinks: {
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      name: "Neal Eleazar Ramos",
      role: "Backend Developer / Database",
      description:
        "Aliquet adipiscing lectus praesent cras sed quis lectus egestas erat. Bibendum curabitur eget habitant feugiat nec faucibus eu lorem suscipit. Vitae vitae tempor enim eget lacus nulla leo.",
      image: ramos.src,
      socialLinks: {
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      name: "Jerome Tecson",
      role: "Frontend / Design",
      description:
        "Aliquet adipiscing lectus praesent cras sed quis lectus egestas erat. Bibendum curabitur eget habitant feugiat nec faucibus eu lorem suscipit. Vitae vitae tempor enim eget lacus nulla leo.",
      image: tecson.src,
      socialLinks: {
        twitter: "#",
        linkedin: "#",
      },
    },
  ];

  return (
    <div className="py-25  px-6 flex">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold  mb-6">About the team</h2>
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
