---
id: 3
title: Guide user to register/login due to 'Incorrect email or password' error
stage: red
date: 2026-02-07
surface: agent
model: gemini-1.5-flash
feature: authentication
branch: main
user: 
command: login kerne pe email or password dalne pe Incorrect email or password likha hoa arha hai
labels: ["bugfix", "frontend", "backend", "authentication", "user-guidance"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - frontend/lib/auth.ts
tests_yaml: []
prompt_text: |
  login kerne pe email or password dalne pe Incorrect email or password likha hoa arha hai
response_text: |
  I have added `console.log` statements to `frontend/lib/auth.ts` to help debug the login process.

  The 'Incorrect email or password' message indicates that your frontend is successfully communicating with the backend's login endpoint, but the backend is rejecting the credentials. This typically happens for one of two reasons:

  1.  **User Not Registered:** The email you're trying to log in with does not exist in the backend database. You need to sign up first.
  2.  **Incorrect Password:** The password you're providing doesn't match the one stored for that email in the database.

  **To resolve this, please follow these steps:**

  1.  **Ensure your backend is running.**
  2.  **Go to the signup page (`/signup`)** in your frontend application.
  3.  **Register a new user** with a unique email and a memorable password.
  4.  **Then, try logging in with those newly registered credentials** on the login page (`/login`).

  If the issue persists after following the above steps, please check your browser's developer console for the output of the `console.log` statements. They might provide more details about what is being sent and received.
---
