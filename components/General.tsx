import React from "react";

type ChangeVariantFn=()=>void

function ChangeGeneral(props:{state:boolean,changeVariant:ChangeVariantFn}) {
  return (
    <ul
      className="nav nav-pills mb-0 nav_pills_wrapper"
      id="pills-tab"
      role="tablist"
    >
      <li className="nav-item" role="presentation">
        <button
          onClick={props.changeVariant}
          className={`nav-link ${!props.state && "active"} `}
          id="pills-general-tab"
          data-toggle="pill"
          data-target="#pills-general"
          type="button"
          role="tab"
          aria-controls="pills-general"
          aria-selected="true"
        >
          General
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button
          onClick={props.changeVariant}
          className={`nav-link ${props.state==true && "active"}`}
          id="pills-variation-tab"
          data-toggle="pill"
          data-target="#pills-variation"
          type="button"
          role="tab"
          aria-controls="pills-variation"
          aria-selected="false"
        >
          Variation
        </button>
      </li>
    </ul>
  );
}

export default ChangeGeneral;
