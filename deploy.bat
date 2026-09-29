@echo off
echo ================================
echo Deploying MedWatch to Firebase
echo ================================
echo.
echo Step 1: Installing Firebase tools...
call npm install -g firebase-tools
echo.
echo Step 2: Logging in to Firebase...
call firebase login
echo.
echo Step 3: Seeding database...
call node seed.js
echo.
echo Step 4: Deploying to Firebase Hosting...
call firebase deploy --only hosting
echo.
echo ================================
echo DEPLOYMENT COMPLETE
echo Your app is live at:
echo https://the-med-care.web.app
echo ================================
pause

