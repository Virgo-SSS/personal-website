# WellFish API

Backend API & ML Inference Service for an AI-Powered Fish Species Identification Platform

## About

WellFish is a collaborative capstone project — a mobile platform that uses machine learning to identify 30+ fish species from photos, helping fishermen, traders, and consumers assess fish quality and safety.

I was responsible for the entire backend infrastructure, covering four key areas. First, I designed and built the core REST API using Laravel 11, which serves as the central hub connecting the Android mobile app to the ML service. This included implementing token-based authentication with Laravel Sanctum, building the classification orchestration pipeline (receiving images, forwarding to the ML service, matching results to fish species data, and storing classification records), managing fish species data in MySQL, and handling image uploads to Google Cloud Storage. The API serves 10+ RESTful endpoints covering authentication, fish classification, classification history tracking, and user profile management.

Second, I built the ML inference microservice from scratch using Node.js and Hapi.js, integrating TensorFlow.js to serve the trained classification model. This involved writing the image preprocessing pipeline (decoding, resizing to 150x150, normalizing pixel values), loading the model from Google Cloud Storage at startup, and exposing a classification endpoint that returns prediction results to the backend API.

Third, I containerized the services using Docker to streamline development and deployment across the team.

Fourth, I designed the Google Cloud Platform architecture and handled the deployment of all backend services to GCP.

Role: Backend & ML Infrastructure Developer | Team project

## Tech Stack

- PHP 8.2
- Laravel 11
- MySQL 8.0
- Laravel Sanctum (Token-based Authentication)
- Node.js
- Hapi.js
- TensorFlow.js (ML Model Serving)
- Google Cloud Platform (Cloud Architecture & Deployment)
- Google Cloud Storage (Image and Model Storage)
- Docker (Containerization)
- RESTful API Design
