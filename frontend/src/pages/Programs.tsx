import { useRef, useLayoutEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Trophy, HandHeart, UsersThree, Globe } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const Programs = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  const programs = [
    {
      number: '70',
      label: 'PROGRAMS FUNDED',
      description: 'We back local solutions that change lives, from climate to girls\' education in Nepal.',
      icon: HandHeart
    },
    {
      number: '3,200',
      label: 'CHILDREN SAFE',
      description: 'We supported local shelters and trained community leaders to protect children.',
      icon: Trophy
    },
    {
      number: '45',
      label: 'COUNTRIES REACHED',
      description: 'Our initiatives span across five continents, bringing hope to the most vulnerable.',
      icon: Globe
    },
    {
      number: '1,800',
      label: 'LEADERS TRAINED',
      description: 'We empower grassroots leaders with skills, resources, and networks to create lasting change.',
      icon: UsersThree
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.programs-header', { y: 50, opacity: 0, duration: 1, ease: "power3.out" });
      gsap.from('.program-stat', {
        scrollTrigger: {
          trigger: '.programs-grid',
          start: "top 80%",
        },
        y: 50,
        opacity: 0.1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });
      gsap.from('.focus-pill', {
        scrollTrigger: {
          trigger: '.focus-section',
          start: "top 85%",
        },
        scale: 0.9,
        opacity: 0.1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="w-full min-h-screen bg-[#FFFDF5] text-[#333333] relative">
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-50" />

      <section className="pt-32 pb-24 px-6 lg:px-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto programs-header">
          <div className="mb-6 h-1 w-20 bg-[#8B1D1D]" />
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-10">
            OUR ACTIVE<br /><span className="text-[#8B1D1D]">PILOTS.</span>
          </h1>
          <p className="text-2xl font-medium text-gray-500 leading-tight max-w-3xl">
            Technical excellence meeting grassroots grit. We architect solutions that scale without losing their human soul.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-20 programs-grid">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12">
          {programs.map((program, index) => (
            <div key={index} className="program-stat group p-12 rounded-[48px] bg-white border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="flex items-start justify-between mb-8">
                <div className="p-5 rounded-3xl bg-[#8B1D1D]/5 text-[#8B1D1D] group-hover:scale-110 transition-transform duration-500">
                  <program.icon size={40} weight="bold" />
                </div>
                <div className="text-7xl font-black tracking-tighter text-[#333333]">
                  {program.number}<span className="text-[#8B1D1D]/30">+</span>
                </div>
              </div>
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 mb-6">{program.label}</h3>
              <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-sm">
                {program.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="focus-section py-32 px-6 lg:px-20 bg-[#333333] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-20 text-center italic">CORE FOCUS DOMAINS</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Education Access", desc: "Mobile classrooms and remote learning centers." },
              { title: "Climate Resilience", desc: "Regenerative agriculture and water security." },
              { title: "Human Safety", desc: "Child protection and gender-based advocacy." }
            ].map((domain, i) => (
              <div key={i} className="focus-pill p-10 rounded-[32px] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <h3 className="text-2xl font-black mb-4 text-[#8B1D1D]">{domain.title}</h3>
                <p className="text-white/60 font-medium leading-relaxed">
                  {domain.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 lg:px-20 text-center">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12">HAVE A PROJECT IN MIND?</h2>
        <button className="px-12 py-8 bg-[#8B1D1D] text-white rounded-full font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-4 mx-auto">
          PITCH AN INITIATIVE
          <ArrowRight size={24} weight="bold" />
        </button>
      </section>
    </main>
  );
};

export default Programs;
