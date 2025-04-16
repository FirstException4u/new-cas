import { create } from 'zustand';


export interface StudentDataViewInterface {
  title: string;
  email: string;
  lastName: string;
  firstName: string;
  middleName: string;
  mobileNo: string;
  bloodGroup: string;
  gender: string;
  dob: string;
  motherTongue: string;
  course: string;
  birthPlace: string;
  admissionCategory: string;
  fatherName: string;
  motherName: string;
  occupation: string;
  familyIncome: string;
  aadhaarNo: string;
  photoUrl: string;
  signUrl: string;
  aadharUrl: string;
  tenthCertificateUrl: string;
  twelvethCertificateUrl: string;
  categoryCertificateUrl: string;
  Permanentaddress: string;
  CorrespondenceAddress: string;
  records: any[];
}

interface StudentStore {
  StudentData: StudentDataViewInterface;
  setStudentData: (data: StudentDataViewInterface) => void;
  updateField: (field: keyof StudentDataViewInterface, value: any) => void;
}


export const useStudentDataViewStore = create<StudentStore>((set) => ({
  StudentData: {
    title: "N/A",
    email: "N/A",
    lastName: "",
    firstName: "N/A",
    middleName: "",
    mobileNo: "N/A",
    bloodGroup: "N/A",
    gender: "N/A",
    course: "N/A",
    dob: "N/A",
    motherTongue: "N/A",
    birthPlace: "N/A",
    admissionCategory: "N/A",
    fatherName: "N/A",
    motherName: "N/A",
    occupation: "N/A",
    familyIncome: "N/A",
    aadhaarNo: "N/A",
    photoUrl: "N/A",
    signUrl: "N/A",
    aadharUrl: "N/A",
    tenthCertificateUrl: "N/A",
    twelvethCertificateUrl: "N/A",
    categoryCertificateUrl: "N/A",
    Permanentaddress: "N/A",
    CorrespondenceAddress: "N/A",
    records: [],
  },

  setStudentData: (data: StudentDataViewInterface) => set({ StudentData: data }),

  updateField: (field: keyof StudentDataViewInterface, value: any) =>
    set((state) => ({
      StudentData: { ...state.StudentData, [field]: value }
    })),
}));
