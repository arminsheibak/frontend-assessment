import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";
import { Domain } from "../entities/Domain";
import useDomainQueryStore from "../store";

const useDomains = () =>{
  const domainQuery = useDomainQueryStore(s => s.domainQuery)
  return useQuery({
    queryKey: ["domains", domainQuery],
    queryFn: () => {
        return apiClient.get<Domain[]>("/", {
          params: {
            search: domainQuery.searchText,
            isActive: domainQuery.isActive
          }
        })
        .then(res => res.data)
    },
  });}

export default useDomains;
