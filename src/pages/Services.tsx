import React from 'react';
import { Terminal, ArrowRight, PhoneCall, Calendar, MessageSquare, Mail, Users, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Services() {
  const services = [
    {
      title: "AI Voice Agent",
      icon: <PhoneCall className="w-8 h-8 text-[#39FF14]" />,
      description: "Our AI Voice Agents handle inbound and outbound calls with natural conversation, qualifying leads 24/7 without human fatigue.",
      features: [
        "Instant lead qualification",
        "Natural voice conversations",
        "24/7 availability",
        "Seamless CRM integration"
      ]
    },
    {
      title: "Appointment Setting",
      icon: <Calendar className="w-8 h-8 text-[#39FF14]" />,
      description: "Stop wasting hours scheduling meetings. Our AI handles the back-and-forth, finding perfect times and sending confirmations automatically.",
      features: [
        "Calendar integration",
        "Automated follow-ups",
        "Time zone management",
        "Meeting reminder system"
      ]
    },
    {
      title: "Email Automation",
      icon: <Mail className="w-8 h-8 text-[#39FF14]" />,
      description: "From personalized outreach to follow-up sequences, our email automation tools ensure no prospect falls through the cracks.",
      features: [
        "Personalized sequences",
        "Response detection",
        "A/B testing",
        "Performance analytics"
      ]
    },
    {
      title: "Chat & Support",
      icon: <MessageSquare className="w-8 h-8 text-[#39FF14]" />,
      description: "Engage website visitors 24/7 with intelligent chat that answers questions, qualifies leads, and books meetings - all without human intervention.",
      features: [
        "Instant responses",
        "Lead qualification",
        "Seamless handoffs",
        "Multi-channel support"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero section */}
      <div className="relative py-24 px-4">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.1)_0%,transparent_100%)] opacity-40" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Terminal className="w-10 h-10 text-[#39FF14] mr-3" />
              <h1 className="text-4xl font-bold">Our Services</h1>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/10 mb-12 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">
                Experience our advanced AI solutions designed to eliminate time-consuming tasks
              </h2>
              <p className="text-xl text-gray-300 mb-4">
                Let our AI handle your outreach, lead qualification, and appointment setting while you focus on closing deals and growing your business.
              </p>
              <div className="flex items-center justify-center text-[#39FF14] text-sm font-mono">
                <span className="inline-block animate-pulse mr-2">●</span>
                <span>RECLAIM YOUR TIME WITH AI AUTOMATION</span>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {services.map((service, index) => (
              <motion.div 
                key={index}
                className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-white/10 hover:border-[#39FF14]/30 transition-all group"
                variants={itemVariants}
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-[#39FF14] transition-colors">{service.title}</h3>
                <p className="text-gray-300 mb-6">{service.description}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Business Impact Section */}
          <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-white/10 p-8 mb-16 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">How Our AI Solutions Impact Your Business</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <Clock className="w-10 h-10 text-[#39FF14] mx-auto mb-3" />
                <h4 className="text-xl font-semibold mb-2">Save Time</h4>
                <p className="text-gray-300">Reclaim 15+ hours weekly that would otherwise be spent on repetitive tasks</p>
              </div>
              
              <div className="text-center p-4">
                <Users className="w-10 h-10 text-[#39FF14] mx-auto mb-3" />
                <h4 className="text-xl font-semibold mb-2">More Leads</h4>
                <p className="text-gray-300">Increase qualified lead generation by 35% through consistent AI-powered outreach</p>
              </div>
              
              <div className="text-center p-4">
                <CheckCircle className="w-10 h-10 text-[#39FF14] mx-auto mb-3" />
                <h4 className="text-xl font-semibold mb-2">Close More Deals</h4>
                <p className="text-gray-300">Convert 27% more prospects with perfect follow-up timing and personalized engagement</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6">Ready to transform your outreach and appointment setting?</h3>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Our AI solutions work 24/7 to handle the time-consuming tasks of lead generation, qualification, and appointment setting so you can focus on closing deals.
            </p>
            
            <button className="bg-[#39FF14] text-black px-8 py-4 text-lg font-semibold rounded-full hover:bg-[#32CC11] transition-all inline-flex items-center space-x-3 shadow-[0_0_20px_rgba(57,255,20,0.3)] pulsating-button">
              <PhoneCall className="w-5 h-5" />
              <span>Talk to Our AI Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <p className="text-gray-400 text-sm mt-4">
              Experience the power of conversational AI and take back control of your schedule
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}