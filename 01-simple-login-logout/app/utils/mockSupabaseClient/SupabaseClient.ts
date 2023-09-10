import { SupabaseAuthClient } from './SupabaseAuthClient';

export class SupabaseClient {
  auth: SupabaseAuthClient;
  authUrl: string;

  constructor(protected supabaseUrl: string, protected supabaseKey: string, options?: any) {
    if (!supabaseUrl) throw new Error('supabaseUrl is required.');
    if (!supabaseKey) throw new Error('supabaseKey is required.');
    const _supabaseURL = supabaseUrl.replace(/\/$/, '') // strip trailing slash ('.../')
    this.authUrl = `${_supabaseURL}/auth/v1`;

    this.auth = this._initSupabaseAuthClient()
  }

  private _initSupabaseAuthClient() {
    return new SupabaseAuthClient()
  }

}
