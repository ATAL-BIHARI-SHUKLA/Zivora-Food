import logo from "../assets/logo.png";
const Footer = () => {
  return (
    <footer className="py-8 bg-stone-900 text-stone-200">
      <div className="max-w-6xl px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center mb-4">
              <img src={logo} alt="zivora Logo" className="w-auto h-20 mr-3" />
            </div>
            <p className="text-stone-400">
              Delicious food served with love since 2026. Join us for an
              unforgettable dining experience.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold text-amber-400">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="transition-colors text-stone-400 hover:text-amber-400"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/menu"
                  className="transition-colors text-stone-400 hover:text-amber-400"
                >
                  Menu
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="transition-colors text-stone-400 hover:text-amber-400"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="transition-colors text-stone-400 hover:text-amber-400"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold text-amber-400">
              Contact Us
            </h4>
            <address className="not-italic text-stone-400">
              <p className="mb-1">123 Food Street</p>
              <p className="mb-1">New York, NY 10001</p>
              <p className="mb-1">Phone: (123) 456-7890</p>
              <p>Email: info@Zivora.com</p>
            </address>
          </div>
        </div>
        <div className="pt-6 mt-8 text-center border-t border-stone-700 text-stone-500">
          <p>&copy; {new Date().getFullYear()} Zivora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
