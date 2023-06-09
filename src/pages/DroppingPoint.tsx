import {
  IonContent,
  IonPage,
} from "@ionic/react";
import "./DroppingPoint.css";
import { useHistory } from "react-router";
import React from "react";

import { IoIosArrowBack } from "react-icons/io";
import { CgArrowLongRight } from "react-icons/cg";

const DroppingPoint: React.FC = () => {
  const history = useHistory();

  function handleLogin() {
    history.push("/passengerdetails");
  }
  function handleBack() {
    history.push("/boardingpoint");
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

        <div className="boarding-list-container">
          <button className="boarding-btn" onClick={handleLogin}>
            <div>
              <strong className="boarding-name">Lorem ipsum</strong>
              <span className="boarding-address">
                Secret St. Sauyo, Quezon City, Metro Manila NCR
              </span>
            </div>
            <div>
              <span className="boarding-time">
                <strong>15:00</strong>
              </span>
            </div>
          </button>
          <button className="boarding-btn">
            <div>
              <strong className="boarding-name">Lorem ipsum</strong>
              <span className="boarding-address">
                Secret St. Sauyo, Quezon City, Metro Manila NCR
              </span>
            </div>
            <div>
              <span className="boarding-time">
                <strong>15:00</strong>
              </span>
            </div>
          </button>
          <button className="boarding-btn">
            <div>
              <strong className="boarding-name">Lorem ipsum</strong>
              <span className="boarding-address">
                Secret St. Sauyo, Quezon City, Metro Manila NCR
              </span>
            </div>
            <div>
              <span className="boarding-time">
                <strong>15:00</strong>
              </span>
            </div>
          </button>
          <button className="boarding-btn">
            <div>
              <strong className="boarding-name">Lorem ipsum</strong>
              <span className="boarding-address">
                Secret St. Sauyo, Quezon City, Metro Manila NCR
              </span>
            </div>
            <div>
              <span className="boarding-time">
                <strong>15:00</strong>
              </span>
            </div>
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DroppingPoint;
