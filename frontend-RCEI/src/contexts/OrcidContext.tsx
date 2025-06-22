import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';
import { getOrcidToken } from '@/services/orcid';

interface OrcidContextValue {
  token: string | null;
}

const OrcidContext = createContext<OrcidContextValue | undefined>(undefined);

export function OrcidProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function fetchToken() {
      try {
        const stored = await getOrcidToken();
        setToken(stored);
      } catch (err) {
        console.error('Failed to load ORCID token:', err);
        setToken(null);
      }
    }
    fetchToken();
  }, []);

  return (
    <OrcidContext.Provider value={{ token }}>
      {children}
    </OrcidContext.Provider>
  );
}

export function useOrcid() {
  const ctx = useContext(OrcidContext);
  if (!ctx) {
    throw new Error('useOrcid must be used inside an OrcidProvider');
  }
  return ctx;
}
