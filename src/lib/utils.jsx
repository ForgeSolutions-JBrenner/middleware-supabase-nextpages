import { Session, SupabaseClient, User } from "@supabase/auth-helpers-nextjs";

export async function getProfile(supabase, slug) {
  //Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let match;
  if (slug !== undefined) {
    match = { slug };
  } else {
    match = { id: session?.user.id };
  }

  // get profile and profile_info
  const { data: profile } = await supabase
    .from("profiles")
    .select(`*, profiles_info(*)`)
    .match(match)
    .maybeSingle();

  return {
    profile,
    session,
  };
}

export function getLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      callback({ latitude, longitude });
    });
  } else {
  }
}

export function waitload(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}

export const getProperty = (obj, key) => {
  if (obj && obj?.[key]) {
    // here we guard to make sure its not null
    if (!Array.isArray(obj[key])) {
      // here we guard to make sure it isn't an array
      return obj[key];
    }
  }
  return null;
};
