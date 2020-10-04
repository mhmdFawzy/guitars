import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
function Button(props) {
  const buttonGenerator = () => {
    let template = "";
    switch (props.type) {
      case "link":
        template = (
          <Link
            to={props.linkTo}
            className={props.altClass ? props.altClass : "link_default"}
            style={{ ...props.addStyle }}
          >
            {props.title}
          </Link>
        );
        break;
      case "add_to_card":
        template = (
          <div className="add_to_cart_link" onClick={props.actionToDo}>
            <FontAwesomeIcon icon={faShoppingBag} />
            Add to cart
          </div>
        );
        break;

      case "bag_link":
        template = (
          <div className="bag_link" onClick={props.actionToDo}>
            <FontAwesomeIcon icon={faShoppingBag} />
          </div>
        );
        break;
      default:
        template = (
          <button style={{ ...props.addStyle }}> {props.title}</button>
        );
    }
    return template;
  };
  return <div className="my_link">{buttonGenerator()}</div>;
}

export default Button;
