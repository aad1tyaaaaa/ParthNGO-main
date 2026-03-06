import { useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Play, CaretLeft, CaretRight, Quotes, Handshake, ArrowUpRight } from '@phosphor-icons/react';
import SDGs from '@/components/features/SDGs';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const navigate = useNavigate();
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entrance for Bento boxes
      gsap.from('.bento-item', {
        scrollTrigger: {
          trigger: mainRef.current,
          start: 'top 85%',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      });

      // Infinite spin for the donation ring
      gsap.to('.spin-ring', {
        rotation: 360,
        duration: 15,
        repeat: -1,
        ease: 'linear',
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const pillStories = [
    { name: 'Amina & Leila', loc: 'Iraq water', image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=100&h=100&fit=crop' },
    { name: 'Marcus', loc: 'Ghana library', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    { name: 'Marcus', loc: 'Ghana', image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=100&h=100&fit=crop' },
    { name: 'Fatima', loc: 'Afghan coop', image: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=100&h=100&fit=crop' },
  ];

  const avatars = [
    "https://i.pravatar.cc/100?img=1",
    "https://i.pravatar.cc/100?img=2",
    "https://i.pravatar.cc/100?img=3",
    "https://i.pravatar.cc/100?img=4"
  ];

  return (
    <main ref={mainRef} className="w-full min-h-screen bg-[#FFFDF5] text-[#1A1A1A] relative overflow-hidden selection:bg-[#8A1E1E] selection:text-white pb-20">
      {/* Texture Overlay */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-overlay pointer-events-none z-50" />

      {/* BENTO GRID CONTAINER */}
      <div className="max-w-[1500px] mx-auto p-4 sm:p-6 lg:p-10 pt-16 lg:pt-24 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

        {/* 1. HERO IMAGE BOX */}
        <div className="bento-item col-span-1 lg:col-span-5 bg-[#F4ECE3] rounded-[40px] relative overflow-hidden flex flex-col items-center justify-end min-h-[400px] lg:min-h-[600px] shadow-xl shadow-[#8A1E1E]/5">
          <div className="absolute top-[15%] left-[10%] w-6 h-6 bg-[#1A1A1A] rounded-full" />
          <div className="absolute top-[25%] left-[5%] w-10 h-16 bg-[#F4ECE3] border-4 border-[#8A1E1E] rounded-full -rotate-12" />
          <div className="absolute top-[10%] right-[15%] w-16 h-24 bg-[#8A1E1E] rounded-full rotate-45" />
          <div className="absolute top-[35%] right-[5%] w-12 h-12 bg-[#1A1A1A] rounded-full" />
          <div className="absolute top-[45%] left-[15%] w-16 h-16 bg-[#8A1E1E] rounded-sm rotate-12" />

          <img
            src="/home page.jpg"
            alt="Parth Foundation - Mission in Action"
            className="relative z-10 w-[85%] object-cover object-top drop-shadow-2xl translate-y-8 opacity-100"
          />
        </div>

        {/* 2. HERO TEXT BOX */}
        <div className="bento-item col-span-1 lg:col-span-7 flex flex-col justify-center px-4 lg:px-12 py-8 lg:py-0">
          <h1 className="text-[12vw] lg:text-[7.5rem] font-black tracking-tighter leading-[0.8] text-[#1A1A1A] uppercase">
            The More we Share<br />
            <span className="text-[#8A1E1E] italic">The More we Have.</span>
          </h1>

          <div className="flex flex-wrap items-center gap-6 mt-12">
            <div className="flex -space-x-4">
              {avatars.slice(0, 3).map((src, i) => (
                <img key={i} src={src} className="w-14 h-14 rounded-full border-4 border-white object-cover shadow-lg" alt="Supporter" />
              ))}
            </div>
            <a
              href="https://forms.gle/MSXWwpM2g8XBb4ew6"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 rounded-3xl bg-[#8A1E1E] text-white font-black text-sm hover:bg-[#6A1616] hover:shadow-2xl hover:shadow-[#8A1E1E]/20 transition-all uppercase tracking-widest flex items-center gap-3 relative group overflow-hidden"
            >
              Get Started
              <ArrowUpRight size={20} weight="bold" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <button
              onClick={() => navigate('/stories')}
              className="px-10 py-5 rounded-3xl border-2 border-[#1A1A1A] text-[#1A1A1A] font-black text-sm hover:bg-[#1A1A1A] hover:text-white transition-all uppercase tracking-widest"
            >
              View Archive
            </button>
          </div>
        </div>

        {/* 3. IMPACT ENGINE */}
        <div className="bento-item col-span-1 lg:col-span-7 bg-white rounded-[40px] p-10 lg:p-14 flex flex-col lg:flex-row gap-12 shadow-xl shadow-[#8A1E1E]/5 border border-white">
          <div className="flex-1">
            <p className="text-[11px] font-black tracking-[0.3em] uppercase text-[#8A1E1E] mb-6">Live Impact Engine</p>
            <div className="flex items-end gap-6 mb-4">
              <h2 className="text-8xl lg:text-9xl font-black tracking-tighter text-[#1A1A1A] leading-none">50K<span className="text-[#8A1E1E]">+</span></h2>
              <div className="flex items-end gap-2 pb-3">
                <div className="w-3 h-8 bg-[#8A1E1E] rounded-full animate-pulse" />
                <div className="w-3 h-14 bg-gray-200 rounded-full" />
                <div className="w-3 h-20 bg-gray-200 rounded-full" />
                <div className="w-3 h-12 bg-[#8A1E1E] rounded-full animate-pulse delay-100" />
              </div>
            </div>
            <p className="text-sm font-black tracking-[0.2em] uppercase text-gray-500">Global Impacted Lives</p>
          </div>

          <div className="flex-1 flex flex-col justify-between pt-4">
            <p className="text-[17px] font-bold leading-relaxed text-[#1A1A1A] mb-8 italic">
              "We don't just redistribute wealth; we architect the precision engineering of social equity across the globe."
            </p>
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Lives</p>
                <p className="text-3xl font-black tracking-tighter text-[#1A1A1A]">5K+</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Projects</p>
                <p className="text-3xl font-black tracking-tighter text-[#1A1A1A]">120+</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Programs</p>
                <p className="text-3xl font-black tracking-tighter text-[#1A1A1A]">70+</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. RATING BOX */}
        <div className="bento-item col-span-1 md:col-span-4 lg:col-span-5 bg-[#FFD166] rounded-[40px] p-10 relative overflow-hidden shadow-xl shadow-[#FFD166]/10">
          <div className="flex justify-between items-start mb-8">
            <p className="text-[11px] font-black tracking-[0.3em] uppercase text-[#1A1A1A]">Trust Badge</p>
            <div className="flex items-center gap-3">
              <span className="text-6xl font-black tracking-tighter text-[#1A1A1A]">4.9</span>
              <Star size={40} weight="fill" className="text-[#1A1A1A]" />
            </div>
          </div>

          <p className="text-xl font-black leading-tight text-[#1A1A1A] relative z-10 max-w-[90%] uppercase">
            Empowering lives since 2026. Join the global inner circle.
          </p>

          <div className="mt-12 relative h-16">
            <img src={avatars[0]} className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-[#FFD166] shadow-xl" alt="user" />
            <img src={avatars[1]} className="absolute top-0 left-10 w-16 h-16 rounded-full border-4 border-[#FFD166] shadow-xl z-10" alt="user" />
            <img src={avatars[2]} className="absolute top-0 left-20 w-16 h-16 rounded-full border-4 border-[#FFD166] shadow-xl z-20" alt="user" />
            <div className="absolute top-0 left-[120px] h-16 px-6 bg-[#1A1A1A] text-white rounded-full flex items-center justify-center text-[13px] font-black border-4 border-[#FFD166] shadow-xl z-30">
              5K+ SUPPORTERS
            </div>
          </div>
        </div>

        {/* 5. SDG BLOCK / Extra Visual */}
        <div className="bento-item lg:col-span-12">
          <SDGs />
        </div>

        {/* 6. MASSIVE FOOTER CTA */}
        <div className="bento-item col-span-1 lg:col-span-12 bg-[#8A1E1E] rounded-[48px] p-12 lg:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group shadow-3xl shadow-[#8A1E1E]/20">
          <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-white opacity-5 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex-1">
            <Quotes size={64} weight="fill" className="text-white opacity-20 mb-8" />
            <h2 className="text-6xl lg:text-[8rem] font-black tracking-tighter uppercase mb-8 leading-[0.75]">
              Architecting<br />
              <span className="text-[#FFD166]">Equity.</span>
            </h2>
            <p className="text-2xl font-medium text-white/80 max-w-xl italic leading-relaxed">
              Join our mission to revolutionize social impact through radical transparency and strategic empowerment.
            </p>
          </div>

          <div className="relative z-10 shrink-0 w-64 h-64 cursor-pointer group scale-110 lg:scale-125" onClick={() => navigate('/donate')}>
            <div className="absolute inset-0 border-4 border-[#FFD166]/30 border-dashed rounded-full spin-ring" />

            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]" style={{ animationDirection: 'reverse' }}>
              <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
              <text className="text-[9px] font-black uppercase tracking-[0.25em] fill-[#FFD166]">
                <textPath href="#circlePath" startOffset="0%">
                  Make a Donation • Make a Donation •
                </textPath>
              </text>
            </svg>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full flex items-center justify-center text-[#8A1E1E] group-hover:scale-105 transition-all duration-500 shadow-3xl group-hover:bg-[#FFD166] group-hover:text-[#1A1A1A]">
              <Handshake size={56} weight="fill" />
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Home;