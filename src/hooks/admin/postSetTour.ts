import axios from "axios";
import { ApiErrorResponse } from "./postReviewedHandler";

export async function triggerUserAction() {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/updateTour`,
      { dashboardTour: true },
      { withCredentials: true }
    );

    if (res.status === 200) {
      return null;
    }
  } catch (error) {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
}
