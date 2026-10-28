REVOKE SELECT ON public.bring_claims FROM anon, authenticated;
REVOKE SELECT ON public.diyas FROM anon, authenticated;

GRANT SELECT (id, item, name, created_at) ON public.bring_claims TO anon, authenticated;
GRANT SELECT (id, name, created_at) ON public.diyas TO anon, authenticated;