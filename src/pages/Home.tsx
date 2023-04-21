import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import { useHistory } from "react-router";

const Home: React.FC = () => {
  const history = useHistory();

  function handleLogin() {
    history.push("/login");
  }
  function handleRegister() {
    history.push("/register");
  }
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="homeContainer">
          <div className="topContainer">
            <img src="/logo.png" alt="logo" className="logo"></img>
          </div>
          <div className="bottomContainer">
            <div className="btns">
              <button
                className="btn btn-primary btn-tab1"
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                className="btn btn-secondary btn-tab1"
                onClick={handleRegister}
              >
                New to Manila Travels? Sign Up!
              </button>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
