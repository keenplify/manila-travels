import {
  IonAvatar,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonTitle,
} from "@ionic/react";
import { logout, zodiosHooks } from "../config/zodios";
import { LS_AUTHTOKEN } from "../config/localstorage";
import { useHistory } from "react-router";

export function SideMenu() {
  const { data: user } = zodiosHooks.useCheckUser(undefined, {
    enabled: localStorage.getItem(LS_AUTHTOKEN) !== null,
  });

  const history = useHistory();

  return (
    <IonMenu contentId="main-content">
      <div>
        <div className="bg-background flex flex-col px-2 rounded-b-3xl text-white py-4">
          <div className="flex w-full gap-2">
            <div>
              <IonAvatar>
                <img
                  alt="Silhouette of a person's head"
                  src="https://ionicframework.com/docs/img/demos/avatar.svg"
                />
              </IonAvatar>
            </div>
            <div className="flex flex-col justify-center grow">
              <p className="font-bold">
                {user?.data.fullName ?? "Not logged in"}
              </p>
            </div>
          </div>
        </div>
        <IonList>
          <IonListHeader>
            <IonTitle>Menu</IonTitle>
          </IonListHeader>
          <IonItem onClick={() => history.push("/account")}>
            <IonLabel>Account</IonLabel>
          </IonItem>
          <IonItem onClick={() => history.push("/bookings")}>
            <IonLabel>My Bookings</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Passenger Verification</IonLabel>
          </IonItem>
          <IonItem onClick={logout}>
            <IonLabel>Logout</IonLabel>
          </IonItem>
        </IonList>
      </div>
    </IonMenu>
  );
}
