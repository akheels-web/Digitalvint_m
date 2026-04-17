import { createClient } from '@sanity/client';
import axios from 'axios';

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || 'x6r02qtl';
const SANITY_AUTH_TOKEN = process.env.SANITY_AUTH_TOKEN;
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbymXtTfHMJrQoz2nxoDaz9tCdNguciL75bPTxXSzuOhqfskYQE6o-vgpYxlRe0tlwax/exec';

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false,
  token: SANITY_AUTH_TOKEN, // This needs Write/Editor permissions
  apiVersion: '2023-05-03',
});

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const data = req.body;

  try {
    // 1. Send to Google Sheets (Parallel)
    const googlePromise = axios.post(GOOGLE_SCRIPT_URL, JSON.stringify({
      ...data,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    }), {
      headers: { 'Content-Type': 'text/plain;charset=utf-8' }
    });

    // 2. Create lead in Sanity CRM (Parallel)
    const sanityPromise = client.create({
      _type: 'lead',
      name: data.name,
      email: data.email,
      phone: data.phone || 'N/A',
      service: data.service || 'Website Inquiry',
      message: data.message || `No message provided.`,
      source: data.source || 'Website Contact Form',
      status: 'new',
    });

    // Fire both and wait
    await Promise.all([googlePromise, sanityPromise]);

    return res.status(200).json({ 
      success: true, 
      message: 'Lead captured in CRM and Google Sheets' 
    });

  } catch (error) {
    console.error('Lead Submission Error:', error.message);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to process lead',
      error: error.message 
    });
  }
}
