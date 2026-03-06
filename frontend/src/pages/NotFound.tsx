import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-orange-50 to-white">
      <div className="text-center">
        <h1 className="text-9xl font-black text-orange-500 mb-4">404</h1>
        <h2 className="text-4xl font-black text-gray-900 mb-6">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button
          onClick={() => navigate('/')}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-12 py-6 text-lg font-bold transition-all"
        >
          GO HOME
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
