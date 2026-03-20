AI-Powered Parametric Insurance Platform for Gig Workers

Overview
This project is developed as part of the Guidewire DEVTrails 2026 Hackathon. It aims to solve the problem of income instability faced by gig workers due to external disruptions such as weather conditions, pollution, and curfews.
Gig workers often lose 20–30% of their income because of such uncontrollable events, and currently lack any structured income protection system.

Objective
To build an AI-driven parametric insurance platform that:
- Protects gig workers against loss of income
- Automates claim detection and payouts
- Uses real-time external data triggers
- Implements a weekly premium pricing model

Target Users
Delivery partners working in:
- Food delivery (Swiggy, Zomato)
- E-commerce (Amazon, Flipkart)
- Grocery/Q-commerce (Zepto, Blinkit)

Scope
Covers income loss only

Does NOT cover:
- Health insurance
- Accidents
- Vehicle repairs
- Premium model is strictly weekly-based

Key Disruptions Covered
Environmental:
- Heavy rain
- Extreme heat
- Floods
- Air pollution
Social:
- Curfews
- Strikes
- Zone closures

These disruptions result in reduced working hours or inability to work, leading to income loss.

Solution Approach
1. AI-Based Risk Assessment
   - Analyze historical and real-time data
   - Calculate dynamic weekly premiums
   - Personalize risk based on location and behavior
2. Parametric Insurance Model
   - Define predefined triggers (e.g., rainfall threshold, AQI level)
   - Automatically trigger claims when conditions are met
   - No manual claim filing required
3. Fraud Detection
   - Detect anomalies in claims
   - Validate location and activity
   - Prevent duplicate or fake claims
4. Automated Payout System
   - Real-time monitoring of disruptions
   - Instant claim approval
   - Direct payout to user account

System Workflow
- User registers on the platform
- AI calculates risk score and weekly premium
- System monitors external data continuously
- Disruption triggers are detected
- Claim is automatically initiated
- Fraud checks are performed
- Payout is processed instantly

Features
- User onboarding system
- Dynamic premium calculation
- Real-time disruption detection
- Zero-touch claim processing
- Fraud detection mechanism
- Analytics dashboard

Tech Stack
- Frontend: React
- Backend: Java (Spring Boot) 
- AI/ML: Python (Scikit-learn / TensorFlow)
- APIs: Weather API, Traffic API (mock/real)
- Payments: Razorpay

Dashboard
For Users:
- Active coverage
- Earnings protected
- Claim history

For Admin:
- Risk analytics
- Claim statistics
- Loss ratios

Development Plan
- Phase 1: Ideation & design
- Phase 2: Core development (policies, claims, pricing)
- Phase 3: Optimization (fraud detection, dashboards, scaling)

Deliverables
- Source code (this repository)
- README documentation
- Demo video
- Final presentation

Conclusion
This platform provides a scalable, automated, and AI-driven solution to protect gig workers from income loss, ensuring financial stability in uncertain conditions.
