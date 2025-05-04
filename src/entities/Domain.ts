export interface Domain {
    createdDate: number,
    domain: string,
    status : "verified" | "rejected" | "pending" ,
    isActive : boolean,
    id : string
}