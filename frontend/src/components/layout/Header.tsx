import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DonateModal from '@/components/features/DonateModal';
import Logo from '@/components/features/Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'PROGRAMS', path: '/programs' },
    { label: 'BLOG & ADVOCACY', path: '/blog' },
    { label: 'STORIES', path: '/stories' },
    { label: 'CONTACT', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-orange-500 ${
                    isActive(item.path) ? 'text-orange-500' : 'text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-sm text-gray-700 hover:text-orange-500 transition-colors">
                <Globe className="w-4 h-4" />
                <span>EN</span>
              </button>
              <Button
                onClick={() => setIsDonateOpen(true)}
                className="bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white rounded-full px-8 py-2 font-medium transition-all"
              >
                DONATE
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-900"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <nav className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-sm font-medium tracking-wide py-2 ${
                    isActive(item.path) ? 'text-orange-500' : 'text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                <button className="flex items-center space-x-1 text-sm text-gray-700">
                  <Globe className="w-4 h-4" />
                  <span>EN</span>
                </button>
                <Button
                  onClick={() => {
                    setIsDonateOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white rounded-full py-2 font-medium"
                >
                  DONATE
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <DonateModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
    </>
  );
};

export default Header;
