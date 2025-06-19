import {useQuery} from "@tanstack/react-query";
import { api } from "@/api";

export default function useReservation(range = "month") {
  return useQuery({
    queryKey: ["reservations", range],
    queryFn: async () => {
      const { data } = await api.get(`/bookings/range/${range}`);
      return data;                 // array of bookings
    },
    staleTime: 1000 * 60 * 5,      // 5 min
  });
}
