import React from 'react';
import { Wallet, PieChart, Globe2, Bell, Users, BarChart3,Plane } from 'lucide-react';

function Features() {
  const features = [
    {
      icon: <Wallet className="h-8 w-8 text-[#d77a61]" />,
      title: "Expense Tracking",
      description: "Log and categorize your travel expenses effortlessly with our intuitive interface."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-[#d77a61]" />,
      title: "Detailed Reports",
      description: "Generate comprehensive expense reports for better financial planning."
    },
    {
      icon: <PieChart className="h-8 w-8 text-[#d77a61]" />,
      title: "Visual Analytics",
      description: "Get clear insights into your spending patterns with beautiful charts and graphs."
    },
    {
      icon: <Bell className="h-8 w-8 text-[#d77a61]" />,
      title: "Smart Alerts",
      description: "Receive notifications when approaching budget limits to stay on track."
    },
    {
      icon: <Users className="h-8 w-8 text-[#d77a61]" />,
      title: "Group Budgeting",
      description: "Collaborate with travel companions to manage shared expenses easily."
    },
    {
      icon: <Globe2 className="h-8 w-8 text-[#d77a61]" />,
      title: "Currency Converter",
      description: "Convert expenses between currencies in real-time for accurate budgeting."
    },
    
    
    
  ];

  return (
    <>
    <section className="py-20 px-4" id="features">
      <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#d77a61]">

          Everything you need for smart travel budgeting
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div className="p-6 rounded-lg border border-gray-200 hover:border-[#d77a61] transition-colors">

            <div className="text-blue-500 mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
          ))}
        </div>
      </div>
    </section>

<section className="bg-gray-900 text-white py-20 px-4" id="contact">
<div className="max-w-4xl mx-auto text-center">
<Plane className="h-16 w-16 mx-auto mb-6 text-[#d77a61]" />


  <h2 className="text-3xl md:text-4xl font-bold mb-6">
    Ready to start your journey?
  </h2>
  <p className="text-xl mb-8 text-gray-300">
    Join a smatter platform for your budget planning needs.
  </p>
  <button className="bg-[#d77a61] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#c06955] transition-colors">

    Get Started 
  </button>
</div>
</section>
    </>
  );
}

export default Features;