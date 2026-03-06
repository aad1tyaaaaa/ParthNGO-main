import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Binoculars,
    Eye,
    Compass,
    UsersThree,
    Sparkle,
    CaretCircleDown
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const Vision = () => {
    const mainRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Line staggered reveal for Hero
            const heroHeadings = gsap.utils.toArray('.hero-heading span');
            gsap.from(heroHeadings, {
                y: 100,
                opacity: 0.2,
                duration: 1.2,
                stagger: 0.1,
                ease: "power4.out"
            });

            // Stagger for Trajectory headings
            gsap.from('.stagger-item > *', {
                scrollTrigger: {
                    trigger: '.trajectory-grid',
                    start: "top 90%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });

            // Milestone cards stagger
            gsap.from('.milestone-card', {
                scrollTrigger: {
                    trigger: '.trajectory-grid',
                    start: "top 80%",
                },
                y: 60,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "expo.out"
            });
        }, mainRef);

        return () => ctx.revert();
    }, []);


    const milestones = [
        { year: "2026", title: "Founding Vision", desc: "Parth Foundation established with a mission to bridge systemic gaps." },
        { year: "2027", title: "100 Villages Initiative", desc: "Scaling high-impact nutrition and primary education programs." },
        { year: "2028", title: "Global Advisory", desc: "Partnering with UN bodies to align with SDG targets for 2030." },
        { year: "2030", title: "The Sustainable Model", desc: "Decentralized community leadership in 500+ locations." }
    ];

    return (
        <main ref={mainRef} className="w-full min-h-screen bg-[#FFFDF5] text-[#333333] relative overflow-hidden">
            {/* Texture Overlay */}
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-overlay pointer-events-none z-50" />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 lg:px-20 min-h-[80vh] flex flex-col justify-center">
                <div className="absolute top-20 right-[10%] w-96 h-96 bg-[#8B1D1D]/5 rounded-full blur-[120px] -z-10 animate-pulse" />

                <div className="max-w-5xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#8B1D1D]/20 bg-[#8B1D1D]/5 mb-8">
                        <Binoculars size={18} weight="bold" className="text-[#8B1D1D]" />
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B1D1D]">Our North Star</span>
                    </div>

                    <h1 className="hero-heading text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-12">
                        <div className="overflow-hidden inline-block"><span className="inline-block">ARCHITECTING</span></div><br />
                        <div className="overflow-hidden inline-block"><span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#8B1D1D] to-[#8B1D1D]/70">DIGNIFIED</span></div><br />
                        <div className="overflow-hidden inline-block"><span className="inline-block">FUTURES.</span></div>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 max-w-2xl font-bold leading-relaxed">
                        We don't just dream of a better world; we engineer one through grassroots precision and unwavering transparency.
                    </p>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <CaretCircleDown size={32} weight="light" className="text-gray-300" />
                </div>
            </section>

            {/* Core Pillars / Values */}

            {/* Roadmap / Timeline */}
            {/* --- 4. TRAJECTORY BENTO SECTION --- */}
            <section className="py-32 px-4 lg:px-6 relative overflow-hidden">
                <div className="max-w-[1400px] mx-auto">

                    {/* Kinetic Background Label */}
                    <div className="absolute top-10 left-0 text-[15vw] font-black text-[#1A1A1A]/[0.02] leading-none pointer-events-none uppercase select-none">
                        Trajectory
                    </div>

                    <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
                        <div className="stagger-item">
                            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase">
                                Our<br /><span className="text-[#8B1D1D] italic">Trajectory.</span>
                            </h2>
                            <p className="text-gray-400 font-black tracking-[0.3em] uppercase text-xs mt-6">
                                Charting the next decade of systemic impact
                            </p>
                        </div>

                        <div className="hidden md:block pb-2">
                            <div className="flex items-center gap-4 text-gray-300">
                                <span className="w-12 h-[2px] bg-gray-200"></span>
                                <span className="text-[10px] font-black uppercase tracking-widest">Evolution Map</span>
                            </div>
                        </div>
                    </div>

                    {/* The Bento Timeline Grid */}
                    <div className="trajectory-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                        {milestones.map((milestone, i) => (
                            <div
                                key={i}
                                className="milestone-card bento-block group p-10 rounded-[40px] bg-white border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between min-h-[320px] relative overflow-hidden"
                            >
                                {/* Decorative Year Watermark */}
                                <div className="absolute -bottom-4 -right-4 text-8xl font-black text-gray-50 group-hover:text-[#8B1D1D]/5 transition-colors duration-500">
                                    {milestone.year.slice(-2)}
                                </div>

                                <div className="relative z-10">
                                    <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-[#8B1D1D]/5 text-[#8B1D1D] text-sm font-black mb-8 group-hover:bg-[#8B1D1D] group-hover:text-white transition-colors duration-500">
                                        {milestone.year}
                                    </div>
                                    <h4 className="text-2xl font-black tracking-tight mb-4 group-hover:text-[#8B1D1D] transition-colors">
                                        {milestone.title}
                                    </h4>
                                </div>

                                <p className="relative z-10 text-gray-500 font-bold leading-relaxed text-sm">
                                    {milestone.desc}
                                </p>

                                {/* Bottom Progress Indicator (Visual only) */}
                                <div className="relative z-10 w-full h-1 bg-gray-100 rounded-full mt-8 overflow-hidden">
                                    <div
                                        className="h-full bg-[#8B1D1D] transition-all duration-1000 ease-out"
                                        style={{ width: `${(i + 1) * 25}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer Callout */}
            <section className="py-32 bg-[#8B1D1D] text-white overflow-hidden relative">
                <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />

                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 max-w-4xl mx-auto leading-tight">
                        WANT TO BE PART OF THE <span className="italic">FUTURE?</span>
                    </h2>
                    <a href="/get-involved" className="inline-flex items-center gap-2 px-12 py-6 bg-white text-[#8B1D1D] rounded-full font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl">
                        JOIN THE MISSION
                        <Sparkle size={24} weight="fill" />
                    </a>
                </div>
            </section>
        </main>
    );
};

export default Vision;
