import { useEffect, useState, useContext } from "react";
import { toggleContext } from "../Contexts/appContext";
import axios from "axios";
import AddNewCustomerButton from "../Components/AddNewCustomerButton";

const AllCustomersView = () => {
  const [customers, setCustomers] = useState([]);
  const [show, setShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { loading, setLoading } = useContext(toggleContext);
  // console.log('loading before request', loading)

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://my.api.mockaroo.com/customers.json?key=e95894a0&size=50", {
        method: "get",
      })
      .then((response) => {
        // console.log(response.data);
        setLoading(false);
        // console.log('loading after', loading)
        setCustomers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getAge = (x) => {
    let dob = new Date(x);
    let month_diff = Date.now() - dob.getTime();
    var age_dt = new Date(month_diff);
    var year = age_dt.getUTCFullYear();
    var age = Math.abs(year - 1970);

    return age;
  };

  const getIndex = (index) => {
    setCurrentIndex(index);

    if (index === currentIndex) {
      !show ? setShow(true) : setShow(false);
    }
  };

  return (
    <div className="customer-view">
      <div className="row justify-content-start">
        {loading ? (
          ""
        ) : (
          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
            <div className="customer-card">{<AddNewCustomerButton />}</div>
          </div>
        )}

        {customers.map((data, index) => {
          return (
            <div
              className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4"
              key={index}
            >
              <div className="customer-card">
                <div className="">
                  <div className="two">
                    <div className="px-3 pt-3">
                      <h3 className="name">
                        {data.first_name ? data.first_name : ""}{" "}
                        {data.last_name ? data.last_name : ""}
                      </h3>
                      <p className="quote2">
                        Customer number:{" "}
                        {data.customer_number ? data.customer_number : ""}
                      </p>
                    </div>
                    <div className="d-flex justify-content-start px-3 align-items-center">
                      <span className="quote2">
                        DOB: {data.date_birth ? data.date_birth : ""}
                      </span>{" "}
                    </div>
                    <div className="d-flex justify-content-start px-3 align-items-center">
                      <span className="quote2">
                        SSN: {data.ssn ? data.ssn.slice(-4) : ""}
                      </span>{" "}
                    </div>
                    <div className="d-flex justify-content-between px-3 align-items-center pb-3">
                      <div className="d-flex justify-content-start align-items-center">
                        <span className="quote2 ">
                          Age: {data.date_birth ? getAge(data.date_birth) : ""}
                        </span>{" "}
                      </div>
                    </div>

                    <button
                      title="Popover"
                      onClick={() => getIndex(index)}
                      className={`info-button`}
                    >
                      <i>i</i>
                    </button>

                    <div className={`popover`}>
                      <div className="popover-email">
                        <span className="font-weight-bold">Email:</span>{" "}
                        {data.email ? data.email : ""}
                      </div>
                      <div className="popover-address">
                        <span className="font-weight-bold">Address:</span>{" "}
                        {data.primary_address.address_line_1
                          ? data.primary_address.address_line_1
                          : ""}
                        <br />
                        {data.primary_address.city
                          ? data.primary_address.city
                          : ""}
                        ,{" "}
                        {data.primary_address.state
                          ? data.primary_address.state
                          : ""}{" "}
                        {data.primary_address.zip_code
                          ? data.primary_address.zip_code
                          : ""}
                      </div>
                      <div className="popover-phone">
                        <span className="font-weight-bold">Phone:</span>{" "}
                        {data.mobile_phone_number
                          ? data.mobile_phone_number
                          : ""}
                      </div>
                      <div className="popover-joindate">
                        <span className="font-weight-bold">Date Joined: </span>
                        {data.join_date ? data.join_date : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllCustomersView;
