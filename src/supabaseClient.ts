import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://awdoignuguvsktagucdo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3ZG9pZ251Z3V2c2t0YWd1Y2RvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyNzM1MjAsImV4cCI6MjA4Nzg0OTUyMH0.Uezm4wV5C_9YEVFEBEP4tGIzo_gHMWFmSZnzftTLHnY'
);