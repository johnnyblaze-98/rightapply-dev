import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ReactLenis } from '@studio-freight/react-lenis';

// Components
import Loader from './components/Loader';

// Page components
import Home from './pages/Home';
import RegistrationPage from './pages/Registration/RegistrationPage';
import ThankYouPage from './pages/ThankYou/ThankYouPage';
import ResumeAIForm from './pages/ResumeAI/ResumeAIForm';
import ResumeAIResults from './pages/ResumeAI/ResumeAIResults';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Loader onLoadingComplete={() => setIsLoading(false)} />}

      <ReactLenis root>
        <BrowserRouter>
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
    </>
  );
}

export default App;
