import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Service options based on database schema
const SERVICE_OPTIONS = [
  'Intelligent Chat Agent',
  'A.I. Inbound Sales Agent',
  'A.I. Outbound Sales Agent',
  'E-mail Automation',
  'UI Website Creation',
  'Content Creation',
  'Media Buying'
];

export default function ContactForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    service: '',
    challenges: '',
    additionalInfo: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Insert data into contact_submissions table
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            company_name: formData.companyName,
            service: formData.service,
            challenges: formData.challenges,
            additional_info: formData.additionalInfo || null
          }
        ]);

      if (error) throw error;

      // Success message and redirect
      toast.success('Thank you for your submission! We will contact you shortly.');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        service: '',
        challenges: '',
        additionalInfo: ''
      });
      
      // Redirect to home page after successful submission
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-white/10 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
      <p className="text-gray-300 mb-8 text-center">
        Tell us about your business challenges and discover how our AI solutions can help you grow.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
              Full Name *
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black/70 border border-white/20 rounded-md text-white focus:border-[#39FF14]/50 focus:outline-none focus:ring-1 focus:ring-[#39FF14]/50"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black/70 border border-white/20 rounded-md text-white focus:border-[#39FF14]/50 focus:outline-none focus:ring-1 focus:ring-[#39FF14]/50"
              placeholder="you@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
              Phone Number *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black/70 border border-white/20 rounded-md text-white focus:border-[#39FF14]/50 focus:outline-none focus:ring-1 focus:ring-[#39FF14]/50"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Company Name */}
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-1">
              Company Name *
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              required
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black/70 border border-white/20 rounded-md text-white focus:border-[#39FF14]/50 focus:outline-none focus:ring-1 focus:ring-[#39FF14]/50"
              placeholder="Your company"
            />
          </div>
        </div>

        {/* Service */}
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">
            What Service Are You Interested In? *
          </label>
          <select
            id="service"
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-black/70 border border-white/20 rounded-md text-white focus:border-[#39FF14]/50 focus:outline-none focus:ring-1 focus:ring-[#39FF14]/50"
          >
            <option value="" disabled>Select a service</option>
            {SERVICE_OPTIONS.map(service => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </div>

        {/* Business Challenges */}
        <div>
          <label htmlFor="challenges" className="block text-sm font-medium text-gray-300 mb-1">
            What Challenges Are You Looking to Solve? *
          </label>
          <textarea
            id="challenges"
            name="challenges"
            required
            value={formData.challenges}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 bg-black/70 border border-white/20 rounded-md text-white focus:border-[#39FF14]/50 focus:outline-none focus:ring-1 focus:ring-[#39FF14]/50 resize-none"
            placeholder="Tell us about your current business challenges..."
          ></textarea>
        </div>

        {/* Additional Information */}
        <div>
          <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-300 mb-1">
            Additional Information (Optional)
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 bg-black/70 border border-white/20 rounded-md text-white focus:border-[#39FF14]/50 focus:outline-none focus:ring-1 focus:ring-[#39FF14]/50 resize-none"
            placeholder="Any other details you'd like to share..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "w-full py-3 px-4 rounded-md flex items-center justify-center font-medium transition-all",
              isSubmitting 
                ? "bg-gray-700 text-gray-300 cursor-not-allowed" 
                : "bg-[#39FF14] text-black hover:bg-[#32CC11] shadow-[0_0_10px_rgba(57,255,20,0.3)]"
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Submit
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          By submitting this form, you agree to our privacy policy and terms of service.
          We'll use your information to contact you about our services.
        </p>
      </form>
    </div>
  );
}