import numpy as np
import pandas as pd 
from sklearn.preprocessing import LabelEncoder


df = pd.read_csv(r'C:\Users\swara\Downloads\Telegram Desktop\UPI Payment Transactions Dataset\transactions.csv')
missing_values = df.isnull().sum()


# Label encode the 'Status' column
label_encoder = LabelEncoder()
df['Status'] = label_encoder.fit_transform(df['Status'])

# One-hot encode 'Sender Name', 'Sender UPI ID', 'Receiver Name', 'Receiver UPI ID'
data_encoded = pd.get_dummies(df, columns=['Sender Name', 'Sender UPI ID', 'Receiver Name', 'Receiver UPI ID'])

# Display the first few rows of the encoded dataset
#data_encoded.head()

# Convert the 'Timestamp' column to datetime format
data_encoded['Timestamp'] = pd.to_datetime(data_encoded['Timestamp'])

# Extract day of the week and hour of the day from the 'Timestamp' column
data_encoded['DayOfWeek'] = data_encoded['Timestamp'].dt.dayofweek
data_encoded['HourOfDay'] = data_encoded['Timestamp'].dt.hour

# Drop the original 'Timestamp' column
data_encoded.drop(columns=['Timestamp', 'Transaction ID'], inplace=True)

# Display the first few rows of the updated dataset
#data_encoded.head()

from sklearn.model_selection import train_test_split

X = data_encoded.drop(columns=['Status'])
y = data_encoded['Status']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

from sklearn.ensemble import RandomForestClassifier

rf_classifier = RandomForestClassifier(random_state=42)
rf_classifier.fit(X_train, y_train)
y_pred = rf_classifier.predict(X_test)


from sklearn.metrics import classification_report, accuracy_score

accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)

print(f'Accuracy: {accuracy}')
print(f'Classification Report:\n{report}')


from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier

# Define parameter grid
param_grid_rf = {
    'n_estimators': [100, 200, 300, 400, 500],
    'max_depth': [None, 10, 20, 30, 40],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}

# Initialize GridSearchCV
grid_search_rf = GridSearchCV(estimator=RandomForestClassifier(random_state=42), param_grid=param_grid_rf, cv=3, n_jobs=-1, verbose=2)

# Fit GridSearchCV
grid_search_rf.fit(X_train, y_train)

# Get best parameters
best_params_rf = grid_search_rf.best_params_
print(f'Best Parameters for Random Forest: {best_params_rf}')

# Evaluate the tuned Random Forest model
best_model_rf = grid_search_rf.best_estimator_
y_pred_rf_tuned = best_model_rf.predict(X_test)
accuracy_rf_tuned = accuracy_score(y_test, y_pred_rf_tuned)
report_rf_tuned = classification_report(y_test, y_pred_rf_tuned)

print(f'Tuned Random Forest Accuracy: {accuracy_rf_tuned}')
print(f'Tuned Random Forest Classification Report:\n{report_rf_tuned}')


import pickle

# Save the model to a pickle file
with open('model.pickle', 'wb') as f:
    pickle.dump(best_model_rf, f)

# Load the model from the pickle file
with open('model.pickle', 'rb') as f:
    model = pickle.load(f)