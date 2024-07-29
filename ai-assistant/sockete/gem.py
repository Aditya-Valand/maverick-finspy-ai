from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema.output_parser import StrOutputParser
from langchain.vectorstores import DocArrayInMemorySearch
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.vectorstores import DocArrayInMemorySearch

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

# Define the prompt template
template = """Answer the question in a full sentence, based only on the following context:
{context}

Return your answer in three backticks.

Question: {question}
"""
prompt = ChatPromptTemplate.from_template(template)

# Define the output parser
output_parser = StrOutputParser()

# Initialize vector store
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
vectorstore = DocArrayInMemorySearch.from_texts(
    ["Gemini Pro is a Large Language Model made by Google DeepMind",
     "Gemini can be either a star sign or a series of language models",
     "A Language model is trained by predicting the next token",
     "LLMs can easily do a variety of NLP tasks as well as text generation"],
    embedding=embeddings
)

retriever = vectorstore.as_retriever()

# Define a fallback response
fallback_response = "I'm sorry, but I couldn't find any relevant information on that topic."

# Create the chain
chain = RunnableMap({
    "context": lambda x: retriever.get_relevant_documents(x["question"]),
    "question": lambda x: x["question"]
}) | prompt | model | output_parser | RunnableMap({
    "output": lambda x: x if x else fallback_response
})

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
    
    # Get response from the chain
    response = chain.invoke({"question": user_message})
    
    # Send the response back to the client
    emit('response', {'message': response}, room=request.sid)

if __name__ == '__main__':
    socketio.run(app, debug=True)
