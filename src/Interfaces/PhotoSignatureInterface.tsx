export interface PhotoSignatureInterface {
    FileUploadProps: {
      id: string;
      accept: string;
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
    LabelProps: {
      htmlFor: string;
      className: string;
      children: React.ReactNode;
    };
    FileInfoProps: {
      file: File | null;
      maxSize: number;
      format: string;
    };
    ButtonProps: {
      onClick: () => void;
      className: string;
      children: React.ReactNode;
    };
  }