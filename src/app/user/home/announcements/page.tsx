"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  category: "academic" | "administrative" | "event" | "urgent";
  priority: "low" | "medium" | "high" | "urgent";
  date: string;
  author: string;
  department: string;
  isRead: boolean;
  isPinned: boolean;
}

export default function AnnouncementSection() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  
 
  const announcements: Announcement[] = [
    {
      id: "1",
      title: "Midterm Examination Schedule Released",
      content:
        "The midterm examination schedule for all departments has been posted. Students are advised to check their respective department notice boards and online portals for detailed information.",
      category: "academic",
      priority: "high",
      date: "2024-07-20",
      author: "Academic Office",
      department: "Registrar",
      isRead: false,
      isPinned: true,
    },
    {
      id: "2",
      title: "Library Extended Hours During Finals",
      content:
        "The university library will extend its operating hours during the final examination period. New hours: Monday-Sunday, 6:00 AM to 12:00 AM.",
      category: "administrative",
      priority: "medium",
      date: "2024-07-19",
      author: "Library Services",
      department: "Library",
      isRead: true,
      isPinned: false,
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto lg:w-3/4 w-[95%] py-10">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-300 mb-4">
            All Announcements
          </h2>
          <div className="grid gap-4">
            {announcements.map((announcement) => (
              <Card
                key={announcement.id}
                className={`${
                  !announcement.isRead ? "bg-card border" : "bg-background"
                } hover:shadow-md transition-shadow`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div>
                        <CardTitle className="text-lg mb-1">
                          {announcement.title}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-4">
                          <span>{announcement.author}</span>
                          <span>•</span>
                          <span>{announcement.department}</span>
                          <span>•</span>
                          <span>{announcement.date}</span>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!announcement.isRead && (
                        <div className="w-2 h-2 bg-gray-8000 rounded-full"></div>
                      )}

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Mark as Read</Button>
                        <Button size="sm">Read More</Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{announcement.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
