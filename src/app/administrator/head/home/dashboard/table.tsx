
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDashboardData from "@/lib/useDashboard";

export default function TableDashboard() {
  const { data } = useDashboardData();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="!text-base !h-12">Invoice</TableHead>
          <TableHead className="!text-base !h-12">Status</TableHead>

          <TableHead className="!text-base text-right !h-10">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((invoice) => (
          <TableRow key={invoice.applicationsApproved}>
            <TableCell className="font-medium">
              {invoice.scholarshipName}
            </TableCell>
            <TableCell>{invoice.applicationsReceived}</TableCell>
            <TableCell className="text-right">
              {invoice.applicationsApproved}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
