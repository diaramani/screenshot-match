DROP POLICY IF EXISTS bring_claims_release ON public.bring_claims;
DROP POLICY IF EXISTS diyas_extinguish ON public.diyas;

CREATE POLICY bring_claims_release ON public.bring_claims FOR DELETE TO anon, authenticated
  USING (token = coalesce((current_setting('request.headers', true)::jsonb ->> 'x-claim-token'), ''));

CREATE POLICY diyas_extinguish ON public.diyas FOR DELETE TO anon, authenticated
  USING (token = coalesce((current_setting('request.headers', true)::jsonb ->> 'x-claim-token'), ''));