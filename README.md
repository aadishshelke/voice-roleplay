# Insurance Roleplay Practice Application

This application provides a roleplay practice environment for insurance agents to improve their communication skills through simulated customer interactions.

## Prerequisites

- Node.js (v16 or higher)
- Python 3.8 or higher
- Ollama with Llama3 model installed

## Setup

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will be available at http://localhost:8080

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (optional but recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the backend server:
```bash
python main.py
```

The backend API will be available at http://localhost:8000

## Features

- Interactive roleplay scenarios with AI-powered customer responses
- Real-time feedback on agent responses
- Sample scenarios for practice
- Modern, responsive UI

## API Endpoints

- POST `/api/generate-customer-response`: Generates customer responses based on agent input
- POST `/api/generate-feedback`: Provides feedback on agent responses

## Technologies Used

- Frontend: React, TypeScript, Tailwind CSS
- Backend: FastAPI, Python
- AI: Llama3 via Ollama

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/b9dec580-2385-4b42-91c6-201c7732ee56

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/b9dec580-2385-4b42-91c6-201c7732ee56) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/b9dec580-2385-4b42-91c6-201c7732ee56) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

# Voice Roleplay Application

A voice-based roleplay application for practicing sales conversations.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   # Backend
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt

   # Frontend
   cd ..
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `backend` directory with the following variables:
   ```
   HUGGINGFACE_TOKEN=your_huggingface_token_here
   GOOGLE_API_KEY=your_google_api_key_here
   ```

4. Start the servers:
   ```bash
   # Backend (in backend directory)
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   python main.py

   # Frontend (in root directory)
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:8080
- Backend: http://localhost:8000

## Features

- Voice-based roleplay scenarios
- Real-time feedback on communication skills
- Emotion and sentiment analysis
- Audio feature analysis
- Integration with Gemini AI for advanced feedback

## Requirements

All required Python packages are listed in `backend/requirements.txt` with their exact versions for reproducibility.
