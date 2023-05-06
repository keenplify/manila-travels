import React, { useRef } from "react";

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "../PaymentMethod.css";
import { useHistory } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import { OverlayEventDetail } from "@ionic/core";
import { useRouteStore } from "../../stores/route";
import { Toast } from "@capacitor/toast";
import currency from "currency.js";
import { zodios, zodiosHooks } from "../../config/zodios";

const GCashPaymentMethod: React.FC = () => {
  const history = useHistory();
  const { refetch } = zodiosHooks.useListBookings();
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const { selectedPassengers, selectedRoute } = useRouteStore();

  function handleBack() {
    history.push("/paymentmethod");
  }

  async function handleFinalizeBooking(referenceNo: string) {
    if (!selectedPassengers || selectedPassengers.length === 0) {
      Toast.show({
        text: "Selected seats not found!",
      });
      return;
    }

    if (!selectedRoute) {
      Toast.show({
        text: `Selected route not found`,
      });
      return;
    }

    for (const selectedPassenger of selectedPassengers) {
      if (!selectedPassenger.passenger) {
        Toast.show({
          text: `Unable to create booking for seat ${selectedPassenger.seat}`,
        });
        return;
      }

      zodios.storeBooking({
        passengerId: selectedPassenger.passenger.id,
        customerRoute: `${selectedRoute.from} &rarr; ${selectedRoute.to}`,
        bookedAmount: selectedPassenger.price.value,
        bookedSeat: `${selectedPassenger.seat}`,
        routeId: selectedRoute.routeId,
        referenceNo,
      });

      setTimeout(() => {
        refetch();
        history.replace("/bookings");
        Toast.show({
          text: "Successfully created bookings.",
        });
      }, 1000);
    }
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      handleFinalizeBooking(ev.detail.data);
    }
  }

  function confirm() {
    modal.current?.dismiss(input.current?.value, "confirm");
  }

  const totalPrice = currency(
    selectedPassengers?.reduce(
      (partialSum, a) => partialSum + (a.price.value ?? 0),
      0
    ) ?? 0,
    {
      symbol: "₱",
    }
  );

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonModal
          ref={modal}
          trigger="open-modal"
          onWillDismiss={(ev) => onWillDismiss(ev)}
        >
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>
                  Cancel
                </IonButton>
              </IonButtons>
              <IonTitle>GCash</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="stacked">
                Enter Gcash Transaction Number
              </IonLabel>
              <IonInput ref={input} type="text" placeholder="Transaction #" />
            </IonItem>
          </IonContent>
        </IonModal>

        <div className="top-container">
          <button onClick={handleBack}>
            <span>
              <IoIosArrowBack />
            </span>
          </button>

          <label className="page-title">
            <strong>Pay with GCash</strong>
          </label>
        </div>

        <div className="text-center pt-4">
          Please scan the Barcode to Pay with GCash
        </div>
        <div className="text-center text-xl pb-4">
          Please pay <b className="text-lg">{totalPrice.format()}</b>
        </div>

        <div className="flex justify-center items-center">
          <img src="/gcash.jpg" className="h-[70vh] w-auto" />
        </div>

        <div className="submit-container">
          <button className="proceed-button" id="open-modal">
            Next
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default GCashPaymentMethod;
