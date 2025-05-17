import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { toast } from 'react-hot-toast';
import { Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import qyLogo from '/assets/White-QY-logo.png';

interface FormData {
  fullName: string;
  email: string;
  companyName: string;
  service: string;
  challenges: string;
  additionalInfo?: string;
}

const services = [
  'AI Agent',
  'AI Phone Agent',
  'Email Automation',
  'Social Media Automation',
];

export default function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isRecaptchaLoading, setIsRecaptchaLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  useEffect(() => {
    const checkRecaptcha = async () => {
      if (executeRecaptcha) {
        try {
          await executeRecaptcha('init');
          setIsRecaptchaLoading(false);
        } catch (error) {
          console.error('reCAPTCHA initialization error:', error);
        }
      }
    };

    checkRecaptcha();
  }, [executeRecaptcha]);

  const onSubmit = async (data: FormData) => {
    try {
      if (!executeRecaptcha) {
        toast.error('reCAPTCHA is not initialized. Please refresh the page.');
        return;
      }

      let token;
      try {
        token = await executeRecaptcha('form_submit');
      } catch (recaptchaError) {
        console.error('reCAPTCHA error:', recaptchaError);
        toast.error('Failed to verify reCAPTCHA. Please try again.');
        return;
      }
      
      if (!token) {
        toast.error('Failed to obtain reCAPTCHA verification');
        return;
      }

      const submissionData = {
        full_name: data.fullName.trim(),
        email: data.email.trim().toLowerCase(),
        company_name: data.companyName.trim(),
        service: data.service,
        challenges: data.challenges.trim(),
        additional_info: data.additionalInfo?.trim() || null,
        recaptcha_token: token,
        processed: false
      };

      const { error } = await supabase
        .from('contact_submissions')
        .insert([submissionData])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        
        if (error.code === '23505') {
          toast.error('A submission with this email already exists.');
        } else if (error.code === '23502') {
          toast.error('Please fill in all required fields.');
        } else {
          toast.error('Failed to submit form. Please try again.');
        }
        return;
      }

      toast.success('Form submitted successfully! We\'ll be in touch soon.');
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white font-mono">
      <nav className="w-full bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <Link to="/" className="flex items-center space-x-2">
            <img src={qyLogo} alt="QY Growth Logo" className="h-8 w-auto" />
            <Terminal className="w-8 h-8 text-white" />
            <span className="text-xl font-bold tracking-tight text-white">QYGrowth</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-dark-accent p-8 rounded-lg border border-white/10">
          <h1 className="text-3xl font-bold mb-8 tracking-tight text-center">
            Schedule Your AI Automation Consultation
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                Full Name*
              </label>
              <input
                type="text"
                id="fullName"
                {...register('fullName', { required: 'Full name is required' })}
                className="w-full px-4 py-3 bg-dark border border-white/10 rounded-md focus:border-white/30 outline-none"
                placeholder="John Doe"
              />
              {errors.fullName && (
                <p className="mt-1 text-red-400 text-sm">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address*
              </label>
              <input
                type="email"
                id="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className="w-full px-4 py-3 bg-dark border border-white/10 rounded-md focus:border-white/30 outline-none"
                placeholder="john@company.com"
              />
              {errors.email && (
                <p className="mt-1 text-red-400 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="companyName" className="block text-sm font-medium mb-2">
                Company Name*
              </label>
              <input
                type="text"
                id="companyName"
                {...register('companyName', { required: 'Company name is required' })}
                className="w-full px-4 py-3 bg-dark border border-white/10 rounded-md focus:border-white/30 outline-none"
                placeholder="Company Inc."
              />
              {errors.companyName && (
                <p className="mt-1 text-red-400 text-sm">{errors.companyName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-medium mb-2">
                Select Service*
              </label>
              <select
                id="service"
                {...register('service', { required: 'Please select a service' })}
                className="w-full px-4 py-3 bg-dark border border-white/10 rounded-md focus:border-white/30 outline-none"
              >
                <option value="">Select a service...</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="mt-1 text-red-400 text-sm">{errors.service.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="challenges" className="block text-sm font-medium mb-2">
                What specific challenges are you looking to address?*
              </label>
              <textarea
                id="challenges"
                {...register('challenges', { required: 'Please describe your challenges' })}
                className="w-full px-4 py-3 bg-dark border border-white/10 rounded-md focus:border-white/30 outline-none min-h-[100px]"
                placeholder="Please describe your current pain points and automation goals"
              />
              {errors.challenges && (
                <p className="mt-1 text-red-400 text-sm">{errors.challenges.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-medium mb-2">
                Additional Information
              </label>
              <textarea
                id="additionalInfo"
                {...register('additionalInfo')}
                className="w-full px-4 py-3 bg-dark border border-white/10 rounded-md focus:border-white/30 outline-none min-h-[100px]"
                placeholder="Share any other relevant details about your business needs"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isRecaptchaLoading}
              className="w-full px-6 py-4 bg-white text-dark font-semibold hover:bg-gray-100 transition-all rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : isRecaptchaLoading ? 'Loading reCAPTCHA...' : 'Book Your Call Now'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}