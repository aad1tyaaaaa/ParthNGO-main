import { Icon } from "@phosphor-icons/react";

interface ImpactCardProps {
  number: string;
  label: string;
  description: string;
  icon?: Icon;
}

const ImpactCard = ({ number, label, description, icon: Icon }: ImpactCardProps) => {
  return (
    <div className="bg-white rounded-[40px] p-10 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
      {Icon && (
        <div className="p-4 rounded-2xl bg-[#8B1D1D]/5 text-[#8B1D1D] w-fit mb-8 group-hover:scale-110 transition-transform duration-500">
          <Icon size={32} weight="bold" />
        </div>
      )}
      <div className="mb-4">
        <div className="text-6xl font-black text-[#333333] tracking-tighter mb-2">
          {number}
          <span className="text-[#8B1D1D]">+</span>
        </div>
        <p className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-6">
          {label}
        </p>
      </div>
      <p className="text-gray-500 font-medium text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default ImpactCard;
