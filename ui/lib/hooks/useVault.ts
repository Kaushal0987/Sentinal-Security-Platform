import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';

export type VaultEntry = {
  id: number;
  site_name: string;
  account_username?: string | null;
  is_favorite?: boolean;
  password?: string | null;
  notes?: string | null;
};

export function useVaultList(search?: string) {
  return useQuery(['vault', 'list', search], async () => {
    const res = await api.get('/vault-entries', { params: { q: search } });
    return res.data as VaultEntry[];
  });
}

export function useCreateVaultEntry() {
  const qc = useQueryClient();

  return useMutation(async (payload: Record<string, unknown>) => {
    const res = await api.post('/vault-entries', payload);
    return res.data as VaultEntry;
  }, {
    onSuccess() {
      qc.invalidateQueries(['vault', 'list']);
    },
  });
}
