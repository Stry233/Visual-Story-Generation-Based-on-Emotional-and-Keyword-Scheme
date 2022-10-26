from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch
import numpy as np

tokenizer = AutoTokenizer.from_pretrained('Yuetian/roberta-large-finetuned-plutchik-emotion')
model = AutoModelForSequenceClassification.from_pretrained('Yuetian/roberta-large-finetuned-plutchik-emotion')
text = "I ran into my high school teacher this morning."
encoded_input = tokenizer(text, return_tensors='pt')
outputs = model(**encoded_input)
logits = outputs.logits
sigmoid = torch.nn.Sigmoid()
probs = sigmoid(logits.squeeze().cpu())
predictions = np.zeros(probs.shape)
predictions[np.where(probs >= 0.5)] = 1
# turn predicted id's into actual label names
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
print(predicted_labels)