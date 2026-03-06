import { useState, useRef, useLayoutEffect } from "react";
import { Input } from "@/components/ui/input";
import {
    GoogleLogo,
    Asterisk,
    Eye,
    EyeSlash,
    ArrowUpRight,
    GlobeHemisphereWest,
    Sparkle
} from "@phosphor-icons/react";
import { gsap } from "gsap";

import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Explosive, snappy entrance for all bento boxes
            gsap.from(".bento-block", {
                y: 60,
                scale: 0.95,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "expo.out",
                delay: 0.1
            });

            // Infinite spin for decorative elements
            gsap.to(".spin-slow", {
                rotate: 360,
                duration: 20,
                repeat: -1,
                ease: "linear"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                toast.success("Account created! Please check your email for verification.");
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                toast.success("Welcome back, Agent.");
                navigate("/");
            }
        } catch (error: any) {
            toast.error(error.message || "Authentication failed.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin
                }
            });
            if (error) throw error;
        } catch (error: any) {
            toast.error(error.message || "Google Authentication failed.");
        }
    };

    return (
        <div ref={containerRef} className="min-h-screen w-full bg-[#EADDD7] p-4 lg:p-6 font-sans text-[#1A1A1A] flex items-center justify-center overflow-hidden">

            {/* --- MAIN BENTO GRID --- */}
            <div className="w-full max-w-[1400px] h-full min-h-[90vh] grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">

                {/* --- 1. THE LOGIN FORM (Left Side) --- */}
                <div className="bento-block lg:col-span-5 bg-white rounded-[32px] p-8 lg:p-12 flex flex-col justify-center shadow-2xl shadow-[#8A1E1E]/5 relative overflow-hidden">
                    <div className="max-w-[400px] w-full mx-auto relative z-10">

                        <div className="mb-10">
                            <div className="w-14 h-14 bg-[#1A1A1A] rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                                <Asterisk size={28} weight="bold" className="text-[#FFD166] spin-slow" />
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-black text-[#1A1A1A] tracking-tighter mb-3 uppercase leading-none">
                                {isSignUp ? "New" : "Access"}<br /><span className="text-[#8A1E1E]">{isSignUp ? "Agent." : "Portal."}</span>
                            </h1>
                            <p className="text-[15px] text-gray-500 font-medium mt-4">
                                {isSignUp
                                    ? "Join the foundation and start architecting global equity today."
                                    : "Enter your credentials to access the impact dashboard and mission controls."}
                            </p>
                        </div>

                        <form onSubmit={handleAuth} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-[13px] font-black uppercase tracking-widest text-[#1A1A1A]">Email Address</label>
                                <Input
                                    type="email"
                                    placeholder="agent@parth.org"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full h-14 px-5 rounded-2xl border-2 border-gray-100 bg-gray-50 text-[15px] focus:border-[#8A1E1E] focus:ring-0 focus:bg-white placeholder:text-gray-400 font-bold transition-all shadow-none"
                                />
                            </div>

                            <div className="space-y-2 relative">
                                <label className="text-[13px] font-black uppercase tracking-widest text-[#1A1A1A]">Passcode</label>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full h-14 pl-5 pr-14 rounded-2xl border-2 border-gray-100 bg-gray-50 text-[15px] focus:border-[#8A1E1E] focus:ring-0 focus:bg-white placeholder:text-gray-400 font-bold transition-all shadow-none tracking-widest"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-[38px] text-gray-400 hover:text-[#1A1A1A] transition-colors"
                                >
                                    {showPassword ? <EyeSlash size={22} weight="bold" /> : <Eye size={22} weight="bold" />}
                                </button>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-14 bg-[#8A1E1E] text-white rounded-2xl font-black text-[16px] uppercase tracking-wider hover:bg-[#6A1616] hover:shadow-[0_15px_30px_-10px_rgba(138,30,30,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Authenticating..." : (isSignUp ? "Create Account" : "Authenticate")}
                                    {!loading && <ArrowUpRight size={20} weight="bold" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 text-center space-y-4">
                            <button
                                onClick={() => setIsSignUp(!isSignUp)}
                                className="text-[13px] font-bold text-[#8A1E1E] hover:underline block w-full"
                            >
                                {isSignUp ? "Already have an account? Sign In" : "Need an account? Create one"}
                            </button>
                            {!isSignUp && (
                                <a href="/forgot" className="text-[13px] font-bold text-gray-400 hover:text-[#8A1E1E] transition-colors block">
                                    Forgotten your key?
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- RIGHT SIDE BENTO CLUSTER --- */}
                <div className="lg:col-span-7 grid grid-rows-1 lg:grid-rows-3 gap-4 lg:gap-6">

                    {/* 2. MASSIVE VIBRANT HERO BLOCK (Top 2 Rows) */}
                    <div className="bento-block row-span-2 bg-gradient-to-br from-[#FF5E3A] via-[#E03A3A] to-[#8A1E1E] rounded-[32px] p-8 lg:p-12 relative overflow-hidden flex flex-col justify-between shadow-2xl shadow-[#8A1E1E]/20 min-h-[300px] lg:min-h-0">
                        {/* Grainy Noise Overlay */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none" />

                        {/* Abstract Background Shapes */}
                        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-white/10 blur-[80px] rounded-full pointer-events-none" />
                        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-black/20 blur-[100px] rounded-full pointer-events-none" />

                        <div className="relative z-10 flex justify-between items-start text-white">
                            <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-xs font-black uppercase tracking-widest inline-flex items-center gap-2">
                                <Sparkle size={14} weight="fill" className="text-[#FFD166]" />
                                Foundation Network
                            </div>
                            <GlobeHemisphereWest size={40} weight="duotone" className="text-white/50 spin-slow" />
                        </div>

                        <div className="relative z-10 mt-12">
                            <h2 className="text-4xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9] uppercase">
                                Radically<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD166] to-[#FF9F1C]">Changing</span><br />
                                The World.
                            </h2>
                        </div>
                    </div>

                    {/* 3. BOTTOM ROW SPLIT (Stats + Google Auth) */}
                    <div className="row-span-1 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">

                        {/* Stat Block */}
                        <div className="bento-block bg-[#FFD166] rounded-[32px] p-8 flex flex-col justify-center relative overflow-hidden shadow-xl shadow-[#FFD166]/20">
                            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/40 blur-2xl rounded-full" />
                            <p className="text-[#1A1A1A] font-black uppercase tracking-[0.2em] text-[11px] mb-2">Live Impact</p>
                            <h3 className="text-5xl lg:text-6xl font-black text-[#1A1A1A] tracking-tighter leading-none mb-1">
                                120<span className="text-[#E03A3A]">+</span>
                            </h3>
                            <p className="text-[#1A1A1A]/70 font-bold text-sm">Active global projects</p>
                        </div>

                        <button
                            onClick={handleGoogleLogin}
                            className="bento-block group bg-[#1A1A1A] rounded-[32px] p-8 flex flex-col justify-between items-start hover:bg-[#2A2A2A] transition-colors shadow-2xl text-left relative overflow-hidden cursor-pointer active:scale-95 w-full"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-500">
                                <ArrowUpRight size={48} weight="bold" className="text-white" />
                            </div>

                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6">
                                <GoogleLogo size={28} weight="bold" className="text-[#1A1A1A]" />
                            </div>

                            <div>
                                <h3 className="text-2xl font-black text-white tracking-tight mb-1">Quick Access</h3>
                                <p className="text-gray-400 text-sm font-medium">Sign in with Workspace</p>
                            </div>
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;