import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Quotes,
    LinkedinLogo,
    TwitterLogo,
    InstagramLogo,
    Globe
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const mainRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Hero reveal
            gsap.from('.about-hero-text', {
                y: 60,
                opacity: 0.1,
                duration: 1.2,
                ease: "power4.out"
            });

            // Split section reveal
            gsap.from('.story-image', {
                scrollTrigger: {
                    trigger: '.story-section',
                    start: "top 70%",
                },
                x: -100,
                opacity: 0.1,
                duration: 1.5,
                ease: "power3.out"
            });

            // Team stagger
            gsap.from('.team-card', {
                scrollTrigger: {
                    trigger: '.team-grid',
                    start: "top 80%",
                },
                y: 50,
                opacity: 0.1,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out"
            });

            // Philosophy quote
            gsap.from('.philosophy-content', {
                scrollTrigger: {
                    trigger: '.philosophy-section',
                    start: "top 70%",
                },
                scale: 0.95,
                opacity: 0.1,
                duration: 1.2,
                ease: "expo.out"
            });
        }, mainRef);

        return () => ctx.revert();
    }, []);

    const team = [
        {
            name: "Dr. Ananya Parth",
            role: "Founder & CEO",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=600&fit=crop",
            bio: "Former clinical researcher dedicated to solving rural healthcare challenges through grassroots innovation."
        },
        {
            name: "Marcus Thorne",
            role: "Chief of Operations",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop",
            bio: "20 years of experience in managing international NGO logistics across Africa and Southeast Asia."
        },
        {
            name: "Sarah Jenkins",
            role: "Director of Education",
            image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=500&h=600&fit=crop",
            bio: "Education strategist focused on digital literacy and curriculum development for underprivileged children."
        },
        {
            name: "Rahul Mehra",
            role: "Sustainability Lead",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=600&fit=crop",
            bio: "Environmental engineer pioneering decentralized waste management models for small communities."
        }
    ];

    return (
        <main ref={mainRef} className="w-full min-h-screen bg-[#FFFDF5] text-[#333333] relative">
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-50" />

            {/* Editorial Hero */}
            <section className="pt-32 pb-24 px-6 lg:px-20 border-b border-gray-100">
                <div className="max-w-5xl">
                    <h1 className="about-hero-text text-7xl md:text-9xl font-black tracking-tighter leading-none mb-12">
                        THE <span className="text-[#8B1D1D]">GENESIS</span> OF<br />CHANGE.
                    </h1>
                    <p className="about-hero-text text-2xl md:text-3xl font-medium text-gray-500 leading-tight max-w-3xl">
                        Founded in 2026, Parth Foundation was born from a single realization: aid is temporary, but empowerment is eternal.
                    </p>
                </div>
            </section>

            {/* Our Story - Split Layout */}
            <section className="story-section py-32 px-6 lg:px-20">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                    <div className="story-image relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1000&h=1200&fit=crop"
                            alt="Our Founding Story"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    <div className="space-y-8">
                        <div className="h-1 w-20 bg-[#8B1D1D] mb-4" />
                        <h2 className="text-5xl font-black tracking-tighter mb-8 leading-tight">ROOTED IN REALITY,<br />DRIVEN BY EMPATHY.</h2>
                        <div className="prose prose-xl prose-gray font-medium">
                            <p className="text-gray-600 leading-relaxed italic border-l-4 border-[#8B1D1D]/20 pl-6 mb-8">
                                "We didn't start in a boardroom. We started sitting on the dirt floor of a remote village clinic, realizing that the system wasn't broken—it was simply missing."
                            </p>
                            <p className="text-gray-500 mb-6">
                                Parth Foundation represents a paradigm shift in how NGOs operate. We prioritize technical precision alongside human connection, ensuring that every dollar spent translates into a life permanently improved.
                            </p>
                            <p className="text-gray-500">
                                Over the last few years, we've evolved from a local healthcare initiative into a multi-disciplinary powerhouse for social development, touching lives across borders and boundaries.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section - Inverted Maroon */}
            <section className="philosophy-section py-32 bg-[#8B1D1D] text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px]" />

                <div className="max-w-5xl mx-auto px-6 text-center philosophy-content relative z-10">
                    <Quotes size={80} weight="fill" className="mx-auto mb-12 text-white/20" />
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-12">
                        "OUR PHILOSOPHY IS SIMPLE: EVERY INDIVIDUAL IS A SEED OF POTENTIAL, WAITING FOR THE RIGHT SOIL."
                    </h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-px w-12 bg-white/30" />
                        <span className="text-xl font-bold tracking-widest uppercase">The Parth Manifesto</span>
                        <div className="h-px w-12 bg-white/30" />
                    </div>
                </div>
            </section>

            {/* Team Grid */}
            <section className="py-32 px-6 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-20 text-center">
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">THE ARCHITECTS</h2>
                        <p className="text-gray-400 font-bold tracking-[0.3em] uppercase text-xs">A world-class team with a single focus</p>
                    </div>

                    <div className="team-grid grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, i) => (
                            <div key={i} className="team-card group">
                                <div className="relative aspect-[3/4] rounded-[32px] overflow-hidden mb-6 shadow-lg border border-gray-100">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-[#8B1D1D] to-transparent">
                                        <div className="flex justify-center gap-4">
                                            <LinkedinLogo size={24} weight="fill" className="text-white hover:scale-125 transition-transform cursor-pointer" />
                                            <TwitterLogo size={24} weight="fill" className="text-white hover:scale-125 transition-transform cursor-pointer" />
                                            <Globe size={24} weight="fill" className="text-white hover:scale-125 transition-transform cursor-pointer" />
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black mb-1 group-hover:text-[#8B1D1D] transition-colors">{member.name}</h3>
                                <p className="text-[#8B1D1D] font-bold text-xs uppercase tracking-widest mb-4">{member.role}</p>
                                <p className="text-gray-500 text-sm font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    {member.bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default About;
