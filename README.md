# 📰 TheAkhbaar

> **A modern, AI-powered Indian news platform delivering personalized news, intelligent summaries, AI-assisted conversations, and real-time content discovery.**

TheAkhbaar is a full-stack news application designed to provide a fast, personalized, and intelligent news-reading experience.

The platform aggregates news from **NewsData.io**, provides AI-powered article summaries and conversational news assistance using **Google Gemini**, stores user activity in **PostgreSQL**, and uses **Redis** for high-speed caching and reduced third-party API/AI requests.

The application combines traditional news aggregation with personalization, recommendation systems, caching, authentication, and generative AI into a single production-oriented web application.

---

## ✨ Features

### 📰 News Discovery

* Latest Indian and international news
* Category-based news browsing
* Search-based news discovery
* Breaking and trending news
* Multiple sorting options
* English and Hindi news support
* Infinite scrolling for continuous content discovery
* Responsive news cards
* Hero/top-stories section

### 🤖 AI-Powered Features

#### AI Article Summarization

Generate concise AI-powered summaries for individual articles.

Each summary contains:

* Key points
* Why it matters
* Quick take

AI summaries are cached using Redis to prevent repeatedly sending the same article to Gemini.

#### AI News Chat

Users can ask natural-language questions such as:

> "Show me the latest technology news"

> "What are today's top sports stories?"

> "Explain the current situation between India and Pakistan."

The system:

1. Parses the user's question.
2. Determines whether it corresponds to a news category or search query.
3. Retrieves relevant news.
4. Uses Gemini to generate a contextual response.
5. Falls back to Gemini's general knowledge when appropriate.
6. Clearly indicates when an answer is based on Gemini's general knowledge rather than the retrieved articles.

### 🎯 Personalized Recommendations

The application analyzes:

* Reading history
* Bookmarked articles

to determine the user's strongest interests and recommend relevant news categories.

A weighted scoring mechanism gives bookmarks greater importance than reading history.

### 🔖 Bookmarks

Authenticated users can:

* Bookmark articles
* Remove bookmarks
* View saved articles
* Prevent duplicate bookmarks

### 🕒 Reading History

The application records article interactions and uses this information for personalization.

### 🔐 Authentication

Firebase Authentication is used for user authentication while the backend associates application data with the authenticated user's Firebase UID.

### 🌙 Dark Mode

The UI supports light and dark themes throughout the application.

### 📱 Responsive UI

The interface is designed for:

* Desktop
* Tablet
* Mobile

with responsive navigation, cards, menus and content layouts.

### ⚡ Performance & Caching

Redis is used to cache expensive or frequently requested data, including:

* News API responses
* AI article summaries
* AI chat responses

This reduces:

* External API calls
* Gemini API calls
* Database/API latency
* Repeated computation

---

# 🏗️ Architecture

TheAkhbaar follows a **client-server monolithic full-stack architecture**.

The frontend and backend are separate applications, while the backend acts as the central API layer between the frontend, database, caching layer and external services.

```text
                         ┌─────────────────────┐
                         │       User          │
                         │   Web / Mobile      │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   React Frontend    │
                         │                     │
                         │ Components          │
                         │ Custom Hooks        │
                         │ Context             │
                         │ React Router        │
                         └──────────┬──────────┘
                                    │ HTTP / JSON
                                    ▼
                         ┌─────────────────────┐
                         │   Express Server    │
                         │                     │
                         │ Routes              │
                         │ Controllers         │
                         │ Services            │
                         │ Middleware          │
                         └───────┬─────┬───────┘
                                 │     │
                 ┌───────────────┘     └──────────────────┐
                 ▼                                        ▼
        ┌─────────────────┐                       ┌──────────────────┐
        │   PostgreSQL    │                       │      Redis       │
        │                 │                       │                  │
        │ Users           │                       │ News Cache       │
        │ Bookmarks       │                       │ AI Cache         │
        │ History         │                       │ API Cache        │
        └─────────────────┘                       └──────────────────┘
                 │
                 │
                 ▼
        ┌──────────────────────┐
        │ External Services    │
        │                      │
        │ NewsData.io          │
        │ Google Gemini        │
        │ Firebase             │
        └──────────────────────┘
```

---

# 🧱 Technology Stack

## Frontend

| Technology             | Purpose                               |
| ---------------------- | ------------------------------------- |
| React                  | Component-based frontend architecture |
| React Router           | Client-side routing                   |
| Axios                  | HTTP communication with backend APIs  |
| Tailwind CSS           | Responsive UI styling                 |
| Framer Motion          | UI animations and transitions         |
| React Infinite Scroll  | Infinite news loading                 |
| React Loading Skeleton | Loading-state UI                      |
| Sonner                 | Toast notifications                   |
| Lucide React           | UI icons                              |
| date-fns               | Date formatting and manipulation      |
| Firebase               | Authentication                        |

