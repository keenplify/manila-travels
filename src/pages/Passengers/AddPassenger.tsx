import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

import React, { useState } from "react";
import { passengersAPI } from "../../queries/v1/passengers";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { CustomerTypes } from "../../enums/CustomerType";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import axios from "axios";
import { backendServerUrl, zodios, zodiosHooks } from "../../config/zodios";
import { LS_AUTHTOKEN } from "../../config/localstorage";
import { Toast } from "@capacitor/toast";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const addPassengerSchema = passengersAPI[1].parameters[0].schema;

const AddPassengerPage: React.FC = () => {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof addPassengerSchema>>({
    resolver: zodResolver(addPassengerSchema),
    defaultValues: {
      type: "Regular",
      validIdImageUrl: null,
    },
  });
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate } = zodiosHooks.useStorePassenger(undefined, {
    onSuccess: () => {
      refetch();
      Toast.show({
        text: "Passenger created.",
      });

      history.push("/passengers");
    },
  });
  const { type, validIdImageUrl } = watch();
  const { refetch } = zodiosHooks.useListPassengers();

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);

    try {
      if (
        (data.type === "Senior Citizen" || data.type === "Student") &&
        (!validIdImageUrl || validIdImageUrl.length === 0)
      ) {
        await Toast.show({
          text: "Unable to submit without valid ID",
        });

        setIsSubmitting(false);
        return;
      }

      mutate(data);
    } catch (error) {
      console.warn();
    } finally {
      setIsSubmitting(false);
    }
  });

  const takeIdImage = async () => {
    try {
      setIsSubmitting(true);
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt,
        quality: 100,
      });

      if (!photo.base64String) {
        console.log("no string");
        return;
      }

      const imageResponse = await fetch(
        `data:image/${photo.format};base64,${photo.base64String}`
      );
      const blob = await imageResponse.blob();

      const formData = new FormData();

      formData.append("image", blob, `image.${photo.format}`);

      const authToken = localStorage.getItem(LS_AUTHTOKEN);

      const response = await axios.post(
        `${backendServerUrl}/v1/users/file-upload/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("res");

      await Toast.show({
        text: "Upload successful",
      });

      setValue("validIdImageUrl", response.data.data.url);
    } catch (error) {
      console.warn(error);
    } finally {
      setIsSubmitting(false);
    }
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
        <form className="flex flex-col gap-1 p-2" onSubmit={onSubmit}>
          <IonCard>
            <div className="flex w-full">
              <div className="text-md bg-background rounded-br-lg text-white p-2 font-bold flex items-center px-4 h-1/2">
                Passenger Information
              </div>
            </div>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonLabel color={errors.name ? "danger" : undefined}>
                    Name
                  </IonLabel>
                  <IonInput
                    color={errors.name ? "danger" : undefined}
                    {...register("name")}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel color={errors.phone ? "danger" : undefined}>
                    Phone
                  </IonLabel>
                  <IonInput
                    color={errors.phone ? "danger" : undefined}
                    type="tel"
                    {...register("phone")}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel color={errors.type ? "danger" : undefined}>
                    Type
                  </IonLabel>
                  <IonSelect
                    color={errors.type ? "danger" : undefined}
                    {...register("type")}
                    onIonChange={(e) => setValue("type", e.detail.value)}
                  >
                    {CustomerTypes.map((v) => (
                      <IonSelectOption value={v} key={v}>
                        {v}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
          {(type === "Student" || type === "Senior Citizen") && (
            <IonCard>
              <div className="flex w-full">
                <div className="text-md bg-background rounded-br-lg text-white p-2 font-bold flex items-center px-4 h-1/2">
                  Verify ID
                </div>
              </div>
              <IonCardContent>
                <div className="flex flex-col items-center text-black gap-2">
                  <img
                    src={validIdImageUrl ?? "/verification.jpg"}
                    className="w-1/2"
                  />
                  <div className="text-xl font-semibold">
                    We need to verify your ID
                  </div>
                  <div className="text-center">
                    In order to be eligible in discounts, we need to be 100%
                    sure that you are you, as we are a financial service, we
                    have to comply.
                  </div>
                  <IonButton onClick={takeIdImage} disabled={isSubmitting}>
                    Upload Image
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          )}
          <IonButton type="submit" disabled={isSubmitting}>
            Submit
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddPassengerPage;
