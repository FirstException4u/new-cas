import { create } from "zustand";
import { PersonalDetailsData } from "../Interfaces/PersonalDetailsInterfaces";

export interface PersonalDetailsDataFormat {
  Data: PersonalDetailsData;
  setData: (data: PersonalDetailsData) => void;
}

export const usePersonalDetailsStore = create<PersonalDetailsDataFormat>((set) => ({
  Data: {
    title: [{ value: "", label: "" }],
    lastName: "",
    firstName: "",
    middleName: "",
    mobileNo: "",
    phoneNo: "",
    identificationStatus: "",
    bloodGroup: "",
    gender: "",
    dob: "",
    occupation: "",
    motherTongue: "",
    birthPlace: "",
    nationality: "",
    admissionCategory: "",
    casteCategory: "",
    fatherName: "",
    motherName: "",
    Occupation: "",
    guardianContact: "",
    familyIncome: "",
    aadhaarNo: "",
  },
  setData: (data: PersonalDetailsData) => set({ Data: data }),
}));