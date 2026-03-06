import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ShieldCheck,
    Bank,
    ChartPieSlice,
    SealCheck,
    Certificate,
    ArrowUpRight,
    Eyedropper,
    Scales
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const Transparency = () => {
    const mainRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.bento-item', {
                scrollTrigger: {
                    trigger: mainRef.current,
                    start: "top 85%",
                },
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out"
            });

            gsap.from('.financial-bar', {
                scrollTrigger: {
                    trigger: '.financial-block',
                    start: "top 70%",
                },
                width: 0,
                duration: 1.5,
                stagger: 0.2,
                ease: "expo.out"
            });
        }, mainRef);

        return () => ctx.revert();
    }, []);

    const finances = [
        { label: "Direct Program Costs", percent: 85, color: "bg-[#8A1E1E]" },
        { label: "Community Infrastructure", percent: 8, color: "bg-[#1A1A1A]" },
        { label: "Operational Resilience", percent: 4, color: "bg-gray-400" },
        { label: "Fundraising", percent: 3, color: "bg-[#FFD166]" }
    ];

    return (
        <main ref={mainRef} className="w-full min-h-screen bg-[#FFFDF5] text-[#1A1A1A] relative overflow-hidden selection:bg-[#8A1E1E] selection:text-white pb-32">
            {/* Texture Overlay */}
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-overlay pointer-events-none z-50" />

            <div className="max-w-[1400px] mx-auto p-4 sm:p-8 lg:p-12 pt-24 lg:pt-32">

                {/* 1. HERO HEADER BLOCK */}
                <div className="bento-item grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
                    <div className="lg:col-span-8">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#8A1E1E]/5 border border-[#8A1E1E]/10 mb-8">
                            <ShieldCheck size={18} weight="fill" className="text-[#8A1E1E]" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8A1E1E]">Unwavering Honesty</span>
                        </div>
                        <h1 className="text-[12vw] lg:text-[8rem] font-black tracking-tighter leading-[0.8] uppercase mb-8">
                            Open<br /><span className="text-[#8A1E1E] italic">Books.</span>
                        </h1>
                        <p className="text-xl lg:text-3xl font-bold text-[#1A1A1A]/80 leading-tight max-w-3xl">
                            Architecting social equity requires a foundation of absolute truth. We believe trust isn't given—it's engineered through radical transparency.
                        </p>
                    </div>
                    <div className="lg:col-span-4 flex flex-col justify-end items-start lg:items-end">
                        <div className="p-8 bg-white rounded-[32px] border border-gray-100 shadow-xl shadow-[#8A1E1E]/5 text-left lg:text-right">
                            <Scales size={48} weight="fill" className="text-[#8A1E1E] mb-6 lg:ml-auto" />
                            <h3 className="text-2xl font-black tracking-tighter uppercase mb-2">Ethics First.</h3>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                                Audited by Global Standards.<br />Zero Dark Channels.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 2. MAIN FINANCIAL BENTO CLUSTER */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

                    {/* Financial Breakdown (Big Card) */}
                    <div className="bento-item lg:col-span-8 bg-white rounded-[40px] p-8 lg:p-14 shadow-xl shadow-[#8A1E1E]/5 border border-white relative overflow-hidden flex flex-col lg:flex-row gap-12 financial-block">
                        <div className="flex-1 space-y-10">
                            <div>
                                <h2 className="text-4xl lg:text-6xl font-black tracking-tighter leading-none mb-6">WHERE EVERY<br />RUPEE GOES.</h2>
                                <p className="text-gray-500 font-medium leading-relaxed">
                                    We maintain a rigorous efficiency ratio, ensuring that the vast majority of resources reach the people who need them most. Our overhead is lean, but our impact is massive.
                                </p>
                            </div>

                            <div className="space-y-8">
                                {finances.map((item, i) => (
                                    <div key={i} className="space-y-3">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">{item.label}</span>
                                            <span className="text-2xl font-black text-[#1A1A1A]">{item.percent}%</span>
                                        </div>
                                        <div className="h-3 w-full bg-gray-50 rounded-full overflow-hidden">
                                            <div
                                                className={`financial-bar h-full ${item.color} rounded-full`}
                                                style={{ width: `${item.percent}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 bg-[#8A1E1E] rounded-[32px] p-10 text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                            <Bank size={120} weight="thin" className="text-white/20 mb-8" />
                            <div className="text-9xl font-black tracking-tighter mb-4 leading-none">85<span className="text-3xl ml-2">%</span></div>
                            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#FFD166] max-w-[200px]">Strategic Program Disbursement</p>
                        </div>
                    </div>

                    {/* Trust Block (Side Card) */}
                    <div className="bento-item lg:col-span-4 bg-[#1A1A1A] rounded-[40px] p-10 flex flex-col justify-between text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-[#8A1E1E]/20 rounded-full blur-[100px]" />

                        <div>
                            <Eyedropper size={48} weight="fill" className="text-[#8A1E1E] mb-8" />
                            <h3 className="text-4xl font-black tracking-tighter uppercase leading-[0.9] mb-4">
                                Zero<br />Leaks.<br />Final.
                            </h3>
                            <p className="text-gray-400 font-medium text-sm leading-relaxed italic">
                                "In the infrastructure of social equity, every leaked cent is a failure of architecture."
                            </p>
                        </div>

                        <div className="pt-10 border-t border-white/10 space-y-4">
                            <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest">
                                <ShieldCheck size={20} weight="fill" className="text-[#8A1E1E]" />
                                Bi-Weekly Audits
                            </div>
                            <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest">
                                <SealCheck size={20} weight="fill" className="text-[#8A1E1E]" />
                                Real-Time Tracking
                            </div>
                        </div>
                    </div>

                    {/* Accreditations (Bottom Full Width Block) */}
                    <div className="bento-item lg:col-span-12 bg-[#F4ECE3] rounded-[40px] p-10 lg:p-16">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                            <div className="max-w-md">
                                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4">Accreditation</h3>
                                <p className="text-2xl font-black tracking-tighter text-[#1A1A1A] uppercase leading-none">
                                    Validated by the worlds most trusted bodies.
                                </p>
                            </div>
                            <div className="flex-1 grid grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-16 opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700">
                                {[SealCheck, Certificate, ChartPieSlice, ShieldCheck, Bank].map((Icon, i) => (
                                    <div key={i} className="flex flex-col items-center gap-3">
                                        <Icon size={48} weight="thin" className="text-[#1A1A1A]" />
                                        <span className="text-[9px] font-black tracking-[0.2em] uppercase text-center">Standard {i + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Call to Action */}
                <div className="bento-item mt-24 text-center">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#8A1E1E] mb-8">Verify our impact</h3>
                    <div className="flex flex-wrap justify-center gap-6">
                        <a
                            href="https://forms.gle/MSXWwpM2g8XBb4ew6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#8A1E1E] text-white px-10 py-5 rounded-3xl font-black uppercase tracking-widest text-[12px] flex items-center gap-2 hover:bg-[#6A1616] transition-all"
                        >
                            Become a Volunteer
                            <ArrowUpRight size={18} weight="bold" />
                        </a>
                        <a
                            href="/donate"
                            className="bg-[#1A1A1A] text-white px-10 py-5 rounded-3xl font-black uppercase tracking-widest text-[12px] flex items-center gap-2 hover:bg-black transition-all"
                        >
                            Donate Securely
                            <ArrowUpRight size={18} weight="bold" />
                        </a>
                    </div>
                </div>

            </div>
        </main>
    );
};

export default Transparency;
