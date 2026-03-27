import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: "How does RightApply.ai work?",
        answer: "RightApply.ai uses advanced AI to perfect your resume for each specific role. Then, our human team manages the entire application process, submitting your profile to recruiters on your behalf to ensure quality and personalization."
    },
    {
        question: "Is this a bot or human service?",
        answer: "It's the best of both worlds. We use AI for what it does best—optimizing resumes and keywords. But every application is strategically managed by our human team to avoid spam filters and ensure your profile reaches real recruiters."
    },
    {
        question: "What industries do you support?",
        answer: "We support a wide range of industries including Technology, Finance, Healthcare, Marketing, Sales, and Operations. Our AI is trained on industry-specific standards to ensure your profile stands out to recruiters in your specific field."
    },
    {
        question: "How long until I get interview calls?",
        answer: "While results vary based on market conditions, most of our users start seeing genuine interview invitations within 2 to 4 weeks of starting with us. Our optimization techniques typically triple the callback rate for most candidates."
    },
    {
        question: "Do you optimize my resume?",
        answer: "Yes, every application we submit is accompanied by an AI-optimized version of your resume. We highlight the specific skills and achievements that the job description focuses on, ensuring maximum ATS compatibility and recruiter interest."
    },
    {
        question: "What's included in the service?",
        answer: "Our service includes AI job matching, resume optimization, automated applications, interview preparation support, and access to career specialists who guide you through the entire process from application to offer."
    }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-24 section-bg-modern relative overflow-hidden">
            <div className="absolute inset-0 pattern-dots-modern opacity-20"></div>
            <div className="container-modern relative z-10">
                <div className="text-center mb-16 scroll-reveal">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-2xl flex items-center justify-center feature-icon-modern">
                            <HelpCircle className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                        Everything you need to know about how RightApply.ai transforms your job search.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`modern-card !p-0 overflow-hidden transition-all duration-300 ${activeIndex === index ? 'shadow-teal-modern border-teal-200' : 'hover:border-teal-200'}`}
                        >
                            <button
                                className="w-full text-left p-5 md:p-6 flex items-center justify-between focus:outline-none"
                                onClick={() => toggleAccordion(index)}
                            >
                                <span className={`text-base md:text-lg font-bold transition-colors pr-4 ${activeIndex === index ? 'text-teal-600' : 'text-gray-900'}`}>
                                    {faq.question}
                                </span>
                                {activeIndex === index ? (
                                    <ChevronUp className="w-5 h-5 text-teal-600" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                )}
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out border-t border-teal-50/50 ${activeIndex === index ? 'max-h-[500px] opacity-100 p-5 md:p-6' : 'max-h-0 opacity-0 overflow-hidden'
                                    }`}
                            >
                                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
