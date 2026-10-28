import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Opening } from "@/components/diwali/Opening";
import { FitCheck, GossipWall, Invite, Nav, Venue } from "@/components/diwali/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dil Waali Diwali — You're Invited" },
      { name: "description", content: "Light the diya and unlock your Diwali party invite: date, dress code, venue and a gossip wall." },
      { property: "og:title", content: "Dil Waali Diwali — You're Invited" },
      { property: "og:description", content: "Mithai, masti and main character moments. Light the diya to RSVP." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [open, setOpen] = useState(false);
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
          <FitCheck />
          <Venue />
          <GossipWall />
        </>
      )}
    </main>
  );
}
