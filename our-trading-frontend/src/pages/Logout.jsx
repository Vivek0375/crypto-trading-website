import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session data (update this as per your app's auth setup)
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Optionally, show an alert
    alert('You have been logged out.');

    // Redirect to Sign In or Home
    navigate('/Logout');
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white text-xl">
      Logging out...
    </div>
  );
};

export default Logout;

