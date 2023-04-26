import {
  IonContent,
  IonPage,
} from "@ionic/react";
import "./Login.css";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userAuthApi } from "../queries/v1/auth";
import { z } from "zod";
import { zodiosHooks } from "../config/zodios";
import { toast } from "react-toastify";
import { LS_AUTHTOKEN } from "../config/localstorage";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const loginSchema = userAuthApi[0].parameters[0].schema

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema)
  })
  const [ isSubmitting, setIsSubmitting ] = useState(false)

  const { push } = useHistory()

  const { mutate } = zodiosHooks.useLoginUser(undefined, {
    onSuccess: (res) => {
      localStorage.setItem(LS_AUTHTOKEN, res.access.token)
      toast.success('Logged in successfully')
      push('/searchbus')
    },
    onMutate: () => setIsSubmitting(true),
    onError: () => {
      toast.error('Unable to login. Please try again.')
    },
    onSettled: () => setIsSubmitting(false)
  })
  
  const onSubmit = handleSubmit((value) => mutate(value))

  return (
    <IonPage className="bg-main">
      <Helmet style={[{
        "cssText": `
          body {
            background: #349fd9 !important
          }
        `
      }]} title="Login - Manila Travels"/>
      <IonContent fullscreen>
        <div className="loginContainer">
          <div className="formContainer">
            <img src="/logo.png" alt="logo" className="logo"></img>
            <form className="loginForm" onSubmit={onSubmit}>
              <p
                className="login-register-text text-white"
                style={{ fontSize: "2rem", fontWeight: "800" }}
              >
                Login
              </p>
              <div className="int-group">
                <input
                  type="username"
                  placeholder="Username"
                  className="form-control w-100"
                  {...register('username')}
                ></input>
              </div>
              <div className="int-group">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control w-100"
                  {...register('password')}
                ></input>
              </div>
              <div className="int-group">
                <button
                  name="submit"
                  className="btn btn-primary w-100"
                  style={{ backgroundColor: isSubmitting ? "#191919 !important" : "#0a0a0a !important" }}
                  disabled={isSubmitting}
                >
                  Login
                </button>
                <p className="login-register-text">
                  Don't have an account? <Link to="/register" className="text-white">Register Here</Link>
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
