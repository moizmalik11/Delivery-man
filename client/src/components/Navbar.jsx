import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const linkClass = (path) =>
    `px-4 py-2 rounded-lg transition-colors duration-200 ${
      isActiveLink(path)
        ? 'bg-primary/10 text-primary font-medium'
        : 'text-gray-600 hover:bg-gray-100'
    }`;

  return (
    <nav className="bg-white shadow-elevated sticky top-0 z-50">
      <div className="container h-16 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold text-primary hover:text-primary/90 transition-colors duration-200"
        >
          DeliveryMan
        </Link>
        
        <div className="flex items-center space-x-2">
          <Link to="/" className={linkClass('/')}>
            Dashboard
          </Link>
          <Link to="/deliveries" className={linkClass('/deliveries')}>
            Deliveries
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;