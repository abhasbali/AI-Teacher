# 📈 Stock-Trader: AI-Powered Stock Prediction & Virtual Trading Simulator

![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![Flask](https://img.shields.io/badge/Backend-Flask-yellow?style=for-the-badge)
![TensorFlow](https://img.shields.io/badge/AI-TensorFlow-orange?style=for-the-badge&logo=tensorflow&logoColor=white)
![React](https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react)
![Alpha Vantage](https://img.shields.io/badge/API-Alpha%20Vantage-lightgrey?style=for-the-badge)

## 🚀 Overview

Stock-Trader is a full-stack AI-powered stock prediction and virtual trading web application. It leverages LSTM neural networks to predict stock prices, enables users to simulate buy/sell actions, and offers confidence metrics and trend visualization. Perfect for beginners and aspiring investors to experiment without risking real money.

## 🎯 Features

- 📊 Real-time stock data using Alpha Vantage
- 🤖 LSTM-based AI prediction model
- 🔎 Confidence scores & trend direction (up/down)
- 🧮 Virtual trading system with buy/sell simulation
- 📉 Interactive graphs & charts (React + Chart.js)
- 📈 Support for multiple stock symbols
- 🔄 Responsive full-stack app with clean architecture

## 🛠 Tech Stack

**Frontend**
- React.js
- Chart.js / Recharts
- Axios

**Backend**
- Flask
- TensorFlow (LSTM)
- Alpha Vantage API
- MinMaxScaler / joblib

**Dev Tools**
- Vercel / Netlify (Frontend Deployment)
- PythonAnywhere / Render (Backend Deployment)

## 🧠 AI Model

We use an LSTM (Long Short-Term Memory) neural network to predict future stock prices based on historical data. The model takes in the last 60 days of closing prices and outputs the next day's predicted price.

## 💻 Project Setup

### Backend (Flask API)

1. Clone the repo:
```bash
git clone https://github.com/yourusername/stock-trader.git
cd stock-trader/backend
```
2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
```
3. Install dependencies:
```bash
pip install -r requirements.txt
```
4. Add API key to `.env`:
```env
ALPHA_VANTAGE_API_KEY=your_key_here
```
5. Run the server:
```bash
python app.py
```

### Frontend (React App)

1. Navigate to frontend:
```bash
cd ../frontend
```
2. Install dependencies:
```bash
npm install
```
3. Run the app:
```bash
npm run dev
```

## 🧪 API Usage

### Predict a stock:
```bash
GET http://localhost:5000/predict/AAPL
```
**Response:**
```json
{
  "predicted_price": 189.22,
  "current_price": 185.67,
  "confidence": 0.84,
  "price_change": 3.55,
  "price_change_percent": 1.91,
  "trend": "up"
}
```

## 🏦 Virtual Trading System

Users can simulate buying or selling stocks based on predictions. All trades are stored in a local virtual portfolio. Future additions include:
- Account system
- Portfolio performance tracking
- Graphs of gains/losses

## 📉 Example Prediction Graph
![Stock Chart](https://www.tradingview.com/x/fakechartlink/)

## 📚 What We Learned

- Real-time data fetching and error handling
- Time-series forecasting with LSTM
- Preprocessing stock data for machine learning
- API rate limit management
- Building interactive dashboards
- Combining AI with user-focused design

## 🔮 What's Next

- User authentication with JWT
- MongoDB integration for storing portfolios
- Sentiment analysis based on financial news
- Support for multiple AI models and comparisons
- Full deployment to cloud platforms

## 🙌 Made with 💙 by [Your Name or Team Name]
