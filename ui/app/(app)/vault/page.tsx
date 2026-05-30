import React, { useState } from 'react';
import { useVaultList, useCreateVaultEntry, type VaultEntry } from '../../../lib/hooks/useVault';
import { generatePassword } from '../../../lib/utils/passwordGenerator';

export default function VaultPage() {
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ site_name: '', account_username: '', password: '' });

  const { data: entries, isLoading } = useVaultList(search);
  const create = useCreateVaultEntry();

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    await create.mutateAsync(form);
    setForm({ site_name: '', account_username: '', password: '' });
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Vault</h1>

      <div className="mb-4">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className="border p-2 rounded w-full" />
      </div>

      <div className="mb-6 border p-4 rounded">
        <h2 className="font-medium mb-2">Add entry</h2>
        <form onSubmit={handleCreate} className="space-y-2">
          <input className="w-full p-2 border rounded" placeholder="Site name" value={form.site_name} onChange={(e) => setForm({ ...form, site_name: e.target.value })} required />
          <input className="w-full p-2 border rounded" placeholder="Account username" value={form.account_username} onChange={(e) => setForm({ ...form, account_username: e.target.value })} />
          <div className="flex gap-2">
            <input className="flex-1 p-2 border rounded" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            <button type="button" onClick={() => setForm({ ...form, password: generatePassword({ length: 20, includeSymbols: true }) })} className="px-3 py-2 bg-gray-200 rounded">Generate</button>
          </div>
          <div>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
          </div>
        </form>
      </div>

      <div>
        <h2 className="font-medium mb-2">Entries</h2>
        {isLoading && <div>Loading...</div>}
        {entries && entries.length === 0 && <div className="text-muted">No entries</div>}
        <ul className="space-y-2">
          {entries?.map((e: VaultEntry) => (
            <li key={e.id} className="border p-3 rounded">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">{e.site_name}</div>
                  <div className="text-sm text-gray-600">{e.account_username}</div>
                </div>
                <div className="text-sm text-gray-700">{e.is_favorite ? '★' : ''}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
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