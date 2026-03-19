import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ReactLenis } from '@studio-freight/react-lenis';

// Components
import Loader from './components/Loader';

// Page components
import Home from './pages/Home';
import RegistrationPage from './pages/Registration/RegistrationPage';
import ThankYouPage from './pages/ThankYou/ThankYouPage';
import ResumeAIForm from './pages/ResumeAI/ResumeAIForm';
import ResumeAIResults from './pages/ResumeAI/ResumeAIResults';

const ScrollToTop = ({ triggerLoader }: { triggerLoader: () => void }) => {
  const { pathname } = useLocation();
  const [prev, setPrev] = useState(pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (pathname !== prev) {
      if (pathname === '/registration') {
        triggerLoader();
      }
      setPrev(pathname);
    }
  }, [pathname, prev, triggerLoader]);

  return null;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [appStarted, setAppStarted] = useState(false);

  // Advanced Micro-Interactions (Mouse tracker & Parallax)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.querySelectorAll('.card-hover-modern').forEach(card => {
        const rect = card.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
        (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
      });
    };

    const handleScroll = () => {
      const scrolled = window.scrollY;
      document.querySelectorAll('.blur-3xl').forEach((orb, index) => {
        const speed = index % 2 === 0 ? 0.1 : -0.15;
        (orb as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isLoading && <Loader onLoadingComplete={() => setIsLoading(false)} onStartFading={() => setAppStarted(true)} />}

      {appStarted && (
        <ReactLenis root>
          <BrowserRouter>
            <ScrollToTop triggerLoader={() => setIsLoading(true)} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/registration" element={<RegistrationPage />} />
              <Route path="/registration/thank-you" element={<ThankYouPage />} />
              <Route path="/resume-ai" element={<ResumeAIForm />} />
              <Route path="/resume-ai/results" element={<ResumeAIResults />} />

              {/* Catch-all route to redirect unknown paths (like /dashboard) back to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ReactLenis>
      )}
    </>
  );
}

export default App;
