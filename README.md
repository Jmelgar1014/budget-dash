# Budget Dashboard

A full-stack personal finance management application built with Next.js. Track transactions, manage budgets, organize receipts, and visualize your spending patterns with an intuitive, modern interface.

## 🌟 Features

- 📊 **Real-time Transaction Tracking** - Log income and expenses with detailed categorization
- 💰 **Budget Planning & Monitoring** - Set budget goals and track spending against them with progress bars
- 📁 **Receipt Upload & Storage** - Upload receipts to AWS S3 and view them in a modal
- 📥 **CSV Export** - Export transactions for further analysis
- 📈 **Spending Analytics** - Visualize spending patterns with interactive Recharts charts
- 🔍 **Advanced Search & Filtering** - Find transactions by category, date range, and amount
- 🌓 **Dark Mode Support** - Seamless dark/light theme switching
- 📱 **Fully Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- 🔐 **Secure Authentication** - Clerk-powered user authentication
- ⚡ **Optimized Performance** - Tanstack Query for smart data caching
- 🛡️ **Rate Limiting** - API protection against abuse

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **UI Components**: Shadcn UI (Radix UI)
- **Styling**: Tailwind CSS
- **State Management**: Tanstack Query v5
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Themes**: Next Themes

### Backend & Database

- **Backend**: Convex (serverless database)
- **Authentication**: Clerk
- **File Storage**: AWS S3
- **Rate Limiting**: Upstash Redis

### Development Tools

- **Testing**: Jest + React Testing Library
- **Linting**: ESLint
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- AWS Account (for S3)
- Clerk Account (for authentication)
- Convex Account (for database)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/budget-dash.git
cd budget
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

# Convex Database
NEXT_PUBLIC_CONVEX_URL=your_convex_url

# AWS S3
NEXT_PUBLIC_AWS_REGION=your_aws_region
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key

# Upstash Redis (for rate limiting)
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📖 Usage

### Adding Transactions

1. Click "Add Transaction" button
2. Fill in vendor, amount, category, and description
3. Optionally upload a receipt image
4. Click Submit

### Managing Budgets

1. Navigate to the Budgets page
2. Set budget limits for each category
3. Monitor spending against your budget goals
4. View progress bars that update in real-time

### Viewing Receipts

1. Click "Download Receipt" on a transaction with an image
2. View images in a modal with transaction details

### Exporting Data

1. Select a time period on the Transactions page
2. Click "Export to CSV" to download transaction data
3. Open in Excel or your preferred spreadsheet application

## 🧪 Testing

Run tests with:

```bash
npm test
```

## 🔨 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests

## 📁 Project Structure

```
.
├── app/
│   ├── (protected)/          # Protected routes requiring authentication
│   │   ├── budgets/
│   │   ├── home/
│   │   └── transactions/
│   ├── api/                  # API routes
│   │   ├── transactions/
│   │   ├── budgets/
│   │   ├── receipts/
│   │   └── upload/
│   ├── layout.tsx
│   └── page.tsx
├── components/               # React components
│   ├── TransactionDetail/
│   ├── budgetComponents/
│   ├── FormComponents/
│   ├── ui/                   # Shadcn UI components
│   └── skeletons/
├── convex/                   # Convex database functions and schema
├── schema/                   # Zod validation schemas
├── utilities/                # Utility functions
├── Types/                    # TypeScript type definitions
└── hooks/                    # Custom React hooks
```

## 🔐 Security Features

- Authentication with Clerk
- Protected API routes
- Rate limiting on endpoints using Upstash Redis
- Zod schema validation for all inputs
- Secure AWS S3 signed URLs for file uploads
- Environment variable protection

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

```bash
npm run build
npm start
```

## 👨‍💻 Author

José Melgar

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn UI](https://ui.shadcn.com/)
- [Convex](https://www.convex.dev/)
- [Clerk](https://clerk.com/)
- [Recharts](https://recharts.org/)

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub or contact me directly.

---

**Made with ❤️ by José Melgar**
