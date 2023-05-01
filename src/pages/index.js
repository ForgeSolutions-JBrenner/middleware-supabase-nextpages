import Head from "next/head";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import AppLayout from "@/components/Layouts/AppLayout";
import {
  getProfile,
  getProperty,
  Profile,
  ProfileInfo,
  UserInfo,
} from "@/lib/utils";
import absoluteUrl from "next-absolute-url";

export default function Home({ user, profile, allUsers }) {
  // const profileInfo = getProperty(profile, "profiles_info");
  function getTimeDiffInHours(timestamp) {
    const currentTime = new Date();
    const timestampDate = new Date(timestamp);
    const timeDiff = Math.abs(currentTime - timestampDate) / 36e5;
    return timeDiff;
  }
  return (
    <>
      <Head>
        <title>User Profile</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <div className=" mt-10 bg-[#616e7c] w-full shadow-xl rounded-lg">
          <div className="w-full card-body grid grid-cols-1 sm:grid-cols-2">
            <div className="col-span-1 pb-6 sm:pb-0 sm:border-r">
              <h2 className="card-title text-[#e4e7eb]">
                Welcome {profile?.display_name ?? user?.email}!
              </h2>
              <h2 className="text-2xl font-semibold text-[#e4e7eb]">
                Here is your profile data:
              </h2>
              {profile?.display_name ? (
                <>
                  <p className="text-[#e4e7eb]">
                    <strong> Name:</strong> {profile?.profiles_info.first_name}{" "}
                    {profile?.profiles_info.last_name}
                  </p>
                  <p className="text-[#e4e7eb]">
                    <strong>Display Name:</strong> {profile.display_name}
                  </p>
                  <p className="text-[#e4e7eb]">
                    <strong>Dob:</strong> {profile?.profiles_info.dob}
                  </p>
                  <p className="break-all text-[#e4e7eb]">
                    <strong>Location:</strong>{" "}
                    {profile?.profiles_info.profile_location}
                  </p>
                  <h3 className="text-lg font-semibold mt-2 text-[#e4e7eb]">
                    Bio
                  </h3>
                  <p className="text-[#e4e7eb]">{profile?.bio}</p>
                  <p className=" mt-4 ">
                    <a
                      href={`/profile?id=${profile?.id}`}
                      className="  rounded-sm bg-green-400 py-1 px-4 text-white"
                    >
                      View Profile
                    </a>
                  </p>
                </>
              ) : (
                <p className="">
                  <a
                    href="/account/update"
                    className="rounded-sm bg-green-400 py-1 px-4 text-white"
                  >
                    Update Profile
                  </a>
                </p>
              )}
            </div>

            <hr className="sm:hidden" />
            <div className="col-span-1 sm:ml-10">
              <h2 className="font-semibold text-2xl text-[#e4e7eb]">
                Other users in your organization
              </h2>

              {allUsers ? (
                <ul role="list" className="divide-y divide-gray-100">
                  {allUsers.map((person) => (
                    <li
                      key={person.id}
                      className="flex justify-between gap-x-3 py-5"
                    >
                      <div className="flex  w-10/12 gap-x-4">
                        <img
                          className="h-12 w-12 flex-none rounded-full bg-gray-50"
                          src={person.imageUrl}
                          alt=""
                        />
                        <div className="min-w-0 flex-auto ">
                          <p className="text-sm font-semibold leading-6 text-[#e4e7eb] uppercase">
                            {person.display_name
                              ? person.display_name
                              : "no display name set"}
                          </p>
                          <p className="mt-1 text-xs leading-5 text-[#e4e7eb]">
                            {person.bio}
                          </p>
                        </div>
                      </div>
                      <div className=" sm:flex sm:flex-col sm:items-end">
                        {/* <button className="text-sm leading-6 text-[#e4e7eb] bg-green-400 py-0.5 px-1.5 rounded-sm">
                          View Profile
                        </button> */}
                        {person.updated_at ? (
                          <p className="mt-1 text-xs leading-5 text-[#e4e7eb]">
                            Last seen{" "}
                            {Math.round(getTimeDiffInHours(person.updated_at))}
                            hr ago
                          </p>
                        ) : (
                          <div className="mt-1 flex items-center gap-x-1.5">
                            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            </div>
                            <p className="text-xs leading-5 text-[#e4e7eb]">
                              Online
                            </p>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="">Nothing to show here</p>
              )}
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);

  const { origin } = absoluteUrl(ctx.req);

  // get profile and session
  const { profile, session } = await getProfile(supabase);

  //get all profiles
  const { data: allUsers } = await supabase.from("profiles").select("*");

  return {
    props: {
      initialSession: session,
      user: session?.user,
      profile,
      allUsers,
    },
  };
};
