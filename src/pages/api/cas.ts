import type { NextApiRequest, NextApiResponse } from 'next';
import { retrieveData, addData } from '@/lib/firebase/service';

type ResponseData = {
  status: boolean;
  statusCode: number;
  message?: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'GET') {
    try {
      const data = await retrieveData('cas');
      return res.status(200).json({
        status: true,
        statusCode: 200,
        data: Array.isArray(data) ? data : [],
      });
    } catch (error) {
      console.error('Error fetching cas feedbacks from Firebase:', error);
      return res.status(500).json({
        status: false,
        statusCode: 500,
        message: 'Gagal mengambil data aspirasi dari database.',
      });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, email, phone, category, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          status: false,
          statusCode: 400,
          message: 'Nama, email, dan pesan wajib diisi.',
        });
      }

      // Generate avatar initials from name (e.g. Dimas Pratama -> DP)
      const initials = name
        .trim()
        .split(' ')
        .map((part: string) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase() || 'WIR';

      const newFeedback = {
        name: name.trim(),
        email: email.trim(),
        phone: (phone || '').trim(),
        category: category || 'Usulan Buku',
        message: message.trim(),
        avatar: initials,
        role: 'Pengunjung Perpustakaan',
        status: 'Sedang Ditinjau Tim Pustaka',
        statusColor: 'text-cyan-700 bg-cyan-100/70 border-cyan-300/50',
        adminReply: 'Terima kasih atas aspirasi Anda! Tim Pustakawan WIR sedang meninjau masukan ini.',
        createdAt: new Date().toISOString(),
      };

      const result = await addData('cas', newFeedback);

      return res.status(201).json({
        status: true,
        statusCode: 201,
        message: 'Aspirasi Anda berhasil dikirim dan tersimpan di database Perpustakaan WIR!',
        data: result,
      });
    } catch (error) {
      console.error('Error saving cas feedback to Firebase:', error);
      return res.status(500).json({
        status: false,
        statusCode: 500,
        message: 'Gagal menyimpan masukan ke database Firebase. Silakan coba lagi nanti.',
      });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({
    status: false,
    statusCode: 405,
    message: `Method ${req.method} tidak diizinkan.`,
  });
}
