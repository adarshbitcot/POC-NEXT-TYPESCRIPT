import React from "react";

function SideBar() {
  return (
    <aside
      className={`sidebar-wrapper ${
        true ? "open" : ""
      } custom-scrollbar wow fadeInLeft ${true ? "open" : ""}`}
    >
      <div className="sidebar-content-wrapper">
        <ul className="sidebar-list">
          <li
            className={`sidebar-list-item has-subnav active ${
              listOpen ? "open" : ""
            } `}
            id="listTem"
          >
            <button className="sidebar-link" id="pro_toggle" 
            //onClick={OpenList}
            >
              <img src={Icon} alt="Product List" />
              <span className="item-text">Ecommerce</span>
            </button>
            {/* <ul>
              <li>
                <NavLink
                  to={"/products"}
                  className={({ isActive }) =>
                    isActive ? "active sidebar-link " : "sidebar-link "
                  }
                  end
                >
                  Product List
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/products/add-products"}
                  className={({ isActive }) =>
                    isActive ? "active sidebar-link " : "sidebar-link "
                  }
                >
                  Add Product
                </NavLink>
              </li>
            </ul> */}
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default SideBar;
