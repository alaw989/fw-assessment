import "./App.scss";
import AllCustomersView from "./Components/AllCustomersView";
import Form from "./Components/Form";
import { toggleContext } from "./Contexts/appContext";
import { useState } from "react";
import { FairwindsLogo } from "./Svgs/FairwindsLogo";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  const renderHide = () => {
    setToggle(false);
  };

  return (
    <div className="app-view">

        <toggleContext.Provider
          value={{
            toggle,
            setToggle, 
            loading,
            setLoading,
          }}
        >
          {loading ? <ClipLoader /> : ""}
     
          <Form />
          <div className="customer-view">
            <div
              className={`dark-bg ${toggle ? "show" : ""}`}
              onClick={renderHide}
            ></div>
            <div className="header-top">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    {" "}
                    <FairwindsLogo />
                  </div>
                </div>
              </div>
            </div>
            <div className="header-bottom">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    {" "}
                    <p className="m-0">All Customers View</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-customer-container">
              <div className="container">
                <div className="form-customer-wrap">
                  <AllCustomersView />
                </div>
              </div>
            </div>
          </div>
        </toggleContext.Provider>
    
    </div>
  );
}

export default App;
