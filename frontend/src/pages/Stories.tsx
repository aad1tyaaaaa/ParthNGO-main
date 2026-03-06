import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  BookOpen,
  Quotes,
  Tag,
  Clock
} from "@phosphor-icons/react";
import PillStoryCard from '@/components/features/PillStoryCard';

gsap.registerPlugin(ScrollTrigger);

const Stories = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.featured-card', {
        y: 60,
        opacity: 0.1,
        duration: 1.2,
        ease: "power4.out"
      });

      gsap.from('.story-card-wrapper', {
        scrollTrigger: {
          trigger: '.story-grid',
          start: "top 85%",
        },
        y: 40,
        opacity: 0.1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const featuredStory = {
    title: "The Sisters of Mosul: A Journey of Clean Water and Resilience",
    snippet: "In the aftermath of conflict, Amina and Leila transformed their community's health by engineering a sustainable filtration system that now serves over 500 families.",
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=1600&h=900&fit=crop",
    readTime: "8 min read"
  };

  const allStories = [
    {
      name: 'Marcus',
      age: '23 y.o.',
      story: 'Built a community library in rural Ghana, giving over 500 children access to books and education resources.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    },
    {
      name: 'Fatima',
      age: '28 y.o.',
      story: 'Started a women-led farming cooperative that now supports 80 families in Afghanistan.',
      image: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=400&h=600&fit=crop',
    },
    {
      name: 'Chen',
      age: '35 y.o.',
      story: 'Developed mobile health clinics serving remote villages across Southeast Asia.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop',
    },
    {
      name: 'Priya',
      age: '21 y.o.',
      story: 'Created a digital literacy program training elderly citizens in India to connect with family.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop',
    },
    {
      name: 'Ahmed',
      age: '19 y.o.',
      story: 'Founded a youth-led solar panel initiative bringing electricity to 300 homes in rural Egypt.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop',
    },
    {
      name: 'Rosa',
      age: '45 y.o.',
      story: 'Established a free legal aid clinic helping indigenous communities protect their land rights.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop',
    }
  ];

  return (
    <main ref={mainRef} className="w-full min-h-screen bg-[#FFFDF5] text-[#333333] relative">
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-50" />

      {/* Stories Header */}
      <section className="pt-32 pb-16 px-6 lg:px-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-[#8B1D1D] mb-6">
              <BookOpen size={24} weight="bold" />
              <span className="font-black tracking-[0.3em] uppercase text-xs">The Human Chronicles</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none">
              STORIES OF<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B1D1D] to-[#8B1D1D]/50">IMPACT.</span>
            </h1>
          </div>
          <p className="text-xl text-gray-400 font-bold tracking-[0.2em] uppercase max-w-xs text-right hidden md:block">
            Real voices. Real change. Verified outcomes.
          </p>
        </div>
      </section>

      {/* Featured Story */}
      <section className="py-20 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="featured-card group relative h-[70vh] rounded-[48px] overflow-hidden shadow-2xl border border-white/20">
            <img
              src={featuredStory.image}
              alt={featuredStory.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#333333] via-[#333333]/40 to-transparent" />

            <div className="absolute inset-0 p-12 flex flex-col justify-end">
              <div className="flex items-center gap-6 mb-6">
                <div className="px-4 py-2 bg-[#8B1D1D] text-white rounded-full text-xs font-black tracking-widest uppercase">
                  {featuredStory.category}
                </div>
                <div className="flex items-center gap-2 text-white/70 text-xs font-bold uppercase tracking-widest">
                  <Clock size={16} weight="bold" />
                  {featuredStory.readTime}
                </div>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 max-w-4xl leading-tight">
                {featuredStory.title}
              </h2>
              <p className="text-xl text-white/80 font-medium max-w-2xl mb-10 leading-relaxed">
                {featuredStory.snippet}
              </p>
              <button className="flex items-center gap-3 px-8 py-4 bg-white text-[#333333] rounded-full font-black hover:scale-105 active:scale-95 transition-all w-fit group/btn shadow-xl">
                READ FULL STORY
                <ArrowRight size={20} weight="bold" className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Story Grid */}
      <section className="py-20 px-6 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-16 px-4">
            <div className="flex gap-4">
              {['All', 'Education', 'Health', 'Crisis', 'Climate'].map((cat) => (
                <button key={cat} className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${cat === 'All' ? 'bg-[#8B1D1D] text-white shadow-lg' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="h-px flex-1 bg-gray-100 mx-12 hidden lg:block" />
          </div>

          <div className="story-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allStories.map((story, i) => (
              <div key={i} className="story-card-wrapper h-full">
                <PillStoryCard {...story} />
              </div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <button className="px-12 py-6 border-2 border-[#333333] text-[#333333] rounded-full font-black text-lg hover:bg-[#333333] hover:text-white transition-all">
              LOAD MORE CHRONICLES
            </button>
          </div>
        </div>
      </section>

      {/* Submit Story Callout */}
      <section className="py-32 px-6 lg:px-20 flex flex-col items-center text-center bg-[#FFFDF5] relative overflow-hidden">
        <Quotes size={120} weight="fill" className="text-[#8B1D1D]/10 absolute -top-10 left-1/2 -translate-x-1/2" />
        <h2 className="text-5xl font-black tracking-tighter mb-8 max-w-3xl relative z-10">HAS PARTH TOUCHED YOUR LIFE?</h2>
        <p className="text-xl text-gray-500 font-medium max-w-xl mb-12 relative z-10">
          We believe every voice serves as a beacon for others. Share your journey with us and inspire a global movement.
        </p>
        <button className="px-10 py-5 bg-[#8B1D1D] text-white rounded-full font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl relative z-10">
          SHARE YOUR STORY
        </button>
      </section>
    </main>
  );
};

export default Stories;
