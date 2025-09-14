# 🚀 Exchange Rates Fullstack Application

A complete fullstack application that fetches and displays Czech National Bank exchange rates with real-time caching and a beautiful responsive UI.

## ✨ **FEATURES IMPLEMENTED**

- ✅ **Real-time Exchange Rates**: Fetches live data from Czech National Bank
- ✅ **5-minute Caching**: Intelligent database caching with TTL
- ✅ **GraphQL API**: Modern API with Apollo Server
- ✅ **React Frontend**: Beautiful responsive UI with real-time updates
- ✅ **Cross-platform**: Works on Windows, macOS, and Linux
- ✅ **Professional Design**: Modern gradient UI with styled components

## 📋 **PROJECT OVERVIEW**

This task demonstrates a complete fullstack development workflow with modern technologies and best practices.

## 🏗️ **ARCHITECTURE**

### **Backend (NestJS + GraphQL)**
- **Framework**: NestJS with TypeScript
- **API**: GraphQL with Apollo Server
- **Database**: PostgreSQL with TypeORM
- **Caching**: 5-minute TTL cache in database
- **Data Source**: Czech National Bank API
- **Port**: 4001

### **Frontend (React + Apollo Client)**
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Styled Components
- **State Management**: Apollo Client
- **Real-time Updates**: 30-second polling
- **Port**: 5173

## 🛠️ **TECHNOLOGY STACK**

### **Backend Technologies:**
- NestJS 9.3.12
- GraphQL 16.6.0
- Apollo Server 3.11.1
- TypeORM 0.3.10
- PostgreSQL 8.8.0
- Axios 1.3.4

### **Frontend Technologies:**
- React 18
- TypeScript 4.7.4
- Vite
- Apollo Client
- Styled Components
- GraphQL Code Generation

### **Development Tools:**
- Nx 15.5.2 (Monorepo management)
- Yarn 3.2.3 (Package manager)
- Docker (Database containerization)
- ESLint + Prettier (Code quality)

## 🚀 **INSTALLATION & SETUP**

### **Prerequisites:**
- **Node.js**: 18.20+ ✅
- **npm**: 10+ ✅
- **Yarn**: Latest version
- **Docker Desktop**: For database (optional)
- **Git**: For version control

### **Windows Setup:**
```bash
yarn setup:windows
```

### **Option 3: Demo Mode (No Database)**
The application works without a database using sample data for demonstration purposes.

## 🎮 **AVAILABLE COMMANDS**

### **Development Commands:**
```bash
yarn start                    # Start both frontend and backend
yarn client:start            # Start frontend only
yarn server:start            # Start backend only
yarn build                    # Build both projects
yarn codecheck                # Run linting
yarn codecheck:fix            # Fix linting issues
```

### **Database Commands:**
```bash
yarn server:db-create
yarn server:migration
```

## 🌐 **API ENDPOINTS**

### **GraphQL Playground:**
- **URL**: http://localhost:4001/graphql
- **Features**: Interactive query explorer, schema documentation

### **Available Queries:**
```graphql
# Get exchange rates
query GetExchangeRates {
  exchangeRates {
    country
    currency
    amount
    code
    rate
  }
  lastFetchTime
}
```

## 🎨 **FRONTEND FEATURES**

### **Exchange Rates Table:**
- **Real-time Data**: Updates every 30 seconds
- **Responsive Design**: Works on all screen sizes
- **Professional UI**: Modern gradient design
- **Loading States**: Smooth loading indicators
- **Error Handling**: Graceful error messages

### **Cache Information:**
- **Last Fetch Time**: Shows when data was last updated
- **Cache Status**: Indicates if data is fresh or cached
- **Real-time Updates**: Automatic refresh every 30 seconds

## 🔧 **CONFIGURATION**

### **Environment Variables:**
```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5430
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=dev

# Server Configuration
PORT=4001
NODE_ENV=development

# GraphQL Configuration
GQL_DEBUG=true
GQL_PLAYGROUND=true
GQL_INTROSPECTION=true
```

### **Cache Configuration:**
- **TTL**: 5 minutes (300,000 ms)
- **Strategy**: Database-based caching
- **Invalidation**: Automatic after TTL expires

## 📁 **PROJECT STRUCTURE**

```
fullstack/task/
├── packages/
│   ├── client/                 # React frontend
│   │   ├── src/
│   │   │   ├── components/     # React components
│   │   │   ├── graphql/        # GraphQL queries
│   │   │   └── App.tsx         # Main app component
│   │   └── package.json
│   └── server/                 # NestJS backend
│       ├── src/
│       │   ├── services/       # Business logic
│       │   ├── entities/        # Database models
│       │   ├── config/          # Configuration
│       │   └── main.ts          # Application entry
│       ├── scripts/             # Database scripts
│       └── package.json
└── package.json                # Root package configuration
```

## 🎯 **SUCCESS CRITERIA**

✅ **Backend Implementation:**
- GraphQL API serving exchange rates
- Czech National Bank data integration
- 5-minute caching mechanism
- Professional error handling

✅ **Frontend Implementation:**
- Responsive exchange rates table
- Real-time data updates
- Cache timestamp display
- Modern, professional UI

## 🏆 **DEMO RESULTS**

When running successfully, you should see:

1. **Frontend**: Beautiful exchange rates table at http://localhost:5173
2. **Backend**: GraphQL playground at http://localhost:4001/graphql
3. **Real-time Updates**: Data refreshes every 30 seconds
4. **Cache Information**: Shows last fetch time
5. **Professional UI**: Modern gradient design with smooth animations

## 🤝 **CONTRIBUTING**

This project demonstrates modern fullstack development practices:
- Clean architecture with separation of concerns
- Type-safe development with TypeScript
- Modern API design with GraphQL
- Responsive UI with professional design
- Cross-platform compatibility
- Comprehensive error handling

