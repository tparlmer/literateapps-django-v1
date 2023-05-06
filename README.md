# Alphabet Quiz

Alphabet Quiz is a Django-based web application designed to help 6-year-old children learn and practice the English alphabet. The app presents a quiz that plays audio prompts for each letter, and children record their answers. Teachers and tutors can create classrooms, manage students, and view quiz results.

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.

### Prerequisites

- Python 3.8 or newer
- pip (Python package manager)
- Virtualenv (optional but recommended)

### Installation

1. Clone the repository:

    git clone https://github.com/tparlmer/literateapps-django-v1.git
    cd literateapps-django-v1


2. Create and activate a virtual environment (optional but recommended):

    python3 -m venv venv
    source venv/bin/activate # On Windows, use venv\Scripts\activate


3. Install the required dependencies:

    pip install -r requirements.txt


4. Apply the database migrations:

    python manage.py migrate


## Running the Development Server

To run the development server, execute the following command:

    python manage.py runserver

The application will be available at http://127.0.0.1:8000/quiz.

## Running Tests

To run the test suite, execute the following command:

    python manage.py test

## Contributing

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the [MIT License](LICENSE.md).
