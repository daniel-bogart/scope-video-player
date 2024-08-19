import { createBrowserClient } from "@supabase/ssr";
import { Database } from "../../types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key must be defined");
}

export const createClient = () => {
  return createBrowserClient<Database>(supabaseUrl, supabaseKey);
};
