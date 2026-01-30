import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth.jsx';
import { router } from './router';
import { supabase } from './lib/supabase';
import './styles/main.css';

// Dynamic favicon from about page photo
function useDynamicFavicon() {
  useEffect(() => {
    async function setFavicon() {
      try {
        const { data } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'about_page')
          .single();

        if (data?.value?.photo) {
          const favicon = document.getElementById('favicon');
          if (favicon) {
            favicon.href = data.value.photo;
          }
        }
      } catch (err) {
        // Silently fail - use default favicon
      }
    }

    setFavicon();
  }, []);
}

function App() {
  useDynamicFavicon();

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
