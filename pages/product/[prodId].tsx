"use client";
import ChangeGeneral from "../../components/General";
import { ProductValidationSchema } from "../../helper/form_validation";
import FullLayout from "../../layout/FullLayout";
import { getProductById } from "../../store/product_slice";
import { RootState, wrapper } from "../../store/store";
import axios from "axios";
import { Formik, Form, FieldArray, ErrorMessage, FormikErrors } from "formik";
import { getSession } from "next-auth/react";
import { NextRouter, useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";


type Nullable<T> = T | null;

type Variation = {
  variant: string;
  price: string;
  stock: string;
  productImage: string;
};

type InitialUpdateProduct = {
  _id: string;
  productName: string;
  description: string;
  price: number;
  status:
    | NonNullable<"In stock" | "Limited stock" | "out of stock">
    | Nullable<string>;
  costPerItem: string;
  taxRate: string;
  category:
    | NonNullable<"clothe" | "bags" | "watches" | "shoes" | "devices">
    | Nullable<string>;
  comparePrice: string;
  variation: Array<Variation> | Variation;
};

function UpdateProductPage() {
  const {
    query: { prodId },
  } = useRouter();

  const { push } = useRouter();

  const product = useSelector((state: RootState) =>
    getProductById(state, prodId!.toString())
  );

  const [variation, setVariation] = useState<boolean>(false);
  const [loadedProduct, setLoaded] = useState<InitialUpdateProduct>({
    _id: "",
    productName: "",
    description: "",
    price: 0,
    category: "clothe",
    comparePrice: "",
    costPerItem: "",
    taxRate: "",
    status: "In stock",
    variation: [
      {
        variant: "",
        price: "",
        stock: "",
        productImage: "",
      },
    ],
  });

  // useEffect Work when page reloads
  //thats the redux state doesnt have a state to get data
  //then it fetch data from database and load the initial value
  useEffect(() => {
    if (prodId && !product) {
      //call a function and update product
      getIndividualProduct(prodId);
    }

    async function getIndividualProduct(prodId) {
      try {
        const res = await axios.get(`/api/products/${prodId}`);
        setLoaded(res.data.product);
      } catch (error) {
        return push("/notFound");
      }
    }
  }, [prodId, product]);

  //Initial Values For Formik States

  let initialValues = {
    productName: (product || loadedProduct).productName ?? "",
    price: "",
    comparePrice: "",
    description: (product || loadedProduct).description ?? "",
    costPerItem: "",
    taxRate: "",
    category: (product || loadedProduct).category ?? "",
    status: (product || loadedProduct).status ?? "",
    variation: (product || loadedProduct).variation ?? [
      { variant: "", price: "", stock: "", productImage: "" },
    ],
  };

  const id = (product || loadedProduct)._id ?? "";

  //variant Changing Function

  const changeVariant = () => {
    setVariation((prev) => !prev);
  };
  // when person reloads the page it will show loading state

  if (!product) <p>loading....</p>;

  return (
    <div className="content-area-wrapper">
      <div className="content-area-wrapper">
        <div className="content-wrapper">
          <div className="filter_wrapper  d-block d-sm-none">
            <div className="filet_left_content">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAABHNCSVQICAgIfAhkiAAAAXtJREFUOE+tVEFOwkAU7e8Q1yyNmFhv0Ih7yg1acW89AXADj1BOYN2D9gaUPZjeABZiXLI2DOObZmiGwSKGTjJpZ/6819f/3x+yjHHu+g6r1bpCCA8hV4UzIkr5ej34ypKFidmuSQ80mp1IWFYXey+YiU20kvGNEHU8fMwHkEbL6bD/G2FBdtHsZDmQc7/s61K1zViCY/PP2SgwCXMypcg749xbZEmupmw4rl//ZiwFMF3ORj39HKmvzaHo+lA+dFAZhpSqOmSHhxSZMaQlhrqVro5Urp5AJnNx9ADOJyF6y/dXr6gmNgWq1v6YDtOjmXDw8vbeQ5XHEFEUUSqrlExaoprfrLQAlVpDM20Lpm0fadoxsj7ZM+22giiEtMYVzBv80U5vOOfCFo+wRbzTAfpCa/TYIko2qtFt2ehCyEYPoWiA90wQPZuEO7eGJM6vIMZ6ALgAtOQeQBOQZ5zzaKu6cXMXmoR7ZP8xrkl4EllePKUQr8HJZAWhbTs/jATsJjmQpCoAAAAASUVORK5CYII="
                      alt="search"
                    />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control input_modify"
                  placeholder="Search"
                  onChange={(e)=>{
                    e.preventDefault();
                    console.log(e.target.value);
                    
                  }}
                />
              </div>
            </div>
          </div>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={ProductValidationSchema}
            onSubmit={async (values, props) => {
              console.log("values", id);

              const res = await axios.put(`/api/products/${id}`, values);
              console.log(res);
              if (res.status == 200) {
                return push("/");
              }
              return push("/");
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleReset,
              errors,
              touched,
            }) => (
              <Form>
                <div className="card nav_pills_card nav_pills_card_new">
                  <div className="card-body">
                    <div className="heading_wrapper heading_right_content">
                      <h1 className="head_title">Update Product</h1>
                      <div className="btn_wrapper">
                        <button
                          type="button"
                          className="theme-btn btn-outline-secondary"
                        >
                          Discard
                        </button>
                        <button
                          type="submit"
                          className="theme-btn theme-btn-primary"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                    {/* Variant section  */}
                    <ChangeGeneral
                      changeVariant={changeVariant}
                      state={variation}
                    />
                  </div>
                </div>
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className={`tab-pane fade ${!variation && "show active"} `}
                    id="pills-general"
                    role="tabpanel"
                    aria-labelledby="pills-general-tab"
                  >
                    <div className="card nav_pills_card">
                      <div className="card-body">
                        <div>
                          <div className="form-title">Basic Info</div>
                          <div className="form-group">
                            <label htmlFor="productName">
                              <span className="text-danger">*</span> Product
                              Name
                            </label>
                            <input
                              type="name"
                              name="productName"
                              className="form-control"
                              id="productName"
                              value={values.productName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.productName && touched.productName && (
                              <ErrorMessage
                                name="productName"
                                component={"div"}
                                className="error"
                              />
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="Description">
                              <span className="text-danger">*</span> Description
                            </label>
                            <textarea
                              id="Description"
                              className="form-control"
                              name="description"
                              rows={3}
                              value={values.description}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            ></textarea>
                            {errors.description && touched.description && (
                              <ErrorMessage
                                name="description"
                                component={"div"}
                                className="error"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card nav_pills_card">
                      <div className="card-body">
                        <div>
                          <div className="form-title">Pricing</div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="price">
                                  <span className="text-danger">*</span> Price
                                </label>
                                <input
                                  type="text"
                                  name="price"
                                  className="form-control"
                                  id="price"
                                  value={values.price}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {errors.price && touched.price && (
                                  <ErrorMessage
                                    name="price"
                                    component={"div"}
                                    className="error"
                                  />
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="comparePrice">
                                  <span className="text-danger">*</span> Compare
                                  price
                                </label>
                                <input
                                  type="text"
                                  name="comparePrice"
                                  className="form-control"
                                  id="comparePrice"
                                  value={values.comparePrice}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {errors.comparePrice &&
                                  touched.comparePrice && (
                                    <ErrorMessage
                                      name="comparePrice"
                                      component={"div"}
                                      className="error"
                                    />
                                  )}
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor=" costPerItem">
                                  <span className="text-danger">*</span> Cost
                                  per item
                                </label>
                                <input
                                  type="text"
                                  name="costPerItem"
                                  className="form-control"
                                  id="costPerItem"
                                  value={values.costPerItem}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {errors.costPerItem && touched.costPerItem && (
                                  <ErrorMessage
                                    name="costPerItem"
                                    component={"div"}
                                    className="error"
                                  />
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="taxRate">
                                  <span className="text-danger">*</span> Tax
                                  rate
                                </label>
                                <input
                                  type="text"
                                  name="taxRate"
                                  className="form-control"
                                  id="taxRate"
                                  value={values.taxRate}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {errors.taxRate && touched.taxRate && (
                                  <ErrorMessage
                                    name="taxRate"
                                    component={"div"}
                                    className="error"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card nav_pills_card">
                      <div className="card-body">
                        <div>
                          <div className="form-title">Organization</div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="productName">
                                  <span className="text-danger">*</span>{" "}
                                  Category
                                </label>
                                <select
                                  className="form-control"
                                  id="productName"
                                  name="category"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.category}
                                >
                                  <option value="">Select</option>
                                  <option value="clothe">Clothe</option>
                                  <option value="bags">Bags</option>
                                  <option value="shoes">Shoes</option>
                                  <option value="watches">Watches</option>
                                  <option value="devices">Devices</option>
                                </select>
                                {errors.category && touched.category && (
                                  <ErrorMessage
                                    name="category"
                                    component={"div"}
                                    className="error"
                                  />
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="Description">
                                  <span className="text-danger">*</span> Status
                                </label>
                                <select
                                  className="form-control"
                                  id="productName"
                                  name="status"
                                  value={values.status}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option value="">Select</option>
                                  <option value="In stock">In stock</option>
                                  <option value="Limited stock">
                                    Limited stock
                                  </option>
                                  <option value="out of stock">
                                    Out of stock
                                  </option>
                                </select>
                                {errors.status && touched.status && (
                                  <ErrorMessage
                                    name="status"
                                    component={"div"}
                                    className="error"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`tab-pane fade ${variation && "show active"} `}
                    id="pills-variation"
                    role="tabpanel"
                    aria-labelledby="pills-variation-tab"
                  >
                    <div className="card nav_pills_card">
                      <div className="card-body">
                        <div>
                          <div className="form-title">Variants</div>
                          <p>
                            Add A Custome Variat Options For Your Product, Like
                            Different Sizes Or Colors.
                          </p>

                          <FieldArray
                            name="variation"
                            render={({ push, remove, insert }) => (
                              <Fragment>
                                {Array.isArray(values.variation) &&
                                  values.variation.map((vari, index) => (
                                    <Fragment key={index}>
                                      <div
                                        className={`${
                                          index > 0 ? "isMinus" : ""
                                        }`}
                                      >
                                        <div className="row">
                                          <div className="col-md-4">
                                            <div className="form-group">
                                              <label htmlFor=" productName">
                                                <span className="text-danger">
                                                  *
                                                </span>{" "}
                                                Variant
                                              </label>
                                              <input
                                                type="text"
                                                name={`variation.[${index}].variant`}
                                                className="form-control"
                                                id="productName"
                                                value={
                                                  values?.variation?.[index]
                                                    ?.variant
                                                }
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                              />

                                              {errors?.variation?.[index]
                                                ?.variant &&
                                                touched?.variation?.[index]
                                                  ?.variant && (
                                                  <p className="error">
                                                    {
                                                      errors?.variation?.[index]
                                                        .variant
                                                    }
                                                  </p>
                                                )}
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="form-group">
                                              <label htmlFor=" productName">
                                                <span className="text-danger">
                                                  *
                                                </span>{" "}
                                                Price
                                              </label>
                                              <input
                                                type="text"
                                                name={`variation.[${index}].price`}
                                                className="form-control"
                                                id="productName"
                                                value={
                                                  values.variation[index].price
                                                }
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                              />
                                              {errors?.variation?.[index]
                                                ?.price &&
                                                touched?.variation?.[index]
                                                  ?.price && (
                                                  <p className="error">
                                                    {
                                                      errors?.variation?.[index]
                                                        .price
                                                    }
                                                  </p>
                                                )}
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="form-group">
                                              <label htmlFor=" productName">
                                                <span className="text-danger">
                                                  *
                                                </span>{" "}
                                                Stock keeping unit
                                              </label>
                                              <input
                                                type="text"
                                                name={`variation.[${index}].stock`}
                                                className="form-control"
                                                id="productName"
                                                value={
                                                  values.variation[index].stock
                                                }
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                              />
                                              {errors?.variation?.[index]
                                                ?.stock &&
                                                touched?.variation?.[index]
                                                  ?.stock && (
                                                  <p className="error">
                                                    {
                                                      errors?.variation?.[index]
                                                        .stock
                                                    }
                                                  </p>
                                                )}
                                            </div>
                                          </div>
                                        </div>
                                        <span
                                          className="removeSpan"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            remove(index);
                                          }}
                                        >
                                          -
                                        </span>
                                      </div>
                                      <div className="form-group uploader-wrapper">
                                        <label htmlFor="Description">
                                          <span className="text-danger">*</span>{" "}
                                          Upload Image
                                        </label>
                                        <div className="uploader-wrapper-inner">
                                          <img
                                            src="assets/images/thumbnails/picture.svg"
                                            alt="pictures"
                                          />
                                          <input type="file" />
                                          Click or drag file to upload
                                        </div>
                                      </div>
                                    </Fragment>
                                  ))}

                                <button
                                  className="uploader-add-btne"
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    push({
                                      variant: "",
                                      price: "",
                                      stock: "",
                                      productImage: "/images/products/cycle.jpg",
                                    });
                                  }}
                                >
                                  Add field
                                </button>
                              </Fragment>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

UpdateProductPage.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const session = await getSession({ req: context.req });

    if (session == null) {
      return {
        redirect: {
          permanent: false,
          destination: "/auth/signin",
        },
      };
    }

    return {
      props: {
        session,
      },
    };
  }
);

export default UpdateProductPage;

// <div class="isMinus">
//                             <div class="row">
//                               <div class="col-md-4">
//                                 <div class="form-group">
//                                   <label for=" productName">
//                                     <span class="text-danger">*</span> Variant
//                                   </label>
//                                   <input
//                                     type="text"
//                                     name="variant"
//                                     class="form-control"
//                                     id="productName"
//                                     value=""
//                                   />
//                                 </div>
//                               </div>
//                               <div class="col-md-4">
//                                 <div class="form-group">
//                                   <label for=" productName">
//                                     <span class="text-danger">*</span> Price
//                                   </label>
//                                   <input
//                                     type="text"
//                                     name="variantPrice"
//                                     class="form-control"
//                                     id="productName"
//                                     value=""
//                                   />
//                                 </div>
//                               </div>
//                               <div class="col-md-4">
//                                 <div class="form-group">
//                                   <label for=" productName">
//                                     <span class="text-danger">*</span> Stock
//                                     keeping unit
//                                   </label>
//                                   <input
//                                     type="text"
//                                     name="variantPrice"
//                                     class="form-control"
//                                     id="productName"
//                                     value=""
//                                   />
//                                 </div>
//                               </div>
//                             </div>
//                             <span class="removeSpan">-</span>
//                           </div>
//                           <div class="form-group uploader-wrapper">
//                             <label for="Description">
//                               <span class="text-danger">*</span> Upload Image
//                             </label>
//                             <div class="uploader-wrapper-inner">
//                               <img
//                                 src="assets/images/thumbnails/picture.svg"
//                                 alt="pictures"
//                               />
//                               <input type="file" />
//                               Click or drag file to upload
//                             </div>
//                           </div>
