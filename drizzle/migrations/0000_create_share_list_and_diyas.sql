CREATE TABLE public.bring_claims(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item text NOT NULL,
  name text NOT NULL,
  token text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.diyas(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  token text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, DELETE ON public.bring_claims TO anon, authenticated;
GRANT ALL ON public.bring_claims TO service_role;
GRANT SELECT, INSERT, DELETE ON public.diyas TO anon, authenticated;
GRANT ALL ON public.diyas TO service_role;

ALTER TABLE public.bring_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diyas ENABLE ROW LEVEL SECURITY;

CREATE POLICY bring_claims_read ON public.bring_claims FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY bring_claims_add ON public.bring_claims FOR INSERT TO anon, authenticated WITH CHECK (char_length(token) >= 16 AND char_length(name) BETWEEN 1 AND 40 AND char_length(item) BETWEEN 1 AND 60);
CREATE POLICY bring_claims_release ON public.bring_claims FOR DELETE TO anon, authenticated USING (token = coalesce(current_setting('request.header.x_claim_token', true), ''));

CREATE POLICY diyas_read ON public.diyas FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY diyas_add ON public.diyas FOR INSERT TO anon, authenticated WITH CHECK (char_length(token) >= 16 AND char_length(name) BETWEEN 1 AND 40);
CREATE POLICY diyas_extinguish ON public.diyas FOR DELETE TO anon, authenticated USING (token = coalesce(current_setting('request.header.x_claim_token', true), ''));

ALTER PUBLICATION supabase_realtime ADD TABLE public.bring_claims;
ALTER PUBLICATION supabase_realtime ADD TABLE public.diyas;