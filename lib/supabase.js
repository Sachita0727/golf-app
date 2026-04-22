import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://gcsqlynprfcnoraqodnf.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdjc3FseW5wcmZjbm9yYXFvZG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2ODAwNTMsImV4cCI6MjA5MjI1NjA1M30.__q9qAeJEb8ACCBcqu2fzIrlmAgvS_qc7Avr5honOSI"

export const supabase = createClient(supabaseUrl, supabaseKey)