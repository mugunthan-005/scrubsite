import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface RouteState {
  path: string;
  query: URLSearchParams;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouteState | undefined>(undefined);

function parseHash(): { path: string; query: URLSearchParams } {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  const [path, qs] = hash.split('?');
  return { path: path || '/', query: new URLSearchParams(qs || '') };
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState(parseHash);

  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (to: string) => {
    if (to.startsWith('#')) to = to.slice(1);
    window.location.hash = to;
  };

  return (
    <RouterContext.Provider value={{ path: route.path, query: route.query, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}
