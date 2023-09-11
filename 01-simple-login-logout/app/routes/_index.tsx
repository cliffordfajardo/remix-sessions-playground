import { redirect, type LoaderFunction, type V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "~/utils/session.server";

export const meta: V2_MetaFunction = () => {
  return [ { title: "New Remix App" },];
};

export const loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie"));
  const isUserAuthenticated = session.has("user")
  if (!isUserAuthenticated) {
    throw redirect(`/login`);
  }

  const user = session.get('user');
  return {user}
}


export default function Index() {
  const loaderData = useLoaderData<typeof loader>()
  return (
    <h1>Welcome back {loaderData.user.name}</h1>


  );
}

