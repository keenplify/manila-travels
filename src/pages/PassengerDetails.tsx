import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  IonIcon,
  IonList,
  IonListHeader,
  IonLabel,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import "./PassengerDetails.css";
import { useHistory } from "react-router";
import { arrowForward } from "ionicons/icons";

import { IoIosArrowBack } from "react-icons/io";
import { PassengerWithSeat, useRouteStore } from "../stores/route";
import dayjs from "dayjs";
import { zodiosHooks } from "../config/zodios";
import { Toast } from "@capacitor/toast";
import currency from "currency.js";

const PassengerDetails: React.FC = () => {
  const history = useHistory();
  const {
    selectedRoute,
    selectedSeats,
    setSelectedPassengers: setGlobalSelectedPassengers,
  } = useRouteStore();
  const { data: passengers } = zodiosHooks.useListPassengers();
  const [selectedPassengers, setSelectedPassengers] = useState<
    PassengerWithSeat[]
  >([]);

  useEffect(() => {
    if (!selectedSeats) return;

    setSelectedPassengers(
      selectedSeats.map(
        (seat) =>
          ({
            seat,
            passenger: undefined,
            price: currency(0),
          } ?? [])
      )
    );
  }, [selectedSeats]);

  function handleHome() {
    setGlobalSelectedPassengers(selectedPassengers);
    history.push("/paymentmethod");
  }

  function handleBack() {
    history.push("/seatselection");
  }

  return (
    <IonPage>
      <IonContent>
        <div>
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

          <div className="flex flex-col px-2">
            <div className="route-container flex flex-col">
              <div className="flex justify-between">
                <span>
                  <strong>{selectedRoute?.from}</strong>
                </span>

                <IonIcon icon={arrowForward} className="right-arrow"></IonIcon>

                <span>
                  <strong>{selectedRoute?.to}</strong>
                </span>
              </div>
            </div>

            <div className="route-container flex flex-col mt-2 py-2">
              <div className="font-bold text-sm mb-0 pb-0">
                Departure Date and Time
              </div>
              <div className="flex gap-2">
                <span>{selectedRoute?.departureTime}</span>
                <span>
                  {dayjs(selectedRoute?.departureDate).format("DD  MMM, YYYY")}
                </span>
              </div>
            </div>
            <IonList>
              <IonListHeader>
                <IonLabel className="font-bold">Passengers</IonLabel>
              </IonListHeader>
              {selectedSeats?.map((seat) => {
                const selectedPassenger = selectedPassengers.find(
                  (p) => p.seat === seat
                );

                return (
                  <IonItem key={seat}>
                    <IonLabel>Seat No. {seat}</IonLabel>
                    <IonSelect
                      placeholder="Select Passenger"
                      value={selectedPassenger?.passenger?.id}
                      onIonChange={(event) => {
                        const newPassengerId = event.detail.value;
                        setSelectedPassengers((selectedPassengers) => {
                          const newPassengers = [...selectedPassengers];

                          const oldIndex = newPassengers.findIndex(
                            (p) => p.seat == seat
                          );
                          const passenger = passengers?.data.find(
                            (p) => p.id == newPassengerId
                          );

                          if (!passenger) {
                            Toast.show({
                              text: "Passenger not found",
                            });
                            return newPassengers;
                          }

                          let price = currency(selectedRoute?.stepCost ?? 0);

                          if (
                            passenger.type !== "Regular" &&
                            passenger.isVerified
                          ) {
                            price = price.multiply(0.8); // 20% discount
                          }

                          if (oldIndex !== -1) {
                            newPassengers[oldIndex] = {
                              seat,
                              passenger,
                              price,
                            };
                          } else {
                            Toast.show({
                              text: "Unable to select passenger",
                            });
                          }

                          return newPassengers;
                        });
                      }}
                    >
                      {passengers?.data.map((passenger) => {
                        const foundIndex = selectedPassengers.findIndex(
                          (p) => p.passenger?.id === passenger.id
                        );

                        return (
                          <IonSelectOption
                            value={passenger.id}
                            key={passenger.id}
                            disabled={foundIndex !== -1}
                          >
                            {passenger.name} ({passenger.type})
                          </IonSelectOption>
                        );
                      })}
                    </IonSelect>
                  </IonItem>
                );
              })}
              {selectedPassengers.map((sp, key) => {
                if (!sp.passenger) return null;
                if (sp.passenger.isVerified) return null;
                if (sp.passenger.type === "Regular") return null;

                return (
                  <IonCard key={key} color="danger">
                    <IonCardContent>
                      <b>{sp.passenger.name}</b> is not yet verified. You will
                      not receive discount for this passenger.
                    </IonCardContent>
                  </IonCard>
                );
              })}
            </IonList>
            <div className="submit-container">
              <button
                className={`submit-btn ${
                  selectedPassengers.filter((p) => p.passenger)?.length !==
                  selectedSeats?.length
                    ? "!bg-[#349eda]  opacity-40 disabled"
                    : "!bg-[#349eda]"
                }`}
                onClick={handleHome}
              >
                Proceed to payment
              </button>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PassengerDetails;
