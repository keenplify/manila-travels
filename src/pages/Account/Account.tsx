import {
  IonContent,
  IonPage,
} from "@ionic/react";

import React, { useEffect, useState } from "react";
import { zodiosHooks } from "../../config/zodios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthApi } from "../../queries/v1/auth";
import { LS_AUTHTOKEN } from "../../config/localstorage";

const updateSchema = userAuthApi[4].parameters[0].schema.merge(z.object({
  confirmPassword: z.string().optional()
})).refine((data) => ((data.password ?? '').length === 0) || data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const AccountPage: React.FC = () => {
  const { data: user, refetch } = zodiosHooks.useCheckUser(undefined, {
    enabled: localStorage.getItem(LS_AUTHTOKEN) !== null,
  });

  const { register, handleSubmit, setValue, watch, formState: {
    errors
  } } = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
  })

  useEffect(() => {
    if (!user) return
    setValue('fullName', user.data.fullName)
  }, [user])

  const [ isSubmitting, setIsSubmitting ] = useState(false)

  const { push } = useHistory()

  const { mutate } = zodiosHooks.useUpdateUser({
    params: {
      id: user?.data.id ?? ''
    }
  }, {
    onSuccess: (res) => {
      toast.success('Account updated successfully')
      refetch()
      push('/searchbus')
    },
    onMutate: () => setIsSubmitting(true),
    onError: () => {
      toast.error('Unable to login. Please try again.')
    },
    onSettled: () => setIsSubmitting(false)
  })

  const onSubmit = handleSubmit((value) => mutate({
    fullName: value.fullName,
    // password: value.password?.length > 0 &&
  }), (err, vals) => {
    console.log(err, vals)
  })

  console.log(watch())

  const { password } = watch()

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
        
        <form className="flex flex-col gap-4 p-4" onSubmit={onSubmit}>
          <p
            className="login-register-text"
            style={{ fontSize: "2rem", fontWeight: "800" }}
          >
            Update User
          </p>
          <div className="int-group">
            <label htmlFor="full-name">Update Full Name</label>
            <input
              placeholder="Enter Full Name"
              id="full-name"
              className="form-control w-100"
              {...register('fullName')}
            ></input>
          </div>
          <div className="int-group">
            <label htmlFor="password">Update Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="form-control w-100"
              {...register('password')}
            ></input>
          </div>
          {
            password && password.length > 0 && (
              <div className="int-group">
                <label htmlFor="comfirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="comfirm-password"
                  placeholder="Confirm Password"
                  className="form-control w-100"
                  {...register('confirmPassword')}
                ></input>
                {
                  errors.confirmPassword && (
                    <small className="text-sm text-red-500">
                      {errors.confirmPassword.message}
                    </small>
                  )
                }
                
              </div>
            )
          }
          <div className="int-group">
            <button
              name="submit"
              className="btn btn-primary w-100"
              style={{ backgroundColor: isSubmitting ? "#191919 !important" : "#0a0a0a !important" }}
              disabled={isSubmitting}
            >
              Update
            </button>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AccountPage;
