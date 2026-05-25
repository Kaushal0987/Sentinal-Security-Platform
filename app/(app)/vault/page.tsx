const vaultItems = [
  ["Bank portal", "alex@bank.com", "Favorite", "2FA enabled"],
  ["GitHub", "alex.dev", "Standard", "Recovery codes stored"],
  ["Cloud admin", "admin@company.com", "Favorite", "Strength: strong"],
];

export default function VaultPage() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
      <h1 className="text-3xl font-semibold text-white">Password vault</h1>
      <p className="mt-2 text-sm text-slate-300">Search, favorite, and manage encrypted credentials.</p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">
        Search and filters will connect to the API in the next phase.
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-slate-300">
            <tr>
              <th className="px-4 py-3 font-medium">Site</th>
              <th className="px-4 py-3 font-medium">Username</th>
              <th className="px-4 py-3 font-medium">Priority</th>
              <th className="px-4 py-3 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody>
            {vaultItems.map(([site, username, priority, note]) => (
              <tr key={site} className="border-t border-white/10 bg-slate-900/70 text-slate-200">
                <td className="px-4 py-4 font-medium text-white">{site}</td>
                <td className="px-4 py-4">{username}</td>
                <td className="px-4 py-4">{priority}</td>
                <td className="px-4 py-4">{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}