import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const App = () => {
    const [exercise, setExercise] = useState('no');
    const [skinCancer, setSkinCancer] = useState('no');
    const [otherCancer, setOtherCancer] = useState('no');
    const [depression, setDepression] = useState('no');
    const [diabetes, setDiabetes] = useState('no');
    const [arthritis, setArthritis] = useState('no');
    const [sex, setSex] = useState('male');
    const [ageCategory, setAgeCategory] = useState('1');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [smoking, setSmoking] = useState('no');
    const [alcoholConsumption, setAlcoholConsumption] = useState('');
    const [fruitConsumption, setFruitConsumption] = useState('');
    const [vegetableConsumption, setVegetableConsumption] = useState('');
    const [friedPotatoConsumption, setFriedPotatoConsumption] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [predictionText, setPredictionText] = useState('');

    const handlePredict = async () => {
        const features = [
            parseFloat(height),
            parseFloat(weight),
            parseFloat(alcoholConsumption),
            parseFloat(fruitConsumption),
            parseFloat(vegetableConsumption),
            parseFloat(friedPotatoConsumption),
            exercise === 'yes' ? 1 : 0,
            skinCancer === 'yes' ? 1 : 0,
            otherCancer === 'yes' ? 1 : 0,
            depression === 'yes' ? 1 : 0,
            diabetes === 'yes' ? 1 : 0,
            arthritis === 'yes' ? 1 : 0,
            sex === 'male' ? 1 : 0,
            parseInt(ageCategory),
            smoking === 'yes' ? 1 : 0
        ];

        try {
            const response = await axios.post('http://192.168.1.246:5000/predict', { features });
            setPrediction(response.data.prediction);

            // Determine the prediction text based on the prediction value
            if (response.data.prediction <= 0.4) {
                setPredictionText(`The patient is not suffering from heart disease with a probability of ${parseFloat(1 - response.data.prediction)}`);
            } else if (response.data.prediction > 0.6) {
                setPredictionText(`The patient is probably suffering from heart disease with a probability of ${parseFloat(response.data.prediction)}`);
            } else {
                setPredictionText(`The patient has a threat of having a heart disease and should be careful. Probability of having heart disease is ${parseFloat(1 - response.data.prediction)}`);
            }
        } catch (error) {
            console.error('Error making prediction:', error);
            alert(`Error making prediction: ${error.message}`);
        }
    };

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Heart Disease Predictor</Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
                <Text>Exercise</Text>
                <Picker selectedValue={exercise} onValueChange={(itemValue) => setExercise(itemValue)}>
                    <Picker.Item label="No" value="no" />
                    <Picker.Item label="Yes" value="yes" />
                </Picker>
            </View>
            <View style={styles.inputGroup}>
                <Text>Skin Cancer</Text>
                <Picker selectedValue={skinCancer} onValueChange={(itemValue) => setSkinCancer(itemValue)}>
                    <Picker.Item label="No" value="no" />
                    <Picker.Item label="Yes" value="yes" />
                </Picker>
            </View>
            <View style={styles.inputGroup}>
                <Text>Other Cancer</Text>
                <Picker selectedValue={otherCancer} onValueChange={(itemValue) => setOtherCancer(itemValue)}>
                    <Picker.Item label="No" value="no" />
                    <Picker.Item label="Yes" value="yes" />
                </Picker>
            </View>
            <View style={styles.inputGroup}>
                <Text>Depression</Text>
                <Picker selectedValue={depression} onValueChange={(itemValue) => setDepression(itemValue)}>
                    <Picker.Item label="No" value="no" />
                    <Picker.Item label="Yes" value="yes" />
                </Picker>
            </View>
            <View style={styles.inputGroup}>
                <Text>Diabetes</Text>
                <Picker selectedValue={diabetes} onValueChange={(itemValue) => setDiabetes(itemValue)}>
                    <Picker.Item label="No" value="no" />
                    <Picker.Item label="Yes" value="yes" />
                </Picker>
            </View>
            <View style={styles.inputGroup}>
                <Text>Arthritis</Text>
                <Picker selectedValue={arthritis} onValueChange={(itemValue) => setArthritis(itemValue)}>
                    <Picker.Item label="No" value="no" />
                    <Picker.Item label="Yes" value="yes" />
                </Picker>
            </View>
            <View style={styles.inputGroup}>
                <Text>Sex</Text>
                <Picker selectedValue={sex} onValueChange={(itemValue) => setSex(itemValue)}>
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                </Picker>
            </View>
            <View style={styles.inputGroup}>
                <Text>Age Category</Text>
                <Picker selectedValue={ageCategory} onValueChange={(itemValue) => setAgeCategory(itemValue)}>
                    <Picker.Item label="18-24" value="0" />
                    <Picker.Item label="25-29" value="1" />
                    <Picker.Item label="30-34" value="2" />
                    <Picker.Item label="35-39" value="3" />
                    <Picker.Item label="40-44" value="4" />
                    <Picker.Item label="45-49" value="5" />
                    <Picker.Item label="50-54" value="6" />
                    <Picker.Item label="55-59" value="7" />
                    <Picker.Item label="60-64" value="8" />
                    <Picker.Item label="65-69" value="9" />
                    <Picker.Item label="70-74" value="10" />
                    <Picker.Item label="75-79" value="11" />
                    <Picker.Item label="80+" value="12" />
                </Picker>
            </View>
            <TextInput style={styles.input} placeholder="Height (cm)" value={height} onChangeText={setHeight} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Weight (kg)" value={weight} onChangeText={setWeight} keyboardType="numeric" />
            <View style={styles.inputGroup}>
                <Text>Smoking</Text>
                <Picker selectedValue={smoking} onValueChange={(itemValue) => setSmoking(itemValue)}>
                    <Picker.Item label="No" value="no" />
                    <Picker.Item label="Yes" value="yes" />
                </Picker>
            </View>
            <TextInput style={styles.input} placeholder="Alcohol Consumption" value={alcoholConsumption} onChangeText={setAlcoholConsumption} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Fruit Consumption" value={fruitConsumption} onChangeText={setFruitConsumption} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Green Vegetable Consumption" value={vegetableConsumption} onChangeText={setVegetableConsumption} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Fried Potato Consumption" value={friedPotatoConsumption} onChangeText={setFriedPotatoConsumption} keyboardType="numeric" />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Predict" onPress={handlePredict} />
          </View>
          {prediction !== null && <Text style={styles.result}>{predictionText}</Text>}
        </ScrollView>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    formContainer: {
      marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
    },
    buttonContainer: {
      marginBottom: 40,
      alignItems: 'center',
    },
    result: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default App;
