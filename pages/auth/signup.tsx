import Link from "next/link";
import { FormikProps, useFormik } from "formik";
import { useRouter } from "next/router";
import { SignUpValidationSchema } from "../../helper/form_validation";
import axios from "axios";
import {  useState } from "react";
import {  useSession } from "next-auth/react";
import { UserSignUp } from "../../types/interfaces";
import { NextRouter } from "next/dist/client/router";


function SignUpPage():JSX.Element {
  const { push }:NextRouter = useRouter();
  const { data: session, status } = useSession();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading,setLoading]=useState(false)

  // useEffect(()=>{
  //   getSession().then((session)=>{
  //     if(session?.user?.email){
  //       return push('/')
  //     }

  //     //if(session==null) push('/auth/signin')

  //   })
  // },[])

  //initial Value setUp
  const initialValues:UserSignUp = {
    email: "",
    password: "",
    confirmpassword: "",
  };

  //Formik Setup
  const formik = useFormik<UserSignUp>({
    initialValues,
    validationSchema: SignUpValidationSchema,
    onSubmit: (values, prop) => {
      setLoading(true)
      if (values) {
        axios
          .post("/api/auth/signup", {
            email: values.email,
            password: values.password,
          })
          .then((res) => {
            if (res.status == 200) {
              //gives User Notification
              console.log("SignUp SuccesFully");
              setLoading(false)
              //navigate to login Page
              return push("/auth/signin");
            }
          })
          .catch((err) => {
            //give User Error Response
            console.log("api err", err);
            setLoading(false)
            if (err.response.status == 300) {
              prop.resetForm();
              return setErrorMessage(err.response.data.Emessage);
            }
          });
      }
    },
  });
  //formik Mrthod SetUp
  const { handleSubmit, handleChange, handleBlur, values, errors, touched }:FormikProps<UserSignUp> =
    formik;

  if (status == null || status == "loading") {
    return <p>loading...</p>;
  }

  if (status == "authenticated") {
     push("/");
  }

  return (
    <div>
      <div id="wrapper">
        <div className="page-wrapper auth_wrapper">
          <div className="content-area-wrapper">
            <div className="content-wrapper">
              <div className="container">
                <div className="card products_blc">
                  <div className="card-body">
                    <div className="card_content_wrap text-center"></div>
                    <div className="card_content_wrap text-center">
                      <div className="logo_wrap">
                        <img src="/images/thumbnails/Logo.svg" alt="logo" />
                        <h6>Create an account</h6>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="form_wrapper">
                          <div className="mb-4">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label label_modify"
                            >
                              <span className="mendatary">*</span> Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              className="form-control input_modify"
                              id="exampleFormControlInput1"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />

                            {errors.email && touched.email && (
                              <p className="error">{errors.email}</p>
                            )}
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label label_modify"
                            >
                              {" "}
                              <span className="mendatary">*</span> Password
                            </label>
                            <input
                              type="password"
                              name="password"
                              className="form-control input_modify"
                              id="exampleFormControlInput2"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.password && touched.password && (
                              <p className="error">{errors.password}</p>
                            )}
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label label_modify"
                            >
                              {" "}
                              <span className="mendatary">*</span>Confirm Password
                            </label>
                            <input
                              type="password"
                              name="confirmpassword"
                              className="form-control input_modify"
                              id="exampleFormControlInput3"
                              value={values.confirmpassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.confirmpassword &&
                              touched.confirmpassword && (
                                <p className="onError">
                                  {errors.confirmpassword}
                                </p>
                              )}

                            {errorMessage && (
                              <p className="error">{errorMessage}</p>
                            )}
                          </div>
                          <div className="mb-0 auth_btn">
                            <button
                              type="submit"
                              className="theme-btn-primary theme-btn"
                            >
                              Sign Up
                            </button>
                          </div>
                          <div className="already">
                            {" "}
                            <Link href="/auth/signin">
                              Already have Account
                            </Link>
                          </div>
                        </div>
                      </form>
                      {
                        loading && <p style={{fontSize:"1rem"}}>Loading...</p>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;

// we need to implement validation with formik client side => install formik library
// we need to omplement signup function
// we need to add to mongo db first
// create api for auth
