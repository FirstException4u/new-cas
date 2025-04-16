export interface PersonalDetailsData {
    title: SelectOption[];
    lastName: string;
    firstName: string;
    middleName: string;
    mobileNo: string;
    phoneNo?: string;
    identificationStatus?: string;
    bloodGroup?: string;
    gender: string;
    dob: string;
    occupation?: string;
    motherTongue?: string;
    birthPlace: string;
    nationality: string;
    admissionCategory?: string;
    casteCategory?: string;
    fatherName?: string;
    motherName?: string,
    Occupation?: string,
    guardianContact?: string;
    familyIncome?: string;
    aadhaarNo: string;
}

export interface SelectOption {
    value: string;
    label: string;
}