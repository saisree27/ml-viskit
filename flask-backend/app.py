from flask import Flask
from flask import request, jsonify
import random
import base64
import numpy as np
from tensorflow import keras
import requests
import json
import random
import string
import pandas as pd
from sklearn import svm, tree, neighbors, neural_network
from sklearn.model_selection import train_test_split
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app, support_credentials=True)


@app.route('/')
def home():
    return "Running."

def getData():
    train_data = pd.read_csv('train.csv')
    test_data = pd.read_csv('test.csv')
    train_data.drop(columns=['Ticket', 'Cabin'], inplace=True)
    train_data.set_index(keys=['PassengerId'], drop=True, inplace=True)

    test_data.drop(columns=['Ticket', 'Cabin'], inplace=True)
    test_data.set_index(keys=['PassengerId'], drop=True, inplace=True)

    train_nan_map = {'Age': train_data['Age'].mean(), 'Fare': train_data['Fare'].mean(), 'Embarked': train_data['Embarked'].mode()[0]}
    test_nan_map = {'Age': test_data['Age'].mean(), 'Fare': test_data['Fare'].mean(), 'Embarked': test_data['Embarked'].mode()[0]}

    train_data.fillna(value=train_nan_map, inplace=True)
    test_data.fillna(value=test_nan_map, inplace=True)

    columns_map = {'Embarked': {'C': 0, 'Q': 1, 'S': 2}, 'Sex': {'male': 0, 'female': 1}}

    train_data.replace(columns_map, inplace=True)
    test_data.replace(columns_map, inplace=True)

    # Replace SibSp + ParCh with Family Size in train_data

    train_data['Name_Prefix'] = train_data['Name'].apply(lambda x: x[x.find(', ')+len(', '):x.rfind('.')])
    sum_col = train_data["SibSp"] + train_data["Parch"]
    train_data['FamSize'] = sum_col + 1
    train_data.drop(columns = ["SibSp", "Parch"], inplace = True)


    # Replace SibSp + ParCh with Family Size in test_data

    test_data['Name_Prefix'] = test_data['Name'].apply(lambda x: x[x.find(', ')+len(', '):x.rfind('.')])
    sum_col = test_data["SibSp"] + test_data["Parch"]
    test_data['FamSize'] = sum_col + 1
    test_data.drop(columns = ["SibSp", "Parch"], inplace = True)


    #Replace foreign names with English names

    train_data['Name_Prefix'] = train_data['Name_Prefix'].replace("mlle","Miss") 
    train_data['Name_Prefix'] = train_data['Name_Prefix'].replace("Mlle","Miss") 
    train_data['Name_Prefix'] = train_data['Name_Prefix'].replace("mme","Mrs")   
    train_data['Name_Prefix'] = train_data['Name_Prefix'].replace("Mme","Mrs")   
    train_data['Name_Prefix'] = train_data['Name_Prefix'].replace("Don","Sir")   


    # Group high class suffixes into one - 'High'

    train_data['Name_Prefix'] = train_data['Name_Prefix'].replace(['Lady', 'Countess','Don', 'Dr', 'Rev', 'Sir', 'Jonkheer', 'Dona','the Countess'], 'High')
    train_data['Name_Prefix'] = train_data['Name_Prefix'].replace(['Capt','Col','Major'], 'Military')


    # Do the same for names in test_data

    test_data['Name_Prefix'] = test_data['Name_Prefix'].replace("mlle","Miss") 
    test_data['Name_Prefix'] = test_data['Name_Prefix'].replace("Mlle","Miss") 
    test_data['Name_Prefix'] = test_data['Name_Prefix'].replace("mme","Mrs")   
    test_data['Name_Prefix'] = test_data['Name_Prefix'].replace("Mme","Mrs")   
    test_data['Name_Prefix'] = test_data['Name_Prefix'].replace("Don","Sir")   

    test_data['Name_Prefix'] = test_data['Name_Prefix'].replace(['Lady', 'Countess','Don', 'Dr', 'Rev', 'Sir', 'Jonkheer', 'Dona','the Countess'], 'High')
    test_data['Name_Prefix'] = test_data['Name_Prefix'].replace(['Capt','Col','Major'], 'Military')

    # Drop name column in train and test

    train_data.drop('Name',axis=1,inplace=True)
    test_data.drop('Name',axis=1,inplace=True)


    # Replace Name_Prefix with One Hot categories

    train_data["PrefixMr"] = (train_data["Name_Prefix"] == 'Mr')
    train_data["PrefixMiss"] = (train_data["Name_Prefix"] == 'Miss')
    train_data["PrefixMrs"] = (train_data["Name_Prefix"] == 'Mrs')
    train_data["PrefixMaster"] = (train_data["Name_Prefix"] == 'Master')
    train_data["PrefixHigh"] = (train_data["Name_Prefix"] == 'High')
    train_data["PrefixMilitary"] = (train_data["Name_Prefix"] == 'Military')

    test_data["PrefixMr"] = (test_data["Name_Prefix"] == 'Mr')
    test_data["PrefixMiss"] = (test_data["Name_Prefix"] == 'Miss')
    test_data["PrefixMrs"] = (test_data["Name_Prefix"] == 'Mrs')
    test_data["PrefixMaster"] = (test_data["Name_Prefix"] == 'Master')
    test_data["PrefixHigh"] = (test_data["Name_Prefix"] == 'High')
    test_data["PrefixMilitary"] = (test_data["Name_Prefix"] == 'Military')


    # drop Name prefixes

    train_data.drop(columns = ["Name_Prefix"], inplace = True)
    test_data.drop(columns = ["Name_Prefix"], inplace = True)

    # Replace family size with FamSizeBool - 1 if family size is bigger than mean, 0 if not.

    train_data["FamSizBool"] = (train_data["FamSize"]>= train_data["FamSize"].mean())
    test_data["FamSizBool"] = (test_data["FamSize"] >= test_data["FamSize"].mean())


    # drop family size

    train_data.drop(columns = ["FamSize"], inplace = True)
    test_data.drop(columns = ["FamSize"], inplace = True)


    # Replace embarked with one-hot variables

    train_data["EmbarkedQ"] = (train_data["Embarked"] == "Q")
    train_data["EmbarkedC"] = (train_data["Embarked"] == "C")
    train_data["EmbarkedS"] = (train_data["Embarked"] == "S")
    test_data["EmbarkedQ"] = (test_data["Embarked"] == "Q")
    test_data["EmbarkedC"] = (test_data["Embarked"] == "C")
    test_data["EmbarkedS"] = (test_data["Embarked"] == "S")

    # drop embarked

    train_data.drop(columns = ["Embarked"], inplace = True)
    test_data.drop(columns = ["Embarked"], inplace = True)


    # Replace Pclass with One-hot variables - this seems to give better performance

    train_data["Pclass1"] = (train_data["Pclass"] == 1)
    train_data["Pclass2"] = (train_data["Pclass"] == 2)
    train_data["Pclass3"] = (train_data["Pclass"] == 3)
    test_data["Pclass1"] = (test_data["Pclass"] == 1)
    test_data["Pclass2"] = (test_data["Pclass"] == 2)
    test_data["Pclass3"] = (test_data["Pclass"] == 3)

    #drop Pclass

    train_data.drop(columns = ["Pclass"], inplace = True)
    test_data.drop(columns = ["Pclass"], inplace = True)

    X_train = train_data.loc[:, train_data.columns != 'Survived']
    y_train = train_data.loc[:, 'Survived']

    X_train, X_test, y_train, y_test = train_test_split(X_train, y_train, test_size=0.2, random_state=10)
    X_train = np.asarray(X_train).astype(np.float32)
    X_test = np.asarray(X_test).astype(np.float32)
    y_train = np.asarray(y_train).astype(np.float32)
    y_test = np.asarray(y_test).astype(np.float32)
    return X_train, X_test, y_train, y_test

