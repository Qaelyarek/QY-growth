import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, TrendingUp, LineChart, CheckCircle, Zap, Shield, Clock } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.1)_0%,transparent_100%)] opacity-40" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Leading the AI Revolution in Business Growth
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We're on a mission to transform how businesses interact with customers and maximize operational efficiency through cutting-edge AI solutions.
          </motion.p>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-[#39FF14]">Our Story</h2>
              <p className="text-gray-300 mb-4">
                QY-Growth was founded in 2021 by a team of AI researchers, software engineers, and business strategists who saw the transformative potential of conversational AI for businesses of all sizes.
              </p>
              <p className="text-gray-300 mb-4">
                After years of research and development, we launched our first AI Voice Agent system that could not only understand customer inquiries but engage in natural, human-like conversations that built rapport and delivered results.
              </p>
              <p className="text-gray-300">
                Today, our AI solutions work alongside thousands of businesses worldwide, helping them generate leads, close sales, and provide exceptional customer experiences 24/7 without the limitations of human capacity.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-px bg-gradient-to-r from-[#39FF14]/20 to-blue-500/20 rounded-xl blur-xl opacity-50"></div>
              <div className="relative rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Team collaboration" 
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Mission & Vision Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Our Mission & Vision</h2>
            <div className="mt-2 h-1 w-20 bg-[#39FF14] mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              className="bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center justify-center p-3 bg-[#39FF14]/10 rounded-lg mb-6">
                <TrendingUp className="h-8 w-8 text-[#39FF14]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-300">
                To democratize access to advanced AI technology by providing businesses with intelligent, scalable, and affordable automation solutions that drive growth and enhance customer experience.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center justify-center p-3 bg-[#39FF14]/10 rounded-lg mb-6">
                <LineChart className="h-8 w-8 text-[#39FF14]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-300">
                A world where every business leverages AI to create meaningful connections with customers, optimize operations, and unlock their full growth potential without technical barriers or prohibitive costs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section className="py-16 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Meet Our Leadership Team</h2>
            <p className="text-xl text-gray-300 mt-4 max-w-3xl mx-auto">
              Our diverse team brings together expertise in artificial intelligence, natural language processing, customer experience, and business strategy.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                title: 'CEO & Co-Founder',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                bio: 'Former AI Research Lead at Google with 15+ years experience in machine learning and natural language processing.'
              },
              {
                name: 'Michael Chen',
                title: 'CTO & Co-Founder',
                image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                bio: 'PhD in Computer Science specializing in conversational AI. Previously led voice technology initiatives at Amazon.'
              },
              {
                name: 'Jessica Rivera',
                title: 'Chief Product Officer',
                image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                bio: 'Former Head of Product at a leading CRM platform with expertise in designing human-centered AI solutions.'
              }
            ].map((person, index) => (
              <motion.div 
                key={index}
                className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <img 
                  src={person.image} 
                  alt={person.name}
                  className="w-full h-72 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold">{person.name}</h3>
                  <p className="text-[#39FF14]">{person.title}</p>
                  <p className="mt-3 text-gray-300 text-sm">{person.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Trust Indicators Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Businesses Trust QY-Growth</h2>
              <div className="space-y-6">
                {[
                  {
                    icon: <Users className="h-6 w-6 text-[#39FF14]" />,
                    title: '500+ Business Clients',
                    description: 'From startups to Fortune 500 companies across 20+ industries'
                  },
                  {
                    icon: <CheckCircle className="h-6 w-6 text-[#39FF14]" />,
                    title: '99.8% Conversation Accuracy',
                    description: 'Our AI systems consistently understand and respond appropriately to customer inquiries'
                  },
                  {
                    icon: <Award className="h-6 w-6 text-[#39FF14]" />,
                    title: 'Industry Recognition',
                    description: '2024 AI Innovation Award Winner by TechForward Magazine'
                  },
                  {
                    icon: <Shield className="h-6 w-6 text-[#39FF14]" />,
                    title: 'Enterprise-Grade Security',
                    description: 'SOC 2 Type II certified with advanced data encryption and privacy controls'
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-[#39FF14]/10 rounded-lg flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: '3.5M+', label: 'Conversations Handled' },
                { number: '40%', label: 'Avg. Increase in Lead Conversion' },
                { number: '60%', label: 'Cost Reduction vs. Traditional Staffing' },
                { number: '24/7', label: 'Availability, No Downtime' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-white/10 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <p className="text-4xl font-bold text-[#39FF14]">{stat.number}</p>
                  <p className="text-gray-300 mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-black to-gray-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business with AI?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Schedule a personalized demo to see how our AI solutions can address your specific business challenges.
          </p>
          <button className="px-8 py-4 bg-[#39FF14] hover:bg-[#32CC11] text-black font-semibold rounded-md shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all">
            Book Your Demo Today
          </button>
        </div>
      </section>
    </div>
  );
}