
import { supabase } from "@/integrations/supabase/client";

export type AuthUser = {
  id: string;
  email?: string;
  username?: string;
  fullName?: string;
};

export const getCurrentUser = async (): Promise<AuthUser | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('username, full_name')
    .eq('id', user.id)
    .single();

  return {
    id: user.id,
    email: user.email,
    username: profile?.username,
    fullName: profile?.full_name
  };
};

export const signOut = async () => {
  await supabase.auth.signOut();
};
