# Visual-Story-Generation-Based-on-Emotional-and-Keyword-Scheme

[[Paper]]() [[Model Card]]() [[Deployment Demo]](http://int-2022-visual-story-gen.uw.r.appspot.com/)

## Overview
![Pipeline - Main](https://user-images.githubusercontent.com/31975605/184089838-ad2f43d6-0294-4fe8-a4ca-fcd6e626986e.jpg)
In this work, we propose a narrative generation pipeline to co-create visual stories with the users. The pipeline allows the user to control events and emotions on the generated content. 

The pipeline includes two parts: narrative and image generation. In narrative generation, we plan the narrative based on the keywords and emotional trends in sentences and generate the following story sentence. In image generation, we use both Disco Diffusion and Stable Diffusion to create a visually appealing image that captures the story's main plot; we further implement object recognition to allow objects in the images to be mentioned in future story development.

## Model Card


## GUI demo

We implement a simple demo showing the deployment ver. of our framework ![here](http://int-2022-visual-story-gen.uw.r.appspot.com/). Please refered to the Q&A section for more information

## Evaluation

## Examples

Here is several example storiesyou can generate using this framework.

|     #    	|                     Sentence                   	| Image 	|
|:--------:	|:----------------------------------------------:	|-------	|
|     0    	| Marcus was collecting shells on the beach.     	|![image](https://user-images.githubusercontent.com/31975605/198362031-90861c5e-49d1-48f3-8d19-ce6d289ae907.png)|
|     1    	| He picked up a large beautiful shell.          	|![image](https://user-images.githubusercontent.com/31975605/198362107-087f8f70-c69f-4cdc-949d-9b4a9a639aa9.png)|
|     2    	| He put it in his pocket to save for later.     	|![image](https://user-images.githubusercontent.com/31975605/198362133-8f846607-8a37-406d-8bdc-0193f1dcae90.png)|
|     3    	| Suddenly he felt a sharp pinch.                	|![image](https://user-images.githubusercontent.com/31975605/198362161-dc73830b-461a-405c-baed-2e9f52b39ff0.png)|
|     4    	| A crab was inside the shell pinching his leg.. 	|![image](https://user-images.githubusercontent.com/31975605/198362193-65bccbf5-f041-4275-bc07-5ad69fd4fd58.png)|

## Citation

We are publishing our workshop paper "Visual Story Generation Based on Emotional and Keyword Scheme" at INT 2022 with citation info released very soon. Stay tuned :-)


