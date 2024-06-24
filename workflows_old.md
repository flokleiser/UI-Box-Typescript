name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:

      - name: Checkout code
        uses: actions/checkout@v4

      - name: Install dependencies
        run: npm ci

      - name: Build Project
        run: npm run build 


      - name: Deploy to Github Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: src
          branch: gh-pages 