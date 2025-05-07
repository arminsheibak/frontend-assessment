import { create } from "zustand";

interface DomainQuery {
    searchText?: string;
    isActive?: Boolean | undefined
}

interface DomainQueryStore {
    domainQuery: DomainQuery;
    setSearchText: (searchText: string) => void;
    setIsActive: (isActive: Boolean | undefined) => void;
}

const  useDomainQueryStore = create<DomainQueryStore>((set) => ({
    domainQuery: {},
    setSearchText:  (searchText) => set(() => ({  domainQuery: {searchText: searchText} })),
    setIsActive: (isActive) => set(() => ({ domainQuery: {isActive: isActive} }) )
}))

export default useDomainQueryStore;