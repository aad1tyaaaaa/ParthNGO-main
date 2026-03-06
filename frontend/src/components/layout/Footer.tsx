import { 
    FacebookLogo, 
    InstagramLogo, 
    EnvelopeSimple, 
    Phone, 
    MapPin, 
    ArrowUpRight, 
    ArrowLineUp,
    Quotes,
    HandHeart,
    GlobeHemisphereWest
} from "@phosphor-icons/react";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="w-full bg-[#EADDD7] p-4 lg:p-6 pb-6 relative font-sans text-[#1A1A1A]">
            {/* Grainy Noise Overlay for the entire wrapper */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.2] mix-blend-overlay pointer-events-none z-0" />

            <div className="max-w-[1400px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">

                {/* --- BLOCK 1: THE MANIFESTO (Spans 8 cols) --- */}
                <div className="lg:col-span-8 bg-[#1A1A1A] rounded-[32px] p-10 lg:p-14 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity duration-700 group-hover:scale-110 group-hover:rotate-12 transform origin-center">
                        <GlobeHemisphereWest size={200} weight="fill" color="white" />
                    </div>
                    
                    <div className="relative z-10 mb-12 lg:mb-20">
                        <Quotes size={48} weight="fill" className="text-[#8A1E1E] mb-6 opacity-80" />
                        <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter leading-[0.9] uppercase max-w-2xl">
                            We don't just fund projects.<br />
                            <span className="text-[#8A1E1E]">We Architect Equity.</span>
                        </h2>
                    </div>

                    <div className="relative z-10 flex flex-col sm:flex-row justify-between items-end gap-6 border-t border-white/10 pt-8">
                        <div className="flex items-center gap-4">
                            <img src="/logo.png" alt="Parth Foundation" className="w-14 h-14 bg-white/10 p-2 rounded-2xl backdrop-blur-md" />
                            <div>
                                <h3 className="text-xl font-black text-white tracking-tighter uppercase leading-none">Parth.</h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-1">Foundation 2026</p>
                            </div>
                        </div>
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                            Built for Radical Impact.
                        </p>
                    </div>
                </div>

                {/* --- BLOCK 2: DONATE CTA (Spans 4 cols) --- */}
                <a href="/donate" className="lg:col-span-4 bg-[#8A1E1E] rounded-[32px] p-10 flex flex-col items-center justify-center text-center shadow-2xl hover:bg-[#6A1616] hover:scale-[0.98] transition-all duration-300 cursor-pointer group relative overflow-hidden">
                    <div className="absolute inset-0 border-4 border-white/10 border-dashed rounded-[32px] m-4 animate-[spin_30s_linear_infinite]" />
                    <HandHeart size={80} weight="fill" className="text-white mb-6 group-hover:-translate-y-2 transition-transform duration-500" />
                    <h3 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">Fund The<br/>Future</h3>
                    <div className="mt-4 px-6 py-3 bg-white text-[#8A1E1E] rounded-full font-black text-sm uppercase tracking-widest flex items-center gap-2 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-shadow">
                        Make a Donation
                        <ArrowUpRight size={16} weight="bold" />
                    </div>
                </a>

                {/* --- BLOCK 3: CONTACT DATA (Spans 6 cols) --- */}
                <div className="lg:col-span-6 bg-white rounded-[32px] p-8 lg:p-10 shadow-xl flex flex-col justify-between">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#8A1E1E] mb-6">Mission Control</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Email Pill */}
                        <a href="mailto:parthfoundation11@gmail.com" className="sm:col-span-2 flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-[#8A1E1E]/5 border border-gray-100 transition-colors group">
                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:text-[#8A1E1E] transition-colors shrink-0">
                                <EnvelopeSimple size={24} weight="duotone" />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Electronic Mail</p>
                                <p className="text-[14px] font-bold text-[#1A1A1A] truncate group-hover:text-[#8A1E1E] transition-colors">parthfoundation11@gmail.com</p>
                            </div>
                        </a>

                        {/* Phone Pill */}
                        <a href="tel:+918858670114" className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-[#8A1E1E]/5 border border-gray-100 transition-colors group">
                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:text-[#8A1E1E] transition-colors shrink-0">
                                <Phone size={24} weight="duotone" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Direct Line</p>
                                <p className="text-[14px] font-bold text-[#1A1A1A] group-hover:text-[#8A1E1E] transition-colors">+91 8858670114</p>
                            </div>
                        </a>

                        {/* Address Pill */}
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 group">
                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm text-[#1A1A1A] shrink-0">
                                <MapPin size={24} weight="duotone" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Headquarters</p>
                                <p className="text-[13px] font-bold text-[#1A1A1A] leading-tight">123 Community Lane,<br/>Mumbai, India</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- BLOCK 4: NAVIGATION (Spans 3 cols) --- */}
                <div className="lg:col-span-3 bg-[#FFD166] rounded-[32px] p-8 lg:p-10 shadow-xl relative overflow-hidden flex flex-col">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/40 blur-3xl rounded-full" />
                    
                    <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#1A1A1A] mb-8 relative z-10">Directory</h4>
                    
                    <ul className="space-y-4 relative z-10 flex-1">
                        <li>
                            <a href="/vision" className="text-[16px] font-black text-[#1A1A1A] hover:text-[#8A1E1E] flex items-center justify-between group">
                                Vision & About
                                <ArrowUpRight size={18} weight="bold" className="opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                            </a>
                        </li>
                        <li>
                            <a href="/impact" className="text-[16px] font-black text-[#1A1A1A] hover:text-[#8A1E1E] flex items-center justify-between group">
                                Our Impact
                                <ArrowUpRight size={18} weight="bold" className="opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                            </a>
                        </li>
                        <li>
                            <a href="/stories" className="text-[16px] font-black text-[#1A1A1A] hover:text-[#8A1E1E] flex items-center justify-between group">
                                Direct Narratives
                                <ArrowUpRight size={18} weight="bold" className="opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                            </a>
                        </li>
                        <li>
                            <a href="/transparency" className="text-[16px] font-black text-[#1A1A1A] hover:text-[#8A1E1E] flex items-center justify-between group">
                                Transparency
                                <ArrowUpRight size={18} weight="bold" className="opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                            </a>
                        </li>
                    </ul>

                    {/* Fixed Volunteer Link directly to form */}
                    <a 
                        href="https://forms.gle/MSXWwpM2g8XBb4ew6" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mt-6 w-full py-4 bg-[#1A1A1A] text-white rounded-xl flex items-center justify-center font-black text-[12px] uppercase tracking-widest hover:bg-[#8A1E1E] transition-colors relative z-10 gap-2"
                    >
                        Become a Volunteer
                        <ArrowUpRight size={14} weight="bold" />
                    </a>
                </div>

                {/* --- BLOCK 5: SOCIALS & BACK TO TOP (Spans 3 cols) --- */}
                <div className="lg:col-span-3 grid grid-rows-2 gap-4 lg:gap-6">
                    {/* Socials Sub-block */}
                    <div className="bg-white rounded-[32px] p-8 flex flex-col items-center justify-center gap-4 shadow-xl">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Network</h4>
                        <div className="flex gap-4">
                            <a href="https://www.facebook.com/share/17SMxjNNaX/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[#1A1A1A] hover:bg-[#1877F2] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1">
                                <FacebookLogo size={28} weight="fill" />
                            </a>
                            <a href="https://instagram.com/foundationparth" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[#1A1A1A] hover:bg-[#E4405F] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1">
                                <InstagramLogo size={28} weight="bold" />
                            </a>
                        </div>
                    </div>

                    {/* Back to Top Sub-block */}
                    <button 
                        onClick={scrollToTop}
                        className="bg-[#1A1A1A] rounded-[32px] p-8 flex flex-col items-center justify-center gap-2 shadow-xl hover:bg-[#8A1E1E] transition-colors duration-300 text-white group"
                    >
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-300">
                            <ArrowLineUp size={24} weight="bold" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] mt-2">Back to Top</span>
                    </button>
                </div>

            </div>
        </footer>
    );
};

export default Footer;