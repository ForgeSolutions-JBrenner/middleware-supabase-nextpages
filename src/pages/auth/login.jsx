import React, { useState } from "react";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AuthApiError } from "@supabase/supabase-js";
import Link from "next/link";
import Alert from "@/components/Alert";
import { useRouter } from "next/router";
import Head from "next/head";
import { Field, Form, Formik } from "formik";
import cn from "classnames";
import * as Yup from "yup";

function login() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [errors, setErrors] = useState();
  const [message, setMessage] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  //   const [formData, setFormData] = useState({
  //     email: "",
  //     password: "",
  //   });

  const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Required"),
    password: Yup.string().required("Required"),
  });

  async function signIn(formData) {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      if (error instanceof AuthApiError && error.status === 400) {
        setMessage("Invalid credentials");
        return;
      }
      setMessage(error.message);
      return;
    }
    router.push("/account");
  }
  return (
    <>
      <Head>
        <title>Login To Get Started</title>
      </Head>
      <AuthLayout>
        <div className="p-8 text-[#e4e7eb] bg-[#616e7c] w-11/12 rounded-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 ">
          {message ? (
            <Alert
              className={`${formSuccess ? "alert-info" : "alert-error"} mb-4`}
            >
              {message}
            </Alert>
          ) : null}
          <h2 className="font-semibold text-3xl mb-2 text-[#e4e7eb]">
            Sign In
          </h2>
          <p className="font-medium mb-2 text-[#e4e7eb]">
            Welcome Back! Sign In to get started
          </p>
          <div className="w-full text-[#e4e7eb]">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={SignInSchema}
              onSubmit={signIn}
            >
              {({ errors, touched }) => (
                <Form className="column w-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-[#e4e7eb] "
                  >
                    Email
                  </label>
                  <Field
                    className={cn(
                      " w-full rounded-md border-0 py-1 px-2 text-black  shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-200 sm:text-sm sm:leading-6",
                      errors.email && touched.email && "bg-red-50"
                    )}
                    id="email"
                    name="email"
                    placeholder="jane@acme.com"
                    type="email"
                  />
                  {errors.email && touched.email ? (
                    <div className="text-red-600 text-sm">{errors.email}</div>
                  ) : null}

                  <label
                    htmlFor="email"
                    className=" text-sm font-medium leading-6 text-[#e4e7eb] "
                  >
                    Password
                  </label>
                  <Field
                    className={cn(
                      "block w-full rounded-md border-0 py-1 px-2 text-black  shadow-sm ring-1 ring-inset focus:outline-none ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-200 sm:text-sm sm:leading-6",
                      errors.password && touched.password && "bg-red-50"
                    )}
                    id="password"
                    name="password"
                    type="password"
                  />
                  {errors.password && touched.password ? (
                    <div className="text-red-600  text-sm">
                      {errors.password}
                    </div>
                  ) : null}

                  <button
                    className="mt-4 flex w-full justify-center rounded-md bg-green-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-300 hover:scale-y-105 transition duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    type="submit"
                    // onClick={signIn}
                  >
                    Login
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-green-400 focus:ring-green-400"
              />
              <label
                htmlFor="remember-me"
                className="ml-3 block text-sm leading-6 text-[#e4e7eb] "
              >
                Remember me
              </label>
            </div>

            <div className="text-sm leading-6 hover:scale-105 transition duration-100 ease-in-out">
              <a
                href="/auth/forgot-password"
                className="font-semibold text-green-400 "
              >
                Forgot password?
              </a>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-[#e4e7eb]">
            Not a member?{" "}
            <a
              href="/auth/register"
              className="font-semibold leading-6 text-green-400 hover:text-green-300"
            >
              Create an Account
            </a>
          </p>
        </div>
      </AuthLayout>
    </>
  );
}

export default login;
