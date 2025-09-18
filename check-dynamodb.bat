@echo off
echo 🔍 Checking DynamoDB Table...

echo.
echo Getting table name from CloudFormation stack...
for /f "tokens=*" %%i in ('aws cloudformation describe-stacks --stack-name rightapplyphase1stack --query "Stacks[0].Outputs[?OutputKey=='DynamoDBTable'].OutputValue" --output text') do set TABLE_NAME=%%i

echo 📊 Table Name: %TABLE_NAME%

echo.
echo Scanning table for recent registrations...
aws dynamodb scan --table-name %TABLE_NAME% --limit 5 --query "Items[*].{ID:id.S,Name:preferredName.S,Email:resumeEmail.S,Created:createdAt.S}" --output table

echo.
echo Getting table item count...
aws dynamodb scan --table-name %TABLE_NAME% --select COUNT --query "Count"

echo.
echo ✅ DynamoDB check complete!
pause