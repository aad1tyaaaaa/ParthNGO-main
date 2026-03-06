import { useLayoutEffect, useRef } from "react";
import { ArrowRight, Sparkle, Quotes, HandHeart, ArrowUpRight } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Local asset for home page hero
const homePageHeroImageUrl = "/home page.jpg";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            tl.from(".hero-title-line", {
                y: 100,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
            })
                .from(".hero-button", {
                    scale: 0.9,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                }, "-=0.8")
                .from(".impact-engine", {
                    opacity: 0,
                    y: 40,
                    duration: 1,
                }, "-=0.5");
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-screen pt-32 pb-20 bg-[#FFFDF5] overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-start">

                    {/* Left: Visual cluster */}
                    <div className="relative order-2 lg:order-1 flex justify-center lg:justify-start">
                        <div className="relative w-full max-w-md aspect-square">
                            <img
                                src={homePageHeroImageUrl}
                                alt="Parth Foundation - Mission in Action"
                                className="w-full h-full object-cover rounded-[100px] shadow-2xl relative z-10 opacity-100"
                            />
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#8A1E1E] rounded-full z-0 opacity-40" />
                            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#333333] rounded-full z-0 opacity-20" />
                        </div>
                    </div>

                    {/* Right: Copy & CTA */}
                    <div className="order-1 lg:order-2 space-y-12">
                        <div>
                            <h1 className="text-7xl md:text-[9rem] font-black text-[#1A1A1A] tracking-tighter leading-[0.8] uppercase">
                                <div className="overflow-hidden hero-title-line">BUILDING A</div>
                                <div className="overflow-hidden hero-title-line text-[#8A1E1E] italic">BETTER FUTURE.</div>
                            </h1>

                            <div className="mt-12 flex items-center gap-6">
                                <a
                                    href="https://forms.gle/MSXWwpM2g8XBb4ew6"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hero-button px-10 py-5 bg-[#8B1D1D] text-white font-black rounded-3xl hover:bg-[#6A1616] transition-all flex items-center gap-2 group shadow-xl shadow-[#8B1D1D]/20 uppercase tracking-widest text-xs"
                                >
                                    Get Started
                                    <ArrowUpRight size={18} weight="bold" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </a>
                                <button
                                    onClick={() => navigate('/stories')}
                                    className="hero-button px-10 py-5 bg-white text-[#1A1A1A] font-black rounded-3xl border-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all uppercase tracking-widest text-xs"
                                >
                                    View Archive
                                </button>
                            </div>
                        </div>

                        {/* Impact Engine */}
                        <div className="impact-engine p-12 bg-white rounded-[48px] border border-gray-100 shadow-xl shadow-[#8A1E1E]/5 relative overflow-hidden group">
                            <div className="absolute top-8 right-12 text-[10px] font-black tracking-widest text-gray-300 uppercase"> [Impact Engine] </div>
                            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 items-center">
                                <div>
                                    <div className="text-7xl font-black text-[#1A1A1A] tracking-tighter mb-1 leading-none">50K<span className="text-[#8A1E1E]">+</span></div>
                                    <div className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-400">Impacted Lives</div>
                                </div>
                                <div className="flex gap-10 items-end border-l border-gray-100 pl-10">
                                    <div className="space-y-1">
                                        <p className="text-3xl font-black text-[#1A1A1A]">5K+</p>
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Lives</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-3xl font-black text-[#1A1A1A]">120+</p>
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Projects</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-3xl font-black text-[#1A1A1A]">70+</p>
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Programs</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Banner CTA */}
                <div className="mt-20 relative p-16 lg:p-24 rounded-[64px] bg-[#1A1A1A] text-white overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="space-y-8">
                            <Quotes size={80} weight="fill" className="text-[#8B1D1D] opacity-40 mb-4" />
                            <h2 className="text-6xl md:text-[7rem] font-black tracking-tighter leading-[0.8] uppercase">
                                Architecting<br />Legacy.
                            </h2>
                            <p className="text-xl font-medium text-white/50 max-w-lg italic">
                                Support our strategic mission to revolutionize social impact through radical empowerment.
                            </p>
                        </div>

                        <div className="relative w-64 h-64 cursor-pointer group scale-110 lg:scale-125 transition-transform duration-500" onClick={() => navigate('/donate')}>
                            <div className="absolute inset-0 border-2 border-[#8B1D1D]/30 border-dashed rounded-full animate-[spin_20s_linear_infinite]" />
                            <div className="absolute inset-4 rounded-full bg-white flex flex-col items-center justify-center text-[#1A1A1A] gap-2 shadow-2xl group-hover:bg-[#8B1D1D] group-hover:text-white transition-colors">
                                <HandHeart size={48} weight="fill" className="text-[#8B1D1D] group-hover:text-white" />
                                <div className="text-[10px] font-black tracking-widest uppercase">Donate Now</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;