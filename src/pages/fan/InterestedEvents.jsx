import { FaTicketAlt } from "react-icons/fa";
const DUMMY_EVENTS = [
  {
    id: "1",
    title: "Rock Night 2025 — New York",
    image: "https://picsum.photos/seed/rock/1200/800",
  },
  {
    id: "2",
    title: "Standup Evening with Jack",
    image: "https://picsum.photos/seed/standup/1200/800",
  },
  {
    id: "3",
    title: "InnovateX: Tech Conference",
    image: "https://picsum.photos/seed/tech/1200/800",
  },
  {
    id: "4",
    title: "Street Food Festival",
    image: "https://picsum.photos/seed/food/1200/800",
  },
  {
    id: "5",
    title: "Indie Film Premiere",
    image: "https://picsum.photos/seed/film/1200/800",
  },
];

export default function InterestedEventsForFan() {
  const handleBuy = (ev) => {
    alert(`Buying tickets for: ${ev.title}`);
  };

  return (
    <div className="bg-[#1f1f1f] rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/15 ring-1 ring-yellow-400/30">
          <FaTicketAlt className="text-yellow-400 text-lg" />
        </div>
        <div className="min-w-0">
          <h2 className="text-white text-xl font-semibold leading-tight">
            Interested Events
          </h2>
        </div>
      </div>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {DUMMY_EVENTS.map((ev) => (
          <article
            key={ev.id}
            className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/[0.06] transition-colors"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={ev.image}
                alt={ev.title}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://picsum.photos/seed/fallback/1200/800";
                }}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
              <div className="absolute inset-x-0 bottom-0 p-4 flex items-end gap-3 z-20">
                <h3
                  className="text-white font-semibold text-base leading-snug line-clamp-2 flex-1 min-w-0"
                  title={ev.title}
                >
                  {ev.title}
                </h3>
                <button
                  type="button"
                  onClick={() => handleBuy(ev)}
                  className="cursor-pointer pointer-events-auto shrink-0 inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-3 py-2 text-sm font-semibold text-black hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 active:scale-[0.99] transition"
                >
                  <FaTicketAlt className="text-xs" />
                  Buy Ticket
                </button>

                {/* OPTION B: Link (navigate). Use instead of the button above. */}
                {/*
                <Link
                  to={`/tickets/${ev.id}`}
                  onClick={() => handleBuy(ev)} // optional side-effect
                  className="cursor-pointer pointer-events-auto shrink-0 inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-3 py-2 text-sm font-semibold text-black hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 active:scale-[0.99] transition"
                >
                  <FaTicketAlt className="text-xs" />
                  Buy Ticket
                </Link>
                */}
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-yellow-400/0 group-hover:ring-2 group-hover:ring-yellow-400/30 transition z-0" />
          </article>
        ))}
      </div>
    </div>
  );
}
