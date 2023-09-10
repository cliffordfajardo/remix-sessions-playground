import { createClient } from '~/utils/mockSupabaseClient'
import { getSession } from './session.server';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

/**
 * @description
 * Singleton instance of supabaseClient
 */
export const supabaseClient = createClient(supabaseUrl, supabaseKey);


/**
 *
 * @param {*} request
 * @returns
 */
export const hasAuthSession = async (request: Request) => {
  let session = await getSession(request.headers.get("Cookie"));
  if (!session.has("access_token")) throw Error("No session");
  supabaseClient.auth.setAuth(session.get("access_token"));
};