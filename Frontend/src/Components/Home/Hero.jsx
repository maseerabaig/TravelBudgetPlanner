import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <div className="relative pt-16">
      {/* Text Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#d77a61] mb-6">

          Travel Smarter: Budgeting Simplified
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Manage your travel expenses effortlessly with our all-in-one budgeting tool.
           Plan wisely, track efficiently, and explore with confidence,
            knowing your finances are under control.
          </p>
          <Link to="/login">
          <button className="bg-[#d77a61] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#c06955] transition-colors flex items-center mx-auto">

            Begin Your Adventure <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </Link>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative h-[500px] mt-8">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-black/50" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center max-w-4xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Ultimate Travel Partner
            </h2>
            <p className="text-lg md:text-xl">
            Track, Budget, and Travel Smart — every step of the way!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
