import {
  IonContent,
  IonPage,
} from "@ionic/react";
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
import ActionSheet, { ActionSheetRef } from "@keenplify/actionsheet-react"
import { SeatButton } from "../components/SeatSelection/Seat";

const SeatSelection: React.FC = () => {
  const history = useHistory();
  const {selectedRoute} = useRouteStore()
  const seatDetailsRef = useRef<ActionSheetRef>();

  useEffect(() => {
    if (!selectedRoute) history.push("/searchbus");
  }, [selectedRoute, history])

  function handleRegister() {
    history.push("/boardingpoint");
  }

  function handleBack() {
    history.push("/searchbus");
  }

  if (!selectedRoute) return null
  
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
            <strong>{selectedRoute.from} to {selectedRoute.to}</strong>
            <br />
            <span style={{ fontSize: "14px" }}>{dayjs(selectedRoute.departureDate).format("dddd, DD  MMM, YYYY")}</span>
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
          <button className="flex-butt" onClick={() => seatDetailsRef.current?.open()}>
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
        <ActionSheet ref={seatDetailsRef}>
          <div className="flex flex-col p-8">
            <h2 className="font-bold text-xl">Seat Types</h2>
            <div className="grid grid-cols-3 mt-4">
              <div className="flex items-center">
                <div
                  className="aspect-square w-8 h-8 border bg-white shadow mr-2 rounded"
                />
                Available
              </div>
              <div className="flex items-center">
                <div
                  className="aspect-square w-8 h-8 border bg-[#ffa800] shadow mr-2 rounded"
                />
                Selected
              </div>
              <div className="flex items-center">
                <div
                  className="aspect-square w-8 h-8 border bg-[#93d8ff] shadow mr-2 rounded"
                />
                Booked
              </div>
            </div>
          </div>
        </ActionSheet>
      </IonContent>
    </IonPage>
  );
};

export default SeatSelection;
