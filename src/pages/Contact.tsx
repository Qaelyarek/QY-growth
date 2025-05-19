import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Clock, MessageCircle, 
  Users, Send, CheckCircle, AlertCircle
} from 'lucide-react';

export function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      if (Math.random() > 0.1) { // 90% success rate for demo
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service: '',
          message: ''
        });
      } else {
        setFormStatus('error');
      }
    }, 1500);
  };

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
            Get In Touch
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Have questions about our AI solutions? Ready to transform your business operations? We're here to help.
          </motion.p>
        </div>
      </section>
      
      {/* Contact Info + Form Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-[#39FF14]/10 p-3 rounded-lg mr-4">
                    <Mail className="h-6 w-6 text-[#39FF14]" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-300">contact@qygrowth.com</p>
                    <p className="text-gray-500 text-sm">For general inquiries</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#39FF14]/10 p-3 rounded-lg mr-4">
                    <Phone className="h-6 w-6 text-[#39FF14]" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-300">(555) 123-4567</p>
                    <p className="text-gray-500 text-sm">Mon-Fri from 9am to 6pm EST</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#39FF14]/10 p-3 rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-[#39FF14]" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Office</h3>
                    <p className="text-gray-300">
                      123 AI Plaza, Suite 101<br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#39FF14]/10 p-3 rounded-lg mr-4">
                    <Clock className="h-6 w-6 text-[#39FF14]" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Business Hours</h3>
                    <p className="text-gray-300">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: By appointment<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-[#39FF14]" />
                  Response Time
                </h3>
                <p className="text-gray-300 mb-4">
                  We strive to respond to all inquiries within 2 business hours during normal business hours.
                </p>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-[#39FF14]" />
                  <p className="text-gray-300">
                    <span className="font-semibold">Fastest way to reach us:</span> Phone call
                  </p>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-white/10">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                
                {formStatus === 'success' && (
                  <motion.div 
                    className="mb-6 bg-green-900/20 border border-green-500/30 rounded-lg p-4 flex items-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-green-400">Message Sent Successfully</h3>
                      <p className="text-sm text-gray-300 mt-1">Thank you for contacting us! We'll get back to you shortly.</p>
                    </div>
                  </motion.div>
                )}
                
                {formStatus === 'error' && (
                  <motion.div 
                    className="mb-6 bg-red-900/20 border border-red-500/30 rounded-lg p-4 flex items-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-red-400">Error Sending Message</h3>
                      <p className="text-sm text-gray-300 mt-1">There was a problem sending your message. Please try again or contact us directly.</p>
                    </div>
                  </motion.div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-md focus:border-[#39FF14]/50 focus:outline-none focus:ring-1 focus:ring-[#39FF14]/50 transition-colors"
                        placeholder="John Doe"
                        disabled={formStatus === 'submitting' || formStatus === 'success'}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-md focus:border-[#39FF14]/50 focus:outline-none focus:ring-1 focus:ring-[#39FF14]/50 transition-colors"
                        placeholder="john@company.com"
                        disabled={formStatus === 'submitting' || formStatus === 'success'}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-md focus:border-[#39FF14]/50 focus:outline-none focus:ring-1 focus:ring-[#39FF14]/50 transition-colors"
                        placeholder="Company Inc."
                        disabled={formStatus === 'submitting' || formStatus === 'success'}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-md focus:border-[#39FF14]/50 focus:outline-none focus:ring-1 focus:ring-[#39FF14]/50 transition-colors"
                        placeholder="(555) 123-4567"
                        disabled={formStatus === 'submitting' || formStatus === 'success'}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="service" className="block text-sm font-medium mb-2">
                      Service You're Interested In *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-md focus:border-[#39FF14]/50 focus:outline-none focus:ring-1 focus:ring-[#39FF14]/50 transition-colors"
                      disabled={formStatus === 'submitting' || formStatus === 'success'}
                    >
                      <option value="">Select a service...</option>
                      <option value="AI Lead Generation">AI Lead Generation</option>
                      <option value="AI Sales Callers">AI Sales Callers</option>
                      <option value="AI Business Assistants">AI Business Assistants</option>
                      <option value="Other">Other / Not Sure Yet</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-md focus:border-[#39FF14]/50 focus:outline-none focus:ring-1 focus:ring-[#39FF14]/50 transition-colors"
                      placeholder="Tell us about your business needs and how we can help..."
                      disabled={formStatus === 'submitting' || formStatus === 'success'}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                    className={`
                      flex items-center justify-center w-full px-8 py-4 text-lg font-semibold rounded-md
                      ${formStatus === 'submitting' 
                        ? 'bg-gray-700 text-gray-300 cursor-not-allowed' 
                        : formStatus === 'success'
                          ? 'bg-green-500 text-white cursor-not-allowed'
                          : 'bg-[#39FF14] text-black hover:bg-[#32CC11] shadow-[0_0_20px_rgba(57,255,20,0.3)]'}
                      transition-all
                    `}
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : formStatus === 'success' ? (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Message Sent
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Our Location</h2>
          <div className="rounded-xl overflow-hidden border border-white/10 h-96">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6305.578090909293!2d-122.40093927387891!3d37.792454036801114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064578324cf%3A0x4a501367f076adff!2sFinancial%20District%2C%20San%20Francisco%2C%20CA%2094104!5e0!3m2!1sen!2sus!4v1710440290297!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300 mt-4 max-w-3xl mx-auto">
              Find quick answers to common questions about our AI solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "How quickly can I implement your AI solutions?",
                answer: "Most of our AI solutions can be fully implemented within 1-2 weeks. The exact timeline depends on the complexity of your needs and the level of customization required. Our team works efficiently to ensure minimal disruption to your operations during implementation."
              },
              {
                question: "Do your AI systems integrate with my existing CRM?",
                answer: "Yes, our AI solutions integrate seamlessly with all major CRM platforms including Salesforce, HubSpot, Zoho, Microsoft Dynamics, and many others. We also provide custom integration services for proprietary systems."
              },
              {
                question: "How do you ensure the security of our data?",
                answer: "We maintain strict security protocols including SOC 2 Type II compliance, end-to-end encryption, and regular security audits. We never share your data with third parties, and all information is processed in accordance with relevant data protection regulations."
              },
              {
                question: "What kind of ROI can I expect from implementing your AI?",
                answer: "Our clients typically see ROI within 3-6 months of implementation. The average ROI ranges from 200-400%, with cost reductions of 40-60% in relevant departments and revenue increases of 25-45% in sales teams using our AI Sales Callers."
              },
              {
                question: "Can your AI solutions be customized to match our brand voice?",
                answer: "Absolutely. We can tailor our AI to match your specific brand voice, tone, terminology, and communication style. This customization ensures that all AI interactions with your customers maintain consistent brand messaging."
              },
              {
                question: "What kind of support do you provide after implementation?",
                answer: "We provide comprehensive post-implementation support including 24/7 technical assistance, regular performance reviews, ongoing optimization, and training for your team. Our dedicated customer success managers ensure you get maximum value from our solutions."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-3 text-[#39FF14]">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
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