
export interface EducationRecord {
    examName: string;
    boardUniversity: string;
    year: string;
    obtainedMarks: string;
    totalMarks: string;
    percentage: string;
  }
  
export  interface InputFieldProps {
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    required?: boolean;
  }
  
export  interface RecordsTableProps {
    records: EducationRecord[];
  }
  
export  interface SelectFieldProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
    required?: boolean;
  }
