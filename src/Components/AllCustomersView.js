import { useEffect, useState, useContext } from "react";
import { toggleContext } from "../Contexts/appContext";
import axios from "axios";
import AddNewCustomerButton from "../Components/AddNewCustomerButton";

const AllCustomersView = () => {
  const [customers, setCustomers] = useState([]);
  const [show, setShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { loading, setLoading } = useContext(toggleContext);

  useEffect(() => {
    const loadCustomers = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          "https://my.api.mockaroo.com/customers.json?key=e95894a0&size=3"
        );

        setCustomers(response.data);
        console.log(customers);
        setLoading(false);
      } catch {
        console.log("mistakes were made");
        console.log(loading)
      }
    };

    loadCustomers();
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
      {loading ? "" :
       
      <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
        <div className="customer-card">
          {<AddNewCustomerButton />}
        </div>
      </div>}


        {/* <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
          <div className="customer-card">
            <div className="">
              <div className="two">
                <div className="px-3 pt-3">
                  <h3 className="name">
                     Austin Law
                  </h3>
                  <p className="quote2">
                    Customer number: 00000
                  </p>
                </div>
                <div className="d-flex justify-content-start px-3 align-items-center">
                  <span className="quote2">
                    DOB: 07/02/2917
                  </span>{" "}
                </div>
                <div className="d-flex justify-content-start px-3 align-items-center">
                  <span className="quote2">
                    SSN: 592-04-0479
                  </span>{" "}
                </div>
                <div className="d-flex justify-content-between px-3 align-items-center pb-3">
                  <div className="d-flex justify-content-start align-items-center">
                    <span className="quote2 ">
                      Age: 34
                    </span>{" "}
                  </div>
                </div>

                <a
                  href="#"
                  title="Popover"
                  onClick={() => getIndex()}
                  className={`info-button`}
                >
                  <i>i</i>
                </a>

                <div className={`popover`}>
                  <div className="popover-email">
                    <span className="font-weight-bold">Email:</span>{" "}
                  alaw989@gmail.com
                  </div>
                  <div className="popover-address">
                    <span className="font-weight-bold">Address:</span>{" "}
                   
                    <p>
                      7248 Barque Drive<br></br>Tampa, FL 33607
                    </p>
                  </div>
                  <div className="popover-phone">
                    <span className="font-weight-bold">Phone:</span>{" "}
                   251-648-7764
                  </div>
                  <div className="popover-joindate">
                    <span className="font-weight-bold">Date Joined: </span>
                   05-21-1993
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

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
                        {data.first_name} {data.last_name}
                      </h3>
                      <p className="quote2">
                        Customer number: {data.customer_number}
                      </p>
                    </div>
                    <div className="d-flex justify-content-start px-3 align-items-center">
                      <span className="quote2">DOB: {data.date_birth}</span>{" "}
                    </div>
                    <div className="d-flex justify-content-start px-3 align-items-center">
                      <span className="quote2">SSN: {data.ssn.slice(-4)}</span>{" "}
                    </div>
                    <div className="d-flex justify-content-between px-3 align-items-center pb-3">
                      <div className="d-flex justify-content-start align-items-center">
                        <span className="quote2 ">
                          Age: {getAge(data.date_birth)}
                        </span>{" "}
                      </div>
                    </div>

                    <a
                      href="#"
                      title="Popover"
                      onClick={() => getIndex(index)}
                      className={`info-button`}
                    >
                      <i>i</i>
                    </a>

                    <div className={`popover`}>
                      <div className="popover-email">
                        <span className="font-weight-bold">Email:</span>{" "}
                        {data.email}
                      </div>
                      <div className="popover-address">
                        <span className="font-weight-bold">Address:</span>{" "}
                        {data.primary_address.address_line_1}
                        <br></br>
                        {data.primary_address.city},{" "}
                        {data.primary_address.state}{" "}
                        {data.primary_address.zip_code}
                      </div>
                      <div className="popover-phone">
                        <span className="font-weight-bold">Phone:</span>{" "}
                        {data.mobile_phone_number}
                      </div>
                      <div className="popover-joindate">
                        <span className="font-weight-bold">Date Joined: </span>
                        {data.join_date}
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
