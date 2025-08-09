"use client";
import axios from "axios";
import { useEffect, useState } from "react";
type FormatTypes = {
  formats: string;
};

type scholarshipDocumentTypes = {
  label: string;
  formats: FormatTypes[];
};

export type ScholarshipTypes = {
  scholarshipId: string;
  scholarshipTitle: string;
  scholarshipProvider: string;
  status: string;
  scholarshipDealine: string;
  totalApplicants: number;
  totalApproved: number;
  scholarshipLogo: string;
  scholarshipCover: string;
  scholarshipDescription: string;
  scholarshipAmount: number;
  scholarshipDocuments: scholarshipDocumentTypes[];
};

export default function useScholarshipData({
  currentPage,
  rowsPerPage,
  sort,
}: {
  currentPage: number;
  rowsPerPage: number;
  sort: string;
}) {
  const [data, setData] = useState<ScholarshipTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(
    function () {
      async function fetchScholarships() {
        setLoading(true);
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/getScholarships?page=${currentPage}&dataPerPage=${rowsPerPage}&sortBy=${sort}`,
            { withCredentials: true }
          );
          if (res.status === 200) {
            console.log("API response:", res.data);
            setData(res.data.getScholarshipsData);
            setTotalPages(res.data.totalPages);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }

      fetchScholarships();
    },
    [currentPage, rowsPerPage, sort]
  );

  return { data, loading, totalPages };
}
