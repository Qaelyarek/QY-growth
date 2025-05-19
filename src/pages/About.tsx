import React from 'react';
import { Terminal, Rocket, Zap, Lightbulb, Heart, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero section */}
      <div className="relative py-24 px-4">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.1)_0%,transparent_100%)] opacity-40" />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Terminal className="w-10 h-10 text-[#39FF14] mr-3" />
              <h1 className="text-4xl font-bold">Our Story</h1>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/10 mb-12 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">
                Technology that empowers everyone, not just the giants
              </h2>
              <p className="text-xl text-gray-300 mb-4">
                We're building a world where cutting-edge AI technology isn't just for Fortune 500 companies with massive budgets.
              </p>
              <div className="flex items-center justify-center text-[#39FF14] text-sm font-mono">
                <span className="inline-block animate-pulse mr-2">●</span>
                <span>DEMOCRATIZING AI FOR BUSINESS GROWTH</span>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <motion.div 
            className="mb-20"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div 
              className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-white/10 mb-12"
              variants={itemVariants}
            >
              <div className="flex items-start">
                <Heart className="w-8 h-8 text-[#39FF14] mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    Look, here's the thing - AI sales and marketing technology used to cost tens of thousands of dollars, putting it out of reach for small and medium businesses. We didn't think that was fair.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    We're on a mission to make these powerful tools accessible at prices that make sense for growing companies. When more entrepreneurs can use the same tech as the big players, we all win - more businesses succeed, more jobs get created, and more innovation happens.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    We genuinely believe technology should be a wealth-creator for the many, not just the few. That's not just a nice slogan - it's the reason we get up in the morning.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-white/10"
              variants={itemVariants}
            >
              <div className="flex items-start">
                <Rocket className="w-8 h-8 text-[#39FF14] mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    We see a future where your relationship with us grows alongside your business. As you scale, we keep bringing you the next wave of innovation in sales and marketing technology - always a step ahead of what you'll need next.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    This isn't about quick wins or one-off projects. We're building long-term partnerships where we can learn about your unique challenges and keep developing solutions that matter to you. When your business thrives, so does ours - it's that simple.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            className="mb-20"
            initial="hidden"
            animate="visible" 
            variants={containerVariants}
          >
            <h3 className="text-2xl font-bold mb-8 text-center">What Drives Us</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10"
                variants={itemVariants}
              >
                <Lightbulb className="w-8 h-8 text-[#39FF14] mb-4 mx-auto" />
                <h4 className="text-xl font-semibold mb-3 text-center">Innovation</h4>
                <p className="text-gray-300 text-center">
                  We're constantly exploring new ways AI can solve real business problems, focusing on practical applications rather than shiny demos.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10"
                variants={itemVariants}
              >
                <Users className="w-8 h-8 text-[#39FF14] mb-4 mx-auto" />
                <h4 className="text-xl font-semibold mb-3 text-center">Accessibility</h4>
                <p className="text-gray-300 text-center">
                  We believe powerful technology should be within reach for businesses of all sizes, not just those with enterprise budgets.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10"
                variants={itemVariants}
              >
                <Zap className="w-8 h-8 text-[#39FF14] mb-4 mx-auto" />
                <h4 className="text-xl font-semibold mb-3 text-center">Impact</h4>
                <p className="text-gray-300 text-center">
                  Every feature we build is measured by a single standard: will this help our clients grow faster and more sustainably?
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Team Section - Just a brief mention, no specific people */}
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-6">Who We Are</h3>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                We're a small team of technologists, marketers, and business operators who have experienced firsthand the challenges of growth. We've built QY-Growth to be the solution we wish we had when we were scaling our previous ventures.
              </p>
            </motion.div>
          </motion.div>

          {/* CTA */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">Let's build something meaningful together</h3>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              If you're looking to scale your business without scaling your headcount, let's talk about how our AI solutions can help.
            </p>
            
            <div className="flex justify-center">
              <motion.a 
                href="/contact" 
                className="bg-[#39FF14] text-black px-8 py-4 text-lg font-semibold rounded-full hover:bg-[#32CC11] transition-all inline-flex items-center space-x-3 shadow-glow-green"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}