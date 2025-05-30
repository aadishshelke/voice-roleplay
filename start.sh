#!/bin/bash

# Start the backend server
echo "Starting backend server..."
cd backend
python3 main.py &
BACKEND_PID=$!

# Start the frontend server
echo "Starting frontend server..."
cd ..
npm run dev &
FRONTEND_PID=$!

# Function to handle script termination
cleanup() {
    echo "Shutting down servers..."
    kill $BACKEND_PID
    kill $FRONTEND_PID
    exit
}

# Trap SIGINT (Ctrl+C) and call cleanup
trap cleanup SIGINT

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID 