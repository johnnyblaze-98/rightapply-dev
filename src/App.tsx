import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import all existing components as before
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Benefits from './components/Benefits';
import Success from './components/Success';
import Companies from './components/Companies';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Registration components
import RegistrationPage from './components/RegistrationPage';
import ThankYouPage from './components/ThankYouPage';
import ResumeAIForm from './components/ResumeAIForm';
import ResumeAIResults from './components/ResumeAIResults';

function LandingPage() {
  useEffect(() => {
    // Scroll animation observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    // Observe all scroll-reveal elements
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => observer.observe(el));

    // Parallax effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-element');
      parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || "0.5";
        const yPos = -(scrolled * parseFloat(speed));
        element.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* <CustomCursor /> */}
      <Header />
      <main>
        <Hero />
        <Features />
        <Benefits />
        {/* <Success /> */}
        <Companies />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/registration/thank-you" element={<ThankYouPage />} />
        <Route path="/resume-ai" element={<ResumeAIForm />} />
        <Route path="/resume-ai/results" element={<ResumeAIResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
