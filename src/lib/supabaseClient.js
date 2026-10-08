// ============================================================================
// supabaseClient.js
//
// Creates ONE Supabase connection for the whole app.
//
// The URL and key come from the ".env" file (copy .env.example -> .env).
// Vite exposes environment variables to the browser only if their name
// starts with "VITE_", which is why we use VITE_SUPABASE_URL / _ANON_KEY.
//
// If the values are missing the app still runs - it simply falls back to the
// sample data in src/data/sampleProperties.js. That keeps the demo working
// even before the database is set up.
// ============================================================================

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// True only when both values look usable.
export const isSupabaseConfigured =
  Boolean(supabaseUrl && supabaseAnonKey) &&
  supabaseUrl.startsWith('http') &&
  !supabaseUrl.includes('your-project-id')

// `supabase` is null when the project is not configured yet.
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
