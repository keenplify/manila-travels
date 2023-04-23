import {
  IonContent,
  IonPage,
} from "@ionic/react";
import "./AvailableBuses.css";

import React from "react";
import { IonIcon } from "@ionic/react";
import {
  checkmarkDoneCircleSharp,
  womanSharp,
} from "ionicons/icons";

import { IoIosArrowBack } from "react-icons/io";

const AvailableBuses: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="main-container">
          <div className="top-container">
            <button>
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

          <div className="ticket-container">
            <div className="ticket-card">
              <div className="brand">
                <div className="brand-icon-wrapper">
                  <IonIcon
                    icon={checkmarkDoneCircleSharp}
                    className="brand-icon"
                  />
                </div>
                <span className="brand-text">Manila Assured</span>
              </div>

              <div className="info-container">
                <div className="company-details-wrapper">
                  <strong>Manila Travels</strong>
                  <span className="bus-name">
                    Vivo AC Multi Axie Slepper {"("}2+1{")"}
                  </span>
                </div>
              </div>

              <div className="time-container">
                <h4>17:00</h4>
                <div className="time-line">
                  <div className="dot l-dot"></div>
                  <div className="line l-line"></div>
                  <div className="hrs rounded-pill">7 hrs</div>
                  <div className="line r-line"></div>
                  <div className="dot r-dot"></div>
                </div>
                <h4>00:00</h4>
              </div>

              <div className="seat-container">
                <span className="seat">
                  <IonIcon icon={womanSharp} className="seat-icon" />
                  <span className="seat-text">23 Seats</span>

                  <div className="progress-bar"></div>
                </span>

                <div className="price-container">
                  <h2>P800</h2>
                  <span>Onwards</span>
                </div>
              </div>

              <div className="bottom-container">
                <button className="view-btn"></button>
              </div>
            </div>

            <div className="ticket-card">
              <div className="brand">
                <div className="brand-icon-wrapper">
                  <IonIcon
                    icon={checkmarkDoneCircleSharp}
                    className="brand-icon"
                  />
                </div>
                <span className="brand-text">Manila Assured</span>
              </div>

              <div className="info-container">
                <div className="company-details-wrapper">
                  <strong>Manila Travels</strong>
                  <span className="bus-name">
                    Vivo AC Multi Axie Slepper {"("}2+1{")"}
                  </span>
                </div>
              </div>

              <div className="time-container">
                <h4>17:00</h4>
                <div className="time-line">
                  <div className="dot l-dot"></div>
                  <div className="line l-line"></div>
                  <div className="hrs rounded-pill">7 hrs</div>
                  <div className="line r-line"></div>
                  <div className="dot r-dot"></div>
                </div>
                <h4>00:00</h4>
              </div>

              <div className="seat-container">
                <span className="seat">
                  <IonIcon icon={womanSharp} className="seat-icon" />
                  <span className="seat-text">23 Seats</span>

                  <div className="progress-bar"></div>
                </span>

                <div className="price-container">
                  <h2>P800</h2>
                  <span>Onwards</span>
                </div>
              </div>

              <div className="bottom-container">
                <button className="view-btn"></button>
              </div>
            </div>

            <div className="ticket-card">
              <div className="brand">
                <div className="brand-icon-wrapper">
                  <IonIcon
                    icon={checkmarkDoneCircleSharp}
                    className="brand-icon"
                  />
                </div>
                <span className="brand-text">Manila Assured</span>
              </div>

              <div className="info-container">
                <div className="company-details-wrapper">
                  <strong>Manila Travels</strong>
                  <span className="bus-name">
                    Vivo AC Multi Axie Slepper {"("}2+1{")"}
                  </span>
                </div>
              </div>

              <div className="time-container">
                <h4>17:00</h4>
                <div className="time-line">
                  <div className="dot l-dot"></div>
                  <div className="line l-line"></div>
                  <div className="hrs rounded-pill">7 hrs</div>
                  <div className="line r-line"></div>
                  <div className="dot r-dot"></div>
                </div>
                <h4>00:00</h4>
              </div>

              <div className="seat-container">
                <span className="seat">
                  <IonIcon icon={womanSharp} className="seat-icon" />
                  <span className="seat-text">23 Seats</span>

                  <div className="progress-bar"></div>
                </span>

                <div className="price-container">
                  <h2>P800</h2>
                  <span>Onwards</span>
                </div>
              </div>

              <div className="bottom-container">
                <button className="view-btn"></button>
              </div>
            </div>

            <div className="ticket-card">
              <div className="brand">
                <div className="brand-icon-wrapper">
                  <IonIcon
                    icon={checkmarkDoneCircleSharp}
                    className="brand-icon"
                  />
                </div>
                <span className="brand-text">Manila Assured</span>
              </div>

              <div className="info-container">
                <div className="company-details-wrapper">
                  <strong>Manila Travels</strong>
                  <span className="bus-name">
                    Vivo AC Multi Axie Slepper {"("}2+1{")"}
                  </span>
                </div>
              </div>

              <div className="time-container">
                <h4>17:00</h4>
                <div className="time-line">
                  <div className="dot l-dot"></div>
                  <div className="line l-line"></div>
                  <div className="hrs rounded-pill">7 hrs</div>
                  <div className="line r-line"></div>
                  <div className="dot r-dot"></div>
                </div>
                <h4>00:00</h4>
              </div>

              <div className="seat-container">
                <span className="seat">
                  <IonIcon icon={womanSharp} className="seat-icon" />
                  <span className="seat-text">23 Seats</span>

                  <div className="progress-bar"></div>
                </span>

                <div className="price-container">
                  <h2>P800</h2>
                  <span>Onwards</span>
                </div>
              </div>

              <div className="bottom-container">
                <button className="view-btn"></button>
              </div>
            </div>

            {/*End Ticket Container*/}
          </div>

          {/*End*/}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AvailableBuses;