import { useState, useRef, useLayoutEffect } from 'react';
import { X, HandHeart, Sparkle } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { gsap } from 'gsap';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonateModal = ({ isOpen, onClose }: DonateModalProps) => {
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [coverFees, setCoverFees] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const presetAmounts = [25, 50, 100, 250, 500, 1000];

  useLayoutEffect(() => {
    if (isOpen) {
      gsap.from(modalRef.current, {
        scale: 0.9,
        opacity: 0.1,
        duration: 0.4,
        ease: "back.out(1.7)"
      });
    }
  }, [isOpen]);

  const handleDonate = () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (!amount || amount <= 0) {
      toast.error('Please select or enter a valid donation amount');
      return;
    }

    const feeAmount = coverFees ? (amount * 0.0275).toFixed(2) : '0.00';
    const totalAmount = coverFees ? (amount * 1.0275).toFixed(2) : amount.toFixed(2);

    toast.success(
      `Thank you for your ${donationType} donation of $${totalAmount}!`
    );
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#333333]/60 backdrop-blur-md p-4">
      <div
        ref={modalRef}
        className="bg-[#FFFDF5] rounded-[48px] shadow-3xl w-full max-w-lg relative overflow-hidden border border-gray-100"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B1D1D]/5 rounded-full blur-3xl -mr-16 -mt-16" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-gray-400 hover:text-[#8B1D1D] transition-all hover:rotate-90"
        >
          <X size={28} weight="bold" />
        </button>

        <div className="p-10 md:p-14">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="p-4 rounded-2xl bg-[#8B1D1D]/5 text-[#8B1D1D] mb-6">
              <HandHeart size={40} weight="fill" />
            </div>
            <h2 className="text-4xl font-black tracking-tighter text-[#333333] uppercase">Empower <span className="text-[#8B1D1D]">Change.</span></h2>
            <p className="text-gray-400 font-bold tracking-widest uppercase text-[10px] mt-2">Precision micro-grants for global impact</p>
          </div>

          {/* Donation Type Toggle */}
          <div className="flex bg-gray-100 rounded-full p-1.5 mb-10">
            <button
              onClick={() => setDonationType('one-time')}
              className={`flex-1 py-4 px-6 rounded-full text-xs font-black tracking-widest transition-all ${donationType === 'one-time'
                ? 'bg-white text-[#8B1D1D] shadow-md'
                : 'text-gray-400 hover:text-gray-600'
                }`}
            >
              ONE-TIME
            </button>
            <button
              onClick={() => setDonationType('monthly')}
              className={`flex-1 py-4 px-6 rounded-full text-xs font-black tracking-widest transition-all ${donationType === 'monthly'
                ? 'bg-[#8B1D1D] text-white shadow-md'
                : 'text-gray-400 hover:text-gray-600'
                }`}
            >
              MONTHLY
            </button>
          </div>

          {/* Preset Amounts */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {presetAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => {
                  setSelectedAmount(amount);
                  setCustomAmount('');
                }}
                className={`py-5 px-4 rounded-[24px] text-xl font-black transition-all ${selectedAmount === amount
                  ? 'bg-[#8B1D1D] text-white shadow-xl scale-105'
                  : 'bg-white border border-gray-100 text-[#333333] hover:border-[#8B1D1D]/30'
                  }`}
              >
                ${amount}
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="mb-10">
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-black">
                $
              </span>
              <input
                type="number"
                placeholder="CUSTOM GRANT"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                className="w-full py-6 pl-12 pr-20 bg-gray-50 border border-gray-100 rounded-3xl text-lg font-black placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1D1D]/20 focus:border-[#8B1D1D] transition-all"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black tracking-widest text-gray-300">
                USD
              </span>
            </div>
          </div>

          {/* Cover Fees Checkbox */}
          <div className="mb-12 p-6 rounded-3xl bg-gray-50 border border-gray-100">
            <label className="flex items-start space-x-4 cursor-pointer group">
              <input
                type="checkbox"
                checked={coverFees}
                onChange={(e) => setCoverFees(e.target.checked)}
                className="mt-1 w-5 h-5 accent-[#8B1D1D] rounded-lg cursor-pointer"
              />
              <span className="text-xs font-medium text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors">
                Yes, I will add $
                {((selectedAmount || parseFloat(customAmount) || 0) * 0.0275).toFixed(2)} to cover transaction fees. 100% of my grant goes to the field.
              </span>
            </label>
          </div>

          {/* Donate Button */}
          <button
            onClick={handleDonate}
            className="w-full bg-[#8B1D1D] text-white rounded-full py-8 text-xl font-black transition-all hover:scale-[1.02] active:scale-95 shadow-3xl flex items-center justify-center gap-4"
          >
            EXECUTE GRANT
            <HandHeart size={28} weight="fill" />
          </button>

          <p className="mt-8 text-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 flex items-center justify-center gap-2">
            <Sparkle size={14} weight="fill" className="text-[#8B1D1D]" />
            Secure Tier-1 encrypted session
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonateModal;
