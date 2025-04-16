import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormStore, useStudentDataStore } from "../../../GlobalStore/FormStore";
import { AddressDetailsInterfaces,FieldProps,CorrespondenceFieldProps,NavigationProps } from "../../../Interfaces/AddressDetailsInterfaces";
import { AddressDetailsValidation } from "../../../ValidationSchema/AddressDetailsValidation";
import { useAddressDetailsStore } from "../../../GlobalStore/AddressDetailsStore";



const PermanentAddressSection: React.FC<FieldProps> = ({ register, errors }) => (
  <div className="mb-8">
    <div className="grid grid-cols-1 gap-4">
      <div>
        <label className="font-medium">Permanent Address *</label>
        <input
          type="text"
          {...register("Permanentaddress")}
          className="w-full border p-2 rounded"
        />
        {errors.Permanentaddress && (
          <p className="text-red-500 text-sm">
            {errors.Permanentaddress?.message?.toString()}
          </p>
        )}
      </div>
    </div>
  </div>
);

const CorrespondenceAddressSection: React.FC<CorrespondenceFieldProps> = ({
  register,
  errors,
  isSameAsPermanent,
  defaultChecked,
}) => (
  <div className="mb-8">
    <label className="flex items-center">
      <input
        type="checkbox"
        {...register("isSameAsPermanent", {
          setValueAs: (value) => !!value,
        })}
        defaultChecked={defaultChecked}
        className="mr-2"
      />
      Same as Permanent Address
    </label>
    <div className="grid grid-cols-1 gap-4 mt-4">
      <div>
        <label className="font-medium">
          Correspondence Address {isSameAsPermanent ? "" : "*"}
        </label>
        <input
          type="text"
          {...register("Correspondenceaddress")}
          className="w-full border p-2 rounded"
          disabled={isSameAsPermanent}
        />
        {errors.Correspondenceaddress && (
          <p className="text-red-500 text-sm">
            {errors.Correspondenceaddress?.message?.toString()}
          </p>
        )}
      </div>
    </div>
  </div>
);

const NavigationButtons: React.FC<NavigationProps> = ({ onPrev }) => (
  <div className="flex justify-between">
    <button
      type="submit"
        className="mt-4 bg-red-500 font-bold text-white py-2 px-4 rounded"
    >
      Save & Next
    </button>
    <button
      type="button"
      className="mt-4 bg-green-500 font-bold text-white py-2 px-6 rounded"
      onClick={onPrev}
    >
      Previous
    </button>
  </div>
);

const AddressDetails: React.FC = () => {
  const { ActiveFormStep, setActiveFormStep } = useFormStore();
  const { Data, setData } = useAddressDetailsStore();
  const {updateField} = useStudentDataStore();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(AddressDetailsValidation) as any,
    defaultValues: {
      Permanentaddress: Data.permanentAddress,
      isSameAsPermanent: Data.isSameAsPermanent,
      Correspondenceaddress: Data.correspondenceAddress,
    },
  });

  const isSameAsPermanent = watch("isSameAsPermanent");
  const permanentAddress = watch("Permanentaddress");

  useEffect(() => {
    if (isSameAsPermanent) {
      setValue("Correspondenceaddress", permanentAddress);
    }
  }, [isSameAsPermanent, permanentAddress, setValue]);

  const onSubmit = (formValues: any) => {
    const updatedData: AddressDetailsInterfaces = {
      permanentAddress: formValues.Permanentaddress,
      correspondenceAddress: formValues.Correspondenceaddress,
      isSameAsPermanent: formValues.isSameAsPermanent,
    };

    setData(updatedData);
    updateField("Permanentaddress",updatedData.permanentAddress);
    updateField("CorrespondenceAddress",updatedData.correspondenceAddress);
    setActiveFormStep(ActiveFormStep + 1);
  };

  const MovetoPrevStep = () => {
    setActiveFormStep(ActiveFormStep - 1);
  };

  return (
    <div className="mx-auto p-6 text-gray-600">
      <h2 className="text-[5vw] font-[Kajiro] mb-2">Address Details</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PermanentAddressSection register={register} errors={errors} />
        <CorrespondenceAddressSection
          register={register}
          errors={errors}
          isSameAsPermanent={isSameAsPermanent}
          defaultChecked={Data.isSameAsPermanent}
        />
        <NavigationButtons onPrev={MovetoPrevStep} />
      </form>
    </div>
  );
};

export default AddressDetails;
