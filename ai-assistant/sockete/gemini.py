from flask import Flask, send_from_directory, request
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema.output_parser import StrOutputParser
import os

app = Flask(__name__, static_folder='static', static_url_path='')
app.config['SECRET_KEY'] = 'FLASK_SECRET_KEY'  # Replace with a secure key
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize Google Generative AI Gemini Pro API key and model
GOOGLE_API_KEY = 'AIzaSyCNJ8UhjNvmJqvLiCY15KvaThOPeeC5gcE'

# Configure the Google Generative AI model
model = ChatGoogleGenerativeAI(
    model="gemini-pro",
    google_api_key=GOOGLE_API_KEY,
    temperature=0.7
)

# Define the prompt template for general queries
prompt = ChatPromptTemplate.from_template(
    "if the user want to know the financial suggestion then give it appropriat ans .\n\nUser: {message}\nAI:"
)

# Define the output parser for general queries
output_parser = StrOutputParser()

# Create the chain for general queries
general_chain = prompt | model | output_parser

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    # emit('response', {'message': 'Connected to the AI server'})

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('message')
def handle_message(data):
    user_message = data['message']
    print(f'Received message: {user_message}')
    
    # Get response from the general chain
    response = general_chain.invoke({"message": user_message})
    
    # Send the response back to the client
    emit('response', {'message': response}, room=request.sid)
    # emit('response', {'message': response}, room=request.sid)
    # print(re)

if __name__ == '__main__':
    socketio.run(app, debug=True)
