from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__, template_folder="templates")  # Ensure it looks in 'templates/'
CORS(app)

EXCEL_FILE = "users.xlsx"

# Ensure the Excel file exists
def ensure_excel_file():
    if not os.path.exists(EXCEL_FILE):
        df = pd.DataFrame(columns=["Username", "Email", "Password"])
        df.to_excel(EXCEL_FILE, index=False)

ensure_excel_file()

# Serve the index page
@app.route('/')
def home():
    return render_template("index.html")  # Ensure this file exists in 'templates/'

# Login API
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "All fields are required!"}), 400

    df = pd.read_excel(EXCEL_FILE)

    user = df[(df["Username"] == username) & (df["Password"] == password)]
    if user.empty:
        return jsonify({"error": "Invalid username or password!"}), 400

    return jsonify({"message": "Login successful!"}), 200  # No redirection

if __name__ == "__main__":
    app.run(debug=True)
