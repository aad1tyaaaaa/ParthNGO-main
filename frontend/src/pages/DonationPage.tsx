import { useState, useRef, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Heart,
    Globe,
    Users,
    ShieldCheck,
    ArrowLeft,
    User,
    EnvelopeSimple,
    IdentificationCard,
    CreditCard,
    CheckCircle,
    ArrowRight,
    CaretLeft,
    SpinnerGap,
    Handshake,
    Check,
    QrCode,
    Bank,
    Copy
} from "@phosphor-icons/react";
import { gsap } from "gsap";
// Stripe imports removed as we are using local UPI/QR system


// Initialize Stripe (Mock Key)
// Local payment system initialized


const predefinedAmounts = [1000, 2500, 5000, 10000];

const impactLabels: Record<number, string> = {
    1000: "Provides nutrition packs for 5 children in underserved areas",
    2500: "Ensures clean water access for a family for a month",
    5000: "Funds a mobile health clinic visit for remote villages",
    10000: "Supports a girl's high-school education for a full year"
};

type Step = 1 | 2 | 3 | "success";

const PaymentStep = ({
    amount,
    onSuccess,
    onBack
}: {
    amount: number;
    onSuccess: () => void;
    onBack: () => void;
}) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleConfirm = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            onSuccess();
        }, 3000);
    };

    return (
        <div className="space-y-10">
            <div className="p-8 rounded-[32px] bg-[#1A1A1A] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                <div className="relative z-10 flex justify-between items-center">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8A1E1E]">Validated Commitment</span>
                        <div className="text-5xl font-black tracking-tighter mt-1">₹{amount.toLocaleString('en-IN')}</div>
                    </div>
                    <Handshake size={48} weight="fill" className="text-[#8A1E1E]" />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* QR Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <QrCode size={24} weight="bold" className="text-[#8A1E1E]" />
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">Scan to Donate</h3>
                    </div>
                    <div className="p-6 rounded-[24px] bg-white border-2 border-gray-100 shadow-xl relative group">
                        <img
                            src="/qr scanner.jpg"
                            alt="UPI QR Scanner"
                            className="w-full aspect-square object-contain rounded-xl grayscale hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-[#8A1E1E]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-[24px]" />
                    </div>
                    <p className="text-[11px] font-bold text-center text-gray-400 uppercase tracking-widest leading-relaxed">
                        Apps supported: GPay, PhonePe, Paytm, Any UPI
                    </p>
                </div>

                {/* Bank Details Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Bank size={24} weight="bold" className="text-[#8A1E1E]" />
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">Bank Transfer</h3>
                    </div>
                    <div className="p-8 rounded-[24px] bg-gray-50 border-2 border-gray-100 space-y-6">
                        {[
                            { label: "Account Holder", value: "Parth Foundation" },
                            { label: "Bank Name", value: "TJSB SAHAKARI BANK LTD." },
                            { label: "UPI ID", value: "bdl008711@tjsb" }
                        ].map((detail, idx) => (
                            <div key={idx} className="space-y-1">
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">{detail.label}</span>
                                <div className="text-[15px] font-black tracking-tight text-[#1A1A1A] flex justify-between group">
                                    {detail.value}
                                    <button onClick={() => navigator.clipboard.writeText(detail.value)} className="opacity-0 group-hover:opacity-100 text-[#8A1E1E] transition-opacity">
                                        <Copy size={16} weight="bold" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex gap-4 pt-10">
                <button
                    onClick={onBack}
                    className="h-20 w-20 rounded-[24px] border-2 border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                    <CaretLeft size={32} weight="bold" />
                </button>
                <button
                    onClick={handleConfirm}
                    disabled={isProcessing}
                    className="flex-1 h-24 rounded-[24px] bg-[#8A1E1E] text-white text-xl font-black uppercase tracking-[0.3em] relative overflow-hidden group active:scale-95 transition-all shadow-3xl shadow-[#8A1E1E]/20"
                >
                    {isProcessing ? (
                        <SpinnerGap size={32} weight="bold" className="animate-spin mx-auto" />
                    ) : (
                        <span className="flex items-center justify-center gap-4">
                            Payment Completed
                            <CheckCircle size={28} weight="fill" className="text-white" />
                        </span>
                    )}
                </button>
            </div>

            <div className="pt-8 border-t border-gray-100 flex items-center justify-center gap-10 opacity-30">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                    <ShieldCheck size={20} weight="fill" />
                    Verified NGO
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                    <Users size={20} weight="fill" />
                    80G Certified
                </div>
            </div>
        </div>
    );
};

const DonationPage = () => {
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [donationType, setDonationType] = useState<"one-time" | "monthly">("monthly");
    const [selectedAmount, setSelectedAmount] = useState<number | "custom">(5000);
    const [customAmount, setCustomAmount] = useState<string>("");
    const [donorDetails, setDonorDetails] = useState({
        name: "",
        email: "",
        taxId: ""
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const stepRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".bento-item", {
                y: 60,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power4.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const transitionToStep = (nextStep: Step) => {
        gsap.to(stepRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                setCurrentStep(nextStep);
                gsap.fromTo(stepRef.current,
                    { y: -20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, ease: "power4.out" }
                );
            }
        });
    };

    const handleAmountClick = (amount: number) => {
        setSelectedAmount(amount);
        setCustomAmount("");
    };

    const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        setCustomAmount(value);
        if (value) setSelectedAmount("custom");
    };

    const handleStep1Submit = () => {
        const amount = selectedAmount === "custom" ? Number(customAmount) : selectedAmount;
        if (!amount || amount <= 0) return;
        transitionToStep(2);
    };

    const handleStep2Submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!donorDetails.name || !donorDetails.email) return;
        transitionToStep(3);
    };

    const finalAmount = selectedAmount === "custom" ? Number(customAmount) : selectedAmount;

    return (
        <main ref={containerRef} className="w-full min-h-screen bg-[#FFFDF5] text-[#1A1A1A] relative overflow-hidden selection:bg-[#8A1E1E] selection:text-white pb-32">
            {/* Texture Overlay */}
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-50" />

            <div className="max-w-[1400px] mx-auto p-4 sm:p-8 lg:p-12 pt-24 lg:pt-32">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* 1. HERO CONTEXT BLOCK */}
                    <div className="bento-item lg:col-span-12 mb-12">
                        <a href="/" className="inline-flex items-center gap-2 text-[#1A1A1A]/40 hover:text-[#8A1E1E] transition-colors mb-12 font-black uppercase tracking-[0.3em] text-[10px] group">
                            <ArrowLeft size={16} weight="bold" className="group-hover:-translate-x-1 transition-transform" />
                            Return to Mission
                        </a>
                        <div className="flex flex-col lg:flex-row items-end justify-between gap-12">
                            <div className="max-w-4xl">
                                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#8A1E1E]/5 border border-[#8A1E1E]/10 mb-8">
                                    <Heart size={18} weight="fill" className="text-[#8A1E1E]" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8A1E1E]">Strategic Engagement</span>
                                </div>
                                <h1 className="text-[12vw] lg:text-[8rem] font-black tracking-tighter leading-[0.8] uppercase">
                                    Architect<br /><span className="text-[#8A1E1E] italic">Legacy.</span>
                                </h1>
                            </div>
                            <div className="lg:text-right max-w-sm">
                                <p className="text-xl font-medium text-[#1A1A1A]/60 leading-tight italic">
                                    "Precision engineering applied to the redistribution of social equity."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 2. STATS CLUSTER */}
                    <div className="bento-item lg:col-span-4 space-y-8">
                        <div className="bg-white rounded-[40px] p-10 border border-white shadow-xl shadow-[#8A1E1E]/5 group overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Globe size={120} weight="thin" />
                            </div>
                            <div className="text-7xl font-black tracking-tighter text-[#1A1A1A] mb-2 group-hover:scale-110 transition-transform origin-left">70+</div>
                            <p className="text-[11px] font-black tracking-[0.3em] text-gray-400 uppercase">Strategic Programs</p>
                        </div>
                        <div className="bg-[#1A1A1A] rounded-[40px] p-10 shadow-2xl text-white group overflow-hidden relative">
                            <div className="absolute bottom-0 left-0 p-8 opacity-10">
                                <Users size={120} weight="thin" />
                            </div>
                            <div className="text-7xl font-black tracking-tighter mb-2 text-[#8A1E1E]">50K<span className="text-white">+</span></div>
                            <p className="text-[11px] font-black tracking-[0.3em] text-white/40 uppercase">Global Impacted Lives</p>
                        </div>
                        <div className="p-10 rounded-[40px] bg-[#FFD166] text-[#1A1A1A] flex flex-col justify-between">
                            <ShieldCheck size={48} weight="fill" className="mb-8" />
                            <p className="text-xl font-black uppercase tracking-tighter leading-none">
                                80G Compliant.<br />Full Tax Benefit.
                            </p>
                        </div>
                    </div>

                    {/* 3. THE DONATION ENGINE (Bento Card) */}
                    <div className="bento-item lg:col-span-8 bg-white rounded-[48px] p-8 lg:p-14 shadow-2xl shadow-[#8A1E1E]/10 border border-white relative overflow-hidden min-h-[700px] flex flex-col">
                        <div ref={stepRef} className="flex-1 flex flex-col">
                            {currentStep === 1 && (
                                <div className="space-y-10 flex-1 flex flex-col">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-2">
                                            <h2 className="text-4xl font-black tracking-tighter uppercase mb-1">Configuration</h2>
                                            <p className="text-[11px] font-black tracking-[0.3em] text-gray-400 uppercase">Input Metrics [01 / 03]</p>
                                        </div>
                                        <Handshake size={48} weight="thin" className="text-[#8A1E1E] opacity-20" />
                                    </div>

                                    {/* Toggle */}
                                    <div className="flex p-2 bg-gray-50 rounded-3xl border border-gray-100">
                                        {(["monthly", "one-time"] as const).map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => setDonationType(type)}
                                                className={`flex-1 py-5 text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl transition-all ${donationType === type
                                                    ? "bg-[#1A1A1A] text-white shadow-xl"
                                                    : "text-gray-400 hover:text-[#1A1A1A]"
                                                    }`}
                                            >
                                                {type === "monthly" ? "Give Monthly" : "One Time"}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Amount Grid */}
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                        {predefinedAmounts.map((amount) => (
                                            <button
                                                key={amount}
                                                onClick={() => handleAmountClick(amount)}
                                                className={`py-6 rounded-2xl border-2 transition-all relative group flex flex-col items-center justify-center gap-1 ${selectedAmount === amount
                                                    ? "border-[#8A1E1E] bg-[#8A1E1E]/5"
                                                    : "border-gray-50 bg-gray-50/30 hover:border-gray-200"
                                                    }`}
                                            >
                                                <span className={`text-2xl font-black tracking-tighter ${selectedAmount === amount ? "text-[#8A1E1E]" : "text-[#1A1A1A]"}`}>₹{amount.toLocaleString('en-IN')}</span>
                                                {selectedAmount === amount && <Check size={16} weight="bold" className="text-[#8A1E1E]" />}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Custom / Impact */}
                                    <div className="flex-1 space-y-8">
                                        <div className="relative group">
                                            <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-2xl opacity-20 group-focus-within:text-[#8A1E1E] group-focus-within:opacity-100 transition-all">₹</span>
                                            <input
                                                type="text"
                                                value={customAmount}
                                                onChange={handleCustomAmountChange}
                                                placeholder="Custom Heritage Amount"
                                                className={`w-full h-20 pl-14 pr-8 border-2 rounded-[24px] font-black text-xl outline-none transition-all ${selectedAmount === "custom"
                                                    ? "border-[#8A1E1E] bg-[#8A1E1E]/5"
                                                    : "border-gray-50 bg-gray-50/50 focus:border-[#8A1E1E]/30 focus:bg-white"
                                                    }`}
                                            />
                                        </div>

                                        {typeof selectedAmount === "number" && impactLabels[selectedAmount] && (
                                            <div className="p-8 rounded-3xl bg-[#F4ECE3] border border-[#8A1E1E]/5 flex items-center gap-6 relative overflow-hidden group">
                                                <div className="absolute top-0 left-0 w-2 h-full bg-[#8A1E1E]" />
                                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shrink-0 shadow-lg">
                                                    <Sparkle size={32} weight="fill" className="text-[#8A1E1E] animate-pulse" />
                                                </div>
                                                <p className="text-[17px] font-bold text-[#1A1A1A] leading-tight max-w-sm italic">
                                                    {impactLabels[selectedAmount]}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={handleStep1Submit}
                                        className="h-24 w-full rounded-[24px] text-xl font-black uppercase tracking-[0.3em] bg-[#8A1E1E] text-white hover:bg-[#6A1616] group relative overflow-hidden shadow-2xl shadow-[#8A1E1E]/20 mt-8"
                                    >
                                        <span className="flex items-center justify-center gap-4 group-hover:gap-6 transition-all">
                                            Confirm Alignment
                                            <ArrowRight size={28} weight="bold" />
                                        </span>
                                    </button>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="space-y-10 flex-1 flex flex-col">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-2">
                                            <h2 className="text-4xl font-black tracking-tighter uppercase mb-1">Identity</h2>
                                            <p className="text-[11px] font-black tracking-[0.3em] text-gray-400 uppercase">Legacy Credentials [02 / 03]</p>
                                        </div>
                                        <User size={48} weight="thin" className="text-[#8A1E1E] opacity-20" />
                                    </div>

                                    <form onSubmit={handleStep2Submit} className="space-y-6 flex-1">
                                        <div className="space-y-4">
                                            {[
                                                { icon: User, placeholder: "Full Identity Name", field: "name", type: "text" },
                                                { icon: EnvelopeSimple, placeholder: "Credential Email Address", field: "email", type: "email" },
                                                { icon: IdentificationCard, placeholder: "Tax ID / PAN (Optional Receipting)", field: "taxId", type: "text" }
                                            ].map((input, i) => (
                                                <div key={i} className="relative group">
                                                    <input.icon size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#8A1E1E] transition-colors" />
                                                    <input
                                                        type={input.type}
                                                        placeholder={input.placeholder}
                                                        value={(donorDetails as any)[input.field]}
                                                        onChange={e => setDonorDetails({ ...donorDetails, [input.field]: e.target.value })}
                                                        className="w-full h-20 pl-16 pr-8 rounded-[24px] border-2 border-gray-50 bg-gray-50/50 font-bold text-[15px] focus:border-[#8A1E1E]/50 focus:bg-white outline-none transition-all"
                                                        required={input.field !== "taxId"}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex gap-4 pt-12">
                                            <button
                                                type="button"
                                                onClick={() => transitionToStep(1)}
                                                className="h-20 w-20 rounded-[24px] border-2 border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                            >
                                                <CaretLeft size={28} weight="bold" />
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex-1 h-20 rounded-[24px] bg-[#1A1A1A] text-white font-black uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl"
                                            >
                                                Secure to Payment
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="space-y-10 flex-1 flex flex-col">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-2">
                                            <h2 className="text-4xl font-black tracking-tighter uppercase mb-1">Settlement</h2>
                                            <p className="text-[11px] font-black tracking-[0.3em] text-gray-400 uppercase">Final Clearance [03 / 03]</p>
                                        </div>
                                        <ShieldCheck size={48} weight="thin" className="text-[#8A1E1E] opacity-20" />
                                    </div>

                                    <div className="flex-1">
                                        <PaymentStep
                                            amount={Number(finalAmount)}
                                            onBack={() => transitionToStep(2)}
                                            onSuccess={() => transitionToStep("success")}
                                        />

                                    </div>

                                    <div className="pt-12 border-t border-gray-100 flex flex-wrap items-center justify-center gap-8 opacity-30 grayscale contrast-125">
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                                            <ShieldCheck size={20} weight="fill" />
                                            SSL Encrypted
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                                            <CreditCard size={20} weight="fill" />
                                            PCI Compliant
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === "success" && (
                                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-10 py-12">
                                    <div className="w-32 h-32 bg-[#8A1E1E] text-white rounded-full flex items-center justify-center shadow-3xl shadow-[#8A1E1E]/40 animate-[bounce_2s_infinite]">
                                        <Check size={64} weight="bold" />
                                    </div>
                                    <div className="space-y-6">
                                        <h2 className="text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.8]">
                                            Mission<br />
                                            <span className="text-[#8A1E1E]">Successful.</span>
                                        </h2>
                                        <p className="text-xl font-medium text-[#1A1A1A]/50 max-w-sm mx-auto italic leading-tight">
                                            Thank you for architecting equity. A digital receipt has been transmitted to your credentials.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => window.location.href = '/'}
                                        className="h-20 px-16 rounded-[24px] bg-[#1A1A1A] text-white font-black uppercase tracking-[0.3em] mt-12 hover:bg-black transition-all shadow-2xl"
                                    >
                                        Return to Core
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Progress Bar (Bottom) */}
                        {currentStep !== "success" && (
                            <div className="mt-12 pt-8 border-t border-gray-50 flex justify-between items-center">
                                <div className="flex gap-3">
                                    {[1, 2, 3].map((s) => (
                                        <div
                                            key={s}
                                            className={`h-2 rounded-full transition-all duration-700 ${currentStep === s ? "w-12 bg-[#8A1E1E]" : "w-6 bg-gray-100"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-[10px] font-black text-[#1A1A1A]/20 uppercase tracking-[0.3em]">Vault Security v.2.6</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DonationPage;

// Helper to use custom icons
const Sparkle = ({ size, weight, className }: any) => (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor" className={className}>
        <path d="M232,128a12,12,0,0,1-12,12H183.31l-18,63.17a12,12,0,0,1-23,0l-18-63.17H76a12,12,0,0,1,0-24h48.31l18-63.17a12,12,0,0,1,23,0l18,63.17H220A12,12,0,0,1,232,128ZM112.55,191.56a8,8,0,0,0-15.1,0l-7,24.44H66a8,8,0,0,0,0,16h24.45l7,24.44a8,8,0,0,0,15.1,0l7-24.44H144a8,8,0,0,0,0-16h-24.45ZM213.33,40a8,8,0,0,0-7.33,4.8l-7,24.45H174.55a8,8,0,1,0,0,16h24.45l7,24.45a8,8,0,0,0,15.1,0l7-24.45H252.55a8,8,0,1,0,0-16H228.1l-7-24.45A8,8,0,0,0,213.33,40Z" />
    </svg>
);
