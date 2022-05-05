import { useState } from "react";
import useInput from "../hooks/useInput";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

const BasicForm = (props) => {
  const {
    value: firstName,
    isValid: firstNameIsValid,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
    hasError: firstNameHasError,
  } = useInput(isNotEmpty);
  const {
    value: lastName,
    isValid: lastNameIsValid,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
    hasError: lastNameHasError,
  } = useInput(isNotEmpty);
  const {
    value: email,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
    hasError: emailHasError,
  } = useInput(isEmail);

  let formIsValid = false;

  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    console.log("submited");
    resetFirstName();
    resetLastName();
    resetEmail();
  };

  const firstnameClasses = firstNameHasError
    ? "form-control invalid"
    : "form-control";
  const lastnameClasses = lastNameHasError
    ? "form-control invalid"
    : "form-control";
  const emailClasses = emailHasError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className="contol-group">
        <div className={firstnameClasses}>
          <label htmlFor="name">First Name</label>
          <input
            value={firstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            type="text"
            id="name"
          />
          {firstNameHasError && <p>Enter a firstname</p>}
        </div>
        <div className={lastnameClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            value={lastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            type="text"
            id="name"
          />
          {lastNameHasError && <p>Enter a lastname</p>}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          type="text"
          id="name"
        />
        {emailHasError && <p>Enter a email</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
