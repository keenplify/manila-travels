import {
  IonContent,
  IonPage,
} from "@ionic/react";
import "./Register.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthApi } from "../queries/v1/auth";
import { useForm, FieldError } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { LS_AUTHTOKEN } from "../config/localstorage";
import { zodiosHooks } from "../config/zodios";

const registerSchema = userAuthApi[1].parameters[0].schema

const Register: React.FC = () => {
  const { register, handleSubmit, formState: {
    errors
  } } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema)
  })

  const { mutate } = zodiosHooks.useRegisterUser(undefined, {
    onSuccess: (res) => {
      localStorage.setItem(LS_AUTHTOKEN, res.access.token)
      toast.success('Logged in successfully')
      push('/searchbus')
    }
    ,
    onError: () => {
      toast.error('Unable to register. Please try again.')
    }
  })
  
  const onSubmit = handleSubmit((value) => mutate(value), (error) => {
    console.log('error', error)
  })

  const { push } = useHistory();

  return (
    <IonPage>
      <Helmet style={[{
        "cssText": `
          body {
            background: #349fd9 !important
          }
        `
      }]} title="Register - Manila Travels"/>
      <IonContent fullscreen>
        <div className="loginContainer">
          <div className="formContainer">
            <img src="/logo.png" alt="logo" className="logo"></img>
            <form  className="loginForm" onSubmit={onSubmit}>
              <p
                className="login-register-text text-white"
                style={{ fontSize: "2rem", fontWeight: "800" }}
              >
                Register
              </p>
              <div className="int-group">
                <input
                  type="fullname"
                  placeholder="Fullname"
                  className="form-control w-100"
                  {...register('fullName')}
                ></input>
                { errors?.fullName && <span className="text-danger">{errors.fullName.message}</span> }
              </div>
              <div className="int-group">
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control w-100"
                  {...register('username')}
                ></input>
                { errors?.username && <span className="text-danger font-bold uppercase">{errors.username.message}</span> }
              </div>
              <div className="int-group">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control w-100"
                  {...register('password')}
                ></input>
                { errors?.password && <span className="text-danger">{errors.password.message}</span> }

              </div>
              <div className="int-group">
                <input
                  type="password"
                  placeholder="Re-enter Password"
                  className="form-control w-100"
                  {...register('confirm')}
                ></input>
                { errors?.confirm && <span className="text-danger">{errors.confirm.message}</span> }
              </div>
              <div className="int-group">
                <button
                  name="submit"
                  className="btn btn-primary w-100"
                  style={{ backgroundColor: "#0993B5 !important" }}
                >
                  Register
                </button>
                <p className="login-register-text">
                  Already have an account? <Link to="/login" className="text-white">Login Here</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
