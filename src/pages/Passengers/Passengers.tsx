import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
} from "@ionic/react";
import { addSharp } from "ionicons/icons";

import React from "react";
import { zodiosHooks } from "../../config/zodios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const PassengersPage: React.FC = () => {
  const { data: passengers, isLoading } = zodiosHooks.useListPassengers();

  const history = useHistory();

  const handleRedirectAddPassenger = () => {
    history.push("/passengers/add");
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <img
          src="/background1.png"
          className="background-image !h-32"
          alt="background"
        />
        <div className="logo-container">
          <Link to="/searchbus">
            <img src="/logo.png" alt="logo"></img>
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <IonCard className="overflow-visible">
            <div className="flex w-full">
              <div className="text-md bg-background rounded-br-lg text-white p-2 font-bold flex items-center px-4 h-1/2">
                Verification Status
              </div>
              <div className="ml-auto">
                <IonFabButton size="small" onClick={handleRedirectAddPassenger}>
                  <IonIcon icon={addSharp} size="large" />
                </IonFabButton>
              </div>
            </div>
            <IonCardContent>
              {isLoading ? (
                <IonSpinner name="dots" />
              ) : (
                <IonList>
                  {passengers?.data.map(({ name, type, isVerified }, key) => (
                    <IonItem key={key}>
                      <div className="py-2 w-full">
                        <div className=" flex items-center w-full">
                          <div className="mr-auto flex flex-col">
                            <span className="!font-bold">{name}</span>
                            <span className="text-xs italic">
                              {isVerified ? "Verified" : "Verifying"}
                            </span>
                          </div>
                          <IonBadge
                            color={
                              type === "Regular"
                                ? "primary"
                                : type === "Senior Citizen"
                                ? "tertiary"
                                : "secondary"
                            }
                          >
                            {type}
                          </IonBadge>
                        </div>
                      </div>
                    </IonItem>
                  ))}
                </IonList>
              )}
              {passengers?.data.length === 0 && (
                <IonItem>
                  <IonLabel>No passengers found.</IonLabel>
                </IonItem>
              )}
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PassengersPage;
