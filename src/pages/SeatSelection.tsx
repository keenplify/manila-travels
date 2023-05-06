import { IonButton, IonContent, IonPage } from "@ionic/react";
import "./SeatSelection.css";
import { useHistory } from "react-router";
import React, { useEffect, useRef } from "react";
import { IconContext } from "react-icons";
import { IoIosArrowBack } from "react-icons/io";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { CgArrowLongRight } from "react-icons/cg";
import { GiSteeringWheel } from "react-icons/gi";
import { useRouteStore } from "../stores/route";
import dayjs from "dayjs";
import ActionSheet, { ActionSheetRef } from "@keenplify/actionsheet-react";
import { SeatButton } from "../components/SeatSelection/Seat";
import { Toast } from "@capacitor/toast";

const SeatSelection: React.FC = () => {
  const history = useHistory();
  const { selectedRoute, selectedSeats } = useRouteStore();
  const seatDetailsRef = useRef<ActionSheetRef>();
  const cancellationPolicyRef = useRef<ActionSheetRef>();

  useEffect(() => {
    if (!selectedRoute) history.push("/searchbus");
  }, [selectedRoute, history]);

  function handleNext() {
    if (!selectedSeats || selectedSeats.length === 0) {
      Toast.show({
        text: "Unable to proceed. Please select a seat",
      });
      return;
    }

    history.push("/passengerdetails");
  }

  function handleBack() {
    history.push("/searchbus");
  }

  if (!selectedRoute) return null;

  const price = selectedRoute.stepCost * (selectedSeats?.length ?? 0);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="top-container">
          <button onClick={handleBack}>
            <span>
              <IoIosArrowBack />
            </span>
          </button>

          <label className="page-title text-center">
            <strong>
              {selectedRoute.from} to {selectedRoute.to}
            </strong>
            <br />
            <span style={{ fontSize: "14px" }}>
              {dayjs(selectedRoute.departureDate).format("dddd, DD  MMM, YYYY")}
            </span>
          </label>
        </div>

        <div className="boarding-points-container">
          <div className="button">
            <div className="font-bold">Seat Selection</div>
            <div className="arrow-container">
              <CgArrowLongRight />
            </div>
            <div>Boarding Point</div>
            <div className="arrow-container">
              <CgArrowLongRight />
            </div>
            <div>Dropping Point</div>
          </div>
        </div>

        <div className="two-button-container">
          <button
            className="flex-butt"
            onClick={() => seatDetailsRef.current?.open()}
          >
            <MdAirlineSeatReclineNormal />
            View Seat Type
          </button>
          <button
            className="flex-butt"
            onClick={() => cancellationPolicyRef.current?.open()}
          >
            Cancellation Policy
          </button>
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
                <SeatButton number={1} />
                <SeatButton number={5} />
                <SeatButton number={9} />
                <SeatButton number={13} />
                <SeatButton number={17} />
                <SeatButton number={21} />
                <SeatButton number={25} />
              </div>
              <div className="seat-col">
                <SeatButton number={2} />
                <SeatButton number={6} />
                <SeatButton number={10} />
                <SeatButton number={14} />
                <SeatButton number={18} />
                <SeatButton number={22} />
                <SeatButton number={26} />
              </div>
            </div>
            <div>
              <div className="seat-col">
                <SeatButton number={3} />
                <SeatButton number={7} />
                <SeatButton number={11} />
                <SeatButton number={15} />
                <SeatButton number={19} />
                <SeatButton number={23} />
                <SeatButton number={27} />
              </div>
              <div className="seat-col">
                <SeatButton number={4} />
                <SeatButton number={8} />
                <SeatButton number={12} />
                <SeatButton number={16} />
                <SeatButton number={20} />
                <SeatButton number={24} />
                <SeatButton number={28} />
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-buttons">
          <button>
            <span className="seats-total">
              {selectedSeats?.length ?? 0} Seat(s)
            </span>
          </button>
          <button>
            <span className="price">P{price}</span>
            <span className="total-price">Total Price</span>
          </button>
          <button
            onClick={handleNext}
            disabled={!selectedSeats || selectedSeats?.length === 0}
          >
            <span
              className={`proceed-btn ${
                selectedSeats?.length === 0
                  ? "bg-[#349eda]  opacity-40 disabled"
                  : "bg-[#349eda]"
              }`}
            >
              PROCEED
            </span>
          </button>
        </div>
        <ActionSheet ref={seatDetailsRef}>
          <div className="flex flex-col p-8">
            <h2 className="font-bold text-xl">Seat Types</h2>
            <div className="grid grid-cols-2 mt-4 gap-3">
              <div className="flex items-center">
                <div className="aspect-square w-8 h-8 border bg-white shadow mr-2 rounded" />
                Available
              </div>
              <div className="flex items-center">
                <div className="aspect-square w-8 h-8 border bg-[#ffa800] shadow mr-2 rounded" />
                Selected
              </div>
              <div className="flex items-center">
                <div className="aspect-square w-8 h-8 border bg-[#93d8ff] shadow mr-2 rounded" />
                Booked
              </div>
            </div>
          </div>
        </ActionSheet>
        <ActionSheet ref={cancellationPolicyRef}>
          <div className="flex flex-col p-8">
            <h2 className="font-bold text-xl">Cancellation Policy</h2>
            <div className="flex flex-col gap-2">
              <div>
                <p className="font-bold">Notice required for cancellation</p>
                <p>
                  You can cancel by clicking on the "Cancel Ticket" by logging
                  in to the Manila Travels app and finding the ticket under "My
                  Passes ", where you'll have the option to cancel up to 3 days
                  only after the reservation and your payment is not redundable.
                </p>
                <p className="font-bold">Retroactive cancellations</p>
                <p>
                  Manila Travels cannot provide a refund or cancellation after
                  the bus' scheduled departure time. It is the passenger's
                  responsibility to be at the stop at least 15 minutes prior to
                  departure. Manila Travels cannot guarantee that you can be
                  accommodated on a later departure.
                </p>
                <p className="font-bold mt-4">
                  CANCELATION INSTRUCTIONS FOR OURBUS INTERCITY &amp; COMMUTER
                </p>
                <p>
                  If you booked through the Manila Travels app, you can cancel
                  your ticket up to 3 days after the reservation
                </p>
                <ol className="list-decimal list-inside ml-4">
                  <li>
                    You can click on Cancel Ticket from your emailed ticket OR
                  </li>
                  <li>
                    Log in to the Manila Travels app. If you don't remember your
                    login information or signed up as a guest, use "forget
                    password" to reset.
                  </li>
                  <li>Go to "My Account" on the menu, then "My Passes".</li>
                  <li>
                    Under upcoming, select the ticket you wish to cancel, then
                    select "cancel".
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <IonButton
            color="medium"
            onClick={() => cancellationPolicyRef.current?.close()}
          >
            Close
          </IonButton>
        </ActionSheet>
      </IonContent>
    </IonPage>
  );
};

export default SeatSelection;
