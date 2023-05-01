import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import React from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Alert from "@/components/Alert";
import {
  User,
  createServerSupabaseClient,
} from "@supabase/auth-helpers-nextjs";

export default function UpdateEmail({ user }) {
  const supabase = useSupabaseClient();
  const [errors, setErrors] = useState();
  const [message, setMessage] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    emailConfirm: "",
  });

  return (
    <>
      <Head>
        <title>User Profile</title>
      </Head>
      <AppLayout>
        <div className="w-11/12 p-12 px-6 py-10 rounded-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6">
          {message ? (
            <Alert className={`${formSuccess ? "alert-info" : "alert-error"}`}>
              {message}
            </Alert>
          ) : null}
          <h2 className="font-semibold text-4xl mb-4">Update Email</h2>
        </div>
      </AppLayout>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);
  //check session existence
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return {
    props: {
      initialSession: session,
      user: session?.user,
    },
  };
};
