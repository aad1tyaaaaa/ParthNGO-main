import { useRef, useLayoutEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, Tag, ArrowRight, Notebook } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  const articles = [
    {
      category: 'ADVOCACY',
      title: 'Why Local Voices Must Lead Global Change',
      excerpt: 'International aid often overlooks the people who know their communities best. Here\'s why that needs to change.',
      date: 'March 3, 2026',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
      readTime: '6 min read'
    },
    {
      category: 'CLIMATE',
      title: 'Youth Climate Leaders Are Rewriting the Rules',
      excerpt: 'From Kenya to Peru, young activists are turning climate despair into powerful action.',
      date: 'March 1, 2026',
      image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=600&fit=crop',
      readTime: '4 min read'
    },
    {
      category: 'EDUCATION',
      title: 'Mobile Classrooms Bring Learning to Conflict Zones',
      excerpt: 'How portable education is reaching children displaced by war and crisis.',
      date: 'Feb 28, 2026',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
      readTime: '8 min read'
    },
    {
      category: 'PROTECTION',
      title: 'Community-Led Child Safety: A Model That Works',
      excerpt: 'Traditional child protection often fails. Here\'s a grassroots approach that\'s succeeding.',
      date: 'Feb 25, 2026',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop',
      readTime: '5 min read'
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.blog-header', { y: 50, opacity: 0, duration: 1, ease: "power3.out" });
      gsap.from('.article-card', {
        scrollTrigger: {
          trigger: '.article-grid',
          start: "top 80%",
        },
        y: 50,
        opacity: 0.1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="w-full min-h-screen bg-[#FFFDF5] text-[#333333] relative">
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-50" />

      <section className="pt-32 pb-24 px-6 lg:px-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="max-w-3xl blog-header">
            <div className="flex items-center gap-2 text-[#8B1D1D] mb-6">
              <Notebook size={24} weight="bold" />
              <span className="font-black tracking-[0.3em] uppercase text-xs">The Parth Perspective</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-10">
              VOICE &<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B1D1D] to-[#8B1D1D]/50">ADVOCACY.</span>
            </h1>
            <p className="text-2xl font-medium text-gray-500 leading-tight">
              Critical insights and calls to action from the front lines of social development.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="article-grid grid grid-cols-1 md:grid-cols-2 gap-12">
            {articles.map((article, index) => (
              <article
                key={index}
                className="article-card group bg-white rounded-[48px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
              >
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-8 left-8">
                    <span className="bg-[#8B1D1D] text-white text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2.5 rounded-full shadow-lg">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-12 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">
                    <span className="flex items-center gap-1.5"><Clock size={16} />{article.readTime}</span>
                    <span className="w-1 h-1 bg-gray-200 rounded-full" />
                    <span>{article.date}</span>
                  </div>
                  <h2 className="text-3xl font-black mb-6 text-[#333333] group-hover:text-[#8B1D1D] transition-colors leading-tight">
                    {article.title}
                  </h2>
                  <p className="text-gray-500 text-lg font-medium leading-relaxed mb-10 flex-1">
                    {article.excerpt}
                  </p>
                  <button className="flex items-center gap-2 font-black text-[#8B1D1D] uppercase tracking-widest text-xs group-hover:gap-4 transition-all">
                    READ THE PERSPECTIVE
                    <ArrowRight size={18} weight="bold" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20 text-center">
            <button className="px-12 py-6 bg-white border border-gray-200 text-[#333333] rounded-full font-black text-lg hover:bg-gray-50 transition-all">
              EXPLORE ARCHIVE
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;
