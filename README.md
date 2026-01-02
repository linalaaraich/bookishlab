# Bookishlab

A comprehensive web application for tracking books, managing reading lists, writing reviews, saving quotes, and discovering new books through an intelligent recommendation quiz.

## Features

- **Book Tracking**: Organize your books by reading status (To Be Read, Currently Reading, Read, DNF)
- **Personal Reviews**: Write and manage reviews with ratings for each book
- **Quote Collection**: Save memorable quotes with page numbers and personal notes
- **Custom Tags**: Create and assign color-coded tags for better organization
- **Book Exploration**: Discover new books using the Google Books API
- **Smart Recommendations**: Take a personalized quiz to get book recommendations
- **Categories & Classifications**: Books are automatically categorized for easy browsing

## Tech Stack

### Backend
- **Java 17** with **Spring Boot 3.2.0**
- **Spring Data JPA** for database operations
- **H2 Database** (in-memory) for easy setup
- **Maven** for dependency management

### Frontend
- **React 18** with functional components and hooks
- **React Router** for navigation
- **Axios** for API calls
- **React Icons** for UI icons

### External API
- **Google Books API** for book discovery and metadata

## Project Structure

```
bookishlab/
├── src/main/java/com/bookishlab/
│   ├── controller/       # REST API controllers
│   ├── model/           # Entity classes
│   ├── repository/      # JPA repositories
│   ├── service/         # Business logic
│   └── BookishlabApplication.java
├── src/main/resources/
│   └── application.properties
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/  # Reusable React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service layer
│   │   └── styles/      # CSS files
│   └── package.json
└── pom.xml
```

## Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 16+ and npm
- Maven 3.6+

### Backend Setup

1. Navigate to the project root:
```bash
cd bookishlab
```

2. Build and run the Spring Boot application:
```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will start on `http://localhost:3000`

### Optional: Google Books API Key

To enhance the book search functionality, you can add a Google Books API key:

1. Get an API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Add it to `src/main/resources/application.properties`:
```properties
google.books.api.key=YOUR_API_KEY_HERE
```

The app works without an API key but may have rate limits.

## Usage

### Home Page
- View reading statistics
- See recently added books
- Access random saved quotes

### My Books
- View all your books
- Filter by reading status
- Search by title or author

### Explore
- Search for books using Google Books API
- Browse by category
- Add books to your library

### Quiz
- Answer personality-based questions
- Get personalized book recommendations

### Book Details
- Update reading status
- Rate books with a 5-star system
- Write reviews
- Save favorite quotes
- Add custom tags
- Manage book information

## API Endpoints

### Books
- `GET /api/books` - Get all books
- `GET /api/books/{id}` - Get book by ID
- `GET /api/books/status/{status}` - Get books by status
- `GET /api/books/explore?query={query}` - Search Google Books
- `POST /api/books` - Add a new book
- `PUT /api/books/{id}/status` - Update book status
- `PUT /api/books/{id}/rating` - Update book rating
- `DELETE /api/books/{id}` - Delete a book

### Reviews
- `GET /api/reviews/book/{bookId}` - Get reviews for a book
- `POST /api/reviews` - Create a review
- `PUT /api/reviews/{id}` - Update a review
- `DELETE /api/reviews/{id}` - Delete a review

### Quotes
- `GET /api/quotes/book/{bookId}` - Get quotes for a book
- `POST /api/quotes` - Create a quote
- `PUT /api/quotes/{id}` - Update a quote
- `DELETE /api/quotes/{id}` - Delete a quote

### Quiz
- `GET /api/quiz/questions` - Get quiz questions
- `POST /api/quiz/recommendations` - Get book recommendations

## Database

The application uses H2 in-memory database. You can access the H2 console at:
```
http://localhost:8080/h2-console
```

Connection details:
- JDBC URL: `jdbc:h2:mem:bookishlab`
- Username: `sa`
- Password: (leave empty)

## Future Enhancements

- User authentication and profiles
- Social features (sharing lists, following friends)
- Reading goals and statistics
- Export/import functionality
- Mobile app
- Integration with Goodreads
- Book clubs and discussions

## License

MIT License

## Author

Built with ❤️ for book lovers
