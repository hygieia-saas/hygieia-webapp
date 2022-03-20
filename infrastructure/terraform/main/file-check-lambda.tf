# AV Definitions Update

resource "aws_s3_bucket" "file_check_av_definitions" {
  bucket = "hygieia-webapp-file-check-lambda-av-definitions-${lookup(var.workspace_to_stage, terraform.workspace)}"
  force_destroy = "false"
}

resource "aws_s3_bucket_acl" "file_check_av_definitions" {
  bucket = aws_s3_bucket.file_check_av_definitions.id
  acl = "private"
}

resource "aws_s3_bucket_public_access_block" "file_check_lambda_av_definitions" {
  bucket = aws_s3_bucket.file_check_av_definitions.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_iam_role" "file_check_av_definitions_updater" {
  name = "file_check_av_definitions_updater"

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

resource "aws_iam_role_policy" "file_check_av_definitions_update" {

  role   = aws_iam_role.file_check_av_definitions_updater.id
  policy = <<EOF
{
   "Version":"2012-10-17",
   "Statement":[
      {
         "Effect":"Allow",
         "Action":[
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents"
         ],
         "Resource":"*"
      },
      {
         "Action":[
            "s3:ListBucket",
            "s3:GetObject",
            "s3:GetObjectTagging",
            "s3:PutObject",
            "s3:PutObjectTagging",
            "s3:PutObjectVersionTagging"
         ],
         "Effect":"Allow",
         "Resource":[
            "arn:aws:s3:::${aws_s3_bucket.file_check_av_definitions.bucket}",
            "arn:aws:s3:::${aws_s3_bucket.file_check_av_definitions.bucket}/*"
         ]
      }
   ]
}
EOF
}

resource "aws_lambda_function" "file_check_av_definitions_update" {
  filename         = "assets/file-check-lambda.zip"
  function_name    = "file_check_av_definitions_update"
  role             = aws_iam_role.file_check_av_definitions_updater.arn
  source_code_hash = filebase64sha256("assets/file-check-lambda.zip")
  runtime          = "python3.7"
  handler          = "update.lambda_handler"
  timeout          = 600
  memory_size      = 1024

  environment {
    variables = {
      AV_DEFINITION_S3_BUCKET = aws_s3_bucket.file_check_av_definitions.bucket
    }
  }
}

resource "aws_cloudwatch_event_rule" "every_3_hours" {
  name                = "every-3-hours"
  schedule_expression = "rate(3 hours)"
}

resource "aws_cloudwatch_event_target" "file_check_av_definitions_update" {
  rule      = aws_cloudwatch_event_rule.every_3_hours.name
  target_id = "file_check_av_definitions_update"
  arn       = aws_lambda_function.file_check_av_definitions_update.arn
}

resource "aws_lambda_permission" "file_check_av_definitions_update" {
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.file_check_av_definitions_update.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.every_3_hours.arn
}



# Scan

resource "aws_iam_role" "file_check_scanner" {
  name               = "file_check_scanner"
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

resource "aws_iam_role_policy" "file_check_scan" {
  role   = aws_iam_role.file_check_scanner.id
  policy = <<EOF
{
   "Version":"2012-10-17",
   "Statement":[
      {
         "Effect":"Allow",
         "Action":[
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents"
         ],
         "Resource":"*"
      },
      {
         "Action":[
            "s3:GetObject",
            "s3:GetObjectVersionTagging",
            "s3:PutObjectVersionTagging",
            "s3:GetObjectTagging",
            "s3:ListBucket",
            "s3:PutObjectTagging",
            "s3:GetBucketLocation",
            "s3:GetObjectVersion"
         ],
         "Effect":"Allow",
         "Resource": [
            "${aws_s3_bucket.anonymousuploads.arn}",
            "${aws_s3_bucket.anonymousuploads.arn}/*"
         ]
      },
      {
         "Action":[
            "s3:ListBucket",
            "s3:GetObject",
            "s3:GetObjectTagging",
            "s3:GetObjectVersionTagging"
         ],
         "Effect":"Allow",
         "Resource":[
            "arn:aws:s3:::${aws_s3_bucket.file_check_av_definitions.bucket}",
            "arn:aws:s3:::${aws_s3_bucket.file_check_av_definitions.bucket}/*"
         ]
      }
   ]
}
EOF
}

resource "aws_lambda_function" "file_check_scan" {
  filename         = "assets/file-check-lambda.zip"
  function_name    = "file_check_scan"
  role             = aws_iam_role.file_check_scanner.arn
  source_code_hash = filebase64sha256("assets/file-check-lambda.zip")
  runtime          = "python3.7"
  handler          = "scan.lambda_handler"
  timeout          = 600
  memory_size      = 2048

  environment {
    variables = {
      AV_DEFINITION_S3_BUCKET = aws_s3_bucket.file_check_av_definitions.bucket
    }
  }
}

resource "aws_lambda_permission" "file_check_scan_allow_event_hook_from_anonymousuploads_bucket" {
  statement_id  = "AllowBucketEventHook"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.file_check_scan.arn
  principal     = "s3.amazonaws.com"
  source_arn    = aws_s3_bucket.anonymousuploads.arn
}
