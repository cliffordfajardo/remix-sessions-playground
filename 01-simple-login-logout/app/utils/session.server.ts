// From Remix docs: https://remix.run/docs/en/main/utils/sessions
import { createCookieSessionStorage } from "@remix-run/node";

/**
 * @description
 * A key entry can have multiple values inside of it.
 * In your browser the value will be an encoded string, that when decoded will have the values of `SessionData`
 * How things work with remix sessions:
 * 1. You create an instance of createCookieSessionStorage 
 *    - this is is equivalent to adding 1 cookie key entry.
 *    - const getSession = `createCookieSessionStorage({cookie: 'my_cookie_key'})`
 * 2. Adding a value(s) to the my_cookie_key entry
 *      // Login.tsx
 *      let session = await getSession(request.headers.get("Cookie"))
 *      session.set("sb_access_token", '1234');
        session.set("sb_accepted_tos", 'true');
        await commitSession(session, { expires: new Date(Date.now() + 60),});
        // Root.tsx
        let session = await getSession(request.headers.get("Cookie"));
        const isUnauthenticated = session.has("access_token") === false
        if(isUnauthenticated) {
          throw redirect(`/login`)
        }
        else {
          return json(user)
        }
        

 * 
 */
type SessionData = {
  sb_access_token: string;
  sb_accepted_tos: string;
};

/**
 * If you open the browser devtools and wait 5 seconds & clock the refresh icon, you'll see that the browser removes it.
 */
const COOKIE_EXPIRATION_TIME_IN_SECONDS = 10;

/**
 * 
 */
const COOKIE_KEY = 'my_first_cookie_entry';

/**
 * NOTES:
 * Perhaps the most popular way of managing a user's active session in an application is using cookie based sessions.
 * The convenience of cookies is that once they are set in the browser, every subsequent http request to the server will automatically
 * have the cookie data attached to the http request. The server can read the incoming request, check if a sessions exists or not and perform whatever logic it wants.
 * 
 * Typically cookie based authentication flow works like this:
 * - (browser) user signs in & sends login request to the server
 * - (server) server handles the login request
 *       validate the login information the user sent
 *       if the data is valid, the server will generate a session (usaully its a unique string value usually)
 *       the server will attach the session to the http response its going to send the user back
 *       once the browser recieves the new http response, the browser will check the response's headers & if a `Set-Cookie` header is present it will add that entry in the browser cookie storage.

 */
const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData>({
    /**
     * A cookie represents an invidual key in the cookie store. Open devtools to see this.
     */
    cookie: {
      /**
       * If you open browser dev tools, you'll see an individual row entry for `COOKIE_KEY`
       */
      name: COOKIE_KEY,
      // all of these are optional
      httpOnly: true,
      maxAge: COOKIE_EXPIRATION_TIME_IN_SECONDS, // max-age takes precedent over 'expires'. Hover over `maxAge` prop for details
      path: "/",
      sameSite: "lax",
      // secrets: ["s3cret1"],
      secure: process.env.NODE_ENV === "production",
    },
  });

export { 
  getSession, 
  
  /**
    NOTES:
    When we commit a session, cookie.serialized is called internally & its creates a obfuscated value
    async commitSession(session, options) {
      let serializedCookie:string = await cookie.serialize(session.data, options);
      if (serializedCookie.length > 4096) {
        throw new Error("Cookie length will exceed browser maximum. Length: " + serializedCookie.length);
      }
      return serializedCookie;
    }
   */
  commitSession, 
  destroySession 
};