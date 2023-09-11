import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { FormStrategy } from "remix-auth-form";
import invariant from "tiny-invariant";


type MyUser = {
    email: string,
    password: string,
    name: string
    session:string;
}

/**
 * @description
 * Create an authenticator instance
 * 
 */
export let authenticator = new Authenticator<MyUser>(sessionStorage);


authenticator.use(
  new FormStrategy(async ({ form, context }) => {
    
    // Here you can use `form` to access and input values from the form. and also use `context` to access more things from the server
    let email = form.get("email"); // or email... etc
    let password = form.get("password");

    invariant(typeof email === "string", "email must be a string");
    invariant(email.length > 0, "username must not be empty");
    invariant(typeof password === "string", "password must be a string");
    invariant(password.length > 0, "password must not be empty");

    

    // And finally, you can find, or create, the user
    let user = { name: 'clifford', email: email, password: password, session: 'cf_..._auth_session'}

    // And return the user as the Authenticator expects it
    return user;
  })
);