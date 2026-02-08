import React from 'react';
import { Star, CheckCircle, Quote, Layout } from 'lucide-react';

const reviews = [
    {
        name: "Alex Thompson",
        role: "Senior Product Designer",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        content: "RightApply.ai completely changed how I look at job searching. The AI resume optimization is next-level, and I had 3 interviews booked within the first week.",
        rating: 5,
        date: "2 days ago"
    },
    {
        name: "Samantha Reed",
        role: "Marketing Director",
        image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        content: "I was skeptical at first, but the results speak for themselves. The expert support combined with their AI engine is a powerhouse. Highly recommend for busy professionals.",
        rating: 5,
        date: "1 week ago"
    },
    {
        name: "Michael Chen",
        role: "Software Engineer",
        image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        content: "The most efficient way to apply for jobs. No more manual form filling. The accuracy of the matching is incredible. I landed exactly the kind of role I was looking for.",
        rating: 5,
        date: "2 weeks ago"
    }
];

const GoogleReviews = () => {
    return (
        <section id="reviews" className="py-24 bg-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-teal-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-indigo-50/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="container-modern relative z-10">
                <div className="text-center mb-16 scroll-reveal">
                    <div className="inline-flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 mb-6 group hover:border-teal-200 transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                            />
                        </svg>
                        <span className="text-sm font-bold text-gray-600">Google Reviews</span>
                        <div className="flex -space-x-1 ml-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                            ))}
                        </div>
                        <span className="text-sm font-bold text-gray-900 ml-2">4.9/5</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
                        Trusted by Professionals <br />
                        <span className="modern-gradient-text">Whose Lives We've Changed</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
                        Join thousands of satisfied users who have accelerated their career growth with our AI-driven platform.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 scroll-reveal">
                    {reviews.map((review, idx) => (
                        <div
                            key={idx}
                            className="glass-card p-8 rounded-[2rem] hover:bg-white shadow-sm hover:shadow-teal-modern transition-all duration-500 hover-lift-modern group flex flex-col h-full border border-gray-100"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex space-x-1">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <div className="bg-teal-50 text-teal-600 p-1.5 rounded-lg">
                                    <CheckCircle className="w-4 h-4" />
                                </div>
                            </div>

                            <div className="relative mb-6 flex-grow">
                                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-teal-100 -z-10 group-hover:text-teal-200 transition-colors" />
                                <p className="text-gray-700 leading-relaxed font-medium relative z-10">
                                    {review.content}
                                </p>
                            </div>

                            <div className="flex items-center mt-auto pt-6 border-t border-gray-50">
                                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 ring-2 ring-gray-100 group-hover:ring-teal-100 transition-all">
                                    <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 leading-tight">{review.name}</h4>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">{review.role}</p>
                                </div>
                                <span className="ml-auto text-[10px] font-bold text-gray-400 whitespace-nowrap">{review.date}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center scroll-reveal">
                    <a
                        href="https://google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-gray-500 hover:text-teal-600 font-bold text-sm tracking-wide transition-colors group"
                    >
                        <span>View all 1,240 verified reviews on</span>
                        <span className="font-black text-gray-900 group-hover:text-teal-700">Google</span>
                        <Layout className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default GoogleReviews;
