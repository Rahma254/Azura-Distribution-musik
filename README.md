# Nabila Ahmad Studio - Distribution Music Platform

A comprehensive music distribution platform similar to SoundOn, built with Next.js, Supabase, and modern web technologies.

## 🎵 Features

### For Artists

- **Gmail Authentication** - Easy login with Google OAuth
- **Professional Music Submission** - SoundOn-style multi-step form
- **Real-time Analytics Dashboard** - Track streams, revenue, and performance
- **Royalty Withdrawal System** - Manage earnings and withdrawals
- **Profile Management** - Complete artist profile with social media links

### For Admins

- **Admin Dashboard** - Manage all submissions and users
- **Payment Tracking** - Monitor GoPay transactions
- **Artist Management** - Approve/reject submissions
- **Analytics Overview** - Platform performance metrics

### Platform Features

- **AI Chatbot** - 24/7 customer support
- **WhatsApp Integration** - Direct communication with admin
- **Multi-package System** - Starter, Professional, Label tiers
- **Global Distribution** - 150+ streaming platforms
- **Luxury UI/UX** - Premium design with animations

## 🚀 Quick Start

### 1. Environment Setup

Create `.env.local` file with your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://wejcgylojzxxgftzjeew.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlamNneWxvanp4eGdmdHpqZWV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MzI2ODgsImV4cCI6MjA2NjUwODY4OH0.iSE-gDfdqpmSY4VBCeGJc22kJiLIh9lg3KW5FJwMxw8
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Supabase Authentication

In your Supabase dashboard:

1. Go to Authentication > Providers
2. Enable Google OAuth
3. Add your domain to allowed redirect URLs:
   - `http://localhost:3000/auth/callback` (development)
   - `https://yourdomain.com/auth/callback` (production)

### 4. Database Schema

Create these tables in your Supabase database:

```sql
-- Artists table
CREATE TABLE artists (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  phone TEXT,
  total_streams BIGINT DEFAULT 0,
  total_revenue BIGINT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Songs table
CREATE TABLE songs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  artist_id UUID REFERENCES artists(id),
  title TEXT NOT NULL,
  album TEXT,
  genre TEXT NOT NULL,
  artwork_url TEXT,
  audio_url TEXT,
  release_date DATE NOT NULL,
  streams BIGINT DEFAULT 0,
  revenue BIGINT DEFAULT 0,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Withdrawal requests table
CREATE TABLE withdrawal_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  artist_id UUID REFERENCES artists(id),
  amount BIGINT NOT NULL,
  status TEXT DEFAULT 'pending',
  bank_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  account_name TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- Stream data table
CREATE TABLE stream_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  song_id UUID REFERENCES songs(id),
  platform TEXT NOT NULL,
  streams BIGINT NOT NULL,
  revenue BIGINT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 5. Run Development Server

```bash
npm run dev
```

## 📱 Platform Navigation

### Public Pages

- `/` - Landing page with features and pricing
- `/pricing` - Detailed pricing plans
- `/contracts` - Terms and conditions
- `/login` - Gmail authentication

### Artist Area

- `/artist` - Artist dashboard with analytics
- `/submit` - Professional music submission form

### Admin Area

- `/dashboard` - Admin dashboard (login: jesikamahjong@gmail.com / axis2019)

## 💰 Payment Integration

### GoPay Integration

- **Admin GoPay**: 0895340205302
- **WhatsApp Admin**: 085810526151
- **Admin Email**: jesikamahjong@gmail.com

All payments are processed through GoPay with WhatsApp confirmation.

## 🎨 Design Features

### Luxury UI Elements

- **Glass Morphism** effects
- **Gradient Animations**
- **Premium Shadows** and lighting
- **Smooth Transitions** throughout
- **Responsive Design** for all devices

### Color Scheme

- Primary: Purple to Blue gradients
- Accent: Gold highlights for premium features
- Background: Deep purple/blue/indigo gradients
- Text: White with various opacities

## 🔧 Technical Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom luxury themes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with Google OAuth
- **Charts**: Recharts for analytics
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📊 Analytics Features

### Real-time Data

- Live listener counts
- Stream tracking across platforms
- Revenue analytics
- Geographic distribution
- Platform performance

### Charts & Visualizations

- Line charts for stream trends
- Bar charts for revenue
- Pie charts for platform distribution
- Performance metrics with growth indicators

## 🎵 Music Submission Process

### 6-Step Professional Form

1. **Basic Info** - Artist, song title, release type
2. **Release Details** - Genre, mood, release date
3. **File Upload** - Audio, artwork, lyrics
4. **Distribution** - Package selection, platforms
5. **Rights & Credits** - Copyright, publishing
6. **Review & Submit** - Final confirmation

### File Requirements

- **Audio**: WAV, FLAC, MP3 (min 16-bit/44.1kHz)
- **Artwork**: JPG, PNG (min 1400x1400px)
- **Lyrics**: TXT, PDF, DOCX (optional)

## 💳 Pricing Packages

### Starter (Rp 50,000/release)

- 1 song per release
- 50+ platforms
- 85% royalty
- Email support

### Professional (Rp 150,000/month)

- Unlimited releases
- 150+ platforms
- 90% royalty
- 24/7 AI support
- Advanced analytics

### Label (Rp 500,000/month)

- Multi-artist management
- White-label platform
- 95% royalty
- Dedicated manager
- Custom features

## 🤖 AI Support System

### 24/7 Chatbot Features

- Intelligent response system
- Common question handling
- Automatic admin routing
- Multi-language support
- Context-aware assistance

## 📱 WhatsApp Integration

### Automated Messaging

- Structured submission data
- Payment confirmations
- Status updates
- Support requests

## 🔒 Security Features

### Authentication

- Google OAuth integration
- Secure session management
- Role-based access control
- Protected routes

### Data Protection

- Encrypted user data
- Secure file uploads
- GDPR compliance ready
- Privacy controls

## 🚀 Deployment

### Vercel Deployment

1. Connect GitHub repository
2. Configure environment variables
3. Deploy automatically

### Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 📞 Support

### Contact Information

- **WhatsApp**: 085810526151
- **Email**: jesikamahjong@gmail.com
- **GoPay**: 0895340205302

### AI Support

Available 24/7 through the chat widget on all pages.

## 🔄 Updates & Maintenance

The platform is designed for easy updates and maintenance:

- Modular component structure
- Clean separation of concerns
- Comprehensive error handling
- Performance optimized

---

**© 2024 Nabila Ahmad Studio Distribution Music Platform. All rights reserved.**
