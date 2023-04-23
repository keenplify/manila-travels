import {
  IonContent,
  IonPage,
} from "@ionic/react";
import "./SearchBus.css";
import { useHistory } from "react-router";
import React from "react";
import { IonIcon } from "@ionic/react";
import {
  paperPlaneSharp,
  locationSharp,
  swapVerticalSharp,
} from "ionicons/icons";
import { zodiosHooks } from "../config/zodios";

const SearchBus: React.FC = () => {

  const { data:user } = zodiosHooks.useCheckCustomer()
  const history = useHistory();

  function handleHome() {
    history.push("/seatselection");
  }

  return (
    <IonPage>
      <IonContent className="content-container">
        <img src="/background1.png" className="background-image" alt="background" />

        <div className="logo-container">
          <img src="/logo.png" alt="logo"></img>
        </div>

        {
          user && (
            <div className="text-white m-2 text-xl">
              Good day, <b className="uppercase">{user.data.fullName}</b>!
            </div>
          )
        }
        

        <div className="card">
          <div className="place-container">
            <div>
              <IonIcon icon={paperPlaneSharp} className="card-icon"></IonIcon>
              <input type="text" placeholder="Destination" />
            </div>

            <div>
              <IonIcon icon={locationSharp} className="card-icon"></IonIcon>
              <input type="text" placeholder="Going to" />
            </div>

            <IonIcon
              icon={swapVerticalSharp}
              className="card-icon swap-vertical-icon"
            ></IonIcon>
          </div>

          <span>Departure</span>

          <div className="date-container">
            <ul>
              <li>
                <a href="#" className="active">
                  27
                </a>
                <span className="day">MON</span>
              </li>
              <li>
                <a href="#">28</a>
                <span className="day">TUE</span>
              </li>
              <li>
                <a href="#">29</a>
                <span className="day">WED</span>
              </li>
              <li>
                <a href="#">30</a>
                <span className="day">THU</span>
              </li>
              <li>
                <a href="#">31</a>
                <span className="day">FRI</span>
              </li>
            </ul>
          </div>

          <button type="submit" className="search-btn" onClick={handleHome}>
            Search
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};
{
}

export default SearchBus;
