"use client";

import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default function Vazamento() {
  return <pre>{String(Boolean(supabaseAdmin))}</pre>;
}
