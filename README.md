# Scofield - Smart Goal Management App

Scofield is a privacy-focused goal and project management application that helps you create and track SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound).

## Features

- 📝 Create and manage SMART goals
- ✅ Break down goals into actionable tasks
- 📊 Track progress with visual charts and statistics
- 🎯 Prioritize tasks and set due dates
- 🌓 Light/Dark mode support
- 🔒 Privacy-focused with local data storage using IndexedDB

## Tech Stack

- **Framework**: Next.js 13 with App Router
- **UI**: Tailwind CSS + Radix UI
- **Database**: Dexie.js (IndexedDB)
- **Charts**: Chart.js + React Chart.js 2
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/scofield-v2.git
   cd scofield-v2/project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Project Structure

- `/app` - Next.js app router pages and layouts
- `/components` - React components
  - `/ui` - Base UI components
  - `/features` - Feature-specific components
- `/hooks` - Custom React hooks
- `/lib` - Utility functions and database setup
- `/public` - Static assets

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
