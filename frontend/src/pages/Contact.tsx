import { useState, useRef, useLayoutEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Envelope as Mail, MapPin, Phone, ArrowRight, PaperPlaneTilt } from '@phosphor-icons/react';
import { gsap } from "gsap";

const Contact = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-header', { y: 50, opacity: 0.1, duration: 1, ease: "power3.out" });
      gsap.from('.contact-card', { x: -50, opacity: 0.1, duration: 1, delay: 0.2, ease: "power3.out" });
      gsap.from('.info-card', { x: 50, opacity: 0.1, duration: 1, delay: 0.2, ease: "power3.out" });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message received. Our team will contact you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main ref={mainRef} className="w-full min-h-screen bg-[#FFFDF5] text-[#333333] relative">
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-50" />

      <section className="pt-32 pb-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="contact-header text-center mb-20">
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-8">
              CONNECT<br /><span className="text-[#8B1D1D]">WITH US.</span>
            </h1>
            <p className="text-2xl font-medium text-gray-500 max-w-2xl mx-auto italic">
              Whether you're a potential partner, a volunteer, or a community leader—we're ready to listen.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <div className="contact-card p-10 md:p-14 bg-white rounded-[48px] shadow-2xl border border-gray-100">
              <h2 className="text-4xl font-black tracking-tighter mb-10">SEND A MESSAGE</h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-8 py-6 rounded-3xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 focus:ring-[#8B1D1D]/20 focus:border-[#8B1D1D] font-bold transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-8 py-6 rounded-3xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 focus:ring-[#8B1D1D]/20 focus:border-[#8B1D1D] font-bold transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-8 py-6 rounded-3xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 focus:ring-[#8B1D1D]/20 focus:border-[#8B1D1D] font-bold transition-all"
                    placeholder="Partnership Opportunity"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-8 py-6 rounded-[32px] bg-gray-50 border border-gray-100 outline-none focus:ring-2 focus:ring-[#8B1D1D]/20 focus:border-[#8B1D1D] font-bold transition-all resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-8 bg-[#8B1D1D] text-white rounded-full font-black text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-4"
                >
                  SEND MESSAGE
                  <PaperPlaneTilt size={24} weight="fill" />
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="info-card space-y-12 lg:pt-10">
              <div className="space-y-12">
                <div className="flex items-start gap-8">
                  <div className="p-5 rounded-3xl bg-[#8B1D1D]/5 text-[#8B1D1D]">
                    <Mail size={32} weight="bold" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Electronic Mail</h3>
                    <p className="text-2xl font-black mb-1 hover:text-[#8B1D1D] transition-colors cursor-pointer tracking-tight">hello@parthfoundation.org</p>
                    <p className="text-2xl font-black hover:text-[#8B1D1D] transition-colors cursor-pointer tracking-tight">impact@parthfoundation.org</p>
                  </div>
                </div>
                <div className="flex items-start gap-8">
                  <div className="p-5 rounded-3xl bg-[#8B1D1D]/5 text-[#8B1D1D]">
                    <Phone size={32} weight="bold" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Direct Line</h3>
                    <p className="text-2xl font-black mb-1 tracking-tight">+1 (888) PARTH-NGO</p>
                    <p className="text-lg font-bold text-gray-400">Available Mon-Fri, 9am-6pm IST</p>
                  </div>
                </div>
                <div className="flex items-start gap-8">
                  <div className="p-5 rounded-3xl bg-[#8B1D1D]/5 text-[#8B1D1D]">
                    <MapPin size={32} weight="bold" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Global Headquarters</h3>
                    <p className="text-2xl font-black mb-1 tracking-tight">123 Impact Square</p>
                    <p className="text-lg font-bold text-gray-400 italic">San Francisco / New Delhi / Nairobi</p>
                  </div>
                </div>
              </div>

              <div className="p-12 rounded-[40px] bg-[#8B1D1D] text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-3xl font-black mb-6 leading-tight">PARTNER WITH<br />THE PRECISION.</h3>
                <p className="text-white/80 font-medium mb-10 text-lg leading-relaxed">
                  Institutional partners and foundations can request our full audit package and program roadmap.
                </p>
                <button className="flex items-center gap-3 px-8 py-4 bg-white text-[#8B1D1D] rounded-full font-black hover:scale-105 active:scale-95 transition-all w-fit">
                  REQUEST DOCS
                  <ArrowRight size={20} weight="bold" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
