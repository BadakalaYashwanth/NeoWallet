
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zsefdvsxnhmeqgwdqwml.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzZWZkdnN4bmhtZXFnd2Rxd21sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1MjQ5OTksImV4cCI6MjA1NTEwMDk5OX0.O2a9vAfFUJWlN86_IgjBYUDysI8gOMsmz-f9M9u2C-A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
