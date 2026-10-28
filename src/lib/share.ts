import { useEffect } from "react";
import { queryOptions, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const TOKEN_KEY = "diwali-guest-token";

/**
 * This device's private key for the shared lists. The database only lets a row be
 * removed by a request carrying the same key, so a guest can undo their own entry
 * and nobody else's. It never reaches the read queries.
 */
export function guestToken(): string {
  const stored = window.localStorage.getItem(TOKEN_KEY);
  if (stored && stored.length >= 16) return stored;
  const fresh = crypto.randomUUID();
  window.localStorage.setItem(TOKEN_KEY, fresh);
  return fresh;
}

export type BringRow = { id: string; item: string; name: string; created_at: string };
export type DiyaRow = { id: string; name: string; created_at: string };

/** What guests can claim at the sharing table. Names go straight into the database. */
export const SHARE_ITEMS = [
  { name: "Mithai", sub: "Kaju katli, gulab jamun", tile: "bg-marigold text-ink" },
  { name: "Namkeen", sub: "The crunchy filler", tile: "bg-saffron text-ink" },
  { name: "Drinks", sub: "Lime, soda, sparkle", tile: "bg-peacock text-cream" },
  { name: "Ice cream", sub: "Late-night favourite", tile: "bg-pink text-cream" },
  { name: "Flowers", sub: "Marigold strings", tile: "bg-emerald text-cream" },
  { name: "Diyas", sub: "Keep the lights going", tile: "bg-vermilion text-cream" },
] as const;

const READABLE = "id,item,name,created_at";

export const bringListOptions = queryOptions({
  queryKey: ["bring"],
  queryFn: async (): Promise<BringRow[]> => {
    const { data, error } = await supabase
      .from("bring_claims")
      .select(READABLE)
      .order("created_at", { ascending: true });
    if (error) throw error;
    return (data ?? []) as BringRow[];
  },
});

export const diyaListOptions = queryOptions({
  queryKey: ["diyas"],
  queryFn: async (): Promise<DiyaRow[]> => {
    const { data, error } = await supabase
      .from("diyas")
      .select("id,name,created_at")
      .order("created_at", { ascending: true });
    if (error) throw error;
    return (data ?? []) as DiyaRow[];
  },
});

export async function claimItem(item: string, name: string): Promise<string> {
  const { data, error } = await supabase
    .from("bring_claims")
    .insert({ item, name, token: guestToken() })
    .select("id")
    .single();
  if (error) throw error;
  return data.id;
}

export async function releaseClaim(id: string): Promise<void> {
  const { error } = await supabase
    .from("bring_claims")
    .delete()
    .eq("id", id)
    .set({ "x-claim-token": guestToken() });
  if (error) throw error;
}

export async function lightDiya(name: string): Promise<string> {
  const { data, error } = await supabase
    .from("diyas")
    .insert({ name, token: guestToken() })
    .select("id")
    .single();
  if (error) throw error;
  return data.id;
}

export async function extinguishDiya(id: string): Promise<void> {
  const { error } = await supabase
    .from("diyas")
    .delete()
    .eq("id", id)
    .set({ "x-claim-token": guestToken() });
  if (error) throw error;
}

/** Keeps both shared lists fresh without a reload while the page is open. */
export function useShareRealtime() {
  const queryClient = useQueryClient();
  useEffect(() => {
    const channel = supabase
      .channel(`share-${Math.random().toString(36).slice(2)}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bring_claims" },
        () => queryClient.invalidateQueries({ queryKey: ["bring"] }),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "diyas" },
        () => queryClient.invalidateQueries({ queryKey: ["diyas"] }),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
}