@cross_origin(supports_credentials=True)
@app.route('/train', methods = ['POST'])
def train():
    csvLink = request.json['data']
    modelLayers = request.json['model']
    optimizer = request.json['optimizer']
    loss = request.json['loss']
    metrics = request.json['metrics']
    epochs = int(request.json['epochs'])

    model = keras.Sequential()
    
    for i in range(len(modelLayers)):
        if modelLayers[i] == "input":
            print(modelLayers[i + 1])
            model.add(keras.Input(int(modelLayers[i + 1])))
            i += 1
        if modelLayers[i] == "dense":
            model.add(keras.layers.Dense(int(modelLayers[i + 1])))
            i += 1
        if modelLayers[i] == "activation":
            model.add(keras.layers.Activation(modelLayers[i + 1]))
            i += 1
        if modelLayers[i] == "batchnormalization":
            if modelLayers[i + 1] == "axis":
                model.add(keras.layers.BatchNormalization(axis=int(modelLayers[i + 2])))
            else:
                model.add(keras.layers.BatchNormalization())
        if modelLayers[i] == "dropout":
            model.add(keras.layers.Dropout(rate=float(modelLayers[i + 1])))
        
    
    model.compile(optimizer=optimizer, loss=loss, metrics=metrics)
    print(model.summary())

    # for now, get training data from Titanic dataset (later, we'll use CSV)
    X_train, X_test, y_train, y_test = getData()
    
    model.fit(X_train, y_train, epochs=epochs, batch_size=2)
    result = model.evaluate(X_test, y_test)

    return jsonify(
        loss=result[0],
        accuracy=result[1]
    )

if __name__ == '__main__':
    app.run(host="0.0.0.0")
    
