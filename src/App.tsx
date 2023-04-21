import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PassengerDetails from "./pages/PassengerDetails";
import SeatSelection from "./pages/SeatSelection";
import Register from "./pages/Register";
import DroppingPoint from "./pages/DroppingPoint";
import PaymentMethod from "./pages/PaymentMethod";
import AvailableBuses from "./pages/AvailableBuses";
import BoardingPoint from "./pages/BoardingPoint";

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

/* Theme variables */
import "./theme/variables.css";
import SearchBus from "./pages/SearchBus";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
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
        <Route exact path="/passengerdetails">
          <PassengerDetails />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
