# Quizium 🧠

An intelligent AI-powered quiz application that adapts to your learning style and challenges you to grow. Built with Next.js and powered by Google's Gemini AI.

[![Live Demo](https://img.shields.io/badge/demo-live-green)](https://quizium-nine.vercel.app/)
[![GitHub Stars](https://img.shields.io/github/stars/Frank2006x/Quizium)](https://github.com/Frank2006x/Quizium)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)

## ✨ Features

### 🤖 AI-Powered Quiz Generation
- **Smart Question Creation**: Generate contextually relevant questions using Google's Gemini 2.0 Flash API
- **Adaptive Difficulty**: Choose from multiple difficulty levels that match your skill level
- **Custom Topics**: Create quizzes on any topic you want to learn about
- **Detailed Explanations**: Get comprehensive explanations for each answer

### 👤 User Experience
- **Secure Authentication**: Google OAuth integration via NextAuth.js
- **Quiz History**: Track your progress and revisit previous quizzes
- **Performance Analytics**: Visualize your results with interactive charts
- **Responsive Design**: Perfect experience across desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes for comfortable studying

### 📊 Progress Tracking
- **Result Visualization**: Pie charts and analytics to understand your performance
- **Topic-Based Progress**: Track improvement across different subjects
- **Quiz Reattempts**: Retake quizzes to improve your scores

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB database (local or cloud)
- Google OAuth credentials
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Frank2006x/Quizium.git
   cd Quizium
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string
   
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_key
   
   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   
   # Google Gemini API
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Set up Google OAuth**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`

5. **Set up Google Gemini API**
   - Visit [Google AI Studio](https://aistudio.google.com/)
   - Generate an API key for Gemini
   - Add the key to your environment variables

6. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js 13+ App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── generate/      # Quiz generation endpoint
│   │   ├── getQuestion/   # Question retrieval
│   │   └── topics/        # Topic management
│   ├── home/              # Home page
│   ├── quiz/              # Quiz pages
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (Radix UI)
│   ├── magicui/          # Enhanced UI components
│   └── *.tsx             # Feature-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
│   └── mongodb.ts        # Database connection
├── models/               # Mongoose schemas
│   ├── quiz.modal.ts     # Quiz data model
│   └── session.model.ts  # User session model
└── store/                # Zustand state management
    └── useQues.ts        # Quiz state store
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.3.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React, Tabler Icons
- **Charts**: Recharts
- **State Management**: Zustand
- **Theme**: next-themes

### Backend
- **Runtime**: Node.js
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js with Google OAuth
- **AI Integration**: Google Gemini 2.0 Flash API

### Development Tools
- **Linting**: ESLint with Next.js config
- **Package Manager**: npm/yarn
- **Deployment**: Vercel

## 📱 Usage

### Creating a Quiz

1. **Sign in** with your Google account
2. **Choose a topic** you want to be quizzed on
3. **Select difficulty level** (Easy, Medium, Hard)
4. **Click "Generate Quiz"** and wait for AI to create questions
5. **Answer questions** and get instant feedback
6. **View results** with detailed explanations

### Managing Your Progress

- **Quiz History**: Access all your previous quizzes from the sidebar
- **Reattempt Quizzes**: Improve your scores by retaking quizzes
- **Track Performance**: View analytics and progress charts
- **Delete Quizzes**: Remove unwanted quiz records

## 🔧 API Endpoints

### Quiz Generation
```
POST /api/generate
Body: { topic: string, difficulty: string }
Response: { success: boolean, data: QuizQuestion[] }
```

### Get Quiz Questions
```
POST /api/getQuestion
Body: { userId: string }
Response: { questions: QuizQuestion[] }
```

### Topic Management
```
GET /api/topics
Response: { topics: string[] }
```

### Delete Quiz
```
DELETE /api/deleteQuiz
Body: { quizId: string }
Response: { success: boolean }
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect GitHub repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Deploy** automatically on push to main branch

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm run start
   ```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint configuration provided
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation if needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful question generation
- **Radix UI** for excellent accessibility-focused components
- **NextAuth.js** for seamless authentication
- **Vercel** for reliable hosting platform

## 🐛 Known Issues

- Quiz generation may occasionally timeout with very complex topics
- Theme switching might require a page refresh in some browsers

## 🗺️ Roadmap

- [ ] Add more question types (True/False, Fill-in-the-blank)
- [ ] Implement spaced repetition algorithm
- [ ] Add collaborative quiz features
- [ ] Mobile app development
- [ ] Advanced analytics and insights
- [ ] Multi-language support

## 📞 Support

If you encounter any issues or have questions:

- **GitHub Issues**: [Create an issue](https://github.com/Frank2006x/Quizium/issues)
- **Live Demo**: [Try Quizium](https://quizium-nine.vercel.app/)

---

**Made with ❤️ by [Frank2006x](https://github.com/Frank2006x)**

⭐ **Star this repository if you found it helpful!**
