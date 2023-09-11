import { Form } from "@remix-run/react";
import { type ActionFunction, type V2_MetaFunction, type LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/@remix-auth-form-example/auth.server";

export const meta: V2_MetaFunction = () => {
    return [{ title: "Login" },];
};

export const loader: LoaderFunction = async ({ request }) => {
    const user = await authenticator.isAuthenticated(request, {
        successRedirect: '/'
    })

    return {user}
}

export const action: ActionFunction = async ({ request }) => {
    
    return await authenticator.authenticate("form", request, {
        successRedirect: "/",
    });

}

export default function Index() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-6">Login</h1>


            {/* -------------------- LOGIN FORM --------------------- */}
            <Form
                method="POST"
                action="/login"
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="********"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Log In
                    </button>

                    {/* <a
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        href="/test"
                    >
                        Forgot Password?
                    </a> */}
                </div>
            </Form>
        </div>
    );
}


