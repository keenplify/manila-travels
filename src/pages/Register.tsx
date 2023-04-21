import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Register.css";
import { useHistory } from "react-router";
import SearchBus from "./SearchBus";
import Home from "./Home";

const Register: React.FC = () => {
  const history = useHistory();

  function handleHome() {
    history.push("/searchbus");
  }
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="loginContainer">
          <div className="formContainer">
            <img src="/logo.png" alt="logo" className="logo"></img>
            <form action="" className="loginForm">
              <p
                className="login-register-text"
                style={{ fontSize: "2rem", fontWeight: "800" }}
              >
                Register
              </p>
              <div className="int-group">
                <input
                  type="fullname"
                  placeholder="Fullname"
                  name="Fullname"
                  className="form-control w-100"
                ></input>
              </div>
              <div className="int-group">
                <input
                  type="email"
                  placeholder="Email"
                  name="Email"
                  className="form-control w-100"
                ></input>
              </div>
              <div className="int-group">
                <input
                  type="password"
                  placeholder="Password"
                  name="Password"
                  className="form-control w-100"
                ></input>
              </div>
              <div className="int-group">
                <input
                  type="re-enter password"
                  placeholder="Re-enter Password"
                  name="Re-enter Password"
                  className="form-control w-100"
                ></input>
              </div>
              <div className="int-group">
                <button
                  name="submit"
                  className="btn btn-primary w-100"
                  style={{ backgroundColor: "#0993B5 !important" }}
                  onClick={handleHome}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
