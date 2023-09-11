import { type LoaderFunction, type V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/@remix-auth-form-example/auth.server";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async ({ request} ) => {
  /**
   * ❗NOTE: this same exact redirect code won't work inside of root.tsx.
   * If you place this redirect code at root, it will cause infinite redirect & visualize it for yourself and help others.
   * TODO: create a code example and share in github discussions
   */
   const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login'
  })
  
  return {user}
}


export default function Index() {
  const loaderData = useLoaderData<typeof loader>()
  return (
    <h1>Welcome back {loaderData.user.name}</h1>


  );
}
