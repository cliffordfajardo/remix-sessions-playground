import { redirect, type ActionFunction, type V2_MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { supabaseClient } from "~/utils/db.server";
import { commitSession, getSession } from "~/utils/session.server";

export const meta: V2_MetaFunction = () => {
    return [ { title: "Login" },];
};

export const action:ActionFunction = async ({request}) => {
    const formData = await request.formData();
    const loginFormData = Object.fromEntries(formData) as {
        email: string;
        password: string;
    }

    // TODO: Log the user in with their credentials with our fake AuthClient
    // login using the credentials
    const { data: {user, session: supabaseSession}, error } = await supabaseClient.auth.signinWithPassword({
        email: loginFormData.email,
        password: loginFormData.password,
    });

    // if user exists, create session for them
    if(user){
        let session = await getSession(request.headers.get("Cookie"));
        session.set("sb_access_token", supabaseSession.access_token);
        session.set("sb_accepted_tos", 'true');
        const updatedCookie = await commitSession(session, {
            expires: new Date(Date.now() + 60),
        });
        
        return redirect("/", {
            headers: {
                "Set-Cookie": updatedCookie,
            },
        });
    }

    // TODO: create mock code; probably just use a JSON file on disk so we don't deal with depdenedncies..

    

    return { user, error };
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


