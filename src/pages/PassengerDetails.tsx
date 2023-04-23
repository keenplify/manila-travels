import React from "react";
import {
  IonContent,
  IonPage,
  IonIcon,
} from "@ionic/react";
import "./PassengerDetails.css";
import { useHistory } from "react-router";
import {
  arrowForward,
} from "ionicons/icons";

import { IoIosArrowBack } from "react-icons/io";

const PassengerDetails: React.FC = () => {
  const history = useHistory();

  function handleHome() {
    history.push("/paymentmethod");
  }
  function handleBack() {
    history.push("/droppingpoint");
  }
  return (
    <IonPage>
      <IonContent>
        <div className="main-container">
          <div className="top-container">
            <button>
              <i className="back-btn" onClick={handleBack}>
                <IoIosArrowBack />
              </i>
            </button>

            <label className="page-title">
              <strong>Passenger Details</strong>
            </label>
          </div>

          <div className="route-container">
            <div className="from">
              <span>
                <strong>Manila</strong>
              </span>
              <span>Taguig Bus</span>
              <span>15:00, 27 Feb 2023</span>
            </div>

            <div className="arrow-container">
              <IonIcon icon={arrowForward} className="right-arrow"></IonIcon>
            </div>

            <div className="to">
              <span>
                <strong>Zambales</strong>
              </span>
              <span>Iba Bus..</span>
              <span>00:00, 28 Feb 2023</span>
            </div>
          </div>

          <div className="middle-container">
            <span className="middle-container__note">
              Your ticket info will be sent here
            </span>

            <div>
              <input type="text" placeholder="Email Address" />
            </div>

            <div>
              <input type="text" placeholder="Phone Number" />
            </div>
          </div>

          <div className="bot-container">
            <span className="bot-container__note">Passenger Details</span>

            <div>
              <div>
                <input type="text" placeholder="Full Name" />
              </div>

              <div>
                <input type="text" placeholder="Age" />
              </div>
            </div>
          </div>

          <div className="submit-container">
            <button className="submit-btn" onClick={handleHome}>
              Proceed to payment
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PassengerDetails;
