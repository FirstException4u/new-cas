export interface DocumentUploadInterface {
    FileInfo: {
      id: string;
      format: string;
      downloadLink: string;
      file: File;
    };
    DocumentGroup: {
      option: string;
      files: DocumentUploadInterface["FileInfo"][];
    };
    ButtonProps: {
      onClick: () => void;
      children: React.ReactNode;
      className?: string;
      disabled?: boolean;
    };
    SelectorProps: {
      selected: string;
      onSelect: (value: string) => void;
      disabledOptions: string[];
    };
    FileUploaderProps: {
      uploadedFile: File | null;
      onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
      error?: string;
      isDisabled?: boolean;
    };
    DocumentListProps: {
      groups: DocumentUploadInterface["DocumentGroup"][];
      onDelete: (option: string) => void;
    };
  }