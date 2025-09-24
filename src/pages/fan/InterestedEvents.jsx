import { FaTicketAlt } from "react-icons/fa";
import { imgSrc } from "../../utils/imgSrc";
import { useNavigate } from "react-router-dom";

export default function InterestedEventsForFan({ userData }) {
  const navigate = useNavigate();

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

      {userData && userData.length > 0 ? (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {userData.map((ev) => (
            <article
              key={ev.id}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/[0.06] transition-colors"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img
                  src={imgSrc(ev?.event_cover)}
                  alt={ev.title}
                  loading="lazy"
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
                    onClick={() => navigate(`/event-details/${ev?._id}`)}
                    className="cursor-pointer custom-button-two gap-2 transition"
                  >
                    <div className="flex items-center gap-1">
                      <FaTicketAlt className="text-xs" />
                      <span>Buy Ticket</span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-yellow-400/0 group-hover:ring-2 group-hover:ring-yellow-400/30 transition z-0" />
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <FaTicketAlt className="text-yellow-400/50 text-3xl" />
          </div>
          <h3 className="text-white text-lg font-medium mb-2">
            No events found
          </h3>
          <p className="text-gray-400 text-sm">
            There are no interested events to display at the moment.
          </p>
        </div>
      )}
    </div>
  );
}
