# ADHD LifeBalance - Personal Productivity Dashboard

## Overview

ADHD LifeBalance is an ADHD-focused life management system built on the four-pillar philosophy (Health, Wealth, Love, Happiness). The application helps ADHD individuals overcome challenges, accomplish goals, and find life enjoyment without letting ADHD steer the wheel. It features strategic project chunking, intelligent overwhelm prevention, and sustainable balance tracking. The system uses a modern React frontend with Node.js/Express backend, PostgreSQL for data persistence, and Drizzle ORM for database management.

## User Preferences

Preferred communication style: Simple, everyday language with ADHD-friendly messaging and encouragement.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom design tokens and Inter font family
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation via @hookform/resolvers

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js with custom middleware for request logging and error handling
- **API Design**: RESTful endpoints following resource-based URL patterns
- **Database Layer**: Drizzle ORM with PostgreSQL dialect
- **Build System**: ESBuild for production builds with external package handling
- **Development**: Custom Vite integration for hot module replacement

### Data Storage Solutions
- **Primary Database**: PostgreSQL with connection via @neondatabase/serverless
- **ORM**: Drizzle ORM with schema-first approach and Zod integration
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`
- **Migration Strategy**: Drizzle Kit for schema migrations with `db:push` command

### Authentication and Authorization
- Currently implements a basic user system with username/password storage
- No session management or authentication middleware visible in current implementation
- User identification handled through userId parameters in API calls

### External Service Integrations
- **Neon Database**: Serverless PostgreSQL hosting
- **Unsplash**: Image CDN for pillar visualization (Health, Wealth, Love, Happiness themes)
- **Google Fonts**: Inter font family for typography
- **Replit**: Development environment integration with banner and error modal plugins

### Core Business Logic
- **Four Pillars System**: Tai Lopez's Health, Wealth, Love, and Happiness framework adapted for ADHD brains with sustainable tracking
- **Project Management**: Hierarchical structure of Pillars > Projects > Tasks
- **Time Blocking**: Daily schedule management with energy level consideration
- **Balance Metrics**: Overwhelm detection and life balance scoring algorithms
- **Progress Tracking**: Weekly insights and achievement recognition

### Development Tools
- **Type Safety**: Full TypeScript implementation with strict mode
- **Code Quality**: Centralized utility functions and consistent component patterns
- **Development Experience**: Hot reload, error overlays, and development banners
- **Build Process**: Optimized production builds with code splitting and asset optimization