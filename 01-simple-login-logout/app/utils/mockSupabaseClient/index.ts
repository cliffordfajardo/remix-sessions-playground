import { SupabaseClient } from './SupabaseClient'

interface CreateMockClientFn {
  (supabaseUrl: string, supabaseKey: string, options?: any): SupabaseClient;
}

export const createClient: CreateMockClientFn = (mockSupabaseUrl, mockSupabaseKey, options={}) => {
  return new SupabaseClient(mockSupabaseUrl, mockSupabaseKey, options || {});
};
