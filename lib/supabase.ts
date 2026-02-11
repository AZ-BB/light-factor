import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/** Client-side Supabase client (uses anon key) */
export function createClientClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase credentials (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)");
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

/** Server-side Supabase client (uses service role key for admin operations) */
export function createServiceClient() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase service credentials (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)");
  }
  return createClient(supabaseUrl, supabaseServiceKey);
}
