import { IonButton, IonContent, IonPage } from "@ionic/react";
import "./SearchBus.css";
import { useHistory } from "react-router-dom";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { IonIcon } from "@ionic/react";
import {
  paperPlaneSharp,
  locationSharp,
  swapVerticalSharp,
  checkmarkDoneCircleOutline,
} from "ionicons/icons";
import { logout, zodiosHooks } from "../config/zodios";
import { Combobox } from "@headlessui/react";
import { MdCheckCircleOutline } from "react-icons/md";
import _ from "lodash";
import dayjs from "dayjs";
import { useRouteStore } from "../stores/route";

const SearchBus: React.FC = () => {
  const { data: user } = zodiosHooks.useCheckUser();
  const { data: routes } = zodiosHooks.useListRoutes();

  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const { selectedRoute, setSelectedRoute, resetSelectedSeats } =
    useRouteStore();

  useEffect(() => {
    setSelectedRoute(undefined);
  }, []);

  const { from, to } = useMemo(() => {
    if (!routes)
      return {
        from: [],
        to: [],
      };

    const from: string[] = [];
    const to: string[] = [];

    for (const route of routes.data) {
      if (!from.includes(route.from)) from.push(route.from);
      if (!to.includes(route.to)) to.push(route.to);
    }

    return { from, to };
  }, [routes]);

  const history = useHistory();

  function handleHome() {
    resetSelectedSeats();
    history.push({
      pathname: "/seatselection",
    });
  }

  const filteredTo = useMemo(() => {
    if (!routes) return [];

    let data;

    if (
      from
        .map((v) => v.toLocaleUpperCase())
        .includes(fromValue.toLocaleUpperCase())
    ) {
      data = _.uniq(
        routes.data.filter((val) => val.from === fromValue).map((v) => v.to)
      );
    } else {
      data = to;
    }

    return data.filter((v) =>
      v.toLocaleUpperCase().includes(toValue.toLocaleUpperCase())
    );
  }, [from, fromValue, routes, to, toValue]);

  const filteredFrom = useMemo(() => {
    if (!routes) return [];

    let data;

    if (
      to.map((v) => v.toLocaleUpperCase()).includes(toValue.toLocaleUpperCase())
    ) {
      data = _.uniq(
        routes.data.filter((val) => val.to === toValue).map((v) => v.from)
      );
    } else {
      data = from;
    }

    return data.filter((v) =>
      v.toLocaleUpperCase().includes(fromValue.toLocaleUpperCase())
    );
  }, [to, toValue, routes, from, fromValue]);

  const filteredRoutes = useMemo(() => {
    if (!routes) return [];
    return routes.data.filter(
      (val) =>
        val.from.toLocaleUpperCase().trim() ===
          fromValue.toLocaleUpperCase().trim() &&
        val.to.toLocaleUpperCase().trim() === toValue.toLocaleUpperCase().trim()
    );
  }, [routes, fromValue, toValue]);

  const handleLogout = logout;

  const handleVerify = () => {
    history.push("/passengers");
  };

  const fromComboBtn = useRef<HTMLButtonElement>(null);
  const toComboBtn = useRef<HTMLButtonElement>(null);

  return (
    <IonPage>
      <IonContent className="content-container">
        <img
          src="/background1.png"
          className="background-image"
          alt="background"
        />

        <div className="logo-container">
          <img src="/logo.png" alt="logo"></img>
        </div>

        {user && (
          <div className="text-white m-2 text-xl">
            Good day, <b className="uppercase">{user.data.fullName}</b>!{" "}
            <button className="ml-2 underline" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}

        <div className="card">
          <div className="place-container">
            <div className="relative">
              <IonIcon icon={paperPlaneSharp} className="card-icon"></IonIcon>
              <Combobox value={fromValue} onChange={setFromValue}>
                <Combobox.Input
                  onChange={(event) => setFromValue(event.target.value)}
                  placeholder="From"
                  onFocus={() => fromComboBtn.current?.click()}
                />
                <Combobox.Button className="hidden" ref={fromComboBtn} />
                <Combobox.Options className="absolute top-[100%] z-50 w-full bg-white rounded border-1 border-slate-500 shadow">
                  {filteredFrom.map((location, key) => (
                    <Combobox.Option key={key} value={location}>
                      {({ selected }) => (
                        <div className="flex gap-2 items-center px-2 py-2">
                          {selected && <MdCheckCircleOutline />}
                          {location}
                        </div>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Combobox>
            </div>

            <div>
              <IonIcon icon={locationSharp} className="card-icon"></IonIcon>
              <Combobox value={toValue} onChange={setToValue}>
                <Combobox.Input
                  onChange={(event) => setToValue(event.target.value)}
                  placeholder="Going To"
                  onFocus={() => toComboBtn.current?.click()}
                />
                <Combobox.Button className="hidden" ref={toComboBtn} />
                <Combobox.Options className="absolute top-[100%] z-50 w-full bg-white rounded border-1 border-slate-500 shadow">
                  {filteredTo.map((location, key) => (
                    <Combobox.Option key={key} value={location}>
                      {({ selected }) => (
                        <div className="flex gap-2 items-center px-2 py-2">
                          {selected && <MdCheckCircleOutline />}
                          {location}
                        </div>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Combobox>
            </div>

            <IonIcon
              icon={swapVerticalSharp}
              className="card-icon swap-vertical-icon"
            ></IonIcon>
          </div>

          <span>Departure</span>

          <div className="p-2">
            <div className="!grid grid-cols-5 sm:grid-cols-7 gap-4 w-full py-2">
              {filteredRoutes.length > 0 ? (
                filteredRoutes.map((route, key) => {
                  const day = dayjs(route.departureDate);
                  return (
                    <button
                      key={key}
                      className="flex flex-col justify-center gap-2 items-center"
                      onClick={() =>
                        selectedRoute?.id === route.id
                          ? setSelectedRoute(undefined)
                          : setSelectedRoute(route)
                      }
                    >
                      <span
                        className={`${
                          route?.id === selectedRoute?.id
                            ? "active"
                            : "inactive"
                        } rounded-full aspect-square w-8 h-8 p-1 flex justify-center items-center`}
                      >
                        {day.date()}
                      </span>
                      <span className="day">{day.format("ddd")}</span>
                    </button>
                  );
                })
              ) : (
                <p className="flex justify-center w-full text-slate-500 text-sm col-span-full">
                  No routes available
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`search-btn ${selectedRoute ? "" : "!bg-slate-300"}`}
            onClick={handleHome}
          >
            Book
          </button>
        </div>
        <div className="mt-8">
          <IonButton size="large" className="text-sm" onClick={handleVerify}>
            <IonIcon
              slot="start"
              icon={checkmarkDoneCircleOutline}
              size="large"
            />
            Verify your remaining <br /> client(s) here
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SearchBus;
