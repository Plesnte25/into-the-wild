import useSWR from "swr";
import { api } from "/src/api";

export default function useReservation(range = "month") {
  const token = localStorage.getItem("token");

  const { data, error, mutate, isLoading } = useSWR(
    token ? `/booking/userBookings?range=${range}` : null,
    async (url) => {
      try {
        const res = await api.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data.data;
      } catch (err) {
        console.error("Fetch Error:", err);
        throw err;
      }
    },
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      revalidateIfFalse: false,
    }
  );
  return {
    data: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
