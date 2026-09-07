import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-10 border-t border-[#ededed] bg-white text-neutral-900">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        <div>
          <h1 className="text-sm font-semibold tracking-[0.18em]">HARER</h1>
          <p className="mt-4 max-w-xs text-sm leading-6 text-neutral-500">
            Modern womenswear. Considered pieces, made to last beyond the season.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Shop</h2>
          <ul className="mt-4 space-y-2 text-sm text-neutral-500">
            <li><Link to="/" className="hover:text-neutral-900">Home</Link></li>
            <li><Link to="/shop" className="hover:text-neutral-900">Shop</Link></li>
            <li><Link to="/collection" className="hover:text-neutral-900">Collections</Link></li>
            <li><Link to="/sale" className="hover:text-neutral-900">Sale</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Support</h2>
          <ul className="mt-4 space-y-2 text-sm text-neutral-500">
            <li>Shipping</li>
            <li>Returns</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Follow</h2>
          <p className="mt-4 text-sm text-neutral-500">
            Stay close for new drops and quiet restocks.
          </p>
        </div>
      </div>

      <div className="border-t border-[#ededed] py-4 text-center text-xs text-neutral-400">
        © {new Date().getFullYear()} WOMEN. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
