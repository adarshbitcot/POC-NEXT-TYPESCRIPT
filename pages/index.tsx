import { Fragment, ReactElement } from "react";
import { getSession } from "next-auth/react";
import FullLayout from "../layout/FullLayout";
import axios from "axios";
import TableHeader from "../components/THead";
import TableBody from "../components/TableBody";
import Link from "next/link";
import { wrapper } from "../store/store";
import { AddProductLength, AddProducts } from "../store/product_slice";
import Pagination from "../components/Pagination";
import { ProductI } from "../types/interfaces";
function ProductPage(props:unknown) {
  //console.log(props.products);
  return (
    <Fragment>
      <div className="heading_wrapper d-flex flex-wrap">
        <h1 className="head_title">Product List</h1>
        <nav aria-label="breadcrumb" className="breadcrumb_wrapper">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">E-Commerce</li>
            <li className="breadcrumb-item active" aria-current="page">
              Product List
            </li>
          </ul>
        </nav>
      </div>
      <div className="filter_wrapper">
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
            />
          </div>
          <select
            className="custom-select input_modify"
            value={""}
            // onChange={(e) => {
            //   e.preventDefault();
            //   setCatogery(e.target.value);
            //   if (e.target.value == "") FetchProducts(setLoading);
            //   SearchWithCatogery(e.target.value).then((data) =>
            //     dispatch(getProducts(data))
            //   );
            // }}
          >
            <option selected value={""}>
              All
            </option>
            <option value="clothe">Clothe</option>
            <option value="bags">Bags</option>
            <option value="Shoes">Shoes</option>
            <option value="watches">Watches</option>
            <option value="devices">Devices</option>
          </select>
        </div>
        <div className="filter_btn_wrapper">
          <Link href={"/addproduct"} className="btn theme-btn-primary theme-btn">
            Add Product
          </Link>
        </div>
      </div>

      <TableHeader>
        <TableBody  />
      </TableHeader>
      <Pagination />
    </Fragment>
  );
}

ProductPage.getLayout = function getLayout(page:ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

// ProductPage.getLayout = function (page) {
//   return <FullLayout>{page}</FullLayout>;
// };

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const session = await getSession  ({ req: context.req });

    if (session == null) {
      return {
        redirect: {
          permanent: false,
          destination: "/auth/signin",
        },
      };
    }

    const {
      data: { products },
    } = await axios.get("http://localhost:3000/api/products/");
    
    console.log("productsess",products);
    if (products.length > 0) {
      store.dispatch(AddProducts(products));
      store.dispatch(AddProductLength(products.length));
    }

    return {
      props: {
        session,
        products:JSON.stringify(products)
      },
    };
  }
);

export default ProductPage;

// export async function getServerSideProps(context) {
//   //console.log(context);
//   const session = await getSession({ req: context.req });

// if (session == null) {
//   return {
//     redirect: {
//       permanent: false,
//       destination: "/auth/signin",
//     },
//   };
// }

//   console.log("hyy");

// const {
//   data: { products },
// } = await axios.get("http://localhost:3000/api/products/");
// console.log(products);
// return {
//   props: {
//     session,
//     products,
//   },
// };
// }

//list here products all first
