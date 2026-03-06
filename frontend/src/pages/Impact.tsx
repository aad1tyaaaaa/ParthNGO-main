import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Users,
    HandHeart,
    Buildings,
    BookOpen,
    Heartbeat,
    Leaf,
    ArrowRight,
    CaretRight
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

// Custom Hook for counting up
const CountUp = ({ end, duration = 2 }: { end: number, duration?: number }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef<HTMLSpanElement>(null);

    useLayoutEffect(() => {
        const obj = { val: 0 };
        gsap.to(obj, {
            val: end,
            duration: duration,
            ease: "power2.out",
            scrollTrigger: {
                trigger: countRef.current,
                start: "top 90%",
            },
            onUpdate: () => setCount(Math.floor(obj.val))
        });
    }, [end, duration]);

    return <span ref={countRef}>{count.toLocaleString()}</span>;
};

const Impact = () => {
    const mainRef = useRef<HTMLDivElement>(null);
    const [activeFocus, setActiveFocus] = useState(0);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.impact-stat', {
                scrollTrigger: {
                    trigger: '.stats-container',
                    start: "top 80%",
                },
                y: 40,
                opacity: 0.1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            });

            gsap.from('.focus-item', {
                scrollTrigger: {
                    trigger: '.focus-grid',
                    start: "top 80%",
                },
                x: 30,
                opacity: 0.1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out"
            });
        }, mainRef);

        return () => ctx.revert();
    }, []);

    const stats = [
        { icon: Users, label: "Lives Touched", value: 40, prefix: "" },
        { icon: HandHeart, label: "Funds Raised", value: 1264, prefix: "₹" },
        { icon: Buildings, label: "Projects Completed", value: 14, prefix: "" },
    ];

    const focusAreas = [
        {
            title: "Inclusive Education",
            icon: BookOpen,
            desc: "Bridging the digital divide and providing high-quality educational resources to remote communities in the Global South.",
            impact: "12,000+ students enrolled",
            image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=1000&fit=crop"
        },
        {
            title: "Healthcare Equity",
            icon: Heartbeat,
            desc: "Establishing community-led primary health centers and rural oncology support networks.",
            impact: "45 clinics established",
            image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=1000&fit=crop"
        },
        {
            title: "Climate Resilience",
            icon: Leaf,
            desc: "Implementing sustainable water management systems and regenerative farming practices.",
            impact: "500ha land restored",
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=1000&fit=crop"
        }
    ];

    return (
        <main ref={mainRef} className="w-full min-h-screen bg-[#FFFDF5] text-[#333333] relative">
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-overlay pointer-events-none z-50" />

            {/* Impact Hero */}
            <section className="pt-32 pb-24 px-6 lg:px-20 border-b border-gray-100">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
                    <div className="max-w-3xl">
                        <div className="mb-6 h-1 w-20 bg-[#8B1D1D]" />
                        <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-8">
                            MEASURING<br /><span className="text-[#8B1D1D]">HUMAN</span> PROGRESS.
                        </h1>
                        <p className="text-2xl font-bold text-gray-600 leading-tight">
                            We track impact not in spreadsheets, but in the strengthened autonomy of the communities we serve.
                        </p>
                    </div>
                </div>
            </section>

            {/* The Numbers */}
            <section className="py-32 px-6 lg:px-20 stats-container">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="impact-stat border-t border-gray-200 pt-10 group">
                            <div className="flex items-center gap-3 mb-6 text-gray-400 group-hover:text-[#8B1D1D] transition-colors duration-500">
                                <stat.icon size={32} />
                                <span className="font-bold uppercase tracking-widest text-xs">{stat.label}</span>
                            </div>
                            <div className="text-6xl md:text-8xl font-black tracking-tighter">
                                {stat.prefix}<CountUp end={stat.value} />
                                {stat.prefix === "" && <span className="text-[#8B1D1D]">+</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Interactive Focus Areas */}
            <section className="py-32 bg-white flex flex-col items-center">
                <div className="max-w-7xl w-full px-6 lg:px-20">
                    <div className="mb-20">
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 max-w-2xl">WHERE WE <span className="text-[#8B1D1D]/70 italic">FOCUS</span> OUR PRECISION.</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="focus-grid space-y-6">
                            {focusAreas.map((area, i) => (
                                <button
                                    key={i}
                                    onMouseEnter={() => setActiveFocus(i)}
                                    className={`focus-item w-full text-left p-8 rounded-[32px] transition-all duration-500 flex items-start gap-6 group hover:translate-x-2 ${activeFocus === i ? 'bg-[#8B1D1D] text-white shadow-2xl shadow-[#8B1D1D]/20' : 'bg-gray-50 hover:bg-gray-100 text-[#333333]'}`}
                                >
                                    <div className={`shrink-0 p-4 rounded-2xl ${activeFocus === i ? 'bg-white/20' : 'bg-[#8B1D1D]/10'}`}>
                                        <area.icon size={32} weight={activeFocus === i ? 'fill' : 'bold'} className={activeFocus === i ? 'text-white' : 'text-[#8B1D1D]'} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold mb-2 flex items-center justify-between">
                                            {area.title}
                                            <CaretRight size={20} className={`transition-transform duration-500 ${activeFocus === i ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`} />
                                        </h3>
                                        <p className={`font-medium leading-relaxed ${activeFocus === i ? 'text-white/80' : 'text-gray-500'}`}>
                                            {area.desc}
                                        </p>
                                        <div className={`mt-6 font-black text-sm uppercase tracking-widest ${activeFocus === i ? 'text-white' : 'text-[#8B1D1D]'}`}>
                                            {area.impact}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="relative aspect-[3/4] rounded-[48px] overflow-hidden shadow-2xl hidden lg:block">
                            {focusAreas.map((area, i) => (
                                <img
                                    key={i}
                                    src={area.image}
                                    alt={area.title}
                                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${activeFocus === i ? 'opacity-100' : 'opacity-0'}`}
                                />
                            ))}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Regional Map Placeholder */}
            <section className="py-32 px-6 lg:px-20 relative overflow-hidden bg-[#FFFDF5]">
                <div className="max-w-7xl mx-auto bg-gray-100 rounded-[64px] aspect-video relative flex items-center justify-center p-20 border border-gray-200">
                    <div className="absolute inset-0 opacity-[0.05] grayscale contrast-150 scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600&h=900&fit=crop')", backgroundSize: 'cover' }} />
                    <div className="text-center relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8">GLOBAL FOOTPRINT</h2>
                        <p className="text-gray-400 font-bold tracking-[0.4em] uppercase text-xs mb-12">Click regions to see local projects</p>
                        <div className="flex flex-wrap justify-center gap-6">
                            {['Southeast Asia', 'Sub-Saharan Africa', 'Rural India', 'Latin America'].map((region) => (
                                <div key={region} className="px-6 py-3 bg-white rounded-full border border-gray-200 font-bold text-sm shadow-sm hover:-translate-y-1 transition-transform cursor-pointer">
                                    {region}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 px-6 lg:px-20 flex flex-col items-center justify-center bg-[#8B1D1D] text-white">
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-12 text-center">FUEL THE IMPACT.</h2>
                <a href="/donate" className="group flex items-center gap-4 px-12 py-8 bg-white text-[#8B1D1D] rounded-full font-black text-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl">
                    MAKE A DONATION
                    <HandHeart size={32} weight="fill" className="group-hover:rotate-12 transition-transform" />
                </a>
            </section>
        </main>
    );
};

export default Impact;