---

## Backend

| Technology                            | Purpose                        |
| ------------------------------------- | ------------------------------ |
| Node.js                               | JavaScript runtime             |
| Express.js                            | REST API server                |
| Axios                                 | External API communication     |
| PostgreSQL                            | Persistent relational database |
| Redis                                 | High-speed caching             |
| dotenv                                | Environment configuration      |
| Firebase Admin / Firebase integration | Authentication and identity    |
| Google Gemini                         | Generative AI                  |
| CORS                                  | Cross-origin request handling  |

---

## External APIs

### NewsData.io

Provides the application's news data.

The backend communicates with NewsData.io rather than exposing the API key directly to the browser.

### Google Gemini

Used for:

* Article summarization
* News-based AI conversations
* General AI responses

### Firebase

Used for user authentication and Firebase UID-based user identification.

---

# 🔄 How the Application Works

## News Request Flow

A typical news request follows this path:

```text
User
 │
 ▼
React Component
 │
 ▼
useNews()
 │
 ▼
Backend API
 │
 ▼
Express Route
 │
 ▼
Controller
 │
 ▼
Redis Cache
 │
 ├── HIT ─────► Return cached data
 │
 └── MISS
       │
       ▼
   NewsData.io
       │
       ▼
   Cache response
       │
       ▼
   Return JSON
       │
       ▼
React State
       │
       ▼
UI Rendering
```

This architecture allows the browser to interact primarily with the application's backend instead of directly depending on external services.

---

# 🧪 Local Development

## Prerequisites

Install:

* Node.js
* npm
* PostgreSQL
* Docker Desktop
* Git

---

## 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>

cd TheAkhbaar
```

---

## 2. Install frontend dependencies

```bash
cd theakhbaar
npm install
```

---

## 3. Install backend dependencies

```bash
cd ../server
npm install
```

---

## 4. Start Redis

If using Docker:

```bash
docker run -d \
 
```

Verify:

```bash
docker ps
```

---

## 5. Configure environment variables

Create the required `.env` files locally.

---

## 6. Start the backend

From the `server` directory:

```bash
npm start
```

or use the project's development script if configured:

```bash
npm run dev
```

---

## 7. Start the frontend

From the frontend directory:

```bash
npm start
```

The React development server will start locally.

---

# 🐳 Docker & Redis

Redis is containerized independently from the application.

```text
Docker
 │
 └── theakhbaar-redis
       │
       └── Redis 7 Alpine
             │
             └── Port 6379
```

This approach makes local Redis setup reproducible without requiring developers to install Redis directly on their operating system.

---

# 🚀 Production Deployment

The production architecture can be deployed as:

```text
                   Internet
                      │
                      ▼
             ┌─────────────────┐
             │ Frontend Hosting│
             │ Static React App │
             └────────┬────────┘
                      │
                      │ HTTPS
                      ▼
             ┌─────────────────┐
             │ Backend Hosting │
             │ Node + Express  │
             └──────┬─────┬────┘
                    │     │
          ┌─────────┘     └─────────┐
          ▼                         ▼
    PostgreSQL                    Redis
          │                         │
          └──────────┬──────────────┘
                     │
                     ▼
              External APIs
              ├── NewsData.io
              ├── Gemini
              └── Firebase
```

The exact hosting provider can be substituted without changing the application's fundamental architecture.

---

# 📦 Production Build

Build the React application with:

```bash
npm run build
```

The production bundle is generated in:

```text
build/
```

The build can then be served by a static hosting platform or web server.

---


# 📊 Request Lifecycle Example

Consider an AI summary request.

```text
1. User clicks "AI Summary"

2. React calls:
   POST /api/ai/summarize

3. Express receives request

4. AI route forwards request
   to summarizeArticle()

5. Controller extracts:
   article_id
   title
   description

6. Controller generates Redis key

7. Redis GET

8. If cached:
      return summary

9. Otherwise:
      call Gemini

10. Gemini generates structured summary

11. Summary is stored in Redis

12. Backend returns JSON

13. React updates state

14. AISummary component renders result
```

This demonstrates the application's separation between:

```text
Presentation
     ↓
API
     ↓
Business Logic
     ↓
Cache
     ↓
