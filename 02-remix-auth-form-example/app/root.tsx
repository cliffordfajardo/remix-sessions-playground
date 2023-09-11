import { cssBundleHref } from "@remix-run/css-bundle";
import {  type LinksFunction, type LoaderFunction, json, redirect } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { AppLayout } from "./components/AppLayout";
import { authenticator } from "./@remix-auth-form-example/auth.server";


export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  const isUserAuthenticated = user?.email.includes('@')



  return json({
    isUserAuthenticated,
    user,
  })
}

export type RootLoader = Awaited<ReturnType<typeof loader>>


export default function App() {
  const loaderData = useLoaderData<RootLoader>();
  console.log(`loaderData`,loaderData)

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
        {loaderData.isUserAuthenticated  ? 
          <AppLayout mainContent={<Outlet />} /> : 
          <Outlet /> 
        }

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>

    </html>
  );
}
