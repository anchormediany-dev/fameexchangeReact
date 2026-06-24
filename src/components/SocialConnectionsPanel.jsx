import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiLink, FiRefreshCw } from "react-icons/fi";
import { HiBadgeCheck } from "react-icons/hi";
import {
  useGetSocialConnectionsQuery,
  useStartSocialConnectMutation,
  useRefreshSocialConnectionMutation,
  useDisconnectSocialMutation,
} from "../app/authApi";

/**
 * Connect / disconnect social accounts via OAuth and show the resulting
 * `social_worth` (sum of follower counts across connected platforms).
 *
 * Self-contained: it owns the connections query AND handles the OAuth callback
 * redirect (?social=&status=) so you can drop it on any page.
 */

const META = {
  youtube: {
    label: "YouTube",
    Icon: FaYoutube,
    color: "text-red-500",
    metric: "subscribers",
  },
  twitter: {
    label: "X (Twitter)",
    Icon: FaXTwitter,
    color: "text-white",
    metric: "followers",
  },
  instagram: {
    label: "Instagram",
    Icon: FaInstagram,
    color: "text-pink-400",
    metric: "followers",
  },
};

const fmt = (n) => {
  n = Number(n) || 0;
  if (n >= 1e9) return (n / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
};

export default function SocialConnectionsPanel() {
  const { data, isLoading, isFetching, refetch } =
    useGetSocialConnectionsQuery();
  const [startConnect, { isLoading: isStarting }] =
    useStartSocialConnectMutation();
  const [refreshConnection] = useRefreshSocialConnectionMutation();
  const [disconnect] = useDisconnectSocialMutation();

  const [searchParams, setSearchParams] = useSearchParams();

  // Handle the OAuth callback redirect once on mount.
  useEffect(() => {
    const social = searchParams.get("social");
    const status = searchParams.get("status");
    if (!social || !status) return;

    const label = META[social]?.label || social;
    if (status === "connected") {
      toast.success(`${label} connected successfully!`);
    } else {
      const reason = searchParams.get("reason");
      toast.error(
        `Could not connect ${label}${reason ? ` (${reason})` : ""}.`
      );
    }
    refetch();

    const sp = new URLSearchParams(searchParams);
    ["social", "status", "reason"].forEach((k) => sp.delete(k));
    setSearchParams(sp, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const providers = data?.providers || [];
  const socialWorth = data?.social_worth || 0;

  const handleConnect = async (platform) => {
    try {
      const res = await startConnect(platform).unwrap();
      if (res?.url) {
        window.location.href = res.url; // full redirect to the provider
      }
    } catch (e) {
      toast.error(
        e?.data?.message ||
          `Couldn't start ${META[platform]?.label || platform} connection.`
      );
    }
  };

  const handleDisconnect = async (platform) => {
    try {
      await disconnect(platform).unwrap();
      toast.success(`${META[platform]?.label || platform} disconnected.`);
    } catch (e) {
      toast.error(e?.data?.message || "Failed to disconnect.");
    }
  };

  const handleRefresh = async (platform) => {
    try {
      const res = await refreshConnection(platform).unwrap();
      toast.success(
        res?.fetchPending
          ? "Connected — follower count will appear once API access is live."
          : "Follower count refreshed."
      );
    } catch (e) {
      toast.error(e?.data?.message || "Failed to refresh.");
    }
  };

  return (
    <section className="bg-[#1b1b1b] border border-[#2c2c2c] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <FiLink className="w-5 h-5 text-white/70" />
          <h3 className="text-white font-semibold">Connected Accounts</h3>
        </div>
        <div className="text-right">
          <div className="text-[11px] uppercase tracking-wider text-white/50">
            Social Worth
          </div>
          <div className="text-[#F3BA18] font-bold text-lg leading-tight">
            {fmt(socialWorth)}
          </div>
        </div>
      </div>
      <p className="text-gray-400 text-xs mb-5">
        Log in to verify each account and pull your real follower count. Your
        social worth is the total followers across connected platforms. You can
        skip this — worth stays 0 until you connect.
      </p>

      {isLoading ? (
        <div className="text-white/50 text-sm">Loading…</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {providers.map((p) => {
            const meta = META[p.platform] || {
              label: p.platform,
              Icon: FiLink,
              color: "text-white",
              metric: "followers",
            };
            const Icon = meta.Icon;
            return (
              <div
                key={p.platform}
                className="bg-[#202020] border border-[#2b2b2b] rounded-xl p-4 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className={`w-6 h-6 ${meta.color}`} />
                    <div>
                      <div className="text-white text-sm font-medium flex items-center gap-1.5">
                        {meta.label}
                        {p.connected && (
                          <HiBadgeCheck className="w-4 h-4 text-emerald-400" />
                        )}
                      </div>
                      {p.connected && p.username ? (
                        <div className="text-white/50 text-xs truncate max-w-[160px]">
                          {p.username}
                        </div>
                      ) : (
                        <div className="text-white/40 text-xs">
                          {p.configured ? "Not connected" : "Coming soon"}
                        </div>
                      )}
                    </div>
                  </div>

                  {p.connected && (
                    <div className="text-right">
                      <div className="text-white font-bold leading-tight">
                        {p.fetchPending ? "—" : fmt(p.followers)}
                      </div>
                      <div className="text-white/40 text-[10px] uppercase">
                        {meta.metric}
                      </div>
                    </div>
                  )}
                </div>

                {p.connected && p.fetchPending && (
                  <div className="text-amber-300/90 text-[11px] bg-amber-500/10 border border-amber-500/20 rounded-md px-2 py-1">
                    Verified. Follower count pending API access — will update
                    automatically once it's live.
                  </div>
                )}

                <div className="flex items-center gap-2">
                  {p.connected ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleRefresh(p.platform)}
                        disabled={isFetching}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-[#333] text-white/80 hover:bg-[#262626] disabled:opacity-50"
                      >
                        <FiRefreshCw className="w-3.5 h-3.5" /> Refresh
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDisconnect(p.platform)}
                        className="text-xs px-3 py-1.5 rounded-lg border border-red-700/50 text-red-300 hover:bg-red-900/20"
                      >
                        Disconnect
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleConnect(p.platform)}
                      disabled={!p.configured || isStarting}
                      className="w-full text-sm px-3 py-2 rounded-lg custom-button-two font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {p.configured ? `Connect ${meta.label}` : "Coming soon"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
