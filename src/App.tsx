import { useEffect, lazy, Suspense } from 'react';
import { useRoute } from '@/utils/router';
import { applyTheme, getTheme } from '@/themes';
import { Home } from '@/pages/Home';
import { ProfilePage } from '@/pages/ProfilePage';

const Editor = lazy(() => import('@/pages/Editor').then(m => ({ default: m.Editor })));

function App() {
  const path = useRoute();

  useEffect(() => {
    applyTheme(getTheme());
  }, []);

  const trimmed = path.replace(/^\/+|\/+$/g, '');

  if (!trimmed) return <Home />;

  if (trimmed === 'editor') {
    return (
      <Suspense fallback={<div className="min-h-screen" style={{ background: 'var(--lf-bg)' }} />}>
        <Editor />
      </Suspense>
    );
  }

  if (trimmed.startsWith('data/')) return null;

  const username = trimmed.split('/')[0];

  if (username === 'favicon.ico' || username === 'vite.svg') return null;

  return <ProfilePage username={username} />;
}

export default App;
