import { useForm } from "react-hook-form";

export interface AddressDetailsInterfaces {
    permanentAddress:string,
    isSameAsPermanent: boolean;
    correspondenceAddress:string
  }
export interface FieldProps {
    register: ReturnType<typeof useForm>["register"];
    errors: any;
  }
  
export  interface CorrespondenceFieldProps extends FieldProps {
    isSameAsPermanent: boolean;
    defaultChecked: boolean;
  }
  
export  interface NavigationProps {
    onPrev: () => void;
  }