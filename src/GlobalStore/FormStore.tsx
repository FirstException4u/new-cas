import { create } from "zustand";

export interface FormStoreState {
  ActiveFormStep: number;
  setActiveFormStep: (value: number) => void;
  uploadProgress: number;
  setUploadProgress: (p: number) => void;
}

export interface StudentDataInterface {
  title: Array<{ value: string; label: string }>;
  email:string;
  lastName: string;
  firstName: string;
  middleName: string;
  mobileNo: string;
  bloodGroup: string;
  gender: string;
  dob: string;
  motherTongue: string,
  course: string,
  birthPlace: string;
  admissionCategory: string;
  fatherName: string;
  motherName: string;
  occupation: string;
  familyIncome: string;
  aadhaarNo: string;
  photoUrl: string,
  signUrl: string,
  aadharUrl: string,
  tenthCertificateUrl: string,
  twelvethCertificateUrl: string,
  categoryCertificateUrl: string,
  Permanentaddress: string;
  CorrespondenceAddress: string;
  records: any[];
}

export interface StudentDataStore {
  StudentData: StudentDataInterface;
  setData: (data: StudentDataInterface) => void;
  updateField: (field: keyof StudentDataInterface, value: any) => void;
  
}

export const useStudentDataStore = create<StudentDataStore>((set) => ({
  StudentData: {
    title: [{ value: "", label: "" }],
    email:"",
    lastName: "",
    firstName: "",
    middleName: "",
    mobileNo: "",
    bloodGroup: "",
    gender: "",
    course: "",
    dob: "",
    motherTongue: "",
    birthPlace: "",
    admissionCategory: "",
    fatherName: "",
    motherName: "",
    occupation: "",
    familyIncome: "",
    aadhaarNo: "",
    photoUrl: "",
    signUrl: "",
    aadharUrl: "",
    tenthCertificateUrl: "",
    twelvethCertificateUrl: "",
    categoryCertificateUrl: "",
    Permanentaddress: "",
    CorrespondenceAddress: "",
    records: [],
  },
  setData: (data: StudentDataInterface) => set({ StudentData: data }),
  updateField: (field: keyof StudentDataInterface, value: any) =>
    set((state) => ({
      StudentData: { ...state.StudentData, [field]: value }
    })),
    
}));

export const useFormStore = create<FormStoreState>((set) => ({
  ActiveFormStep: 0,
  uploadProgress: -1,
  setUploadProgress: (p) => set({ uploadProgress: p }),
  setActiveFormStep: (value: number) => set({ ActiveFormStep: value }),
}));
