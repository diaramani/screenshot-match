import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Opening } from "@/components/diwali/Opening";
import { DiyaWall, Invite, Nav, ShareTable, Venue } from "@/components/diwali/Sections";
import { useShareRealtime } from "@/lib/share";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Diwali at Ours — 30 October" },
      { name: "description", content: "Three friends, one Diwali celebration. Join us on 30 October 2026, from 5:30 PM onwards. You better be there." },
      { property: "og:title", content: "Diwali at Ours — 30 October" },
      { property: "og:description", content: "A little mithai, a little sparkle, and our favourite people. 30 October, 5:30 PM onwards." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [open, setOpen] = useState(false);
  useShareRealtime();
  const enter = () => {
    setOpen(true);
    requestAnimationFrame(() => document.getElementById("invite")?.scrollIntoView({ behavior: "smooth" }));
  };
  return (
    <main>
      <Opening onDone={enter} />
      {open && (
        <>
          <Nav />
          <Invite />
          <ShareTable />
          <Venue />
          <DiyaWall />
        </>
      )}
    </main>
  );
}
