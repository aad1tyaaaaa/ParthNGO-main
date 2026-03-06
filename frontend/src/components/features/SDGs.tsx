import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Globe } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const getSDGIconUrl = (goalNumber: number) =>
    `https://open-sdg.github.io/sdg-translations/assets/img/goals/en/${goalNumber}.png`;

interface SDGGoal {
    id: number;
    title: string;
    desc: string;
    imgSrc: string;
    span: string;
}

const goals: SDGGoal[] = [
    { id: 1, title: "No Poverty", imgSrc: getSDGIconUrl(1), desc: "Ending poverty in all its forms everywhere.", span: "col-span-1" },
    { id: 2, title: "Zero Hunger", imgSrc: getSDGIconUrl(2), desc: "Achieving food security and improved nutrition.", span: "col-span-1" },
    { id: 3, title: "Good Health", imgSrc: getSDGIconUrl(3), desc: "Ensuring healthy lives and promoting well-being for all ages.", span: "col-span-1 md:col-span-2" },
    { id: 4, title: "Quality Education", imgSrc: getSDGIconUrl(4), desc: "Inclusive and equitable quality education for all.", span: "col-span-1 md:col-span-2" },
    { id: 5, title: "Gender Equality", imgSrc: getSDGIconUrl(5), desc: "Achieving gender equality and empowering women.", span: "col-span-1" },
    { id: 6, title: "Clean Water", imgSrc: getSDGIconUrl(6), desc: "Availability and sustainable management of water.", span: "col-span-1" },
    { id: 8, title: "Decent Work", imgSrc: getSDGIconUrl(8), desc: "Promoting sustained, inclusive economic growth.", span: "col-span-1" },
    { id: 10, title: "Reduced Inequality", imgSrc: getSDGIconUrl(10), desc: "Reducing inequality within and among countries.", span: "col-span-1" },
    { id: 11, title: "Sustainable Cities", imgSrc: getSDGIconUrl(11), desc: "Making cities inclusive, safe, resilient and sustainable.", span: "col-span-1" },
    { id: 16, title: "Peace & Justice", imgSrc: getSDGIconUrl(16), desc: "Promoting peaceful and inclusive societies.", span: "col-span-1" },
];

const SDGCard = ({ goal }: { goal: SDGGoal }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const xTo = useRef<gsap.QuickToFunc>();
    const yTo = useRef<gsap.QuickToFunc>();

    useEffect(() => {
        if (!cardRef.current) return;
        xTo.current = gsap.quickTo(cardRef.current, "rotateY", { duration: 0.4, ease: "power3.out" });
        yTo.current = gsap.quickTo(cardRef.current, "rotateX", { duration: 0.4, ease: "power3.out" });
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        xTo.current?.((x / rect.width) * 16);
        yTo.current?.((y / rect.height) * -16);
    };

    const handleMouseLeave = () => {
        xTo.current?.(0);
        yTo.current?.(0);
    };

    return (
        <div className={`h-full perspective-1000 ${goal.span}`}>
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative h-full min-h-[320px] rounded-[40px] bg-white border border-gray-100 hover:border-[#8B1D1D]/30 transition-all duration-500 overflow-hidden transform-style-3d will-change-transform shadow-lg hover:shadow-2xl"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-[#8B1D1D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 p-10 h-full flex flex-col items-center text-center">
                    <div className="relative w-40 h-40 mb-10 transform transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-2 drop-shadow-2xl">
                        <img
                            src={goal.imgSrc}
                            alt={goal.title}
                            className="w-full h-full object-contain rounded-2xl grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all shadow-xl"
                            loading="lazy"
                        />
                    </div>

                    <div className="mt-auto w-full">
                        <h4 className="text-xl font-black text-[#333333] mb-3 group-hover:text-[#8B1D1D] transition-colors tracking-tight">
                            {goal.title}
                        </h4>
                        <p className="text-base text-gray-500 font-bold leading-relaxed opacity-60 group-hover:opacity-100 transition-all duration-500">
                            {goal.desc}
                        </p>
                    </div>

                    <div className="absolute top-6 right-8 text-5xl font-black text-[#8B1D1D]/5 pointer-events-none select-none">
                        {goal.id}
                    </div>
                </div>
            </div>
        </div >
    );
};

const SDGs: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
            gsap.from(".sdg-card-wrapper", {
                y: 60,
                opacity: 0.1,
                scale: 0.95,
                duration: 1,
                stagger: 0.1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".sdg-grid",
                    start: "top 85%",
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="sdgs" ref={sectionRef} className="relative py-40 bg-[#FFFDF5] overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                <div className="text-center mb-24 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#8B1D1D]/20 bg-white/50 mb-10 shadow-sm">
                        <Globe size={20} weight="fill" className="text-[#8B1D1D]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8B1D1D]">UN Framework Alignment</span>
                    </div>

                    <h2 className="text-5xl md:text-8xl font-black text-[#333333] mb-10 tracking-tighter leading-none">
                        GLOBAL<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B1D1D] to-[#8B1D1D]/50 italic">OBJECTIVES.</span>
                    </h2>
                    <p className="text-2xl text-gray-500 font-medium leading-tight max-w-2xl mx-auto italic">
                        Our resilience metrics are directly mapped to the UN Sustainable Development Goals for objective, global verification.
                    </p>
                </div>

                <div className="sdg-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 lg:gap-16">
                    {goals.map((goal) => (
                        <div key={goal.id} className="sdg-card-wrapper h-full min-h-[400px]">
                            <SDGCard goal={goal} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SDGs;
