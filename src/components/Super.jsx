import React from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa, } from '@supabase/auth-ui-shared'
import { createClient } from '@supabase/supabase-js/dist/module'


export const supabase = createClient(
  'https://kbapfrlmanatpekzhlwk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtiYXBmcmxtYW5hdHBla3pobHdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5NjU3NDEsImV4cCI6MjAwNjU0MTc0MX0.-U5E9Gek1r98BVATIlnk7N2Wtewl2HePSvy9rsl2ez0',
)
export default function Supa() {
  return (
    <>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
      />
    </>
  )
}

