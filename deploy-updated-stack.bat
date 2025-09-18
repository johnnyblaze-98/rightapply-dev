@echo off
echo Deploying updated rightapply stack without Secrets Manager...

echo.
echo Step 1: Installing Lambda dependencies...
call npm run aws:build

echo.
echo Step 2: Building SAM application...
call sam build

echo.
echo Step 3: Deploying to AWS...
call sam deploy --stack-name rightapplyphase1stack --capabilities CAPABILITY_IAM --resolve-s3

echo.
echo Deployment complete! 
echo Check the outputs for your API endpoint URL.
pause