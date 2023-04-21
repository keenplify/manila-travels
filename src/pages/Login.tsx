import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import { useHistory } from "react-router";
import "./Login.css";

const Login: React.FC = () => {
  const history = useHistory();

  function handleRegister() {
    history.push("/register");
  }

  function handleHome() {
    history.push("/home");
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
                Login
              </p>
              <div className="int-group">
                <input
                  type="username"
                  placeholder="Username"
                  name="Username"
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
                <button
                  name="submit"
                  className="btn btn-primary w-100"
                  style={{ backgroundColor: "#191919 !important" }}
                  onClick={handleHome}
                >
                  Login
                </button>
                <p className="login-register-text">
                  Don't have an account? <a href="/register">Register Here</a>.
                </p>
              </div>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
