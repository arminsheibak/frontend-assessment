import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";
import { Domain } from "../entities/Domain";

const useDomains = () =>
  useQuery({
    queryKey: ["domains"],
    queryFn: () => {
        return apiClient.get<Domain[]>("/")
        .then(res => res.data)
    },
  });

export default useDomains;
