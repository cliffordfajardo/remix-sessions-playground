import { cssBundleHref } from "@remix-run/css-bundle";
import { redirect, type LinksFunction, type LoaderFunction, json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { getSession } from "~/utils/session.server";
import { AppLayout } from "./components/AppLayout";


export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader:LoaderFunction = async ({request}) => {
  const url = new URL(request.url)
  let session = await getSession(request.headers.get("Cookie"));
  console.log(`session.get('sb_access_token') --> `, session.get("sb_access_token"));
  console.log(`session.get('sb_accepted_tos') --> `, session.get("sb_accepted_tos"));

  // if there is no access token in the header then , the user is not authenticated, send them back to login
  // if (!session.has("access_token")) {
  //   // todo, add redirect url later
  //   throw redirect(`/login?redirect=${url.pathname}`);
  // }

  // // If the user has a session, just return the user
  // else if(session.has('access_token')) {
  //   const user = {name: 'clifford'}
  //   return json(user)
  // }


  return json({
    isAuthenticated: session.has("sb_access_token"),
  })
}

export type RootLoader = Awaited<ReturnType<typeof loader>>


export default function App() {
  const loaderData = useLoaderData<RootLoader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      
      <body>
        {loaderData.isAuthenticated === true && <AppLayout mainContent={<Outlet />} />}
        {loaderData.isAuthenticated === false && <Outlet /> }
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
      
    </html>
  );
}
