import FormInput from "./FormInput";
import {FieldGroupInterfaces} from "../../../Interfaces/FieldGroup";

  const FieldGroup: React.FC<FieldGroupInterfaces> = ({
    fields,
    register,
    errors,
    gridClasses,
  }) => (
    <div className={gridClasses || "grid grid-cols-2 md:grid-cols-4 gap-4 border-b pb-4 mb-4"}>
      {fields.map((field) => (
        <FormInput
          key={field.name as string}
          label={field.label}
          name={field.name}
          type={field.type || "text"}
          register={register}
          error={errors[field.name]?.message}
          options={field?.options}
        />
      ))}
    </div>
  );
  export default FieldGroup;