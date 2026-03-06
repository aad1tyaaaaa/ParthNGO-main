import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import Home from '@/pages/Home';
import Stories from '@/pages/Stories';
import Vision from '@/pages/Vision';
import About from '@/pages/About';
import Impact from '@/pages/Impact';
import Transparency from '@/pages/Transparency';
import GetInvolved from '@/pages/GetInvolved';
import LoginPage from '@/pages/LoginPage';
import DonationPage from '@/pages/DonationPage';
import Programs from '@/pages/Programs';
import Blog from '@/pages/Blog';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import { supabase } from '@/lib/supabase';
import { type User } from '@supabase/supabase-js';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-[#FFFDF5] text-[#333333] flex-col lg:flex-row">
        <Sidebar />
        <main className="flex-1 relative flex flex-col">
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vision" element={<Vision />} />
              <Route path="/about" element={<About />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/transparency" element={<Transparency />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/get-involved" element={<GetInvolved />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
              <Route path="/donate" element={<DonationPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </main>
      </div>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
