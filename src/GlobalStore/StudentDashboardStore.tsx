import { create } from "zustand";

interface StudentDashboardStore {
    showModel: boolean;
    setshowModel: (value: boolean) => void;
    userEmail: string;
    setuserEmail: (email: string) => void;
}

export const useStudentDashboardStore = create<StudentDashboardStore>((set) => ({
    showModel: false,
    setshowModel: (value) => set({ showModel: value }),
    userEmail: "",
    setuserEmail: (email: string) => set(() => ({ userEmail: email })),
}));
