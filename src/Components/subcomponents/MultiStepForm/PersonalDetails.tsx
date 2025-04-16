import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StudentDataInterface } from "../../../GlobalStore/FormStore";
import { useFormStore, useStudentDataStore } from "../../../GlobalStore/FormStore";
import { PersonalDetailsData, SelectOption } from "../../../Interfaces/PersonalDetailsInterfaces";
import FormInput from "../Field/FormInput";
import FieldGroup from "../Field/FieldGroup";
import {FieldOptionInterfaces} from "../../../Interfaces/FieldOption";
import { PersonalDetailsValidation } from "../../../ValidationSchema/PersonalDetailsValidation";
import { usePersonalDetailsStore } from "../../../GlobalStore/PersonalDetailsStore";


const PersonalDetails: React.FC = () => {
 
  const { ActiveFormStep, setActiveFormStep } = useFormStore();
  const {Data , setData} = usePersonalDetailsStore()
  const {updateField,StudentData} = useStudentDataStore();
  const { register, handleSubmit, formState: { errors } } = useForm<PersonalDetailsData>({
    resolver: yupResolver(PersonalDetailsValidation) as any,
    defaultValues: {
      title: Data.title,
      lastName: Data.lastName,
      firstName: Data.firstName,
      middleName: Data.middleName,
      mobileNo: Data.mobileNo,
      phoneNo: Data.phoneNo,
      identificationStatus: Data.identificationStatus,
      bloodGroup: Data.bloodGroup,
      gender: Data.gender,
      dob: Data.dob,
      motherTongue: Data.motherTongue,
      birthPlace: Data.birthPlace,
      admissionCategory: Data.admissionCategory,
      casteCategory: Data.casteCategory,
      fatherName: Data.fatherName,
      motherName:Data.motherName,
      occupation: Data.occupation,
      guardianContact: Data.guardianContact,
      familyIncome: Data.familyIncome,
      aadhaarNo: Data.aadhaarNo,
    },
  });
  
  const onSubmit = (data: PersonalDetailsData) => {
    setData(data);
    Object.entries(data).forEach(([key, value]) => {
      if (key in StudentData) {
        updateField(key as keyof StudentDataInterface, value);
      }
    });
    setActiveFormStep(ActiveFormStep + 1);
  };

  const onError = (errors: any) => {
    console.error("Form validation errors:", errors);
  };

  const titleOptions: SelectOption[] = [
    { value: "mr", label: "Mr" },
    { value: "mrs", label: "Mrs" }
  ];
  
  const genderOptions: SelectOption[] = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" }
  ];

  const categoryOptions: SelectOption[] = [
    { value: "General", label: "General" },
    { value: "Obc", label: "Obc" },
    { value: "Sc/St", label: "Sc/St" },
  ];


  const personalInfoFields: FieldOptionInterfaces[] = [
    { 
      label: "Title *", 
      name: "title",
      type: "select",
      options: titleOptions
    },
    { label: "Last Name *", name: "lastName" },
    { label: "First Name *", name: "firstName" },
    { label: "Middle Name *", name: "middleName" },
  ];

  const contactInfoFields: FieldOptionInterfaces[] = [
    { label: "Mobile No. *", name: "mobileNo" },
    { label: "Gender *", name: "gender" , type:"select",options:genderOptions},
    { label: "Blood Group", name: "bloodGroup" },
  ];

  const detailsFields: FieldOptionInterfaces[] = [
    { label: "Date of Birth *", name: "dob", type: "date" },
    { label: "Mother Tongue", name: "motherTongue" },
    { label: "Birth Place *", name: "birthPlace" },
    { label: "Admission Category", name: "admissionCategory" ,type:"select",options:categoryOptions},
  ];

  const parentInfoFields: FieldOptionInterfaces[] = [
    { label: "Father's Name *", name: "fatherName" },
    { label: "Mother's Name *", name: "motherName" },
    { label: "Family Income", name: "familyIncome" },
    { label: "Occupation *", name: "occupation" } 
  ];
  
  return (
    <div className="p-6 font-sans text-gray-600">
      <h2 className="text-[5vw] mb-4 font-[Kajiro]">Personal Details</h2>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        {/* Personal Details Section */}
        <FieldGroup fields={personalInfoFields} register={register} errors={errors} />

        {/* Contact Information */}
        <FieldGroup fields={contactInfoFields} register={register} errors={errors} />

        {/* Additional Details */}
        <FieldGroup fields={detailsFields} register={register} errors={errors} />

        {/* Parent Information */}
        <h3 className="font-bold mb-2">Parent Information</h3>
        <FieldGroup
          fields={parentInfoFields}
          register={register}
          errors={errors}
          gridClasses="grid grid-cols-2 gap-4 border-b pb-4 mb-4"
        />

        {/* Other Information */}
        <h3 className="font-semibold mb-2">Other Information</h3>
        <div>
          <FormInput
            label="Aadhaar No.*"
            name="aadhaarNo"
            register={register}
            error={errors.aadhaarNo?.message}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 bg-red-500 font-bold text-white py-2 px-4 rounded"
        >
          Save & Next
        </button>
      </form>
    </div>
  );
};

export default PersonalDetails;
