resource "aws_lambda_function" "handlers_file_check_result" {
  function_name = "handlers_file_check_result"

  s3_bucket = aws_s3_bucket.handlers_lambdas.bucket
  s3_key    = "file-check-result/${var.deployment_number}/handlers_file_check_result.zip"

  handler = "index.handler"
  runtime = "nodejs14.x"

  role = aws_iam_role.lambda_handlers_file_check_result.arn
}


resource "aws_iam_role" "lambda_handlers_file_check_result" {
  name = "lambda_handlers_file_check_result"

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

resource "aws_iam_role_policy_attachment" "AWSLambdaBasicExecutionRole_to_lambda_handlers_file_check_result" {
  policy_arn = data.aws_iam_policy.AWSLambdaBasicExecutionRole.arn
  role = aws_iam_role.lambda_handlers_file_check_result.name
}

resource "aws_iam_role_policy_attachment" "dynamodb_default_to_lambda_handlers_file_check_result" {
  policy_arn = aws_iam_policy.dynamodb_default.arn
  role = aws_iam_role.lambda_handlers_file_check_result.name
}

resource "aws_iam_role_policy_attachment" "anonymousuploads_readwrite_to_lambda_handlers_file_check_result" {
  policy_arn = aws_iam_policy.anonymousuploads_readwrite.arn
  role = aws_iam_role.lambda_handlers_file_check_result.name
}


resource "aws_lambda_permission" "file_check_result_handler_allow_event_hook_from_anonymousuploads_bucket" {
  statement_id  = "AllowBucketEventHook"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.handlers_file_check_result.arn
  principal     = "s3.amazonaws.com"
  source_arn    = aws_s3_bucket.anonymousuploads.arn
}
