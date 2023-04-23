import {
  IonContent,
  IonPage,
} from "@ionic/react";
import "./SeatSelection.css";
import { useHistory } from "react-router";
import React from "react";
import { IconContext } from "react-icons";
import { IoIosArrowBack } from "react-icons/io";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { CgArrowLongRight } from "react-icons/cg";
import { GiSteeringWheel } from "react-icons/gi";

const SeatSelection: React.FC = () => {
  const history = useHistory();

  function handleRegister() {
    history.push("/boardingpoint");
  }

  function handleBack() {
    history.push("/passengerdetails");
  }
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="top-container">
          <button onClick={handleBack}>
            <span>
              <IoIosArrowBack />
            </span>
          </button>

          <label className="page-title">
            <strong>Manila to Zambales</strong>
            <br />
            <span style={{ fontSize: "14px" }}>Monday, 27 Feb, 2023</span>
          </label>
        </div>

        <div className="boarding-points-container">
          <div className="button">
            <div>
              <button>Seat Selection</button>
            </div>
            <div className="arrow-container">
              <CgArrowLongRight />
            </div>
            <div>
              <button>Boarding Point</button>
            </div>
            <div className="arrow-container">
              <CgArrowLongRight />
            </div>
            <div>
              <button>Dropping Point</button>
            </div>
          </div>
        </div>

        <div className="two-button-container">
          <button className="flex-butt">
            <MdAirlineSeatReclineNormal />
            View Seat Type
          </button>
          <button className="flex-butt">Cancellation Policy</button>
        </div>

        <div className="select-seat-container">
          <div className="steer-wrapper">
            <IconContext.Provider value={{ size: "15vw", color: "#404040" }}>
              <div className="steering-wheel-logo">
                <GiSteeringWheel />
              </div>
            </IconContext.Provider>
          </div>
          <div className="seat-box">
            <div>
              <div className="seat-col">
                <button style={{ backgroundColor: "#F6C25E" }}></button>
                <button style={{ backgroundColor: "#D8D8D8" }}></button>
                <button style={{ backgroundColor: "#93D8FF" }}></button>
                <button style={{ backgroundColor: "#93D8FF" }}></button>
                <button style={{ backgroundColor: "#93D8FF" }}></button>
                <button style={{ backgroundColor: "#93D8FF" }}></button>
              </div>
            </div>
            <div>
              <div className="seat-col">
                <button style={{ backgroundColor: "#93D8FF" }}></button>
                <button style={{ backgroundColor: "#93D8FF" }}></button>
                <button style={{ backgroundColor: "#93D8FF" }}></button>
                <button style={{ backgroundColor: "#FFFFFF" }}></button>
                <button style={{ backgroundColor: "#FFFFFF" }}></button>
                <button style={{ backgroundColor: "#FFFFFF" }}></button>
              </div>
              <div className="seat-col">
                <button style={{ backgroundColor: "#D8D8D8" }}></button>
                <button style={{ backgroundColor: "#93D8FF" }}></button>
                <button style={{ backgroundColor: "#93D8FF" }}></button>
                <button style={{ backgroundColor: "#93D8FF" }}></button>
                <button style={{ backgroundColor: "#D8D8D8" }}></button>
                <button style={{ backgroundColor: "#D8D8D8" }}></button>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-buttons">
          <button>
            <span>More Details</span>
          </button>
          <button>
            <span className="seats-total">1 Seat(s)</span>
          </button>
          <button>
            <span className="price">P800</span>
            <span className="total-price">Total Price</span>
          </button>
          <button>
            <span className="proceed-btn" onClick={handleRegister}>
              PROCEED
            </span>
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SeatSelection;
