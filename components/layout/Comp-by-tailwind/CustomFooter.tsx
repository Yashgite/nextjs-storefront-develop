export const CustomFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 mt-auto">
      {/* Top accent line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-amber-500/80 via-rose-500/60 to-amber-500/80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
            {/* Brand column */}
            <div className="sm:col-span-2 md:col-span-1">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-4">
                My Storefront
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xs">
                Your one-stop shop for quality products at the best prices.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3 text-sm">
                {["Home", "Shop", "Categories", "Contact"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-amber-400 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Customer Service
              </h3>
              <ul className="space-y-3 text-sm">
                {["FAQ", "Returns", "Shipping", "Privacy Policy"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-amber-400 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow Us - full width on small screens, then normal */}
            <div className="sm:col-span-2 md:col-span-1">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Follow Us
              </h3>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {[
                  { name: "Facebook", label: "fb" },
                  { name: "Instagram", label: "ig" },
                  { name: "Twitter", label: "tw" },
                ].map(({ name, label }) => (
                  <a
                    key={label}
                    href="#"
                    className="inline-flex items-center justify-center min-w-[2.5rem] h-10 px-3 rounded-lg bg-slate-800/80 text-slate-400 hover:bg-amber-500/20 hover:text-amber-400 border border-slate-700/50 hover:border-amber-500/30 transition-all duration-200 text-sm font-medium"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 py-5 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p>© {currentYear} My Storefront. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
              <a href="#" className="hover:text-amber-400 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors duration-200">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
