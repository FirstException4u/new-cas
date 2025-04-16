import {PersonalDetailsData,SelectOption} from "./PersonalDetailsInterfaces"
export interface FieldOptionInterfaces {
    label: string;
    name: keyof PersonalDetailsData;
    type?: string;
    options?:SelectOption[]
}