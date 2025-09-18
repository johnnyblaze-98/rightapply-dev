@echo off
echo 🧪 Running Registration Tests...

echo.
echo Step 1: Checking if .env file exists...
if not exist .env (
    echo ❌ .env file not found! Run update-env.bat first.
    pause
    exit /b 1
)

echo ✅ .env file found

echo.
echo Step 2: Reading API endpoint from .env...
for /f "tokens=2 delims==" %%i in ('findstr VITE_API_BASE .env') do set API_ENDPOINT=%%i
echo 📍 API Endpoint: %API_ENDPOINT%

echo.
echo Step 3: Running API tests with Node.js...
set VITE_API_BASE=%API_ENDPOINT%
node test-registration.js

echo.
echo Step 4: Opening test form in browser...
echo 📝 Update API_BASE in test-frontend.html to: %API_ENDPOINT%
start test-frontend.html

echo.
echo 🎯 Test Instructions:
echo 1. API tests ran above - check for any errors
echo 2. Browser opened with test form - update API_BASE and test
echo 3. Check AWS Console DynamoDB table for saved data
echo 4. Run 'npm run dev' to test the actual registration page

pause