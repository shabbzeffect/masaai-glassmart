import { z } from 'zod';

export const quoteSchema = z.object({
  honeypot: z.string().max(0).optional(),
  projectType: z.enum(['Residential', 'Commercial', 'Contractor / Trade', 'Repair / Replacement', 'Supply only', 'Supply and installation', 'Other']),
  categories: z.array(z.string()).min(1, 'Select at least one product or service'),
  productRef: z.string().max(300).optional(),
  quantity: z.string().max(50).optional(),
  dimensions: z.string().max(300).optional(),
  thickness: z.string().max(100).optional(),
  finish: z.string().max(100).optional(),
  title: z.string().min(3, 'Give your project a short title').max(120),
  description: z.string().min(10, 'Describe your requirements (min 10 characters)').max(5000),
  location: z.string().min(2, 'Site location is required').max(200),
  timeframe: z.string().min(1, 'Select a timeframe'),
  budget: z.string().optional(),
  needMeasurement: z.boolean().default(false),
  needDelivery: z.boolean().default(false),
  needInstallation: z.boolean().default(false),
  name: z.string().min(2, 'Full name is required').max(120),
  company: z.string().max(160).optional(),
  email: z.string().email('Enter a valid email').max(160),
  phone: z.string().min(6, 'Enter a valid phone number').max(30),
  contactMethod: z.enum(['Phone', 'Email', 'WhatsApp']),
  bestTime: z.string().max(120).optional(),
  privacyConsent: z.literal(true, { message: 'Privacy consent is required' }),
  marketingConsent: z.boolean().default(false),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export const contactSchema = z.object({
  honeypot: z.string().max(0).optional(),
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  phone: z.string().min(6).max(30).optional(),
  department: z.string().max(100).optional(),
  subject: z.string().min(3).max(160),
  message: z.string().min(10).max(5000),
  privacyConsent: z.literal(true, { message: 'Privacy consent is required' }),
});

export type ContactInput = z.infer<typeof contactSchema>;
