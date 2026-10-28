CREATE OR REPLACE FUNCTION public.release_bring_claim(p_id uuid, p_token text)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.bring_claims WHERE id = p_id AND token = p_token;
$$;

CREATE OR REPLACE FUNCTION public.extinguish_diya(p_id uuid, p_token text)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.diyas WHERE id = p_id AND token = p_token;
$$;

REVOKE ALL ON FUNCTION public.release_bring_claim(uuid, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.extinguish_diya(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.release_bring_claim(uuid, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.extinguish_diya(uuid, text) TO anon, authenticated;