export function formatHeader(header: string): string {
  return header
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}

export function generateCSV(
  data: Record<string, any>[],
  selectedHeaders: string[],
  filename: string
) {
  if (!data.length || !selectedHeaders.length) return;

  const headers = selectedHeaders.join(",");
  const rows = data.map((row) =>
    selectedHeaders
      .map(
        (key) => `"${String(row[key as keyof typeof row]).replace(/"/g, '""')}"`
      )
      .join(",")
  );
  const csvString = [headers, ...rows].join("\n");

  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename || "export.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
