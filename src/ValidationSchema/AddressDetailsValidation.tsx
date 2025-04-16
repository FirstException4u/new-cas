import * as Yup from "yup";

export const AddressDetailsValidation = Yup.object().shape({
    Permanentaddress: Yup.string().required(),
    isSameAsPermanent: Yup.boolean(),
    Correspondenceaddress: Yup.string().when("isSameAsPermanent", (isSameAsPermanent, schema) =>
        isSameAsPermanent ? schema : schema.required("Correspondence address is required")
    ),
});