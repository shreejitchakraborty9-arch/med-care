@echo off
echo Deploying MedCare WB to Firebase Hosting...
echo.
echo This will deploy to: https://the-med-care.web.app
echo.
firebase deploy --only hosting
echo.
echo Deployment complete!
echo Your app is live at: https://the-med-care.web.app
pause
