from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import joblib

app = Flask(__name__)

# Load and compile the TensorFlow model
model = tf.keras.models.load_model(".\\utilities\\heart_disease_model.h5")
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Load the StandardScaler using joblib
scaler = joblib.load(".\\utilities\\scaler.joblib")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = np.array(data['features']).reshape(1, -1)

    if scaler:
        features = scaler.transform(features)

    prediction = model.predict(features)
    prediction = prediction[0][0]

    return jsonify({'prediction': float(prediction)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
