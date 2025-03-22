export const environment = {
  production: true,
  supabaseUrl: process.env['SUPABASE_URL'] as string,
  supabaseAnonKey: process.env['SUPABASE_ANON_KEY'] as string,
};
