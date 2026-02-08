import { useEffect } from 'react';
import Header from '../../layouts/Header';
import Hero from '../../sections/Hero';
import Features from '../../sections/Features';
import Benefits from '../../sections/Benefits';
import Companies from '../../sections/Companies';
import GoogleReviews from '../../sections/GoogleReviews';
import Contact from '../../sections/Contact';
import FAQ from '../../sections/FAQ';
import Footer from '../../layouts/Footer';
import CustomCursor from '../../layouts/CustomCursor';

const Home = () => {
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
                const htmlElement = element as HTMLElement;
                const speed = htmlElement.getAttribute('data-speed') || "0.5";
                const yPos = -(scrolled * parseFloat(speed));
                htmlElement.style.transform = `translateY(${yPos}px)`;
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
            <CustomCursor />
            <Header />
            <main>
                <Hero />
                <Features />
                <Benefits />
                <Companies />
                <GoogleReviews />
                <Contact />
                <FAQ />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
