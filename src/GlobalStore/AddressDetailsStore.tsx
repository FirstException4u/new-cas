
import { create } from "zustand";
import { AddressDetailsInterfaces } from "../Interfaces/AddressDetailsInterfaces";

export interface AddressDetailsStore {
  Data: AddressDetailsInterfaces;
  setData: (data: AddressDetailsInterfaces) => void;
}

export const useAddressDetailsStore = create<AddressDetailsStore>((set) => ({
  Data: {
    correspondenceAddress: "",
    permanentAddress: "",
    isSameAsPermanent: false,
  },
  setData: (data: AddressDetailsInterfaces) => set({ Data: data }),
}))