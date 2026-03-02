export const CustomFooter = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-10">
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
                
                <div>
                    <h2 className="text-xl font-bold text-white mb-4">My Storefront</h2>
                    <p className="text-sm">
                        Your one-stop shop for quality products at the best prices.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white cursor-pointer">Home</li>
                        <li className="hover:text-white cursor-pointer">Shop</li>
                        <li className="hover:text-white cursor-pointer">Categories</li>
                        <li className="hover:text-white cursor-pointer">Contact</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white cursor-pointer">FAQ</li>
                        <li className="hover:text-white cursor-pointer">Returns</li>
                        <li className="hover:text-white cursor-pointer">Shipping</li>
                        <li className="hover:text-white cursor-pointer">Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                    <div className="flex gap-4 text-sm">
                        <span className="hover:text-white cursor-pointer">Facebook</span>
                        <span className="hover:text-white cursor-pointer">Instagram</span>
                        <span className="hover:text-white cursor-pointer">Twitter</span>
                    </div>
                </div>

            </div>

            <div className="border-t border-gray-700 text-center py-4 text-sm">
                © {new Date().getFullYear()} My Storefront. All rights reserved.
            </div>
        </footer>
    );
};