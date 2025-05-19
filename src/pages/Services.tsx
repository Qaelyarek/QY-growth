import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calendar, Clock, ArrowRight, CheckCircle2, TrendingUp, 
  Users, BarChart3, Mail, MessageSquare, PhoneCall, 
  Zap, LineChart, Target, Rocket, Briefcase, RotateCcw
} from 'lucide-react';
import { StarBorder } from '../components/ui/star-border';
import { createClient } from '@supabase/supabase-js';
import { env } from '../lib/env';
import { cn } from '../lib/utils';

// Initialize Supabase client
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

const Services = () => {
  const [activeTab, setActiveTab] = useState<'appointment' | 'lead'>('appointment');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  // Animation variants
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

  // ROI Calculator state
  const [roiInputs, setRoiInputs] = useState({
    currentLeads: 100,
    conversionRate: 10,
    avgDealValue: 2500
  });

  const calculateRoi = () => {
    const currentRevenue = roiInputs.currentLeads * (roiInputs.conversionRate / 100) * roiInputs.avgDealValue;
    const improvedConversionRate = Math.min(roiInputs.conversionRate * 1.35, 100); // 35% improvement, capped at 100%
    const improvedRevenue = roiInputs.currentLeads * (improvedConversionRate / 100) * roiInputs.avgDealValue;
    return {
      currentRevenue: currentRevenue.toLocaleString('en-US', {style: 'currency', currency: 'USD'}),
      improvedRevenue: improvedRevenue.toLocaleString('en-US', {style: 'currency', currency: 'USD'}),
      difference: (improvedRevenue - currentRevenue).toLocaleString('en-US', {style: 'currency', currency: 'USD'}),
      percentageIncrease: Math.round((improvedRevenue / currentRevenue - 1) * 100)
    };
  };

  const roi = calculateRoi();

  const handleRoiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoiInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleInquire = async (service: string) => {
    try {
      // Store the selected service in session storage to pre-fill contact form
      sessionStorage.setItem('selectedService', service);
      // Redirect to contact page
      window.location.href = '/contact';
    } catch (error) {
      console.error("Error handling inquiry:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-20">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      
      {/* Radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.1)_0%,transparent_100%)] opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-block mb-2 px-4 py-1 bg-[#39FF14]/10 rounded-full text-[#39FF14] text-sm font-medium"
          >
            AI-POWERED GROWTH SOLUTIONS
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Transforming Business Challenges <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-[#32CC11]">
              Into Growth Opportunities
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
          >
            Our suite of AI-powered solutions eliminates time-consuming tasks, 
            streamlines your sales process, and drives revenue growth.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <StarBorder size="lg">
              <a 
                href="#appointment-setting" 
                onClick={() => setActiveTab('appointment')}
                className={cn(
                  "inline-flex items-center px-8 py-3 text-lg font-medium rounded-full transition-all",
                  activeTab === 'appointment' 
                    ? "bg-[#39FF14] text-black" 
                    : "bg-black text-white border border-white/20 hover:border-[#39FF14]/50"
                )}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Appointment Setting
              </a>
            </StarBorder>
            
            <StarBorder size="lg">
              <a 
                href="#lead-generation" 
                onClick={() => setActiveTab('lead')}
                className={cn(
                  "inline-flex items-center px-8 py-3 text-lg font-medium rounded-full transition-all",
                  activeTab === 'lead' 
                    ? "bg-[#39FF14] text-black" 
                    : "bg-black text-white border border-white/20 hover:border-[#39FF14]/50"
                )}
              >
                <Users className="w-5 h-5 mr-2" />
                Lead Generation
              </a>
            </StarBorder>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 text-center"
        >
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <div className="text-3xl md:text-4xl font-bold text-[#39FF14] mb-2">35%</div>
            <div className="text-sm text-gray-400">Increase in Qualified Leads</div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <div className="text-3xl md:text-4xl font-bold text-[#39FF14] mb-2">15+</div>
            <div className="text-sm text-gray-400">Hours Saved Weekly</div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <div className="text-3xl md:text-4xl font-bold text-[#39FF14] mb-2">27%</div>
            <div className="text-sm text-gray-400">Improved Conversion Rate</div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <div className="text-3xl md:text-4xl font-bold text-[#39FF14] mb-2">24/7</div>
            <div className="text-sm text-gray-400">Always-on Engagement</div>
          </div>
        </motion.div>

        {/* Appointment Setting & Deal Closing Section */}
        <section id="appointment-setting" className={cn("mb-24", activeTab !== 'appointment' && "opacity-70")}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-[#32CC11]">
                Stop Losing Deals
              </span> to Scheduling Chaos
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your sales team spends 30+ hours monthly on administrative scheduling tasks instead of closing deals.
              Our AI appointment setting solution changes that.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {/* Card 1 */}
            <motion.div 
              variants={itemVariants}
              className="bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-white/10 hover:border-[#39FF14]/30 transition-all"
            >
              <div className="bg-[#39FF14]/10 p-3 rounded-full inline-block mb-6">
                <Clock className="w-8 h-8 text-[#39FF14]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">End Long Sales Cycles</h3>
              <p className="text-gray-300 mb-6">
                Reduce your sales cycle by up to 38% with instant appointment setting and follow-up automation.
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Immediate response to meeting requests</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Smart rescheduling without endless emails</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Calendar optimization for faster closings</span>
                </li>
              </ul>
              <div className="text-sm font-medium text-gray-400 mb-4">
                "QY-Growth helped us reduce our sales cycle from 45 to 28 days."
                <div className="mt-2">— Jason Williams, VP Sales, TechForward</div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              variants={itemVariants}
              className="bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-white/10 hover:border-[#39FF14]/30 transition-all"
            >
              <div className="bg-[#39FF14]/10 p-3 rounded-full inline-block mb-6">
                <TrendingUp className="w-8 h-8 text-[#39FF14]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Boost Conversion Rates</h3>
              <p className="text-gray-300 mb-6">
                Convert 27% more prospects with perfect timing and personalized engagement that traditional methods miss.
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Strike while interest is highest</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Smart follow-up sequences</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                  <span>AI-guided personalization at scale</span>
                </li>
              </ul>
              <div className="text-sm font-medium text-gray-400 mb-4">
                "Our meeting-to-close ratio improved by 32% after implementing QY-Growth."
                <div className="mt-2">— Sarah Chen, Director of Sales, NexGen Solutions</div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              variants={itemVariants}
              className="bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-white/10 hover:border-[#39FF14]/30 transition-all"
            >
              <div className="bg-[#39FF14]/10 p-3 rounded-full inline-block mb-6">
                <RotateCcw className="w-8 h-8 text-[#39FF14]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Never Miss Follow-Ups</h3>
              <p className="text-gray-300 mb-6">
                Eliminate the 43% of lost deals that happen due to inconsistent follow-up with our automated system.
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Multi-channel follow-up sequences</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Perfectly timed re-engagement</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Intent detection and response</span>
                </li>
              </ul>
              <div className="text-sm font-medium text-gray-400 mb-4">
                "We never lose a lead to poor follow-up anymore. Game changer."
                <div className="mt-2">— Michael Torres, Sales Manager, Horizon LLC</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Integrations */}
          <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-white/10 p-8 mb-16">
            <h3 className="text-2xl font-bold mb-6 text-center">Works Seamlessly With Your Existing Tools</h3>
            
            <div className="flex flex-wrap justify-center gap-8 items-center opacity-70">
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">Salesforce</div>
                <div className="text-sm text-gray-400">CRM</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">HubSpot</div>
                <div className="text-sm text-gray-400">CRM</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">Calendly</div>
                <div className="text-sm text-gray-400">Scheduling</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">Google</div>
                <div className="text-sm text-gray-400">Calendar</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">Outlook</div>
                <div className="text-sm text-gray-400">Calendar</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">Zoom</div>
                <div className="text-sm text-gray-400">Meetings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">Teams</div>
                <div className="text-sm text-gray-400">Meetings</div>
              </div>
            </div>
          </div>

          {/* Case Study */}
          <div className="bg-gradient-to-br from-black to-gray-900 rounded-xl overflow-hidden mb-16 border border-white/10">
            <div className="p-8 md:p-12">
              <div className="mb-4 text-[#39FF14] font-medium">CASE STUDY</div>
              <h3 className="text-3xl font-bold mb-6">How TechScale Increased Meetings by 47% While Reducing Admin Work</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-300 mb-4">
                    TechScale, a SaaS company with 15 sales reps, struggled with inefficient scheduling processes that wasted 15+ hours per rep monthly and resulted in missed opportunities.
                  </p>
                  
                  <div className="mb-6">
                    <div className="font-bold mb-2">The Challenge:</div>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                        <span>Time-consuming manual scheduling</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                        <span>Leads going cold during scheduling delays</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                        <span>Inconsistent follow-up processes</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <div className="font-bold mb-2">The Solution:</div>
                    <p className="text-gray-300">
                      QY-Growth implemented our AI Appointment Setting solution integrated with their CRM and calendar tools, automating the entire scheduling workflow.
                    </p>
                  </div>
                </div>
                
                <div>
                  <div className="font-bold mb-2">The Results:</div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-black/50 p-4 rounded-lg border border-white/10">
                      <div className="text-3xl font-bold text-[#39FF14] mb-1">47%</div>
                      <div className="text-sm text-gray-400">More meetings scheduled</div>
                    </div>
                    
                    <div className="bg-black/50 p-4 rounded-lg border border-white/10">
                      <div className="text-3xl font-bold text-[#39FF14] mb-1">15hrs</div>
                      <div className="text-sm text-gray-400">Saved per rep monthly</div>
                    </div>
                    
                    <div className="bg-black/50 p-4 rounded-lg border border-white/10">
                      <div className="text-3xl font-bold text-[#39FF14] mb-1">28%</div>
                      <div className="text-sm text-gray-400">Higher close rate</div>
                    </div>
                    
                    <div className="bg-black/50 p-4 rounded-lg border border-white/10">
                      <div className="text-3xl font-bold text-[#39FF14] mb-1">3.2X</div>
                      <div className="text-sm text-gray-400">ROI in first quarter</div>
                    </div>
                  </div>
                  
                  <blockquote className="italic text-gray-300 border-l-2 border-[#39FF14] pl-4 mb-4">
                    "QY-Growth eliminated the scheduling bottleneck that was killing our conversion rates. Our sales team now spends time selling, not scheduling."
                  </blockquote>
                  
                  <div className="font-medium">— Alex Johnson, CRO at TechScale</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pricing Packages */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-12 text-center">
              Appointment Setting & Deal Closing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-[#32CC11] mt-2">
                Pricing Packages
              </span>
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Starter Package */}
              <div className={cn(
                "relative bg-black/30 backdrop-blur-sm p-8 rounded-lg border transition-all overflow-hidden",
                selectedPackage === 'starter' ? 'border-[#39FF14]' : 'border-white/10 hover:border-white/30'
              )}>
                {selectedPackage === 'starter' && (
                  <div className="absolute top-0 right-0 bg-[#39FF14] text-black px-4 py-1 text-sm font-medium">
                    Selected
                  </div>
                )}
                
                <h4 className="text-2xl font-bold mb-2">Starter</h4>
                <div className="text-4xl font-bold mb-1">$499<span className="text-lg text-gray-400">/mo</span></div>
                <p className="text-gray-400 mb-6">Perfect for small sales teams</p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Up to 200 meetings/month</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Basic follow-up automation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Calendar integrations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Email confirmation & reminders</span>
                  </li>
                </ul>
                
                <StarBorder className="w-full" size="sm">
                  <button 
                    onClick={() => {
                      setSelectedPackage('starter');
                      setTimeout(() => handleInquire('A.I. Inbound Sales Agent'), 500);
                    }}
                    className="w-full py-3 bg-black text-white hover:text-[#39FF14] font-medium rounded-md transition-colors"
                  >
                    Get Started
                  </button>
                </StarBorder>
              </div>
              
              {/* Pro Package */}
              <div className={cn(
                "relative bg-black/40 backdrop-blur-sm p-8 rounded-lg border transition-all z-10 md:scale-105 overflow-hidden",
                selectedPackage === 'pro' ? 'border-[#39FF14]' : 'border-white/10 hover:border-white/30'
              )}>
                {selectedPackage === 'pro' && (
                  <div className="absolute top-0 right-0 bg-[#39FF14] text-black px-4 py-1 text-sm font-medium">
                    Selected
                  </div>
                )}
                
                <div className="absolute top-0 right-0 bg-[#39FF14] text-black px-4 py-1 text-sm font-medium">
                  POPULAR
                </div>
                
                <h4 className="text-2xl font-bold mb-2">Pro</h4>
                <div className="text-4xl font-bold mb-1">$999<span className="text-lg text-gray-400">/mo</span></div>
                <p className="text-gray-400 mb-6">For growing businesses</p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Up to 500 meetings/month</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Advanced follow-up sequences</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                    <span>CRM integration (Salesforce, HubSpot)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                    <span>SMS + email confirmations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Rescheduling automation</span>
                  </li>
                </ul>
                
                <StarBorder className="w-full" variant="default" size="sm">
                  <button 
                    onClick={() => {
                      setSelectedPackage('pro');
                      setTimeout(() => handleInquire('A.I. Inbound Sales Agent'), 500);
                    }}
                    className="w-full py-3 bg-[#39FF14] text-black hover:bg-[#32CC11] font-medium rounded-md transition-colors"
                  >
                    Get Started
                  </button>
                </StarBorder>
              </div>
              
              {/* Enterprise Package */}
              <div className={cn(
                "relative bg-black/30 backdrop-blur-sm p-8 rounded-lg border transition-all overflow-hidden",
                selectedPackage === 'enterprise' ? 'border-[#39FF14]' : 'border-white/10 hover:border-white/30'
              )}>
                {selectedPackage === 'enterprise' && (
                  <div className="absolute top-0 right-0 bg-[#39FF14] text-black px-4 py-1 text-sm font-medium">
                    Selected
                  </div>
                )}
                
                <h4 className="text-2xl font-bold mb-2">Enterprise</h4>
                <div className="text-4xl font-bold mb-1">Custom<span className="text-lg text-gray-400"></span></div>
                <p className="text-gray-400 mb-6">For large organizations</p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Unlimited meetings</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Custom follow-up workflows</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Enterprise CRM integrations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Custom reporting & analytics</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Dedicated account manager</span>
                  </li>
                </ul>
                
                <StarBorder className="w-full" size="sm">
                  <button 
                    onClick={() => {
                      setSelectedPackage('enterprise');
                      setTimeout(() => handleInquire('A.I. Inbound Sales Agent'), 500);
                    }}
                    className="w-full py-3 bg-black text-white hover:text-[#39FF14] font-medium rounded-md transition-colors"
                  >
                    Contact Sales
                  </button>
                </StarBorder>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Generation & Nurturing Section */}
        <section id="lead-generation" className={cn("mb-24", activeTab !== 'lead' && "opacity-70")}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-[#32CC11]">
                Capture & Convert
              </span> More Qualified Leads
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The average B2B company loses 79% of new leads due to poor nurturing processes.
              Our AI lead generation & nurturing solutions fix this leak in your sales funnel.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {/* Card 1 */}
            <motion.div 
              variants={itemVariants}
              className="bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-white/10 hover:border-[#39FF14]/30 transition-all"
            >
              <div className="bg-[#39FF14]/10 p-3 rounded-full inline-block mb-6">
                <Users className="w-8 h-8 text-[#39FF14]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Automate Lead Capture</h3>
              <p className="text-gray-300 mb-6">
                Identify and engage high-intent prospects through multi-channel automated lead capture.
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Website visitor identification</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Intent-based lead scoring</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Real-time qualification</span>
                </li>
              </ul>
              <div className="text-sm font-medium text-gray-400 mb-4">
                "We've increased our lead volume by 54% while maintaining quality."
                <div className="mt-2">— Rachel Kim, Marketing Director, Orion Tech</div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              variants={itemVariants}
              className="bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-white/10 hover:border-[#39FF14]/30 transition-all"
            >
              <div className="bg-[#39FF14]/10 p-3 rounded-full inline-block mb-6">
                <Mail className="w-8 h-8 text-[#39FF14]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">AI-Powered Nurturing</h3>
              <p className="text-gray-300 mb-6">
                Keep leads engaged with personalized, behavior-triggered nurture campaigns that feel human, not automated.
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Behavior-triggered sequences</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                  <span>AI content personalization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Multi-channel engagement</span>
                </li>
              </ul>
              <div className="text-sm font-medium text-gray-400 mb-4">
                "Our email engagement increased 3.2x with QY-Growth's nurture sequences."
                <div className="mt-2">— David Patel, CMO, Vertex Solutions</div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              variants={itemVariants}
              className="bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-white/10 hover:border-[#39FF14]/30 transition-all"
            >
              <div className="bg-[#39FF14]/10 p-3 rounded-full inline-block mb-6">
                <BarChart3 className="w-8 h-8 text-[#39FF14]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Data-Driven Insights</h3>
              <p className="text-gray-300 mb-6">
                Transform raw lead data into actionable intelligence that guides your sales and marketing strategy.
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Conversion funnel analytics</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Engagement pattern detection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Predictive lead scoring</span>
                </li>
              </ul>
              <div className="text-sm font-medium text-gray-400 mb-4">
                "The insights helped us prioritize our best leads and increase win rates by 22%."
                <div className="mt-2">— Thomas Reed, CRO, Pinnacle Group</div>
              </div>
            </motion.div>
          </motion.div>

          {/* ROI Calculator */}
          <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-white/10 p-8 mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">
              Calculate Your Potential ROI with QY-Growth
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="mb-6">
                  <label className="block text-gray-300 mb-2">Monthly Lead Volume</label>
                  <input 
                    type="range" 
                    min="10" 
                    max="1000" 
                    step="10"
                    name="currentLeads"
                    value={roiInputs.currentLeads}
                    onChange={handleRoiChange}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#39FF14]"
                  />
                  <div className="flex justify-between text-sm mt-1">
                    <span>{roiInputs.currentLeads} leads</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-300 mb-2">Current Conversion Rate (%)</label>
                  <input 
                    type="range" 
                    min="1" 
                    max="30" 
                    name="conversionRate"
                    value={roiInputs.conversionRate}
                    onChange={handleRoiChange}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#39FF14]"
                  />
                  <div className="flex justify-between text-sm mt-1">
                    <span>{roiInputs.conversionRate}%</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-300 mb-2">Average Deal Value</label>
                  <input 
                    type="range" 
                    min="500" 
                    max="50000" 
                    step="500"
                    name="avgDealValue"
                    value={roiInputs.avgDealValue}
                    onChange={handleRoiChange}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#39FF14]"
                  />
                  <div className="flex justify-between text-sm mt-1">
                    <span>${roiInputs.avgDealValue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/30 p-6 rounded-lg border border-white/10">
                <h4 className="text-xl font-bold mb-4">Your Projected Results</h4>
                
                <div className="mb-6">
                  <div className="text-sm text-gray-400 mb-1">Current Monthly Revenue</div>
                  <div className="text-2xl font-bold">{roi.currentRevenue}</div>
                </div>
                
                <div className="mb-6">
                  <div className="text-sm text-gray-400 mb-1">Projected Monthly Revenue with QY-Growth</div>
                  <div className="text-2xl font-bold text-[#39FF14]">{roi.improvedRevenue}</div>
                </div>
                
                <div className="mb-6">
                  <div className="text-sm text-gray-400 mb-1">Additional Monthly Revenue</div>
                  <div className="text-2xl font-bold text-[#39FF14]">+{roi.difference}</div>
                </div>
                
                <div className="mb-6">
                  <div className="text-sm text-gray-400 mb-1">Percentage Increase</div>
                  <div className="text-2xl font-bold text-[#39FF14]">+{roi.percentageIncrease}%</div>
                </div>
                
                <div className="mt-8">
                  <StarBorder className="w-full" size="sm">
                    <button
                      onClick={() => handleInquire('A.I. Outbound Sales Agent')}
                      className="w-full py-3 bg-[#39FF14] text-black hover:bg-[#32CC11] font-medium rounded-md transition-colors flex items-center justify-center"
                    >
                      <span>Get My Custom Quote</span>
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                  </StarBorder>
                </div>
              </div>
            </div>
          </div>
          
          {/* Testimonial Section */}
          <div className="bg-gradient-to-br from-black to-gray-900 rounded-xl overflow-hidden mb-16 border border-white/10">
            <div className="p-8 md:p-12">
              <div className="mb-4 text-[#39FF14] font-medium">SUCCESS STORY</div>
              <h3 className="text-3xl font-bold mb-6">How MarketSphere Automated Their Lead Generation</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-300 mb-4">
                    MarketSphere, a digital marketing agency, struggled with inconsistent lead flow and poor lead quality despite significant ad spend.
                  </p>
                  
                  <div className="mb-6">
                    <div className="font-bold mb-2">Key Challenges:</div>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                        <span>High customer acquisition costs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                        <span>Inconsistent lead qualification</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                        <span>Manual nurturing processes</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <div className="font-bold mb-2">The Solution:</div>
                    <p className="text-gray-300">
                      QY-Growth implemented our AI Lead Generation & Nurturing solution with multi-channel engagement and behavior-triggered sequences.
                    </p>
                  </div>
                </div>
                
                <div>
                  <div className="font-bold mb-2">The Results:</div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-black/50 p-4 rounded-lg border border-white/10">
                      <div className="text-3xl font-bold text-[#39FF14] mb-1">42%</div>
                      <div className="text-sm text-gray-400">Reduced CAC</div>
                    </div>
                    
                    <div className="bg-black/50 p-4 rounded-lg border border-white/10">
                      <div className="text-3xl font-bold text-[#39FF14] mb-1">3.4X</div>
                      <div className="text-sm text-gray-400">Increase in qualified leads</div>
                    </div>
                    
                    <div className="bg-black/50 p-4 rounded-lg border border-white/10">
                      <div className="text-3xl font-bold text-[#39FF14] mb-1">68%</div>
                      <div className="text-sm text-gray-400">Higher engagement rates</div>
                    </div>
                    
                    <div className="bg-black/50 p-4 rounded-lg border border-white/10">
                      <div className="text-3xl font-bold text-[#39FF14] mb-1">23hrs</div>
                      <div className="text-sm text-gray-400">Weekly time saved</div>
                    </div>
                  </div>
                  
                  <blockquote className="italic text-gray-300 border-l-2 border-[#39FF14] pl-4 mb-4">
                    "QY-Growth's AI lead generation solution delivered higher quality leads at a lower cost than any channel we've tried in 5 years. The ROI has been incredible."
                  </blockquote>
                  
                  <div className="font-medium">— Emily Rodriguez, CMO at MarketSphere</div>
                </div>
              </div>
            </div>
          </div>

          {/* Lead Generation Pricing */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-12 text-center">
              Lead Generation & Nurturing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-[#32CC11] mt-2">
                Pricing Packages
              </span>
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Basic Package */}
              <div className={cn(
                "relative bg-black/30 backdrop-blur-sm p-8 rounded-lg border transition-all overflow-hidden",
                selectedPackage === 'lg-basic' ? 'border-[#39FF14]' : 'border-white/10 hover:border-white/30'
              )}>
                {selectedPackage === 'lg-basic' && (
                  <div className="absolute top-0 right-0 bg-[#39FF14] text-black px-4 py-1 text-sm font-medium">
                    Selected
                  </div>
                )}
                
                <h4 className="text-2xl font-bold mb-2">Basic</h4>
                <div className="text-4xl font-bold mb-1">$699<span className="text-lg text-gray-400">/mo</span></div>
                <p className="text-gray-400 mb-6">For startups & small businesses</p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Up to 500 leads/month</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Email & chat lead capture</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Basic lead nurturing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Standard analytics</span>
                  </li>
                </ul>
                
                <StarBorder className="w-full" size="sm">
                  <button 
                    onClick={() => {
                      setSelectedPackage('lg-basic');
                      setTimeout(() => handleInquire('Intelligent Chat Agent'), 500);
                    }}
                    className="w-full py-3 bg-black text-white hover:text-[#39FF14] font-medium rounded-md transition-colors"
                  >
                    Get Started
                  </button>
                </StarBorder>
              </div>
              
              {/* Growth Package */}
              <div className={cn(
                "relative bg-black/40 backdrop-blur-sm p-8 rounded-lg border transition-all z-10 md:scale-105 overflow-hidden",
                selectedPackage === 'lg-growth' ? 'border-[#39FF14]' : 'border-white/10 hover:border-white/30'
              )}>
                {selectedPackage === 'lg-growth' && (
                  <div className="absolute top-0 right-0 bg-[#39FF14] text-black px-4 py-1 text-sm font-medium">
                    Selected
                  </div>
                )}
                
                <div className="absolute top-0 right-0 bg-[#39FF14] text-black px-4 py-1 text-sm font-medium">
                  POPULAR
                </div>
                
                <h4 className="text-2xl font-bold mb-2">Growth</h4>
                <div className="text-4xl font-bold mb-1">$1,499<span className="text-lg text-gray-400">/mo</span></div>
                <p className="text-gray-400 mb-6">For mid-sized companies</p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Up to 2,000 leads/month</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Multi-channel lead capture</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Advanced nurturing sequences</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                    <span>CRM integration</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                    <span>A/B testing capabilities</span>
                  </li>
                </ul>
                
                <StarBorder className="w-full" variant="default" size="sm">
                  <button 
                    onClick={() => {
                      setSelectedPackage('lg-growth');
                      setTimeout(() => handleInquire('Intelligent Chat Agent'), 500);
                    }}
                    className="w-full py-3 bg-[#39FF14] text-black hover:bg-[#32CC11] font-medium rounded-md transition-colors"
                  >
                    Get Started
                  </button>
                </StarBorder>
              </div>
              
              {/* Enterprise Package */}
              <div className={cn(
                "relative bg-black/30 backdrop-blur-sm p-8 rounded-lg border transition-all overflow-hidden",
                selectedPackage === 'lg-enterprise' ? 'border-[#39FF14]' : 'border-white/10 hover:border-white/30'
              )}>
                {selectedPackage === 'lg-enterprise' && (
                  <div className="absolute top-0 right-0 bg-[#39FF14] text-black px-4 py-1 text-sm font-medium">
                    Selected
                  </div>
                )}
                
                <h4 className="text-2xl font-bold mb-2">Enterprise</h4>
                <div className="text-4xl font-bold mb-1">Custom<span className="text-lg text-gray-400"></span></div>
                <p className="text-gray-400 mb-6">For large organizations</p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Unlimited leads</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Omnichannel lead generation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Custom AI models & workflows</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Advanced analytics & dashboards</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14] mr-2 flex-shrink-0 mt-0.5" />
                    <span>Dedicated success manager</span>
                  </li>
                </ul>
                
                <StarBorder className="w-full" size="sm">
                  <button 
                    onClick={() => {
                      setSelectedPackage('lg-enterprise');
                      setTimeout(() => handleInquire('Intelligent Chat Agent'), 500);
                    }}
                    className="w-full py-3 bg-black text-white hover:text-[#39FF14] font-medium rounded-md transition-colors"
                  >
                    Contact Sales
                  </button>
                </StarBorder>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <div className="text-center mb-20">
          <h3 className="text-2xl md:text-4xl font-bold mb-6 max-w-3xl mx-auto">
            Ready to transform your business with AI-powered growth solutions?
          </h3>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Our AI solutions work 24/7 to handle time-consuming tasks so your team can focus on what they do best – closing deals and growing your business.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <StarBorder size="lg" className="shadow-glow-green">
              <Link
                to="/contact" 
                className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-full transition-all bg-[#39FF14] text-black hover:bg-[#32CC11]"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Schedule a Consultation
              </Link>
            </StarBorder>
            
            <StarBorder size="lg">
              <button
                onClick={() => handleInquire('A.I. Outbound Sales Agent')} 
                className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-full transition-all bg-black text-white border border-white/20 hover:border-[#39FF14]/50"
              >
                <PhoneCall className="w-5 h-5 mr-2" />
                Talk to an AI Agent Now
              </button>
            </StarBorder>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mb-16">
          <h4 className="text-center text-lg text-gray-400 mb-8">Trusted by industry-leading companies</h4>
          
          <div className="flex flex-wrap justify-center gap-12 items-center opacity-50">
            <div className="text-center">
              <div className="text-2xl font-bold">TechForward</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">NexGen</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">Orion Tech</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">Vertex</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">MarketSphere</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">Pinnacle</div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/10 text-center">
            <h4 className="text-xl font-bold mb-4 text-[#39FF14]">Email Us</h4>
            <p className="text-gray-300">
              For general inquiries:<br />
              info@qy-growth.com
            </p>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/10 text-center">
            <h4 className="text-xl font-bold mb-4 text-[#39FF14]">Call Us</h4>
            <p className="text-gray-300">
              Customer Support:<br />
              +1 (415) 555-0123
            </p>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/10 text-center">
            <h4 className="text-xl font-bold mb-4 text-[#39FF14]">Visit Us</h4>
            <p className="text-gray-300">
              123 AI Innovation Drive<br />
              San Francisco, CA 94105
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;