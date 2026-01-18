# AI API Accuracy Comparison – Llama-3.3-70B vs Qwen-3-32B

This project compares the reasoning accuracy of two AI models — **Llama-3.3-70B** and **Qwen-3-32B** — using the **Groq API**.  
It was built as part of an academic practical at **Dublin City University** to evaluate how different LLMs perform on logical, counting, translation, and trick-question tasks.

## 🔍 Project Overview
The goal of this project is to test two AI APIs side-by-side on questions where:
- The correct (ground-truth) answer is known  
- AI models often make mistakes  
- Reasoning quality can be observed

A mixed dataset of custom questions was used, covering:
- Logical puzzles  
- Counting questions  
- Trick questions  
- Short translation tasks  

## 🧪 How It Works
- A JavaScript world was created on the **Ancient Brain** platform  
- The user enters a question  
- Both models (Llama-3.3-70B & Qwen-3-32B) respond via the Groq API  
- The system displays both answers along with the correct answer  
- Users can directly compare accuracy and reasoning style  

## 📸 Screenshot
Below is an example of the side-by-side comparison interface used in the project:

![Screenshot of Model Comparison](results/screenshot.png)  

## 📊 Key Findings
- **Qwen-3-32B** showed more stable, step-by-step reasoning  
- **Llama-3.3-70B** produced fluent language but sometimes slipped in logic  
- Both handled translation tasks well, but with different explanation styles  
- Reasoning quality, not just correctness, varies significantly between models
- The responses of both the models have been stored in an excel file with the correct answer  

## 🛠️ Tech Stack
- JavaScript  
- Groq API  
- Ancient Brain Platform  
- Llama-3.3-70B  
- Qwen-3-32B  

## 📄 Report
A detailed, research-style report analyzing the accuracy of Llama-3.3-70B and Qwen-3-32B is included in the repository:

📘 **/report/comparative-analysis.pdf**  
Contains: methodology, dataset design, model evaluation, screenshots, analysis, and results.


## 👥 Team
This project was completed by a team of two students at **Dublin City University**.

## 📄 License
MIT License
