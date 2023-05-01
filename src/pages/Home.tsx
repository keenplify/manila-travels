import {
  IonContent,
  IonPage,
} from "@ionic/react";
import "./Home.css";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { LS_AUTHTOKEN } from "../config/localstorage";

const Home: React.FC = () => {
  const history = useHistory()
  useEffect(() => {
    const token = localStorage.getItem(LS_AUTHTOKEN)

    if (token && token.length > 0) {
      history.push('/searchbus')
    }
  }, [history])


  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="homeContainer">
          <div className="topContainer">
            <img src="/logo.png" alt="logo" className="logo"></img>
          </div>
          <div className="bottomContainer">
            <div className="btns">
              <Link
                className="btn btn-primary btn-tab1"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="btn btn-secondary btn-tab1"
                to="/register"
              >
                New to Manila Travels? Sign Up!
              </Link>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
