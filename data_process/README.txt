Annotated Roc Story Data - CSV files

Readme contents:
(A) File Directory
(B) File Format

------------------------------------------------------------
(A) File Directory:
   Character Appearance Annotations:
   (1) characters/entitylines_train.csv: annotated names of characters and lines on which they appear (training stories only)
   (2) characters/entitylines_devtest.csv: annotated names of characters and lines on which they appear (dev/test stories only)

   Motivation and Emotion Annotations:
   (1)  training/allcharlinepairs.csv: motivation and emotion annotations for the training set (just open-text)
   (2a) dev/motiv/allcharlinepairs.csv: motivation annotations for the dev set (open-text + Maslow,Reiss)
   (2b) test/motiv/allcharlinepairs.csv: motivation annotations for the test set (open-text + Maslow,Reiss)
   (3a) dev/emotion/allcharlinepairs.csv: emotion annotations for the dev set (open-text + Plutchik)
   (3b) test/emotion/allcharlinepairs.csv: emotion annotations for the test set (open-text + Plutchik)

------------------------------------------------------------
(B) File Formats:
   Character Appearance Annotations:
   (1-2) characters/entitylines_*.csv: csv file with listings of characters and the lines that they appear in
      Header: story,character, appearing lines
      Columns Explanation:
         -story: story id (from roc story training set)
         -character:  name of character - selected by Mturk workers 
         -appearing lines: json string list of lines where the character is mentioned -selected by Mturk workers 

   Motivation and Emotion Annotations:
   (1) training/allcharlinepairs.csv: csv file all character-line pairs from stories in training set with MTurk annotations
      NOTE: Some character-line pairs have multiple row entries (to separate multiple annotator responses)
      Header: storyid,linenum,char,freerespworkerid,context,sentence,action,affected,motivation,emotion
      Columns Explanation:
         -storyid: story id
         -linenum: line number
         -char: name of character
         -freerespworkerid: annotation number (anonym) or none
         -context: previous context with each line separated by |
         -sentence: line from story
         -action: yes/no (whether there was action intentional by this character) -selected by Mturk workers
         -affected: yes/no (whether character was affected mentally/emotionally) -selected by Mturk workers
         -motivation: json string list of open-text motivation annotations if action==yes -selected by Mturk workers
         -emotion: json string list of open-text emotional reaction annotations if affected==yes -selected by Mturk workers 

   (2a-b) */motiv/allcharlinepairs.csv: csv file all character-line pairs from stories in dev/test set with MTurk motivation annotations
      NOTE: Some character-line pairs have multiple row entries (to separate multiple annotator responses)
      Header: storyid,linenum,char,motiveworkerid,context,sentence,action,motivation,maslow,reiss
      Columns Explanation:
         Same as in training files except:
         -motiveworkerid: annotation number (anonym) or none
         -maslow: json string list of selected Maslow Categories,  if action==yes -selected by Mturk workers  
         -reiss: json string list of selected Reiss Categories,  if action==yes -selected by Mturk workers 
      NOTE: at test time we take the "majority label" for Maslow/Reiss to be categories voted on by >=2 workers

   (3a-b) */emotion/allcharlinepairs.csv: csv file all character-line pairs from stories in dev/test set with MTurk emotion annotations
      NOTE: Some character-line pairs have multiple row entries (to separate multiple annotator responses)
      Header: storyid,linenum,char,emotionworkerid,context,sentence,affected,emotion,plutchik
      Columns Explanation:
         Same as in training files except:
         -emotionworkerid: annotation number (anonym) or none
         -plutchik: json string list of selected Plutchik Categories,  if affected==yes -selected by Mturk workers  
               NOTE: plutchik categories were rated on a three point scale and therefore are only listed if turkers rated them as 2 (moderate) or 3 (high), which is why they are listed as "joy:2" or "joy:3", etc.
      NOTE: at test time we take the "majority label" for Plutchik to be categories where worker average rating is >=2 (ex. one Turker did not select, one turker selectd Joy:2 and one turker selected Joy:3 --> (1+2+3)/3 = 2)

