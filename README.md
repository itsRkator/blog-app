Certainly! Below is a step-by-step guide for setting up both the backend (FastAPI) and frontend (ReactJS) of the blog application on your local machine.

### Setup

#### Clone the Repository

```bash
git clone https://github.com/itsRkator/blog-app.git
cd blog-app
```


### Backend Setup (FastAPI)
cd backend

#### 1. Install Python 3

Make sure you have Python 3 installed. You can download it from [https://www.python.org/downloads/](https://www.python.org/downloads/).

#### 2. Set up Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
```

#### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

#### 4. Create and Configure the `.env` File

Create a `.env` file in the same directory as `main.py` with the following content:

```env
DATABASE_URL=postgresql://your_username:your_password@localhost/your_database
```

Replace `your_username`, `your_password`, and `your_database` with your actual Postgres credentials.

#### 5. Run the FastAPI Server

```bash
python3 main.py
```

The FastAPI server will be running at `http://127.0.0.1:8000`.

### Frontend Setup (ReactJS)

#### 1. Navigate to the Frontend Directory

```bash
cd frontend
```

#### 2. Install Node.js and npm

Make sure you have Node.js and npm installed. You can download them from [https://nodejs.org/](https://nodejs.org/).

#### 3. Install Dependencies

```bash
npm install
```

#### 4. Update API URL

In the `src/api.js` file, update the `apiUrl` variable with the URL of your FastAPI server:

```javascript
const apiUrl = 'http://localhost:8000';  // Update with your FastAPI server URL
```

#### 5. Run the React Development Server

```bash
npm start
```

The React development server will be running at `http://localhost:3000`.

Now, you have both the FastAPI backend and ReactJS frontend set up locally. You can access the application by visiting `http://localhost:3000` in your web browser.

Feel free to customize the application and explore the features you implemented.