import React from "react";

// CSS
import classes from "./Header.module.css";
// Image
import mealsImd from "./../../assets/meals.jpg";
// Components
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>OMG-Meals</h1>
        <HeaderCartButton cartHandler={props.cartHandler} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImd} alt="meals" />
      </div>
    </React.Fragment>
  );
};

export default Header;
