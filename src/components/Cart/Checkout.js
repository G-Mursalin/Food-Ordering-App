// React
import React, { useState } from "react";
// CSS
import classes from "./Checkout.module.css";

// Helper Function
const isEmpty = (value) => value.trim() === "";
const isFourDigit = (value) => value.trim().length === 4;

const Checkout = (props) => {
  const [inputValidityCheck, setInputValidityCheck] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = event.target.name.value;
    const enteredStreet = event.target.street.value;
    const enteredPostal = event.target.postal.value;
    const enteredCity = event.target.city.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = isFourDigit(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setInputValidityCheck({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const isFormValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;

    if (!isFormValid) return;

    // Send Data to server
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    });
  };

  //  styles
  const nameControlClasses = `${classes.control} ${
    inputValidityCheck.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    inputValidityCheck.street ? "" : classes.invalid
  }`;
  const postalControlClasses = `${classes.control} ${
    inputValidityCheck.postal ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    inputValidityCheck.city ? "" : classes.invalid
  }`;
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" />
        {!inputValidityCheck.name && <p>Please entered a valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" />
        {!inputValidityCheck.street && (
          <p>Please entered a valid street name</p>
        )}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" />
        {!inputValidityCheck.postal && (
          <p>Please entered a valid postal code</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" />
        {!inputValidityCheck.city && <p>Please entered a valid city name</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
