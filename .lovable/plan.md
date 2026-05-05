## Why the site is blank

`src/lib/supabase.ts` throws at module load when `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` are missing:

```
Error: Missing Supabase environment variables
  at src/lib/supabase.ts:5
```

No `.env` exists and Lovable Cloud isn't connected, so both vars are `undefined`. Although only `Admin.tsx` and the admin managers import this file, the throw happens at the top level of a module that's part of the bundle graph — crashing the whole app and leaving a white screen on `/`.

(The `/manifest.json` 401 in the console is unrelated preview gating and harmless.)

## Fix

1. **`src/lib/supabase.ts`** — remove the top-level `throw`. Export `supabase` as a real client when env vars exist, otherwise `null`. Type as `SupabaseClient | null`.
2. **`src/pages/Admin.tsx`** — if `supabase` is `null`, render a friendly "Connect Lovable Cloud to enable the admin" notice instead of calling auth methods.
3. **`src/components/admin/PortfolioManager.tsx`** and **`src/components/admin/ServicesManager.tsx`** — early-return a disabled state when `supabase` is `null`; guard all `supabase.*` calls.

## Result

- `/` (home) renders normally — no more blank screen.
- `/admin` shows a clear setup notice until Lovable Cloud is enabled, then works automatically.

## Optional follow-up

Enable **Lovable Cloud** (Cloud tab) to auto-provision Supabase env vars so the admin actually functions. No further code changes needed after that.
