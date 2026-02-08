import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Page components
import Home from './pages/Home';
import RegistrationPage from './pages/Registration/RegistrationPage';
import ThankYouPage from './pages/ThankYou/ThankYouPage';
import ResumeAIForm from './pages/ResumeAI/ResumeAIForm';
import ResumeAIResults from './pages/ResumeAI/ResumeAIResults';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/registration/thank-you" element={<ThankYouPage />} />
        <Route path="/resume-ai" element={<ResumeAIForm />} />
        <Route path="/resume-ai/results" element={<ResumeAIResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
