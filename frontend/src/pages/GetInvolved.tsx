import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    HandHeart,
    UsersThree,
    PaperPlaneTilt,
    Sparkle,
    ArrowRight,
    CheckCircle
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const GetInvolved = () => {
    const mainRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.action-card', {
                y: 60,
                opacity: 0,
                duration: 1.2,
                stagger: 0.3,
                ease: "power4.out"
            });

            gsap.from('.step-item', {
                scrollTrigger: {
                    trigger: '.steps-container',
                    start: "top 80%",
                },
                x: -30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            });

            gsap.from('.newsletter-form', {
                scrollTrigger: {
                    trigger: '.newsletter-section',
                    start: "top 75%",
                },
                scale: 0.95,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        }, mainRef);

        return () => ctx.revert();
    }, []);

    const steps = [
        { title: "Select Your Mission", desc: "Choose between volunteering your skills or providing financial support to specific programs." },
        { title: "Quick Onboarding", desc: "Our 2-minute registration process ensures you're matched with the right impact area immediately." },
        { title: "Track Your Impact", desc: "Receive real-time updates and quarterly reports on how your contribution is changing lives." }
    ];

    return (
        <main ref={mainRef} className="w-full min-h-screen bg-[#FFFDF5] text-[#333333] relative overflow-hidden">
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-50" />

            {/* Header */}
            <section className="pt-32 pb-16 px-6 lg:px-20">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-8">
                        JOIN THE<br /><span className="text-[#8B1D1D]">SYNERGY.</span>
                    </h1>
                    <p className="text-2xl font-medium text-gray-400 max-w-2xl mx-auto leading-tight italic">
                        Collective action is the only force capable of dismantling systemic inequity. Which role will you play?
                    </p>
                </div>
            </section>

            {/* Action Hub */}
            <section className="py-20 px-6 lg:px-20">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
                    {/* Volunteer Card */}
                    <div className="action-card group relative p-12 rounded-[48px] bg-white border border-gray-100 shadow-2xl overflow-hidden flex flex-col justify-between min-h-[500px]">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                        <div>
                            <div className="p-4 rounded-3xl bg-blue-50 text-blue-600 w-fit mb-8 group-hover:rotate-6 transition-transform">
                                <UsersThree size={40} weight="bold" />
                            </div>
                            <h2 className="text-5xl font-black tracking-tighter mb-6">BECOME A<br />VOLUNTEER</h2>
                            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-sm mb-12">
                                Lending your professional skills or time to our regional hubs. We welcome designers, doctors, engineers, and teachers.
                            </p>
                        </div>

                        <a
                            href="https://forms.gle/MSXWwpM2g8XBb4ew6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-8 py-4 border-2 border-[#333333] text-[#333333] rounded-full font-black hover:bg-[#333333] hover:text-white transition-all w-fit"
                        >
                            APPLY TO VOLUNTEER
                            <ArrowRight size={20} weight="bold" />
                        </a>
                    </div>

                    {/* Donate Card */}
                    <div className="action-card group relative p-12 rounded-[48px] bg-[#8B1D1D] text-white shadow-2xl overflow-hidden flex flex-col justify-between min-h-[500px]">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                        <div>
                            <div className="p-4 rounded-3xl bg-white/10 text-white w-fit mb-8 group-hover:scale-110 transition-transform">
                                <HandHeart size={40} weight="fill" />
                            </div>
                            <h2 className="text-5xl font-black tracking-tighter mb-6">MAKE A<br />DONATION</h2>
                            <p className="text-xl text-white/80 font-medium leading-relaxed max-w-sm mb-12">
                                Your financial support fuels our resilience. 85% of every dollar goes directly to grassroots program execution.
                            </p>
                        </div>

                        <a href="/donate" className="flex items-center gap-3 px-8 py-4 bg-white text-[#8B1D1D] rounded-full font-black hover:scale-105 active:scale-95 transition-all w-fit shadow-xl">
                            DONATE TODAY
                            <Sparkle size={20} weight="fill" />
                        </a>
                    </div>
                </div>
            </section>

            {/* How it Works - Steps */}
            <section className="py-32 px-6 lg:px-20 steps-container">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
                    <div className="lg:w-1/3">
                        <h3 className="text-4xl font-black tracking-tighter mb-6 leading-tight">HOW EASY IT IS TO START HELPING.</h3>
                        <div className="h-1 w-20 bg-[#8B1D1D]" />
                    </div>

                    <div className="lg:w-2/3 space-y-12">
                        {steps.map((step, i) => (
                            <div key={i} className="step-item flex gap-8 group">
                                <div className="text-5xl font-black text-[#8B1D1D]/20 group-hover:text-[#8B1D1D] transition-colors tabular-nums">0{i + 1}</div>
                                <div>
                                    <h4 className="text-2xl font-black mb-3">{step.title}</h4>
                                    <p className="text-xl text-gray-500 font-medium leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="newsletter-section py-32 px-6 lg:px-20 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto text-center newsletter-form">
                    <div className="inline-flex items-center justify-center p-4 bg-gray-50 rounded-3xl mb-12">
                        <PaperPlaneTilt size={60} weight="thin" className="text-[#8B1D1D]" />
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">STAY IN THE <span className="italic">LOOP.</span></h2>
                    <p className="text-xl text-gray-500 font-medium mb-12 max-w-2xl mx-auto italic">
                        Get the latest chronicles of change, financial audits, and project updates delivered directly to your inbox.
                    </p>

                    <form className="relative max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 px-8 py-6 rounded-full bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-[#8B1D1D]/20 focus:border-[#8B1D1D] transition-all font-bold"
                        />
                        <button className="px-10 py-6 bg-[#333333] text-white rounded-full font-black text-lg hover:bg-black transition-all shadow-xl">
                            SUBSCRIBE
                        </button>
                    </form>
                    <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest">
                        <CheckCircle size={18} weight="bold" className="text-green-500" />
                        No spam. Only high-impact updates.
                    </div>
                </div>
            </section>
        </main>
    );
};

export default GetInvolved;
