# Recipes - Demo app

A web app that allows storing links to favorite meal recipes https://recipes-demo.vercel.app.

## Motivation

Me and my wife don't cook too often, but we needed a place where we could store links to meal recipes that we like and already tried. I decided to use my coding skills to create an app by myself.

## Overview

The Recipes app allows to:

- Open links to recipes
- Filter recipes by title or tags
- Add recipe's title, link and tags (only logged in users)
- Edit recipe's details (only logged in users)
- Delete recipes (only logged in users)
- Log in existing users to add/edit/delete (currently new user registration is not available)

## Tech stack

- Front-end: Next.js with TypeScript, Tailwind CSS for styling
- Back-end: Next.js API Routes
- Database & Authorization: Firebase/Firestore
- Additional packages: validator.js - input validation
- Web Server: deployed to Vercel https://recipes-demo.vercel.app

## Features

- Common layout component for all pages
- One input form shared between add and delete pages
- Reusable card, button and notification modal components
- Spinner shown to users while fetching data
- Context API for state management across the app
- Next.js API Routes for back-end calls
- Firebase configuration kept in Environmental Variables
- Authentication via email/password provider from Firebase
- Route guards to protect from database edits made by unauthorized users
