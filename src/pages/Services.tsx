import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Phone, Bot, Clock, TrendingUp, PieChart, 
  CheckCircle, Shield, UserCheck, Calendar, ArrowRight, 
  BarChart, Award, Zap, MessageCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function Services() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden" id="services-hero">
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
            AI-Powered Solutions That Drive Revenue
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our advanced AI systems are designed to deliver measurable business outcomes by seamlessly handling customer interactions at scale.
          </motion.p>
        </div>
      </section>
      
      {/* Lead Generation Section */}
      <section className="py-16 bg-black/50" id="lead-generation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="order-2 md:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center justify-center p-3 bg-[#39FF14]/10 rounded-lg mb-6">
                <Users className="h-8 w-8 text-[#39FF14]" />
              </div>
              <h2 className="text-3xl font-bold mb-6">AI Lead Generation Systems</h2>
              <p className="text-gray-300 mb-6">
                Our AI lead generation platform identifies, engages, and qualifies prospects 24/7, ensuring your sales team only spends time on high-quality opportunities.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#39FF14] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Automated Prospect Identification</h3>
                    <p className="text-gray-400 text-sm">Intelligent algorithms identify potential customers based on your ideal customer profile</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#39FF14] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">24/7 Lead Generation</h3>
                    <p className="text-gray-400 text-sm">Never miss an opportunity with round-the-clock lead capture and qualification</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#39FF14] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">60% Lower Acquisition Costs</h3>
                    <p className="text-gray-400 text-sm">Significantly reduce your cost per lead compared to traditional methods</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#39FF14] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Real-time Optimization</h3>
                    <p className="text-gray-400 text-sm">AI continuously improves targeting and conversion rates based on performance data</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/30 backdrop-blur-md p-4 rounded-lg border border-white/10 mb-6">
                <div className="flex items-center mb-2">
                  <Award className="h-5 w-5 text-[#39FF14] mr-2" />
                  <h3 className="font-semibold">Success Story: FinTech Startup</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  "After implementing QY-Growth's AI lead generation system, we saw a 187% increase in qualified leads and reduced our customer acquisition cost by 43% within the first quarter."
                </p>
                <p className="text-right text-[#39FF14] text-xs mt-2">- Sarah T., CMO</p>
              </div>
              
              <Link to="/contact" className="inline-flex items-center text-[#39FF14] font-semibold hover:underline">
                <span>Learn how we can boost your lead generation</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
            
            <motion.div 
              className="order-1 md:order-2 relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-[#39FF14]/20 to-blue-500/20 rounded-xl blur-xl opacity-50"></div>
              <div className="relative rounded-xl overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.3)]">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="AI Lead Generation" 
                  className="w-full h-auto"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-white/10 text-center">
                  <div className="text-3xl font-bold text-[#39FF14]">300%</div>
                  <div className="text-sm text-gray-300">Average ROI</div>
                </div>
                <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-white/10 text-center">
                  <div className="text-3xl font-bold text-[#39FF14]">5x</div>
                  <div className="text-sm text-gray-300">Lead Capacity</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* AI Sales Callers Section */}
      <section className="py-16" id="sales-callers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-[#39FF14]/20 rounded-xl blur-xl opacity-50"></div>
              <div className="relative rounded-xl overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.3)]">
                <img 
                  src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="AI Sales Callers" 
                  className="w-full h-auto"
                />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-white/10 text-center col-span-1">
                  <div className="text-xl font-bold text-[#39FF14]">100%</div>
                  <div className="text-xs text-gray-300">Follow-up Rate</div>
                </div>
                <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-white/10 text-center col-span-1">
                  <div className="text-xl font-bold text-[#39FF14]">93%</div>
                  <div className="text-xs text-gray-300">Satisfaction</div>
                </div>
                <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-white/10 text-center col-span-1">
                  <div className="text-xl font-bold text-[#39FF14]">45%</div>
                  <div className="text-xs text-gray-300">More Meetings</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center justify-center p-3 bg-[#39FF14]/10 rounded-lg mb-6">
                <Phone className="h-8 w-8 text-[#39FF14]" />
              </div>
              <h2 className="text-3xl font-bold mb-6">AI Sales Callers</h2>
              <p className="text-gray-300 mb-6">
                Our AI Sales Callers engage prospects with natural, personalized conversations that build rapport, qualify leads, and schedule meetings – all without human limitations.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#39FF14] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Perfect Follow-up Execution</h3>
                    <p className="text-gray-400 text-sm">Never miss a follow-up call with automated, timely outreach to every prospect</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#39FF14] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Natural Conversations</h3>
                    <p className="text-gray-400 text-sm">Advanced language models create engaging, human-like dialog that builds trust</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#39FF14] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Automated Scheduling</h3>
                    <p className="text-gray-400 text-sm">AI seamlessly books meetings directly into your sales team's calendars</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#39FF14] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Unlimited Qualification</h3>
                    <p className="text-gray-400 text-sm">Scale your outreach without adding headcount or sacrificing quality</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/30 backdrop-blur-md p-4 rounded-lg border border-white/10 mb-6">
                <div className="flex items-center mb-2">
                  <Award className="h-5 w-5 text-[#39FF14] mr-2" />
                  <h3 className="font-semibold">Success Story: SaaS Company</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  "Our AI Sales Callers have handled over 10,000 conversations in three months, booking 400+ qualified meetings and generating $2.7M in new pipeline – all without adding a single SDR."
                </p>
                <p className="text-right text-[#39FF14] text-xs mt-2">- Mark L., VP of Sales</p>
              </div>
              
              <Link to="/contact" className="inline-flex items-center text-[#39FF14] font-semibold hover:underline">
                <span>Discover how AI can transform your sales calls</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* AI Business Assistants Section */}
      <section className="py-16 bg-black/50" id="business-assistants">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="order-2 md:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center justify-center p-3 bg-[#39FF14]/10 rounded-lg mb-6">
                <Bot className="h-8 w-8 text-[#39FF14]" />
              </div>
              <h2 className="text-3xl font-bold mb-6">AI Business Assistants</h2>
              <p className="text-gray-300 mb-6">
                Our AI Business Assistants handle administrative tasks, customer support, scheduling, and communications, freeing your team to focus on high-value activities.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#39FF14] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Streamlined Administration</h3>
                    <p className="text-gray-400 text-sm">Automate data entry, document processing, and routine administrative work</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#39FF14] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Instant Customer Support</h3>
                    <p className="text-gray-400 text-sm">Provide 24/7 responses to customer inquiries with intelligent AI that knows your business</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#39FF14] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Communication Management</h3>
                    <p className="text-gray-400 text-sm">Handle email triage, respond to routine messages, and coordinate schedules</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#39FF14] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">40% Cost Reduction</h3>
                    <p className="text-gray-400 text-sm">Significantly lower operational expenses compared to traditional staffing</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/30 backdrop-blur-md p-4 rounded-lg border border-white/10 mb-6">
                <div className="flex items-center mb-2">
                  <Award className="h-5 w-5 text-[#39FF14] mr-2" />
                  <h3 className="font-semibold">Success Story: Legal Firm</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  "Our AI Business Assistant now handles client intake, appointment scheduling, and document preparation – saving each attorney 15+ hours per week and improving our client responsiveness."
                </p>
                <p className="text-right text-[#39FF14] text-xs mt-2">- James W., Managing Partner</p>
              </div>
              
              <Link to="/contact" className="inline-flex items-center text-[#39FF14] font-semibold hover:underline">
                <span>See how our AI can streamline your operations</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
            
            <motion.div 
              className="order-1 md:order-2 relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-[#39FF14]/20 to-blue-500/20 rounded-xl blur-xl opacity-50"></div>
              <div className="relative rounded-xl overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.3)]">
                <img 
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="AI Business Assistant" 
                  className="w-full h-auto"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-white/10 text-center">
                  <div className="text-3xl font-bold text-[#39FF14]">40%</div>
                  <div className="text-sm text-gray-300">Cost Reduction</div>
                </div>
                <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-white/10 text-center">
                  <div className="text-3xl font-bold text-[#39FF14]">95%</div>
                  <div className="text-sm text-gray-300">Task Automation</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Key Benefits of Our AI Solutions</h2>
            <p className="text-xl text-gray-300 mt-4 max-w-3xl mx-auto">
              Our clients consistently experience these transformative outcomes when implementing our AI technologies
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <TrendingUp className="h-10 w-10 text-[#39FF14]" />,
                title: 'Revenue Growth',
                description: 'Generate more leads, close more deals, and increase customer lifetime value through consistent, optimized interactions.'
              },
              {
                icon: <Clock className="h-10 w-10 text-[#39FF14]" />,
                title: '24/7 Availability',
                description: 'Never miss an opportunity with round-the-clock AI agents that handle inquiries and tasks without fatigue or downtime.'
              },
              {
                icon: <PieChart className="h-10 w-10 text-[#39FF14]" />,
                title: 'Cost Efficiency',
                description: 'Reduce operational expenses by 40-60% compared to traditional staffing while improving quality and consistency.'
              },
              {
                icon: <UserCheck className="h-10 w-10 text-[#39FF14]" />,
                title: 'Human Augmentation',
                description: 'Free your team from repetitive tasks so they can focus on creative, strategic, and high-value activities.'
              },
              {
                icon: <BarChart className="h-10 w-10 text-[#39FF14]" />,
                title: 'Data-Driven Insights',
                description: 'Gain valuable business intelligence from every interaction to continuously improve processes and outcomes.'
              },
              {
                icon: <Zap className="h-10 w-10 text-[#39FF14]" />,
                title: 'Rapid Scalability',
                description: 'Easily scale operations up or down without the limitations and costs of traditional hiring and training.'
              }
            ].map((benefit, index) => (
              <motion.div 
                key={index}
                className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center p-3 bg-[#39FF14]/10 rounded-lg mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Implementation Process */}
      <section className="py-16 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Simple Implementation Process</h2>
            <p className="text-xl text-gray-300 mt-4 max-w-3xl mx-auto">
              Getting started with our AI solutions is straightforward and minimally disruptive to your operations
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                number: '01',
                title: 'Consultation',
                description: 'We analyze your specific needs and challenges to identify the right AI solution',
                icon: <MessageCircle className="h-6 w-6" />
              },
              {
                number: '02',
                title: 'Customization',
                description: 'We configure and train the AI to align with your brand voice and business processes',
                icon: <Bot className="h-6 w-6" />
              },
              {
                number: '03',
                title: 'Integration',
                description: 'Seamless connection with your existing systems and workflows',
                icon: <Zap className="h-6 w-6" />
              },
              {
                number: '04',
                title: 'Optimization',
                description: 'Continuous improvement based on performance data and business outcomes',
                icon: <TrendingUp className="h-6 w-6" />
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-white/10 h-full">
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#39FF14] text-black flex items-center justify-center font-bold text-lg">
                    {step.number}
                  </div>
                  <div className="pt-6">
                    <div className="mb-4 p-3 bg-black/60 rounded-lg inline-flex">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
                
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-[#39FF14]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-black to-gray-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Revolutionize Your Business with AI?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Schedule a personalized demo to see how our AI solutions can address your specific business challenges.
          </p>
          <Link to="/contact" className="px-8 py-4 bg-[#39FF14] hover:bg-[#32CC11] text-black font-semibold rounded-md shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all inline-block">
            Request Your Demo Today
          </Link>
        </div>
      </section>
    </div>
  );
}