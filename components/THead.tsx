import React, { Fragment, ReactNode } from "react";

function TableHeader({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <div className="app_table table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                <label className="checkbox_container text-uppercase"> ID</label>
              </th>
              <th scope="col" className="th_didivder">
                Products
                <span className="filter-order-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="13"
                    viewBox="0 0 11 13"
                  >
                    <g
                      id="Group_22146"
                      data-name="Group 22146"
                      transform="translate(-501 -126.5)"
                    >
                      <path
                        id="Icon_ionic-md-arrow-dropdown"
                        data-name="Icon ionic-md-arrow-dropdown"
                        d="M9,13.5,14.5,19,20,13.5Z"
                        transform="translate(492 120.5)"
                        fill="rgba(69,85,96,0.2)"
                      ></path>
                      <path
                        id="Icon_ionic-md-arrow-dropdown-2"
                        data-name="Icon ionic-md-arrow-dropdown"
                        d="M9,19l5.5-5.5L20,19Z"
                        transform="translate(492 113)"
                        fill="rgba(69,85,96,0.2)"
                      ></path>
                    </g>
                  </svg>
                </span>
              </th>
              <th scope="col" className="th_didivder">
                Category
                <span className="filter-order-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="13"
                    viewBox="0 0 11 13"
                  >
                    <g
                      id="Group_22146"
                      data-name="Group 22146"
                      transform="translate(-501 -126.5)"
                    >
                      <path
                        id="Icon_ionic-md-arrow-dropdown"
                        data-name="Icon ionic-md-arrow-dropdown"
                        d="M9,13.5,14.5,19,20,13.5Z"
                        transform="translate(492 120.5)"
                        fill="rgba(69,85,96,0.2)"
                      ></path>
                      <path
                        id="Icon_ionic-md-arrow-dropdown-2"
                        data-name="Icon ionic-md-arrow-dropdown"
                        d="M9,19l5.5-5.5L20,19Z"
                        transform="translate(492 113)"
                        fill="rgba(69,85,96,0.2)"
                      ></path>
                    </g>
                  </svg>
                </span>
              </th>
              <th scope="col" className="th_didivder">
                Price
                <span className="filter-order-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="13"
                    viewBox="0 0 11 13"
                  >
                    <g
                      id="Group_22146"
                      data-name="Group 22146"
                      transform="translate(-501 -126.5)"
                    >
                      <path
                        id="Icon_ionic-md-arrow-dropdown"
                        data-name="Icon ionic-md-arrow-dropdown"
                        d="M9,13.5,14.5,19,20,13.5Z"
                        transform="translate(492 120.5)"
                        fill="rgba(69,85,96,0.2)"
                      ></path>
                      <path
                        id="Icon_ionic-md-arrow-dropdown-2"
                        data-name="Icon ionic-md-arrow-dropdown"
                        d="M9,19l5.5-5.5L20,19Z"
                        transform="translate(492 113)"
                        fill="rgba(69,85,96,0.2)"
                      ></path>
                    </g>
                  </svg>
                </span>
              </th>
              <th scope="col" className="th_didivder">
                Stock
                <span className="filter-order-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="13"
                    viewBox="0 0 11 13"
                  >
                    <g
                      id="Group_22146"
                      data-name="Group 22146"
                      transform="translate(-501 -126.5)"
                    >
                      <path
                        id="Icon_ionic-md-arrow-dropdown"
                        data-name="Icon ionic-md-arrow-dropdown"
                        d="M9,13.5,14.5,19,20,13.5Z"
                        transform="translate(492 120.5)"
                        fill="rgba(69,85,96,0.2)"
                      ></path>
                      <path
                        id="Icon_ionic-md-arrow-dropdown-2"
                        data-name="Icon ionic-md-arrow-dropdown"
                        d="M9,19l5.5-5.5L20,19Z"
                        transform="translate(492 113)"
                        fill="rgba(69,85,96,0.2)"
                      ></path>
                    </g>
                  </svg>
                </span>
              </th>
              <th scope="col" className="th_didivder">
                Status
                <span className="filter-order-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="13"
                    viewBox="0 0 11 13"
                  >
                    <g
                      id="Group_22146"
                      data-name="Group 22146"
                      transform="translate(-501 -126.5)"
                    >
                      <path
                        id="Icon_ionic-md-arrow-dropdown"
                        data-name="Icon ionic-md-arrow-dropdown"
                        d="M9,13.5,14.5,19,20,13.5Z"
                        transform="translate(492 120.5)"
                        fill="rgba(69,85,96,0.2)"
                      ></path>
                      <path
                        id="Icon_ionic-md-arrow-dropdown-2"
                        data-name="Icon ionic-md-arrow-dropdown"
                        d="M9,19l5.5-5.5L20,19Z"
                        transform="translate(492 113)"
                        fill="rgba(69,85,96,0.2)"
                      ></path>
                    </g>
                  </svg>
                </span>
              </th>
              <th scope="col" className="th_didivder">
                Action
                <span className="filter-order-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="13"
                    viewBox="0 0 11 13"
                  >
                    <g
                      id="Group_22146"
                      data-name="Group 22146"
                      transform="translate(-501 -126.5)"
                    >
                      <path
                        id="Icon_ionic-md-arrow-dropdown"
                        data-name="Icon ionic-md-arrow-dropdown"
                        d="M9,13.5,14.5,19,20,13.5Z"
                        transform="translate(492 120.5)"
                        fill="rgba(69,85,96,0.2)"
                      ></path>
                      <path
                        id="Icon_ionic-md-arrow-dropdown-2"
                        data-name="Icon ionic-md-arrow-dropdown"
                        d="M9,19l5.5-5.5L20,19Z"
                        transform="translate(492 113)"
                        fill="rgba(69,85,96,0.2)"
                      ></path>
                    </g>
                  </svg>
                </span>
              </th>
            </tr>
          </thead>
          {children}
        </table>
      </div>
    </Fragment>
  );
}

export default TableHeader;
