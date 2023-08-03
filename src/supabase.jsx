import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kbapfrlmanatpekzhlwk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdydXpoeHNuaHBneW53dWVndHNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4ODk2MTcsImV4cCI6MjAwNjQ2NTYxN30.KI2pWJCVEupy51RLn_0O68MDpvTfrpjcPJcQ0UKCJwQ'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase  ;