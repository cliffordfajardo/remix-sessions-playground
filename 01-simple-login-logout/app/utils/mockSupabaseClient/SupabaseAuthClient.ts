/*
    NOTE the real supabase client extends off of another class called `goTrueClient`
 */
export class SupabaseAuthClient {
  constructor() {}

  async signup({
    email = "",
    password = "",
  }: {
    email: string;
    password: string;
  }) {
    return {
      error: {},
      data: {
        user: {
          name: "clifford",
          email: email,
        },
        session: `sb_......${email}....._auth_token`,
      },
    };
  }

  async signinWithPassword({
    email = "",
    password = "",
  }: {
    email: string;
    password: string;
  }): Promise<AuthTokenResponse> {
    if (email === "" || password === "") {
      throw new Error("email & password is empty");
    }

    return {
      error: false,
      data: {
        user: {
          name: "clifford",
          email: email,
        },
        session: {
          // In the real supabase libary this is a JWT token
          access_token: `sb_......${email}....._auth_token`,
        },
      },
    };
  }

  async signout() {
    // clear the session somehow
  }

  /**
   * @description
   * JWT string
   */
  setAuth(session: string){

  }
}


export type AuthTokenResponse =
| {
    data: {
      user: Record<string, any>;
      session: {
        access_token: string;
      };
    };
    error: boolean;
  }
| {
    data: {
      user: null;
      session: {
        access_token: '';
      };
    };
    error: boolean;
};