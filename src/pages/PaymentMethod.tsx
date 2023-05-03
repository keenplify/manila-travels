import React, { useState } from "react";

import { IonContent, IonPage } from "@ionic/react";
import "./PaymentMethod.css";
import { useHistory } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import { FaMoneyBill } from "react-icons/fa";
import { AiFillCheckCircle } from "react-icons/ai";
const PaymentMethod: React.FC = () => {
  const [modalState, setModalState] = useState("none");

  function toggleModal() {
    setModalState((prevState) => (prevState === "none" ? "flex" : "none"));
  }

  function hideModal() {
    setModalState("none");
  }

  const history = useHistory();

  function handleLogin() {
    history.push("/paymentmethod/gcash");
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
            <strong>Payment Methods</strong>
          </label>
        </div>

        <div className="question">How do you want to pay for this?</div>

        <div className="payment-method-list">
          <button className="payment-select">
            <div className="bill-logo">
              <FaMoneyBill />
            </div>
            <div className="payment-text">
              <span>
                Use <b>GCash</b>
              </span>
            </div>
            <div className="check-logo">
              <AiFillCheckCircle />
            </div>
          </button>
        </div>

        <div className="submit-container">
          <button className="proceed-button" onClick={toggleModal}>
            Proceed
          </button>
        </div>

        <div
          className="payment-modal-container"
          style={{ display: modalState }}
        >
          <div className="payment-modal">
            <span>Are you sure?</span>
            <div className="payment-modal-buttons">
              <button onClick={handleLogin}>Confirm</button>
              <button onClick={hideModal}>Cancel</button>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PaymentMethod;
