import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { signIn, useSession } from "next-auth/react";
import { useFormik } from "formik";
import { SignInValidationSchema } from "../../helper/form_validation";
import { useRouter, NextRouter } from "next/router";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import React from "react";
import {
  UserLogin,
} from "../../types/interfaces";
import { FormikProps } from "formik";

function SignInPage(): JSX.Element {
  const { push }: NextRouter = useRouter();
  const { data: session, status } = useSession();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const initialValues: UserLogin = {
    email: "",
    password: "",
  };

  const formik = useFormik<UserLogin>({
    initialValues,
    validationSchema: SignInValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        const res = await axios.post("/api/auth/check", {
          email: values.email,
          password: values.password,
        });
        console.log(res);
        if (res.status == 200) {
          const { password, _id } = res.data.user;

          console.log(_id, typeof _id);
          

          //add signUp here with userData
          if(typeof _id !== "string"){
              JSON.stringify(_id)
          }
          try {
            await signIn("credentials", {
              email: values.email,
              password: values.password,
              id:_id,
              redirect: true,
              callbackUrl: "/",
            });
          } catch (error) {
            console.log("signIn error", error);
          }
        }
      } catch (error) {
        
        if (axios.isAxiosError(error) && error.response) {
          console.log(error.response.status);
          if (error.response.status >= 300) {
            setLoading(false);
            setErrorMessage(error.response.data.message);
          }
        }
        // if (isAxiosError(error)) {
        //   if (error.response?.status) {
        //     if (error.response.status >= 300) {
        //       setLoading(false);
        //       setErrorMessage(error?.response?.data)
        //     }
        //   }
        // }
      }

      // const response = await signIn("credentials", {
      //   email: values.email,
      //   password: values.password,
      //   redirect: true,
      //   callbackUrl: "/",
      // });

      // if (response.status >= 200) {
      //   window.localStorage.setItem("token", true);
      //   setLoading(false);

      //   return push("/");
      // }

      // if (values) {
      //   axios
      //     .post("/api/signin", {
      //       email: values.email,
      //       password: values.password,
      //     })
      //     .then((res) => {
      //       if (res.status == 200) {
      //         console.log(res.data.message);
      //         push("/");
      //       }
      //     })
      //     .catch((error) => {
      //       if(error.response.status==300){
      //         setErrorMessage(error.response.data.message)
      //       }
      //       return
      //     });
      // }
    },
  });
  const {
    handleBlur,
    handleChange,
    touched,
    handleSubmit,
    errors,
    values,
  }: FormikProps<UserLogin> = formik;

  if (status == null || status == "loading") {
    {
      /* ts-ignore */
    }
    return <p>loading...</p>;
  }

  if (status == "authenticated") {
    push("/"); //Promise Function So We dont need To return This.
  }

  return (
    <div id="wrapper">
      <div className="page-wrapper auth_wrapper">
        <div className="content-area-wrapper">
          <div className="content-wrapper">
            <div className="container">
              <div className="card products_blc">
                <div className="card-body">
                  <div className="card_content_wrap text-center">
                    <div className="card_content_wrap text-center">
                      <div className="logo_wrap">
                        <img src="/images/thumbnails/Logo.svg" alt="logo" />
                        <h6>
                          Don’t have an account yet?
                          <Link className="signUpSpan" href="/auth/signup">
                            {" "}
                            Sign Up
                          </Link>
                        </h6>
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
                              className="form-control input_modify"
                              id="exampleFormControlInput1"
                              name="email"
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
                              htmlFor="exampleFormControlInput2"
                              className="form-label label_modify"
                            >
                              {" "}
                              <span className="mendatary">*</span> Password
                            </label>
                            <input
                              type="password"
                              className="form-control input_modify"
                              name="password"
                              id="exampleFormControlInput1"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.password && touched.password && (
                              <p className="error">{errors.password}</p>
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
                              Sign In
                            </button>
                          </div>
                        </div>
                      </form>
                      {loading && (
                        <p style={{ fontSize: "1rem" }}>Loading...</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignInPage;

//add signUp Protection with usesession=>done

//add next auth library =>DONE
//add credentials user credentials provider =>DONE
//sign in and get token =>DONE

//Typescript Error Is Gone Not Check This Yet.
