import {
  AddProducts,
  deleteProducts,
  getAllProducts,
  getCurrentPage,
} from "../store/product_slice";
import axios from "axios";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InitialUpdateProduct, Product, ProductI } from "../types/interfaces";
import { ObjectId } from "mongoose";
import { RootState } from "../store/store";

function TableBody(props:unknown) {
  const redux_products:InitialUpdateProduct[] = useSelector((state:RootState) => getAllProducts(state));
  const currentPage = useSelector((state:RootState) => getCurrentPage(state));
  const [selectedState, setSelected] = useState<string | null>(null);
  const [loading,setLoading]=useState(false)

  const dispatch = useDispatch();
  useEffect(() => {
      GetPaginatedData(currentPage)
  }, [currentPage]);

  const currentStartingIndex:number=(currentPage-1) * 10 

  async function GetPaginatedData(currentPage:number){
    setLoading(true)
      const res=await axios.get(`/api/products/pagination?page=${currentPage}`)
      if(res.status==200){
        setLoading(false)
        console.log("ppp",res.data.products);
        dispatch(AddProducts(res.data.products))
      }
  }

  if(loading) <p>loading...</p>

  return (
    <Fragment>
      <tbody>
        {redux_products &&
          redux_products.length > 0 &&
          redux_products.map((product, index:number) => (
            <tr key={index}>
              <td>
                <label className="checkbox_container text-uppercase">
                  {currentStartingIndex + (index + 1)}
                </label>
              </td>
              <td>
                <div className="media align-items-center">
                  <div className="product_thumb">
                    <img
                      src={
                        product?.variation?.[0]?.productImage 
                      }
                      alt="Images"
                      width={60}
                      height={80}
                    />
                  </div>
                  <div className="media-body product_des">
                    <h6 className="product_name">{product?.productName}</h6>
                  </div>
                </div>
              </td>
              <td className="text_primary">{product?.category}</td>
              <td>${product?.variation?.[0]?.price}</td>
              <td>{product?.variation?.[0]?.stock}</td>
              <td>{product?.status}</td>
              <td className="actions">
                <div className="dropdown dropdown_wrapper  ">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      // setPrevious(selectedState);
                      setSelected((prev) =>
                        prev !== product._id ? product._id : ""
                      );
                      // dispatch(SelectProducts({
                      //   id:product._id,
                      //   prevId:prevSelected
                      // }))
                    }}
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC"
                      alt="Donts"
                    />
                  </button>
                  <div
                    className={`dropdown-menu dropdown-menu-right ${
                      product._id == selectedState && "show"
                    } `}
                  >
                    <Link
                      className="dropdown-item"
                      href={`/product/${product._id}`}
                    >
                      Edit Product
                    </Link>
                    <button
                      className="dropdown-item"
                      onClick={(e) => {
                        e.preventDefault();
                        const isDeleted = window.confirm(
                          " Are You Want To delete This Prduct"
                        );
                        if (isDeleted) {
                          axios({
                            method: "DELETE",
                            url: `/api/products/${product._id}`,
                          }).then((res) => {
                            if (res.status == 200) {
                              dispatch(deleteProducts(product._id));
                            }
                          });
                        }
                        return;
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </Fragment>
  );
}

export default TableBody;
