data "aws_iam_policy" "AWSLambdaBasicExecutionRole" {
  arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}


resource "aws_lambda_function" "rest_apis_default" {
  function_name = "rest_apis_default"

  s3_bucket = aws_s3_bucket.rest_apis_lambdas.bucket
  s3_key    = "default/${var.deployment_number}/rest_api_default.zip"

  handler = "index.handler"
  runtime = "nodejs14.x"

  role = aws_iam_role.lambda_rest_apis_default.arn

  environment {
    variables = {
      STAGE = lookup(var.workspace_to_stage, terraform.workspace)
      ANONYMOUSUPLOADS_BUCKET_DOMAIN_NAME = aws_s3_bucket.anonymousuploads.bucket_domain_name
      ANONYMOUSUPLOADS_BUCKET_REGION = aws_s3_bucket.anonymousuploads.region
    }
  }
}

resource "aws_iam_role" "lambda_rest_apis_default" {
  name = "lambda_rest_apis_default"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF

}

resource "aws_iam_role_policy_attachment" "AWSLambdaBasicExecutionRole_to_lambda_rest_apis_default" {
  policy_arn = data.aws_iam_policy.AWSLambdaBasicExecutionRole.arn
  role = aws_iam_role.lambda_rest_apis_default.name
}

resource "aws_lambda_permission" "rest_apis_default" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.rest_apis_default.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.default.execution_arn}/*/*"
}



resource "aws_iam_role_policy_attachment" "dynamodb_default_to_lambda_rest_apis_default" {
  policy_arn = aws_iam_policy.dynamodb_default.arn
  role = aws_iam_role.lambda_rest_apis_default.name
}

resource "aws_iam_role_policy_attachment" "anonymousuploads_readwrite_to_lambda_rest_apis_default" {
  policy_arn = aws_iam_policy.anonymousuploads_readwrite.arn
  role = aws_iam_role.lambda_rest_apis_default.name
}
