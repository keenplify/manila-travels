import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonIcon,
  IonLabel,
  IonPage,
  useIonAlert,
} from "@ionic/react";

import React from "react";
import { zodios, zodiosHooks } from "../../config/zodios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  arrowForwardOutline,
  checkmarkDoneCircleOutline,
} from "ionicons/icons";
import dayjs from "dayjs";
import { ActionSheet, ActionSheetButtonStyle } from "@capacitor/action-sheet";
import { Toast } from "@capacitor/toast";

const BookingsPage: React.FC = () => {
  const { data: bookings, refetch } = zodiosHooks.useListBookings();
  const [presentAlert] = useIonAlert();

  const history = useHistory();

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
        <div className="flex flex-col">
          {bookings?.data.map((booking, key) => (
            <IonCard
              key={key}
              className="relative border border-slate-500"
              onClick={async () => {
                const result = await ActionSheet.showActions({
                  title: "Booking Options",
                  message: "Select an option to perform",
                  options: [
                    {
                      title: "Cancel Booking",
                      style: ActionSheetButtonStyle.Destructive,
                    },
                    {
                      title: "Close",
                    },
                  ],
                });

                switch (result.index) {
                  case 0: {
                    presentAlert({
                      header: "Alert",
                      subHeader:
                        "Are you sure you want to cancel your reservation?",
                      message:
                        "This is irreversible. You can only cancel 3 days after the booking. Continue?",
                      buttons: [
                        {
                          text: "Yes",
                          handler: async () => {
                            if (
                              dayjs(booking.created).isBefore(
                                dayjs().subtract(3, "days")
                              )
                            ) {
                              Toast.show({
                                text: "Unable to delete booking as 3 days already passed.",
                              });
                            } else {
                              await zodios.deleteBooking(undefined, {
                                params: {
                                  id: booking.id,
                                },
                              });
                              refetch()

                              Toast.show({
                                text: "Booking successfully cancelled.",
                              });
                            }
                          },
                          role: "destructive",
                        },
                        {
                          text: "No",
                          role: "cancel",
                        },
                      ],
                    });
                  }
                }
              }}
            >
              <IonCardHeader>
                <div className="bg-background rounded-bl-xl absolute top-0 right-0 p-2 py-3 text-white items-center justify-center flex">
                  <IonIcon
                    icon={checkmarkDoneCircleOutline}
                    className="scale-[200%] px-2"
                  />
                  <span>ManilaAssured</span>
                </div>
              </IonCardHeader>
              <IonCardContent>
                <div className="max-w-[50vw] w-[418px]">
                  <div className="flex justify-between items-center font-bold text-lg w-fit">
                    <span>{booking.route?.from}</span>
                    <IonIcon icon={arrowForwardOutline} className="p-2" />
                    <span>{booking.route?.to}</span>
                  </div>
                  <p className="flex gap-2">
                    <span>
                      {dayjs(booking.route?.departureDate).format("DD/MM/YYYY")}
                    </span>
                    <span>|</span>
                    <span>
                      Bus No. <b>{booking.route?.busNo}</b>
                    </span>
                  </p>
                </div>
                <div className="flex justify-between w-full">
                  <div>
                    <p className="!text-2xl font-bold">
                      {[
                        booking.route?.departureTime.split(":")[0],
                        booking.route?.departureTime.split(":")[1],
                      ]?.join(":")}
                    </p>
                  </div>
                  <div className="ml-auto flex flex-col items-center justify-center">
                    <span className="font-bold !text-2xl text-black">
                      ₱{booking.bookedAmount}
                    </span>
                    <span className="text-md">Onwards</span>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          ))}
          {bookings?.data.length === 0 && (
            <IonCard>
              <IonLabel>No bookings found.</IonLabel>
            </IonCard>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default BookingsPage;
