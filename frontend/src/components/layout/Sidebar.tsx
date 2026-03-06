import { useState, useEffect, useRef } from "react";
import {
    House,
    Binoculars,
    Users,
    Sparkle,
    SealCheck,
    PaperPlaneTilt,
    HandHeart,
    SignIn,
    SignOut,
    UserCircle,
    CaretDoubleLeft,
    CaretDoubleRight,
    SquaresFour,
    List,
    X,
    ArrowUpRight
} from "@phosphor-icons/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { type User } from "@supabase/supabase-js";
import { toast } from "sonner";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(() => {
        const saved = localStorage.getItem("sidebar-collapsed");
        return saved ? JSON.parse(saved) : false;
    });
    const [isDocked, setIsDocked] = useState(() => {
        const saved = localStorage.getItem("sidebar-docked");
        return saved ? JSON.parse(saved) : false;
    });
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const sidebarRef = useRef<HTMLElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            toast.error("Logout failed.");
        } else {
            toast.success("Logged out successfully.");
            navigate("/login");
        }
    };

    // Persist states
    useEffect(() => {
        localStorage.setItem("sidebar-collapsed", JSON.stringify(isCollapsed));
        localStorage.setItem("sidebar-docked", JSON.stringify(isDocked));
    }, [isCollapsed, isDocked]);

    // Auto-collapse when clicking content area (ONLY in sidebar mode)
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!isCollapsed && !isDocked && window.innerWidth >= 1024) {
                if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
                    setIsCollapsed(true);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isCollapsed, isDocked]);

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const navItems = [
        { name: "Home", id: "hero", icon: House, path: "/" },
        { name: "Vision", id: "vision", icon: Binoculars, path: "/vision" },
        { name: "About", id: "about", icon: Users, path: "/about" },
        { name: "Impact", id: "impact", icon: Sparkle, path: "/impact" },
        { name: "Transparency", id: "transparency", icon: SealCheck, path: "/transparency" },
        { name: "Stories", id: "stories", icon: PaperPlaneTilt, path: "/stories" },
        { name: "Get Involved", id: "get-involved", icon: HandHeart, path: "/get-involved" },
    ];

    const ctaItems = [
        { name: "Login", path: "/login", icon: SignIn, style: "ghost" },
        { name: "Volunteer", path: "/get-involved", icon: UserCircle, style: "outline" },
        { name: "Donate", path: "/donate", icon: HandHeart, style: "solid" },
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            setIsMobileMenuOpen(false);
        }
    };

    const handleNavClick = (path: string, id?: string) => {
        if (location.pathname !== path) {
            navigate(path);
            if (id) {
                setTimeout(() => scrollToSection(id), 150);
            }
        } else if (id) {
            scrollToSection(id);
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Mobile Menu Overlay */}
            {!isDocked && isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-[#333333]/30 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-4 right-4 z-[60] p-3 bg-[#8B1D1D] text-white rounded-full shadow-lg transition-transform active:scale-95"
            >
                {isMobileMenuOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
            </button>

            {/* Main Navigation Container */}
            <aside
                ref={sidebarRef}
                className={cn(
                    "fixed z-50 transition-all duration-500 ease-in-out overflow-hidden flex",
                    // DOCKED STATE (Floating pill style)
                    isDocked
                        ? "bottom-8 left-1/2 -translate-x-1/2 flex-row items-center h-[88px] rounded-[32px] px-4 border border-white/40 w-[max-content] max-w-[95vw] overflow-x-auto backdrop-blur-2xl bg-[#FFFDF5]/90 shadow-[0_12px_48px_rgba(0,0,0,0.15)]"
                        // SIDEBAR STATE
                        : "top-0 left-0 h-screen flex-col border-r border-gray-200/60 rounded-none bg-[#FFFDF5] shadow-2xl lg:shadow-none",
                    // COLLAPSED vs EXPANDED (Sidebar mode only)
                    !isDocked && (isCollapsed ? "w-[88px]" : "w-[280px]"),
                    // MOBILE BEHAVIOR (Sidebar mode only)
                    !isDocked && (isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0")
                )}
                style={isDocked ? { msOverflowStyle: 'none', scrollbarWidth: 'none' } : {}}
            >
                {/* Hide Webkit Scrollbar for Dock */}
                {isDocked && (
                    <style>{`aside::-webkit-scrollbar { display: none; }`}</style>
                )}

                {/* Logo Section */}
                <Link
                    to="/"
                    className={cn(
                        "flex items-center gap-4 transition-all duration-300 hover:opacity-80 group/logo shrink-0",
                        isDocked ? "p-3 pr-6 border-r border-gray-300/50 mr-4" : "p-8 border-b border-gray-200/60",
                        !isDocked && isCollapsed && "justify-center px-0"
                    )}
                >
                    <img
                        src="/logo.png"
                        alt="Parth Foundation"
                        className={cn("shrink-0 transition-transform duration-500 group-hover/logo:rotate-[5deg]", isDocked ? "w-12 h-12" : (isCollapsed ? "w-10 h-10" : "w-12 h-12"))}
                    />
                    {(!isCollapsed || isDocked) && (
                        <div className={cn("flex flex-col overflow-hidden transition-all duration-300", isDocked ? "hidden md:flex w-auto" : "w-full")}>
                            <span className="font-black text-xl text-[#333333] tracking-tight leading-none mb-1">Parth</span>
                            <span className="text-[9px] font-bold text-[#8B1D1D] uppercase tracking-[0.3em] whitespace-nowrap">Foundation</span>
                        </div>
                    )}
                </Link>

                {/* Navigation Items */}
                <nav className={cn(
                    "flex-1 overflow-y-auto overflow-x-hidden transition-all duration-300",
                    isDocked ? "flex flex-row items-center gap-1 p-1 overflow-visible" : "flex flex-col px-4 py-6 gap-2"
                )}
                    style={{ scrollbarWidth: 'none' }}
                >
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path; // Adjust your active logic here if needed
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.path, item.id)}
                                title={item.name}
                                className={cn(
                                    "group flex items-center gap-4 transition-all relative shrink-0 overflow-hidden outline-none",
                                    isDocked ? "p-3 rounded-full hover:bg-gray-500/10" : "px-4 py-3 rounded-xl",
                                    !isDocked && isCollapsed ? "justify-center" : "",
                                    !isDocked && isActive ? "bg-[#8B1D1D]/5" : (!isDocked && "hover:bg-gray-100/80")
                                )}
                            >
                                {/* Sidebar Active Indicator */}
                                {!isDocked && isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-[#8B1D1D] rounded-r-full" />
                                )}

                                <item.icon
                                    size={isDocked ? 28 : 22}
                                    weight={isActive ? "fill" : "regular"}
                                    className={cn(
                                        "shrink-0 transition-all duration-300",
                                        isDocked && isActive ? "-translate-y-1 scale-110 text-[#8B1D1D]" : "group-hover:scale-110",
                                        !isActive && "text-gray-500 group-hover:text-[#333333]"
                                    )}
                                />

                                {(!isCollapsed || isDocked) && (
                                    <span className={cn(
                                        "font-medium whitespace-nowrap transition-all duration-300 tracking-wide",
                                        isDocked ? "hidden" : "text-[14px]", // Always hide text in dock mode for cleaner pill
                                        isActive ? "text-[#8B1D1D] font-bold" : "text-[#333333]"
                                    )}>
                                        {item.name}
                                    </span>
                                )}

                                {/* Dock Active Indicator (Glowing Dot) */}
                                {isDocked && isActive && (
                                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#8B1D1D] rounded-full shadow-[0_0_4px_rgba(139,29,29,0.8)]" />
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* CTA Section (Hidden completely in Dock mode for a clean pill) */}
                <div className={cn(
                    "transition-all duration-300 flex flex-col gap-3 overflow-hidden shrink-0",
                    isDocked ? "w-0 opacity-0 p-0 m-0 border-none hidden" : "w-full opacity-100 p-6 border-t border-gray-200/60",
                    !isDocked && isCollapsed && "items-center px-2"
                )}>
                    {ctaItems.map((item) => {
                        const isVolunteer = item.name === "Volunteer";
                        const isDonate = item.name === "Donate";
                        const isLogin = item.name === "Login";

                        // If user is logged in, replace Login with Logout
                        if (isLogin && user) {
                            return (
                                <button
                                    key="logout"
                                    onClick={handleLogout}
                                    className="w-full group outline-none"
                                >
                                    <div className={cn(
                                        "flex items-center gap-3 w-full rounded-xl transition-all duration-300 bg-[#1A1A1A] text-white hover:bg-gray-800",
                                        isCollapsed ? "w-12 h-12 justify-center p-0 mx-auto" : "px-4 py-3",
                                    )}>
                                        <SignOut size={20} weight="bold" />
                                        {!isCollapsed && (
                                            <span className="font-semibold text-[13px] tracking-wide flex-1 text-left truncate">
                                                {user.email?.split('@')[0]} (Logout)
                                            </span>
                                        )}
                                    </div>
                                </button>
                            );
                        }

                        const content = (
                            <div className={cn(
                                "flex items-center gap-3 w-full rounded-xl transition-all duration-300",
                                isCollapsed ? "w-12 h-12 justify-center p-0 mx-auto" : "px-4 py-3",
                                item.style === "solid" || item.name === "Login" || item.name === "Volunteer"
                                    ? "bg-[#8B1D1D] text-white hover:bg-[#6A1616] shadow-sm hover:shadow-md hover:-translate-y-0.5"
                                    : "bg-transparent text-gray-500 hover:text-[#333333] hover:bg-gray-100/50"
                            )}>
                                <item.icon size={20} weight="bold" />
                                {!isCollapsed && (
                                    <span className="font-semibold text-[13px] tracking-wide flex-1 text-left">{item.name}</span>
                                )}
                                {!isCollapsed && (item.style === "solid" || item.name === "Login" || item.name === "Volunteer") && (
                                    <ArrowUpRight size={16} weight="bold" className="opacity-70 group-hover:opacity-100 transition-opacity" />
                                )}
                            </div>
                        );

                        if (isVolunteer) {
                            return (
                                <Link
                                    key={item.name}
                                    to="/get-involved"
                                    className="w-full group outline-none"
                                >
                                    {content}
                                </Link>
                            );
                        }

                        return (
                            <Link key={item.name} to={item.path} className="w-full group outline-none">
                                {content}
                            </Link>
                        );
                    })}
                </div>

                {/* Controls (Collapse & Dock toggles) */}
                <div className={cn(
                    "transition-all duration-300 flex items-center shrink-0",
                    isDocked ? "p-0 pr-2 pl-4 ml-2 border-l border-gray-300/50 h-8" : "p-6 border-t border-gray-200/60 justify-between w-full",
                    !isDocked && isCollapsed && "flex-col gap-6 px-0 py-6"
                )}>
                    {!isDocked && (
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-[#333333] transition-colors hidden lg:block outline-none"
                            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                        >
                            {isCollapsed ? <CaretDoubleRight size={20} /> : <CaretDoubleLeft size={20} />}
                        </button>
                    )}

                    <button
                        onClick={() => setIsDocked(!isDocked)}
                        className={cn(
                            "p-2 rounded-lg text-gray-400 transition-all duration-300 hover:text-[#333333] outline-none",
                            isDocked ? "hover:bg-gray-500/10" : "hover:bg-gray-100",
                            !isDocked && isCollapsed ? "mx-auto flex justify-center" : ""
                        )}
                        title={isDocked ? "Switch to Sidebar" : "Switch to Floating Dock"}
                    >
                        <SquaresFour size={20} weight={isDocked ? "fill" : "regular"} className={cn("transition-transform duration-500", isDocked && "rotate-90 text-[#333333]")} />
                    </button>
                </div>
            </aside>

            {/* Layout Spacer (pushes main content horizontally in sidebar mode) */}
            <div
                className={cn(
                    "hidden lg:block transition-all duration-500 ease-in-out shrink-0",
                    isDocked ? "w-0" : (isCollapsed ? "w-[88px]" : "w-[280px]")
                )}
                aria-hidden="true"
            />
        </>
    );
};

export default Sidebar;