# Portfolio Admin — COMP229 Assignment 3

React frontend that integrates with the Assignment 2 backend
(`portfolio-backend`, deployed at
https://portfolio-backend-1-dr5t.onrender.com) to perform full CRUD
on four models: **users, projects, services, references**.

## Features
- Admin Dashboard linking to each resource section
- Add / Edit forms for each model (controlled inputs via `useState`)
- List + Delete pages for each model
- All data is read from and written to the live backend API

## Project structure
```
src/
  api/
    client.js          # axios instance pointing at the backend
    resource.js         # generic CRUD function factory
    resources.js         # instantiated CRUD APIs for each model
  config/
    resourceConfig.js    # field/column definitions per model
  components/
    Navbar.jsx
  pages/
    Home.jsx
    admin/
      Dashboard.jsx
      ResourceList.jsx   # generic list+delete page (used by all 4 models)
      ResourceForm.jsx    # generic add/edit form (used by all 4 models)
```

## Run locally
```
npm install
npm run dev
```

## Build
```
npm run build
```

## Deploy (Vercel)
1. Push this repo to GitHub
2. Go to vercel.com -> New Project -> import this repo
3. Framework preset: Vite (auto-detected)
4. Deploy

No environment variables are required -- the backend URL is set directly
in src/api/client.js.
