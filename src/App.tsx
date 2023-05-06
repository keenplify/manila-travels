import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PassengerDetails from "./pages/PassengerDetails";
import SeatSelection from "./pages/SeatSelection";
import Register from "./pages/Register";
import DroppingPoint from "./pages/DroppingPoint";
import PaymentMethod from "./pages/PaymentMethod";
import AvailableBuses from "./pages/AvailableBuses";
import BoardingPoint from "./pages/BoardingPoint";
import { HelmetProvider } from "react-helmet-async";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "bootstrap/dist/css/bootstrap.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* Theme variables */
import "./theme/variables.css";

import SearchBus from "./pages/SearchBus";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PassengersPage from "./pages/Passengers/Passengers";
import AddPassengerPage from "./pages/Passengers/AddPassenger";
import GCashPaymentMethod from "./pages/PaymentMethods/GCash";
import BookingsPage from "./pages/Bookings/Bookings";

setupIonicReact();

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <IonApp>
        <QueryClientProvider client={queryClient}>
          <IonReactRouter>
            <IonRouterOutlet>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route exact path="/droppingpoint">
                <DroppingPoint />
              </Route>
              <Route exact path="/boardingpoint">
                <BoardingPoint />
              </Route>
              <Route exact path="/searchbus">
                <SearchBus />
              </Route>
              <Route exact path="/passengerdetails">
                <SeatSelection />
              </Route>
              <Route exact path="/seatselection">
                <SeatSelection />
              </Route>
              <Route exact path="/availablebuses">
                <AvailableBuses />
              </Route>
              <Route exact path="/paymentmethod">
                <PaymentMethod />
              </Route>
              <Route exact path="/paymentmethod/gcash">
                <GCashPaymentMethod />
              </Route>
              <Route exact path="/passengerdetails">
                <PassengerDetails />
              </Route>
              <Route exact path="/passengers">
                <PassengersPage />
              </Route>
              <Route exact path="/passengers/add">
                <AddPassengerPage />
              </Route>
              <Route exact path="/bookings">
                <BookingsPage />
              </Route>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </IonRouterOutlet>
          </IonReactRouter>
          <ToastContainer />
        </QueryClientProvider>
      </IonApp>
    </HelmetProvider>
  );
};

export default App;
