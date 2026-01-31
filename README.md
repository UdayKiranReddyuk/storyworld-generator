# Storyworld Generator

A full-stack web application that generates fictional worlds with characters, locations, story arcs, dialogues, and art prompts based on user input.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Python](https://img.shields.io/badge/python-3.8+-green)
![React](https://img.shields.io/badge/react-18.2+-blue)
![License](https://img.shields.io/badge/license-MIT-yellow)

## Features

- **World Generation**: Create unique fictional worlds based on themes, genres, and complexity levels
- **Multiple Genres**: Support for Fantasy, Sci-Fi, and Steampunk genres
- **Rich Content**: Generate characters, locations, story arcs, dialogues, and AI art prompts
- **Database Persistence**: Save and retrieve generated worlds using SQLite
- **Export Functionality**: Export worlds as JSON or copy to clipboard
- **Responsive Design**: Beautiful glassmorphism UI with genre-specific color themes
- **Rate Limiting**: Built-in API rate limiting for protection
- **Input Validation**: Comprehensive validation for all user inputs
- **Error Handling**: Proper error handling with user-friendly messages

## Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **SQLAlchemy**: SQL toolkit and ORM
- **SQLite**: Lightweight database for persistence
- **Pydantic**: Data validation using Python type annotations
- **SlowAPI**: Rate limiting for FastAPI
- **Uvicorn**: ASGI server

### Frontend
- **React 18**: UI library
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

## Project Structure

```
storyworld-generator/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   ├── .env.example         # Environment variables template
│   └── storyworld.db        # SQLite database (auto-generated)
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Header.jsx
│   │   │   ├── WorldForm.jsx
│   │   │   ├── WorldDisplay.jsx
│   │   │   ├── TabNavigation.jsx
│   │   │   ├── OverviewTab.jsx
│   │   │   ├── CharactersTab.jsx
│   │   │   ├── LocationsTab.jsx
│   │   │   ├── StoryTab.jsx
│   │   │   ├── DialoguesTab.jsx
│   │   │   ├── ArtPromptsTab.jsx
│   │   │   ├── ExportButton.jsx
│   │   │   └── ErrorMessage.jsx
│   │   ├── App.jsx          # Main React component
│   │   ├── main.jsx         # React entry point
│   │   └── index.css        # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── README.md
└── docker-compose.yml       # Docker configuration
```

## Installation

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
```

3. Activate the virtual environment:
- Windows:
```bash
venv\Scripts\activate
```
- macOS/Linux:
```bash
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Create environment file:
```bash
copy .env.example .env
```

6. (Optional) Edit `.env` to customize settings:
```env
APP_NAME=Storyworld Generator API
VERSION=1.0.0
DEBUG=False
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
HOST=0.0.0.0
PORT=8000
RATE_LIMIT=10/minute
DATABASE_URL=sqlite:///./storyworld.db
```

7. Start the backend server:
```bash
python main.py
```

The backend will be available at `http://localhost:8000`

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
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Usage

### Generating a World

1. Open the application in your browser
2. Enter a theme for your world (e.g., "desert planet with ancient ruins")
3. Select a genre (Fantasy, Sci-Fi, or Steampunk)
4. Choose complexity level (Simple, Medium, or Complex)
5. Click "Generate Storyworld"

### Exploring Generated Content

Once a world is generated, you can explore different aspects using the tabs:

- **Overview**: Summary and key features of the world
- **Characters**: Detailed character profiles with roles, personalities, motivations, and backstories
- **Locations**: Descriptions of key locations in the world
- **Story Arc**: The main story phases and plot progression
- **Dialogues**: Sample dialogues between characters
- **Art Prompts**: AI art generation prompts for visualizing the world

### Exporting Worlds

- **Export JSON**: Download the entire world as a JSON file
- **Copy All**: Copy the world data to clipboard
- **Copy Individual Prompts**: Copy individual art prompts from the Art Prompts tab

## API Documentation

The backend provides a RESTful API with the following endpoints:

### Generate World
```http
POST /generate-world
Content-Type: application/json

{
  "theme": "desert planet with ancient ruins",
  "genre": "sci-fi",
  "complexity": "medium"
}
```

### Get All Worlds
```http
GET /worlds?skip=0&limit=10
```

### Get Specific World
```http
GET /worlds/{world_id}
```

### Delete World
```http
DELETE /worlds/{world_id}
```

### Health Check
```http
GET /health
```

Interactive API documentation is available at `http://localhost:8000/docs` (Swagger UI) or `http://localhost:8000/redoc` (ReDoc).

## Docker Deployment

### Using Docker Compose

1. Build and start all services:
```bash
docker-compose up --build
```

2. The application will be available at:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8000`
   - API Docs: `http://localhost:8000/docs`

3. Stop the services:
```bash
docker-compose down
```

### Manual Docker Build

#### Backend
```bash
cd backend
docker build -t storyworld-backend .
docker run -p 8000:8000 --env-file .env storyworld-backend
```

#### Frontend
```bash
cd frontend
docker build -t storyworld-frontend .
docker run -p 3000:3000 storyworld-frontend
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `APP_NAME` | Application name | Storyworld Generator API |
| `VERSION` | API version | 1.0.0 |
| `DEBUG` | Debug mode | False |
| `CORS_ORIGINS` | Allowed CORS origins | http://localhost:3000 |
| `HOST` | Server host | 0.0.0.0 |
| `PORT` | Server port | 8000 |
| `RATE_LIMIT` | API rate limit | 10/minute |
| `DATABASE_URL` | Database connection URL | sqlite:///./storyworld.db |

## Development

### Backend Development

```bash
cd backend
python main.py
```

The backend includes:
- Automatic API documentation (Swagger/ReDoc)
- Request validation with Pydantic
- Comprehensive error handling
- Logging to `backend.log`

### Frontend Development

```bash
cd frontend
npm run dev
```

The frontend includes:
- Hot module replacement
- ESLint for code quality
- Responsive design testing

### Building for Production

#### Backend
The backend is production-ready with:
- Rate limiting
- Input validation
- Error handling
- Logging
- CORS configuration

#### Frontend
```bash
cd frontend
npm run build
```

The build output will be in `frontend/dist/`.

## Troubleshooting

### Backend Issues

**Problem**: CORS errors
- **Solution**: Check `CORS_ORIGINS` in `.env` file

**Problem**: Database errors
- **Solution**: Delete `storyworld.db` and restart the server

**Problem**: Rate limit exceeded
- **Solution**: Wait or adjust `RATE_LIMIT` in `.env`

### Frontend Issues

**Problem**: Cannot connect to backend
- **Solution**: Ensure backend is running on port 8000

**Problem**: Build errors
- **Solution**: Delete `node_modules` and run `npm install`

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built with [FastAPI](https://fastapi.tiangolo.com/)
- UI powered by [React](https://reactjs.org/) and [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)

## Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.
=======
