// Auto-generated Supabase types go here.
// Run `npx supabase gen types typescript` to regenerate.

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      // Add your table types here
      // example: {
      //   Row: { id: string; created_at: string; title: string };
      //   Insert: { id?: string; created_at?: string; title: string };
      //   Update: { id?: string; created_at?: string; title?: string };
      // };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
