"use client";

import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/lib/debounder";

type GetDataForExportTypes = {
  label: string;
  count: number;
};

type Meow = {
  dataSelections: [];
  filters: {
    applicationStatuses: GetDataForExportTypes[];
    courses: GetDataForExportTypes[];
    institutes: GetDataForExportTypes[];
    scholarshipTitles: GetDataForExportTypes[];
    sections: GetDataForExportTypes[];
    years: GetDataForExportTypes[];
  };
};

async function fetchApplicationCSV(
  selectedFilters: Record<string, string[]>
): Promise<Meow> {
  const params = new URLSearchParams();

  Object.entries(selectedFilters).forEach(([key, values]) => {
    if (values.length > 0) {
      params.append(key, JSON.stringify(values));
    }
  });

  const endpoint = `${
    process.env.NEXT_PUBLIC_ADMINISTRATOR_URL
  }/getFiltersCSV?${params.toString()}`;

  try {
    const res = await axios.get<Meow>(endpoint, { withCredentials: true });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default function useGetCSVDisplay(
  selectedFilters: Record<string, string[]>
) {
  const debouncedFilters = useDebounce(selectedFilters, 500);

  const query = useQuery({
    queryKey: ["applicationCSV", debouncedFilters],
    queryFn: () => fetchApplicationCSV(debouncedFilters),
    retry: false,
    placeholderData: keepPreviousData,
  });

  return query;
}
