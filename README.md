# AI News & Education Platform

A full-stack web application that aggregates AI news, offers educational courses, and provides community features alongside YouTube channel statistics.

## Tech Stack

### Backend
- Django
- Django REST Framework
- Django Channels
- Celery
- dj-stripe
- Django Allauth

### Frontend
- React
- Redux
- Material-UI
- React Router
- Axios

## Features

- AI News Feed
- Course Marketplace with Stripe Integration
- Community Forum
- Real-time YouTube Channel Statistics
- User Authentication
- Downloadable Course Materials

## Setup Instructions

### Backend Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
SECRET_KEY=your_django_secret_key
DEBUG=True
STRIPE_LIVE_SECRET_KEY=your_stripe_live_key
STRIPE_TEST_SECRET_KEY=your_stripe_test_key
STRIPE_LIVE_PUBLIC_KEY=your_stripe_live_public_key
STRIPE_TEST_PUBLIC_KEY=your_stripe_test_public_key
YOUTUBE_API_KEY=your_youtube_api_key
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create a superuser:
```bash
python manage.py createsuperuser
```

6. Start the development server:
```bash
python manage.py runserver
```

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

## Development

The application uses:
- PostgreSQL for the database
- Redis for Celery and Channels
- Stripe for payment processing
- YouTube Data API for channel statistics

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 