import Link from "next/link";

export const CustomFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-white via-slate-50 to-slate-900 text-slate-300 mt-auto relative overflow-hidden">

      {/* gradient top line */}
      {/* <div className="h-[2px] w-full bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500" /> */}

      {/* glow background */}
      {/* <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-amber-500 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-rose-500 blur-[120px]" />
        </div> */}

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* MAIN */}
        <div className="pt-24 pb-12 sm:py-14 lg:py-16">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

            {/* Brand */}
            <div className="sm:col-span-2 md:col-span-1 text-center md:text-left">

              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Shopinity
                <span className="block text-amber-500 text-sm mt-1">
                  a online store
                </span>
              </h2>

              <p className="text-sm text-slate-900 max-w-xs mx-auto md:mx-0">
                Your one-stop shop for quality products at the best prices.
              </p>

            </div>

            {/* Links + Service */}
            <div className="grid grid-cols-2 gap-8 md:contents">

              {/* Quick Links */}
              <div className="text-center md:text-left">
                <h3 className="text-sm font-semibold text-slate-900 uppercase mb-5">
                  Quick Links
                </h3>

                <ul className="space-y-3 text-sm">
                  {["Home", "Shop", "Categories", "Contact"].map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-slate-900 hover:text-amber-400 transition-all hover:translate-x-1 inline-block"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Customer Service */}
              <div className="text-center md:text-left">
                <h3 className="text-sm font-semibold text-slate-900 uppercase mb-5">
                  Customer Service
                </h3>

                <ul className="space-y-3 text-sm">
                  {["FAQ", "Returns", "Shipping", "Privacy Policy"].map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-slate-900 hover:text-amber-400 transition-all hover:translate-x-1 inline-block"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Social */}
            <div className="sm:col-span-2 md:col-span-1 text-center md:text-left">

              <h3 className="text-sm font-semibold text-slate-900 uppercase mb-5">
                Follow Us
              </h3>

              <div className="flex flex-wrap justify-center md:justify-start gap-4">

                {["Facebook", "Instagram", "Twitter"].map((name) => (
                  <Link
                    key={name}
                    href="#"
                    className="flex items-center justify-center px-4 h-10 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-slate-900 hover:text-amber-400 hover:border-amber-400 transition-all duration-300 text-sm"
                  >
                    {name}
                  </Link>
                ))}

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 py-6">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white">

            <p>© {currentYear} My Storefront. All rights reserved.</p>

            <div className="flex gap-6">
              <Link href="#" className="hover:text-amber-400 transition">
                Terms
              </Link>

              <Link href="#" className="hover:text-amber-400 transition">
                Privacy
              </Link>
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
};