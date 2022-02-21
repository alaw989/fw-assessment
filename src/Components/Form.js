import { useContext } from "react";

import { toggleContext } from "../Contexts/appContext";
import useForm from "../Hooks/useForm";
import "../App.scss";

const Form = () => {
  const { toggle } = useContext(toggleContext);

  const formLogin = () => {
    console.log("Callback function when form is submitted");
    console.log("Form values ", customerInfo);
  };

  const { handleChange, handleSubmit, customerInfo, errors } =
    useForm(formLogin);

  return (
    <div className="form-container">
      <form
        onSubmit={handleSubmit}
        className={`form ${toggle ? "form-show" : "form-hide"}`}
      >
        <p>Add New Customer</p>
        <div className="row mb-0 mb-md-3">
          <div className="col">
            <label className="form-label" htmlFor="inputCustomerNumber">
              {errors.customerNumber
                ? errors.customerNumber
                : "Customer Number"}
            </label>
            <input
              type="number"
              className="form-control"
              aria-describedby="customernumber"
              placeholder="Enter 5 digit number"
              name="customerNumber"
              value={customerInfo.customerNumber}
              onChange={handleChange}
              required
              minLength="5"
              maxLength="5"
            />
          </div>
        </div>
        <div className="row mb-0 mb-md-3">
          <div className="col">
            <div className="form-outline">
              <label className="form-label" htmlFor="firstname1">
                First name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Jane"
                name="firstName"
                value={customerInfo.firstName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col">
            <div className="form-outline">
              <label className="form-label" htmlFor="lastname">
                Last name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Doe"
                name="lastName"
                value={customerInfo.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="row mb-0 mb-md-3">
          <div className="col">
            <label htmlFor="dobInput">
              {errors.dateOfBirth ? errors.dateOfBirth : "Date of Birth"}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="DD/MM/YYYY"
              name="dateOfBirth"
              value={customerInfo.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row mb-0 mb-md-3">
          <div className="col">
            <label htmlFor="ssInput">
              {errors.socialSecurity ? errors.socialSecurity : "SSN"}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="xxx-xx-xxxx"
              name="socialSecurity"
              value={customerInfo.socialSecurity}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row mb-0 mb-md-3">
          <div className="col">
            <label htmlFor="emailInput">
              {errors.emailAddress ? errors.emailAddres : "Email Address"}
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="jane@fairwinds.com"
              name="emailAddress"
              value={customerInfo.emailAddress}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-0 mb-md-3">
          <div className="col">
            <div className="form-outline">
              <label htmlFor="addressInput">Address Line 1</label>
              <input
                type="text"
                className="form-control"
                placeholder="123 Elm Street"
                name="primaryAddress"
                value={customerInfo.primaryAddress}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col">
            <div className="form-outline">
              <label htmlFor="city">City</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter City"
                name="city"
                value={customerInfo.city}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="row mb-0 mb-md-3">
          <div className="col">
            <div className="form-outline">
              <label htmlFor="state">State</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter State"
                name="state"
                value={customerInfo.state}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col">
            <div className="form-outline">
              <label htmlFor="zip">{errors.zip ? errors.zip : "ZIP"}</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter ZIP"
                name="zip"
                value={customerInfo.zip}
                onChange={handleChange}
                required
                minLength={5}
                maxLength={5}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="phoneInput">
            {errors.phoneNumber ? errors.phoneNumber : "Phone Number"}
          </label>
          <input
            type="tel"
            className="form-control"
            placeholder="000-000-0000"
            name="phoneNumber"
            value={customerInfo.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Add Customer
        </button>
      </form>
    </div>
  );
};

export default Form;
