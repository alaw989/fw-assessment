import { useContext } from "react";
import { toggleContext } from "../Contexts/appContext";
import "../App.scss";
import girl from '../Images/girl.png'

const AddNewCustomerButton = () => {
  const { toggle, setToggle } = useContext(toggleContext);

  const handleToggle = () => {
    !toggle ? setToggle(true) : setToggle(false);
  };

  return (
    <div className="one align-items-center d-flex" onClick={handleToggle}>
      <div className="px-3">
        <div className="d-flex flex-column ">
          <div>
            <img
              src={girl} alt=""
              width="65"
            />
          </div>
          <h4 className="project">Add new customer + </h4>
        </div>
      </div>
    </div>
  );
};

export default AddNewCustomerButton;
