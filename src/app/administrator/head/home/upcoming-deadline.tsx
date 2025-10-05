import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, AlertCircle } from "lucide-react"

const deadlines = [
  {
    id: 1,
    name: "Merit Excellence Scholarship",
    date: "Dec 15",
    daysLeft: 12,
    urgent: false,
  },
  {
    id: 2,
    name: "Community Leadership Award",
    date: "Dec 20",
    daysLeft: 17,
    urgent: false,
  },
  {
    id: 3,
    name: "STEM Innovation Grant",
    date: "Jan 30",
    daysLeft: 58,
    urgent: false,
  },
  {
    id: 4,
    name: "Academic Excellence Fund",
    date: "Dec 10",
    daysLeft: 7,
    urgent: true,
  },
]

export function UpcomingDeadlines() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Deadlines
        </CardTitle>
        <CardDescription className="text-muted-foreground">Don't miss these important dates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deadlines.map((deadline) => (
            <div
              key={deadline.id}
              className={`p-3 rounded-lg border ${
                deadline.urgent ? "border-destructive/30 bg-destructive/5" : "border-border bg-secondary/30"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground leading-tight mb-1">{deadline.name}</h4>
                  <p className="text-xs text-muted-foreground">{deadline.date}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  {deadline.urgent && <AlertCircle className="h-4 w-4 text-destructive mb-1" />}
                  <p
                    className={`text-xs font-semibold ${
                      deadline.urgent ? "text-destructive" : "text-muted-foreground"
                    }`}
                  >
                    {deadline.daysLeft} days
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
