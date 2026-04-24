# IntentLens: Multimodal Facial Intent Interpreter

IntentLens is a demo research platform independently developed by Vaibhav Saini as an extension of the final-semester IFT 536 Natural Language Processing for IT group research topic.

The project studies how people interpret speaker intent from ambiguous sentences using text, facial cues, and audio cues. Participants classify intent as Genuine, Sarcastic, Frustrated, or Neutral, then rate their confidence. The system stores responses, provides AI-style feedback, and visualizes accuracy and confidence patterns.

---
## Research Background

This project is based on the Group 5 IFT 536 research question:

> How does access to facial expressions affect the accuracy of interpreting a speaker’s intent?

The original group research explored whether facial expressions improve intent recognition accuracy in spoken communication. Lab 2 identified relevant literature, theories, and current approaches such as iMotions Lab, Qatalyst, and Q for Sales. Lab 3 defined the experimental variables, participant structure, and data collection strategy.

---
## Features

- Participant experiment flow  
- Alias-based participant tracking  
- Intent classification: Genuine, Sarcastic, Frustrated, Neutral  
- Confidence rating (1–5)  
- AI-style feedback after each response  
- Correct emotion visualization  
- Basic speech playback  
- Researcher dashboard with charts  
- Professor summary view with insights  
- SQLite-based response storage  
- FastAPI analytics endpoints  

---
## Tech Stack

### Frontend
- Next.js  
- TypeScript  
- Tailwind CSS  
- Recharts  

### Backend
- FastAPI  
- SQLite  
- SQLAlchemy  
- Pydantic  

---
## Project Structure

```text
IntentLens/
  frontend/
    app/
      page.tsx
      participant/page.tsx
      researcher/page.tsx
      professor/page.tsx
    components/
      Navbar.tsx
    lib/
      api.ts
      types.ts

  backend/
    app/
      main.py
      database.py
      models.py
      schemas.py
      seed.py
      routes/
        stimuli.py
        responses.py
        analytics.py
      services/
        feedback_engine.py


---
## Experiment Design

Participants are shown short ambiguous sentences such as:

- Nice timing.  
- That was exactly what I needed.  
- Great, another delay.  
- I’m glad you showed up.  

Depending on the condition, they receive:

- Text only  
- Face only  
- Audio only  
- Face + audio  

They then:
1. Guess the speaker’s intent  
2. Rate confidence (1–5)  
3. Receive feedback and explanation  

---
## Research Variables

### Independent Variable
Access to communication cues:
- facial expression present or not  
- audio tone present or not  

### Dependent Variables
- intent recognition accuracy  
- participant confidence  

### Controlled Variables
- same sentence set  
- same intent categories  
- same interface  
- same response format  

---
## Running Locally

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

## Seed database:

python -m app.seed