External Service
```

---

# 🧠 Engineering Trade-offs

## Why React?

React provides:

* Component reusability
* Mature ecosystem
* Client-side routing
* Straightforward state management
* Large developer community

For this application's SPA-oriented requirements, React provides sufficient flexibility without introducing the additional conventions of a full-stack framework.

---

## Why Express?

Express is lightweight and provides direct control over:

* Routes
* Middleware
* Controllers
* HTTP responses
* External API integration

This makes it suitable for a dedicated REST API backend.

---

## Why PostgreSQL?

PostgreSQL fits the application's relational data model.

The application has clear relationships between:

```text
Users
Bookmarks
History
Categories
```

A relational database provides:

* SQL querying
* Referential relationships
* Indexing
* Transactions
* Mature production tooling

---

## Why Redis?

News and AI operations can be expensive because they involve external services.

Redis allows frequently requested data to be served from memory.

Without caching:

```text
100 identical requests
       ↓
100 external/API calls
```

With caching:

```text
100 identical requests
       ↓
1 external request
       ↓
99 Redis responses
```

The exact savings depend on cache lifetime and request patterns.

---

# ⚠️ Current Limitations & Future Improvements

Possible future improvements include:

### Authentication

* Backend Firebase token verification middleware
* Role-based authorization
* Protected API routes

### Rate Limiting

Introduce Redis-backed rate limiting for:

```text
AI endpoints
News endpoints
Authentication endpoints
```

### Caching

Improve cache management with:

* Different TTLs by resource
* Cache invalidation strategies
* Redis namespaces
* Cache hit/miss metrics

### Database

Add and verify indexes for frequently queried columns such as:

```text
firebase_uid
article_id
category
created_at
```

### Observability

Introduce:

* Structured logging
* Request tracing
* Error monitoring
* Performance metrics
* Redis hit/miss monitoring

### Testing

Add:

```text
Unit tests
Integration tests
API tests
Component tests
End-to-end tests
```

Potential tools include Jest, Supertest and React Testing Library.

### CI/CD

A future pipeline could automatically:

```text
Git Push
   ↓
CI
   ↓
Install dependencies
   ↓
Run lint/tests
   ↓
Build
   ↓
Deploy
```

---

# 📜 Project Philosophy

TheAkhbaar was designed around several principles:

### Separation of Concerns

Frontend, backend, database and external integrations have distinct responsibilities.

### Performance First

Frequently requested and expensive operations are cached.

### User-Centric Design

Personalization, bookmarks, history and AI assistance are designed around the user's reading experience.

### API Security

Sensitive third-party credentials belong on the server rather than inside client-side code.

### Progressive Enhancement

The application remains useful as a traditional news platform while AI capabilities provide additional functionality.

---

# 🗺️ Roadmap

* [x] News aggregation
* [x] Category navigation
* [x] Search
* [x] Sorting
* [x] Infinite scrolling
* [x] Hero/top stories
* [x] Responsive navigation
* [x] Dark mode
* [x] Firebase authentication
* [x] Bookmarks
* [x] Reading history
* [x] Personalized recommendations
* [x] AI article summarization
* [x] AI news chat
* [x] Redis caching
* [x] Docker-based Redis
* [ ] Automated testing suite
* [ ] CI/CD pipeline
* [ ] Production monitoring
* [ ] Advanced rate limiting
* [ ] More sophisticated recommendation ranking

---

# 🤝 Contributing

Contributions are welcome.

### 1. Fork the repository

```bash
git clone <YOUR_REPOSITORY_URL>
```

### 2. Create a feature branch

```bash
git checkout -b feature/your-feature
```

### 3. Make your changes

Follow the existing project structure and coding conventions.

### 4. Commit

```bash
git add .
git commit -m "feat: add your feature"
```

### 5. Push

```bash
git push origin feature/your-feature
```

### 6. Open a Pull Request

Please provide a clear description of:

* What changed
* Why it changed
* How it was tested

---

# 📄 License

This project is currently available for educational and portfolio purposes.

If a formal open-source license is added later, replace this section with the appropriate license information.

---

# 👨‍💻 Author

**MIHIR**

Built as a full-stack engineering project combining:

```text
React
+
Node.js
+
Express
+
PostgreSQL
+
Redis
+
Firebase
+
NewsData.io
+
Google Gemini
```

---

# ⭐ Acknowledgements

* NewsData.io — News data provider
* Google Gemini — Generative AI capabilities
* Firebase — Authentication infrastructure
* PostgreSQL — Relational database
* Redis — In-memory caching
* React — Frontend framework
* Express — Backend framework

---

## ⭐ If you found this project interesting

Consider giving the repository a ⭐ and exploring the architecture, implementation and engineering decisions behind the application.
