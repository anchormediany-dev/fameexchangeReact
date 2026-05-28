import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetSiteSettingsQuery,
  useUpdateSiteSettingsMutation,
} from "../../app/authApi";

// Admin: toggle navbar / footer link visibility and reorder menu items.
const AdminPageVisibility = () => {
  const { data, isLoading, isError, refetch } = useGetSiteSettingsQuery();
  const [updateSettings, { isLoading: isSaving }] =
    useUpdateSiteSettingsMutation();

  const [menuItems, setMenuItems] = useState([]);
  const [footerItems, setFooterItems] = useState([]);

  useEffect(() => {
    if (data?.data) {
      setMenuItems(data.data.menuItems || []);
      setFooterItems(data.data.footerItems || []);
    }
  }, [data]);

  const footerSections = useMemo(() => {
    const grouped = {};
    footerItems.forEach((f, idx) => {
      const list = grouped[f.section] || (grouped[f.section] = []);
      list.push({ ...f, __index: idx });
    });
    return grouped;
  }, [footerItems]);

  const setMenuField = (idx, field, value) =>
    setMenuItems((prev) =>
      prev.map((m, i) => (i === idx ? { ...m, [field]: value } : m))
    );

  const setFooterField = (idx, field, value) =>
    setFooterItems((prev) =>
      prev.map((f, i) => (i === idx ? { ...f, [field]: value } : f))
    );

  const handleSave = async () => {
    try {
      await updateSettings({
        menuItems,
        footerItems,
      }).unwrap();
      toast.success("Page visibility updated");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to save settings");
    }
  };

  if (isLoading) return <p className="text-white">Loading...</p>;
  if (isError)
    return <p className="text-red-400">Failed to load site settings</p>;

  return (
    <div className="text-white space-y-10">
      <div>
        <h1 className="text-2xl font-bold mb-2">Page Visibility</h1>
        <p className="text-gray-400 text-sm">
          Toggle which links appear in the top menu and footer. Updating order
          changes the position of menu items.
        </p>
      </div>

      {/* Top Menu */}
      <section className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
        <div className="px-5 py-3 border-b border-white/10 bg-white/5">
          <h2 className="text-lg font-semibold">Top Menu</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-400">
              <tr>
                <th className="text-left px-5 py-3">Visible</th>
                <th className="text-left px-5 py-3">Label</th>
                <th className="text-left px-5 py-3">Path</th>
                <th className="text-left px-5 py-3 w-24">Order</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {menuItems.map((m, i) => (
                <tr key={m.key || m.path || i}>
                  <td className="px-5 py-3">
                    <input
                      type="checkbox"
                      checked={!!m.visible}
                      onChange={(e) =>
                        setMenuField(i, "visible", e.target.checked)
                      }
                      className="w-4 h-4 accent-[#a18a3f]"
                    />
                  </td>
                  <td className="px-5 py-3">
                    <input
                      type="text"
                      value={m.label || ""}
                      onChange={(e) => setMenuField(i, "label", e.target.value)}
                      className="bg-white/5 border border-white/10 rounded px-3 py-1.5 text-white w-full"
                    />
                  </td>
                  <td className="px-5 py-3 text-gray-400">{m.path}</td>
                  <td className="px-5 py-3">
                    <input
                      type="number"
                      value={m.order ?? 0}
                      onChange={(e) =>
                        setMenuField(i, "order", Number(e.target.value))
                      }
                      className="bg-white/5 border border-white/10 rounded px-3 py-1.5 text-white w-20"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer */}
      <section className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
        <div className="px-5 py-3 border-b border-white/10 bg-white/5">
          <h2 className="text-lg font-semibold">Footer Links</h2>
        </div>
        <div className="space-y-6 p-5">
          {Object.entries(footerSections).map(([section, rows]) => (
            <div key={section}>
              <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-2">
                {section}
              </h3>
              <table className="w-full text-sm">
                <thead className="text-gray-500">
                  <tr>
                    <th className="text-left px-3 py-2">Visible</th>
                    <th className="text-left px-3 py-2">Label</th>
                    <th className="text-left px-3 py-2">Path</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {rows.map((f) => (
                    <tr key={f.key + f.path}>
                      <td className="px-3 py-2">
                        <input
                          type="checkbox"
                          checked={!!f.visible}
                          onChange={(e) =>
                            setFooterField(
                              f.__index,
                              "visible",
                              e.target.checked
                            )
                          }
                          className="w-4 h-4 accent-[#a18a3f]"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={f.label || ""}
                          onChange={(e) =>
                            setFooterField(f.__index, "label", e.target.value)
                          }
                          className="bg-white/5 border border-white/10 rounded px-3 py-1.5 text-white w-full"
                        />
                      </td>
                      <td className="px-3 py-2 text-gray-400">{f.path}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={isSaving}
          onClick={handleSave}
          className="bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black font-medium py-2.5 px-6 rounded-md hover:brightness-110 disabled:opacity-60 cursor-pointer"
        >
          {isSaving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
};

export default AdminPageVisibility;
