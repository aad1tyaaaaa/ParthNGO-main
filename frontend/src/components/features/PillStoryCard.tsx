interface PillStoryCardProps {
  name: string;
  age: string;
  story: string;
  image: string;
}

const PillStoryCard = ({ name, age, story, image }: PillStoryCardProps) => {
  return (
    <div className="relative group cursor-pointer overflow-hidden rounded-[48px] h-[450px] flex-shrink-0 w-[320px] shadow-2xl transition-all duration-500 hover:-translate-y-2">
      <img
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#333333] via-[#333333]/40 to-transparent"></div>

      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="mb-4">
          <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/20">
            Survivor
          </span>
        </div>
        <h3 className="text-2xl font-black text-white mb-2 tracking-tighter">
          {name} <span className="text-lg font-bold opacity-60">({age})</span>
        </h3>
        <p className="text-white/80 font-medium leading-relaxed line-clamp-3 text-sm italic">
          "{story}"
        </p>
      </div>
    </div>
  );
};

export default PillStoryCard;
