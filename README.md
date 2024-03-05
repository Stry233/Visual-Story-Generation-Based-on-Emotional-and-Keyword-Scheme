# Visual Story Generation Based on Emotional and Keyword Scheme

[[Paper]](https://arxiv.org/abs/2301.02777) [[Model Card]](https://huggingface.co/Yuetian) [[Deployment Demo]](http://vsg-ek.herokuapp.com/)

## Overview

<img src="https://user-images.githubusercontent.com/31975605/184089838-ad2f43d6-0294-4fe8-a4ca-fcd6e626986e.jpg" alt="Pipeline - Main" style="zoom:80%;" />
In this work, we propose a narrative generation pipeline to co-create visual stories with the users. The pipeline allows the user to control events and emotions on the generated content. 

The pipeline includes two parts: narrative and image generation. In narrative generation, we plan the narrative based on the keywords and emotional trends in sentences and generate the following story sentence. In image generation, we use both Disco Diffusion and Stable Diffusion to create a visually appealing image that captures the story's main plot; we further implement object recognition to allow objects in the images to be mentioned in future story development.

## Model Card

| Domain    | Name                    | Description                                                  | Language model type         | Model Card                                           | 🤗 link                                                       |
| --------- | ----------------------- | :----------------------------------------------------------- | --------------------------- | :--------------------------------------------------- | ------------------------------------------------------------ |
| Suggester | Emotion Suggester       | This model is finetuned under StoryCommensense used to provided suggestions of the sentiment in next sentence | DeBERTa-v2-xlarge           | Yuetian/deberta-finetuned-next-sentence-emotion      | [Hugging Face](https://huggingface.co/Yuetian/deberta-finetuned-next-sentence-emotion?text=I+like+you.+I+love+you) |
| Suggester | Emotion Suggester       | This model is finetuned under StoryCommensense that used to provided suggestion of the sentiment in next sentence | BERT-base-uncased           | Yuetian/bert-base-uncased-finetuned-plutchik-emotion | [Hugging Face](https://huggingface.co/Yuetian/bert-base-uncased-finetuned-plutchik-emotion?text=I+like+you.+I+love+you) |
| Suggester | Keyword Suggester       | This model is finetuned under ROCStories that used to provided suggestion of name entities in next sentence | OPT-1.3B                    | Stay tuned                                           | Stay tuned                                                   |
| Text pipe | Next-sentence generator | This model take context, keyword and sentiment together and generate next sentence in a ROCStories style | T5-base-finetuned-commenGen | Yuetian/T5-finetuned-storyCommonsense                | [Hugging Face](https://huggingface.co/Yuetian/T5-finetuned-storyCommonsense) |


## GUI demo
<img src="https://user-images.githubusercontent.com/31975605/210292999-55904f27-6cc4-4051-8a75-599c35a95082.png" alt="image-20221028093158937" style="zoom:40%;" />

We implement a simple demo showing the deployment ver. of our framework [here](http://vsg-ek.herokuapp.com/). Please referred to the Q&A section for more information

## Evaluation

<img src="https://user-images.githubusercontent.com/31975605/198363095-0137ccb5-93cc-4e60-ae12-71e41d9d0e69.png" alt="result" style="zoom:30%;" />

We demonstrate a performance distribution of the baseline model and the prompt-optimized model in 3,748 sets of experiments under different metrics. The blue box on the left side of each figure represents our method and the orange on the right side represents the baseline model.

## Examples

Here is several example stories you can generate using this framework.

| #    | Sentence                                       | Image                                                        |
| ---- | ---------------------------------------------- | ------------------------------------------------------------ |
| 0    | Marcus was collecting shells on the beach.     | ![image](https://user-images.githubusercontent.com/31975605/198362031-90861c5e-49d1-48f3-8d19-ce6d289ae907.png) |
| 1    | He picked up a large beautiful shell.          | ![image](https://user-images.githubusercontent.com/31975605/198362107-087f8f70-c69f-4cdc-949d-9b4a9a639aa9.png) |
| 2    | He put it in his pocket to save for later.     | ![image](https://user-images.githubusercontent.com/31975605/198362407-e73c447e-7164-47bf-8f08-73a1a9c4c50d.png) |
| 3    | Suddenly he felt a sharp pinch.                | ![image](https://user-images.githubusercontent.com/31975605/198362444-97ae8442-2030-465b-8a01-c3792cf40b3e.png) |
| 4    | A crab was inside the shell pinching his leg.. | ![image](https://user-images.githubusercontent.com/31975605/198362481-a1d73dfa-b427-491c-9008-9f3e03b8938c.png) |

## Citation

```
@misc{chen2023visual,
      title={Visual Story Generation Based on Emotion and Keywords}, 
      author={Yuetian Chen and Ruohua Li and Bowen Shi and Peiru Liu and Mei Si},
      year={2023},
      eprint={2301.02777},
      archivePrefix={arXiv},
      primaryClass={cs.AI}
}
```
