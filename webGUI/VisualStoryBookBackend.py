from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, AutoModelForSequenceClassification, AutoTokenizer
from torch.cuda.amp import autocast as autocast
import transformers
import time
import datetime
from diffusers import StableDiffusionPipeline
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import torch
from os.path import exists
import os
import numpy as np
from hashlib import md5
from time import localtime
import sng_parser

app = Flask(__name__)
CORS(app)

access_token = "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"

t5tokenizer = AutoTokenizer.from_pretrained("Yuetian/T5-finetuned-storyCommonsense")
t5model = AutoModelForSeq2SeqLM.from_pretrained("Yuetian/T5-finetuned-storyCommonsense")

rbtokenizer = AutoTokenizer.from_pretrained('Yuetian/deberta-finetuned-next-sentence-emotion')
rbmodel = AutoModelForSequenceClassification.from_pretrained('Yuetian/deberta-finetuned-next-sentence-emotion')

pipeSD = StableDiffusionPipeline.from_pretrained("CompVis/stable-diffusion-v1-4", torch_dtype=torch.float16, revision="fp16", use_auth_token=access_token)

device = torch.device('cuda:0')
t5model = t5model.to(device)
pipeSD = pipeSD.to(device)
rbmodel = rbmodel.to(device)

@app.route('/t5gen', methods = ['GET'])
def genSentenceWithPrompt():
    input_text = f"Generate next sentence based on folowing:<extra_id_0>KEYWORDS: {request.args.get('keywords')}" + f"<extra_id_0>CONTEXT: {request.args.get('contexts')}" + f"<extra_id_0>EMOTION: {request.args.get('emotions')}"
    features = t5tokenizer([input_text], return_tensors='pt')
    features = features.to(device)
    max_length = 255
    output = t5model.generate(input_ids=features['input_ids'], 
                            attention_mask=features['attention_mask'],
                            max_length=max_length)
    returnstr = t5tokenizer.decode(output[0], skip_special_tokens=True)
    return jsonify({"generatedText": returnstr})

@app.route('/stablediffusion', methods = ['GET'])
def genImg():
    prefix = md5(str(localtime()).encode('utf-8')).hexdigest()
    jpgname = f"./images/{prefix}_({request.args.get('sentence')}).jpg"  #"./images/"+request.args.get('sentence')+'.jpg'
    if(exists(jpgname) == True):
        os.remove(jpgname)
    #prompt = f"best quality, line art, illutration, story, {request.args.get('sentence').lower()}" #try tuning
    #prompt = f"action, a illustration of {request.args.get('sentence').lower()}" #try tuning
    prompt = f"action, a colored illustration of {request.args.get('sentence').lower()}" #try tuning
    with autocast():
        image = pipeSD(prompt, guidance_scale=7.5).images[0] 
    image.save(jpgname)
    return send_file(f"{jpgname}")

@app.route('/roberta-large', methods = ['GET'])
def genEmoSuggestion():
    text = request.args.get('sentence')
    encoded_input = rbtokenizer(text, return_tensors='pt')
    encoded_input = encoded_input.to(device)
    outputs = rbmodel(**encoded_input)
    logits = outputs.logits
    sigmoid = torch.nn.Sigmoid()
    probs = sigmoid(logits.squeeze().cpu())
    predictions = np.zeros(probs.shape)
    predictions[np.where(probs >= 0.5)] = 1
    labels = ['joy',
     'trust',
     'fear',
     'surprise',
     'sadness',
     'disgust',
     'anger',
     'anticipation']
    id2label = {idx:label for idx, label in enumerate(labels)}
    predicted_labels = [id2label[idx] for idx, label in enumerate(predictions) if label == 1.0]
    return jsonify({"generatedEmo": predicted_labels})

@app.route('/sngparser', methods = ['GET'])
def genKeyword():
    text = request.args.get('sentence')
    graph = sng_parser.parse(text)
    majorKeyword = [x['span'] for x in graph['entities']]
    return jsonify({"generatedKeywords": majorKeyword})

if __name__ == '__main__':
    app.run()
  