import { PersonalDetailsData, SelectOption } from "../../../Interfaces/PersonalDetailsInterfaces";

interface FormInputProps {
  label: string;
  name: keyof PersonalDetailsData;
  type?: string;
  register: any;
  error?: string;
  options?: SelectOption[];
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  register,
  error,
  options,
}) => (
  <div>
    <label className="font-medium">{label}</label>
    {type === "select" ? (
      <select
        {...register(name)}
        className="w-full border p-2 rounded"
      >
        <option value="">Select The {label.substring(0,label.length-1)}</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        {...register(name)}
        className="w-full border p-2 rounded"
      />
    )}
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default FormInput;