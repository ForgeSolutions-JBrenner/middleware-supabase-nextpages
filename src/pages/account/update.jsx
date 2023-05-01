import AppLayout from "@/components/Layouts/AppLayout";
import { getLocation, getProfile } from "@/lib/utils";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Field, Form, Formik, useField } from "formik";
import Head from "next/head";
import React, { useState } from "react";
import * as Yup from "yup";
import Alert from "@/components/Alert";
import { useRouter } from "next/router";

const AboutMe = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <textarea
      {...field}
      {...props}
      className=" border-[1px] rounded-sm w-full mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 focus:ring-2 focus:outline-none focus:ring-green-200 py-1 px-2"
    />
  );
};

export default function Update({ user, profile }) {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const [errors, setErrors] = useState();
  const [message, setMessage] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [location, setLocation] = useState(null);

  async function runMe(formData, actions) {
    const { error } = await supabase.rpc("update_profile", {
      display_name: formData.displayName,
      bio: formData.bio,
      first_name: formData.firstName,
      last_name: formData.lastName,
      dob: formData.dateofbirth,
      profile_location: JSON.stringify(location),
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    // reset form
    setFormSuccess(true);
    actions.resetForm();
    setMessage("Your profile was updated successfully.");
    router.push("/");
  }

  const findMe = (e) => {
    e.preventDefault();
    getLocation((position) => {
      setLocation(position);
    });
  };

  const updateSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    displayName: Yup.string().required("Required"),
    dateofbirth: Yup.string().required("Required"),
    bio: Yup.string().required("Required"),
  });
  return (
    <>
      <Head>
        <title>Update</title>
      </Head>
      <AppLayout>
        <div className="bg-[#616e7c] rounded-lg text-[#e4e7eb]  w-full max-w-7xl container mx-auto p-4 md:p-8">
          {message ? (
            <Alert
              className={`${formSuccess ? "alert-info" : "alert-error"} mb-10`}
            >
              {message}
            </Alert>
          ) : null}
          <h2 className="font-semibold text-4xl mb-4 text-[#e4e7eb] ">
            {user?.email ? "Update Profile" : "Please complete your profile"}
          </h2>
          <p className="font-medium mb-4 text-[#e4e7eb] ">
            Hi {user?.email}, Enter your user profile info below:
          </p>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              displayName: "",
              bio: "",
              dateofbirth: "",
            }}
            validationSchema={updateSchema}
            onSubmit={runMe}
          >
            {({ errors, touched }) => (
              <Form className="mt-6 border-t border-gray-600">
                <dl className="divide-y divide-gray-600">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-[#e4e7eb] ">
                      First Name
                    </dt>
                    <Field
                      id="firstName"
                      name="firstName"
                      className=" border-[1px] rounded-sm w-full mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 focus:ring-2 focus:outline-none focus:ring-green-200 py-1 px-2"
                    />
                    {errors.firstName && touched.firstName ? (
                      <div className="text-red-600">{errors.firstName}</div>
                    ) : null}
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-[#e4e7eb] ">
                      Last Name
                    </dt>
                    <Field
                      id="lastName"
                      name="lastName"
                      className=" border-[1px] rounded-sm w-full mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 focus:ring-2 focus:outline-none focus:ring-green-200 py-1 px-2"
                    />
                    {errors.lastName && touched.lastName ? (
                      <div className="text-red-600">{errors.lastName}</div>
                    ) : null}
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-[#e4e7eb] ">
                      Display Name
                    </dt>
                    <Field
                      id="displayName"
                      name="displayName"
                      className=" border-[1px] rounded-sm w-full mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 focus:ring-2 focus:outline-none focus:ring-green-200 py-1 px-2"
                    />
                    {errors.displayName && touched.displayName ? (
                      <div className="text-red-600">{errors.displayName}</div>
                    ) : null}
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-[#e4e7eb]  ">
                      Date Of Birth (mm/dd/yyyy)
                    </dt>
                    <Field
                      id="dateofbirth"
                      name="dateofbirth"
                      className=" border-[1px] rounded-sm w-full mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 focus:ring-2 focus:outline-none focus:ring-green-200 py-1 px-2"
                    />
                    {errors.dateofbirth && touched.dateofbirth ? (
                      <div className="text-red-600">{errors.dateofbirth}</div>
                    ) : null}
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-[#e4e7eb] ">
                      About
                    </dt>
                    <AboutMe id="bio" name="bio" />
                    {errors.bio && touched.bio ? (
                      <div className="text-red-600">{errors.bio}</div>
                    ) : null}
                  </div>

                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-[#e4e7eb] ">
                      Your Location
                    </dt>
                    <div className="flex space-x-6 w-full mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <div className="w-full flex justify-between space-x-4 items-center">
                        <label
                          htmlFor=""
                          className="text-[#e4e7eb] font-semibold text-xl"
                        >
                          {location
                            ? JSON.stringify(location, null, 2)
                            : "press get location button"}
                        </label>
                        <button
                          onClick={(e) => findMe(e)}
                          className=" rounded-sm  mt-1 text-sm leading-6 text-[#e4e7eb] sm:col-span-2 sm:mt-0 bg-gray-600 hover:bg-gray-900 p-2"
                        >
                          Get Location
                        </button>
                      </div>
                    </div>
                  </div>
                </dl>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className=" rounded-sm text-white font-semibold py-2 px-4 bg-green-400 hover:bg-green-300"
                  >
                    Save Updates
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </AppLayout>
    </>
  );
}
export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);

  // get profile and profile_info
  const { profile, session } = await getProfile(supabase);

  return {
    props: {
      initialSession: session,
      user: session?.user,
      profile,
    },
  };
};
