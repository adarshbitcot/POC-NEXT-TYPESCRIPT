import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentPage,getProductLength } from "../store/product_slice";
import { RootState } from "../store/store";


function Pagination() {
  const length:number = useSelector((state:RootState) => getProductLength(state));

  const dispatch = useDispatch();

  const postPerPage:number = 10;

  const totalPages:number = Math.ceil(length / postPerPage);

  const PaginationArray:Array<number>  = [];
  for (let i = 0; i < totalPages; i++) {
    PaginationArray.push(i + 1);
  }

  return (
    <ul
      style={{
        width: "auto",
        height: "auto",
        padding: ".5rem",
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
      }}
    >
      {PaginationArray &&
        PaginationArray.length > 0 &&
        PaginationArray.map((page, index) => (
          <li
            onClick={(e) => {
              e.preventDefault();
              dispatch(SetCurrentPage(page));
            }}
            key={index}
            style={{
              border: "black solid",
              width: "auto",
              height: "auto",
              padding: ".5rem",
              cursor:"pointer"
            }}
          >
            {page}
          </li>
        ))}
    </ul>
  );
}

export default Pagination;
