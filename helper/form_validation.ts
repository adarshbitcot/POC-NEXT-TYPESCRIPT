import * as yup from "yup";

export const SignUpValidationSchema = yup.object({
  email: yup
    .string()
    .email("It Is Not An Email Type")
    .required("Email field is required"),
  password: yup
    .string()
    .min(6, "Password MuST Contain Atleast 6")
    .max(10)
    .required("Password field is required"),

  confirmpassword: yup
    .string()
    .min(6)
    .max(10)
    .oneOf([yup.ref("password"),""], "Passwords must match")
    .required("required"),
});



export const SignInValidationSchema = yup.object({
  email: yup
    .string()
    .email("It Is Not An Email Type")
    .required("Email field is required"),
  password: yup
    .string()
    .min(6, "Password MuST Contain Atleast 6")
    .max(10)
    .required("Password field is required"),
});



export const ProductValidationSchema = yup.object({
  productName: yup.string().required("productName is Required"),
  price: yup.number().required("price is Required"),
  comparePrice: yup.string().required("comparePrice is Required"),
  description: yup.string().required("description is Required"),
  costPerItem: yup.string().required("costPerItem is Required"),
  taxRate: yup.string().required("taxRate is Required"),
  category: yup
    .string()
    .oneOf(
      ["clothe", "bags", "watches", "shoes", "devices"],
      "Please Choose An Item"
    )
    .required("category is Required"),
  status: yup
    .string()
    .oneOf(
      ["In stock", "Limited stock", "out of stock"],
      "Please Choose An Item"
    )
    .required("status is Required"),
  variation: yup.array().of(
    yup.object().shape({
      price: yup.string().required("Price is Required"),
      stock: yup.string().required("Stock is Required"),
      variant: yup.string().required("variant is Required"),
      productImage:yup.string().required("Product Image is Required"),
    })
  ),
});
