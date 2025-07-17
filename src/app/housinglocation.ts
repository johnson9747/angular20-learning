export interface HousingLocationInfo {
    locationId:number;
    name:string;
    city: string;
    state: string;
    photo: string;
    availableUnits: number;
    wifi: boolean;
    laundry: boolean;
    enquiries: Enquiries[];
}
export interface Enquiries {
    firstName: string;
    lastName: string;
    email: string;
    details: string;
}
