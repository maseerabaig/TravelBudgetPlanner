# TravelBudgetPlanner

---

## **Project Overview:**  
**TravelBudgetTool** is a full-stack web application designed to help users efficiently plan, track, and manage travel budgets. Users can organize trips, record expenses, monitor spending in real-time, and generate reports to make informed financial decisions during their travels.

---

## **Run Locally**  

### **1. Clone the Project:**  
```bash
git clone https://github.com/maseerabaig/TravelBudgetPlanner.git
```

### **2. Navigate to the Project Directory:**  
```bash
cd TravelBudgetPlanner/Frontend
```

### **3. Install Dependencies:**  
```bash
npm install
```

### **4. Start the Development Server:**  
```bash
npm run dev
```

---

## **Tech Stack**  

### **Frontend:**  
- **HTML / CSS** – Structure and styling.  
- **React.js (JSX)** – Component-based UI development.  
- **Axios** – HTTP client for API calls.  
- **React Router** – SPA (Single Page Application) routing.  

### **Backend:**  
- **Node.js** – JavaScript runtime environment.  
- **Express.js** – Web framework for building APIs.  
- **MongoDB / Mongoose** – NoSQL database and schema modeling.  
- **Render.com** – Deployment and hosting platform.  
- **Argon2** – Secure password hashing.  
- **JWT (jsonwebtoken)** – Authentication and authorization.  
- **CORS** – Cross-origin resource sharing for secure API communication.  
- **dotenv** – Manage environment variables.  

---

## **Project Type**  
- **Full Stack MERN (MongoDB, Express.js, React.js, Node.js)**  

---

## **Features**  

1. **User Authentication:**  
   - Secure login and signup.  
   - JWT-based authentication and role-based user permissions.  

2. **Trip Planning:**  
   - Organize trips by adding destination, travel dates, and budget limits.  

3. **Expense Tracking:**  
   - Record and categorize expenses (e.g., Food, Transport, Accommodation).  
   - Link expenses directly to active trips and budgets.  

4. **Multi-Currency Support:**  
   - Record expenses in different currencies with automatic conversion.  

5. **Reports & Analysis:**  
   - Generate detailed spending reports and analyze expenses by category.  
   - Downloadable reports in PDF/CSV formats.  

6. **Real-Time Budget Monitoring:**  
   - Visualize remaining budgets and track spending trends over time.  

---

## **API Endpoints:**  

### **Authentication:**  

**Signup:**  
```http
POST /user/signup
```
**Payload:**  
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Signin:**  
```http
POST /user/signin
```
**Payload:**  
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:**  
```json
{
  "token": "<JWT_TOKEN>"
}
```

---

### **Budget Management:**  

**Create Budget:**  
```http
POST /user/budgets
Authorization: Bearer <JWT_TOKEN>
```
**Payload:**  
```json
{
  "city": "Paris",
  "totalBudget": 5000,
  "numberOfDays": 7
}
```

**Get All Budgets:**  
```http
GET /user/budgets
Authorization: Bearer <JWT_TOKEN>
```

**Get Budget with Expenses:**  
```http
GET /user/budgets/:budgetId
Authorization: Bearer <JWT_TOKEN>
```

---

### **Expense Management:**  

**Add Expense to Budget (Automatically Linked to Active Budget):**  
```http
POST /user/budgets/expenses
Authorization: Bearer <JWT_TOKEN>
```
**Payload:**  
```json
{
  "date": "2023-12-22",
  "description": "Dinner at a restaurant",
  "category": "Food",
  "amount": 50
}
```

---

### **User Dashboard:**  

**Show Budget Data (With Calculated Expenses):**  
```http
GET /user/budgets/showdata
Authorization: Bearer <JWT_TOKEN>
```
**Response:**  
```json
{
  "totalBudget": 5000,
  "remainingBudget": 4200,
  "totalexpenses": 800,
  "dailyAvgSpent": 114.28
}
```

---

## **Security Best Practices:**  
- Use HTTPS for secure communication.  
- Store JWT securely (httpOnly cookies or localStorage).  
- Hash passwords before saving them.  
- Limit API rate requests to prevent abuse.  
- Regularly update dependencies to avoid vulnerabilities.  


---
