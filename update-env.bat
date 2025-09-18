@echo off
echo Getting API endpoint from deployed stack...

for /f "tokens=*" %%i in ('aws cloudformation describe-stacks --stack-name rightapplyphase1stack --query "Stacks[0].Outputs[?OutputKey=='ApiEndpoint'].OutputValue" --output text') do set API_ENDPOINT=%%i

echo.
echo API Endpoint: %API_ENDPOINT%

echo.
echo Creating .env file...
echo VITE_API_BASE=%API_ENDPOINT% > .env

echo.
echo .env file created with API endpoint!
echo You can now run: npm run dev
pause