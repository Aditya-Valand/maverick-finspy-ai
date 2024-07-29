# from flask import Flask, render_template
# from flask_socketio import SocketIO, emit
# import openai

# app = Flask(__name__)
# app.config['SECRET_KEY'] = 'your_secret_key'
# socketio = SocketIO(app)

# openai.api_key = 'your-openai-api-key'

# def generate_response(prompt):
#     response = openai.Completion.create(
#         engine="text-davinci-003",
#         prompt=prompt,
#         max_tokens=150
#     )
#     return response.choices[0].text.strip()

# @app.route('/')
# def index():
#     return render_template('index.html')

# @socketio.on('connect')
# def handle_connect():
#     print('Client connected')
#     emit('response', {'message': 'Connected to the AI server'})

# @socketio.on('disconnect')
# def handle_disconnect():
#     print('Client disconnected')

# @socketio.on('message')
# def handle_message(data):
#     user_message = data['message']
#     print(f'Received message: {user_message}')
#     ai_response = generate_response(user_message)
#     emit('response', {'message': ai_response})

# if __name__ == '__main__':
#     socketio.run(app, debug=True)
# from langchain.chains import LLMChain
# from langchain_core.prompts import PromptTemplate
# from langchain_community.chat_message_histories import ChatMessageHistory
from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema.output_parser import StrOutputParser

app = Flask(__name__)
app.config['SECRET_KEY'] = 'FLASK_SECRET_KEY'  # Replace with a secure key
socketio = SocketIO(app)

# Initialize Google Generative AI Gemini Pro API key and model
GOOGLE_API_KEY = 'AIzaSyDRcA4T9DAsMZxJ50DQtk0YTRGRB1bLy3U'

# Configure the Google Generative AI model
model = ChatGoogleGenerativeAI(
    model="gemini-pro",
    google_api_key=GOOGLE_API_KEY,
    temperature=0.7
)

# Define the prompt template for general queries
prompt = ChatPromptTemplate.from_template(
    "if the user want to know the financial suggestion then give it appropriat ans otherwise normal ans of this message.\n\nUser: {message}\nAI:"
)

# Define the output parser for general queries
output_parser = StrOutputParser()

# Create the chain for general queries
general_chain = prompt | model | output_parser

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    emit('response', {'message': 'Connected to the AI server'})

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

if __name__ == '__main__':
    socketio.run(app, debug=True)
