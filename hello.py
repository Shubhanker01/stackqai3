from flask import Flask,request
from flask_cors import CORS
from transformers import AutoTokenizer
import torch
from transformers import AutoModelForQuestionAnswering

context = "The gradual reduction in the amount of global direct irradiance at the Earth's surface is called Global Dimming. It is believed that it has been caused by the increase in particulates such as sulphate aerosols in the atmosphere due to human action"

# creating function to predict the answer
def predict(question,context):
  tokenizer = AutoTokenizer.from_pretrained("my-model1")
  inputs = tokenizer(question, context, return_tensors="pt")
  model = AutoModelForQuestionAnswering.from_pretrained("my-model1")
  with torch.no_grad():
     outputs = model(**inputs)
  answer_start_index = outputs.start_logits.argmax()
  answer_end_index = outputs.end_logits.argmax()
  predict_answer_tokens = inputs.input_ids[0, answer_start_index : answer_end_index + 1]
  return tokenizer.decode(predict_answer_tokens)


app = Flask(__name__)
cors = CORS(app)

@app.route("/")
def hello_world():
    return "Hello, World!"


@app.route('/question',methods=['POST'])
def question():
  data = request.get_json()
  question = data['ques']
  ans = predict(question,context)
  return ans