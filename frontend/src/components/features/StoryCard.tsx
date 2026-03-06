import { ArrowRight } from '@phosphor-icons/react';

interface StoryCardProps {
  category: string;
  title: string;
  description: string;
  image: string;
}

const StoryCard = ({ category, title, description, image }: StoryCardProps) => {
  return (
    <div className="flex items-center gap-6 group cursor-pointer bg-white p-4 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
      <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-2xl">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-black text-[#8B1D1D] uppercase tracking-[0.2em] mb-2">
          {category}
        </p>
        <h3 className="text-lg font-black text-[#333333] mb-2 line-clamp-1 tracking-tight group-hover:text-[#8B1D1D] transition-colors">{title}</h3>
        <p className="text-sm text-gray-400 font-medium line-clamp-2 leading-relaxed">{description}</p>
      </div>
      <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#8B1D1D] group-hover:text-white transition-all duration-300 shrink-0">
        <ArrowRight size={20} weight="bold" className="group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};

export default StoryCard;
