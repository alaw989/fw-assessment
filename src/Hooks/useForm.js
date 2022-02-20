import { useState, useContext } from "react";
import { omit } from "lodash";
import axios from "axios";
import { toggleContext } from "../Contexts/appContext";

const useForm = (callback) => {
  const { toggle, setToggle } = useContext(toggleContext);
  //Form values
  const [customerInfo, setCustomerInfo] = useState({
    customerNumber: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    socialSecurity: "",
    emailAddress: "",
    primaryAddress: "",
    phoneNumber: "",
    city: "",
    state: "",
    zip: "",
  });

  //Errors
  const [errors, setErrors] = useState({});


  const validate = (event, name, value) => {
    switch (name) {
      case "customerNumber":
        if (value.length !== 5) {
          setErrors({
            ...errors,
            customerNumber: "Customer Number (must be 5 digits)",
          });
        } else {
          let newObj = omit(errors, "customerNumber");
          setErrors(newObj);
        }
        break;

      case "dateOfBirth":
        if (
          !new RegExp(
            /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            dateOfBirth: "Date of birth (please enter correctly)",
          });
        } else {
          let newObj = omit(errors, "dateOfBirth");
          setErrors(newObj);
        }
        break;

      case "socialSecurity":
        if (!new RegExp(/^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/).test(value)) {
          setErrors({
            ...errors,
            socialSecurity: "SSN (please enter correctly)",
          });
        } else {
          let newObj = omit(errors, "socialSecurity");
          setErrors(newObj);
        }
        break;

      case "emailAddress":
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            emailAddress: "Email Address (please enter correctly)",
          });
        } else {
          let newObj = omit(errors, "emailAddress");
          setErrors(newObj);
        }
        break;

      case "phoneNumber":
        if (
          !new RegExp(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/).test(
            value
          )
        ) {
          setErrors({
            ...errors,
            phoneNumber: "Phone Number (please enter correctly)",
          });
        } else {
          let newObj = omit(errors, "phoneNumber");
          setErrors(newObj);
        }
        break;
      case "zip":
        if (value.length !== 5) {
          setErrors({
            ...errors,
            zip: "ZIP (must be 5 digits)",
          });
        } else {
          let newObj = omit(errors, "zip");
          setErrors(newObj);
        }
        break;

      default:
        break;
    }
  };

  const handleChange = (event) => {
    event.persist();

    let value = event.target.value;
    let name = event.target.name;

    validate(event, name, value);

    setCustomerInfo({
      ...customerInfo,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    if (Object.keys(errors).length === 0 && Object.keys(customerInfo).length) {
      callback();
 

    } else {
 

      return false;
    }

    axios
      .post("https://my.api.mockaroo.com/customers.json?key=e95894a0", {
        customerInfo,
      })
      .then((res) => {
        console.log("res", res);
        console.log("data", res.data);
      });

    setToggle(false);
  };

  return {
    customerInfo,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
