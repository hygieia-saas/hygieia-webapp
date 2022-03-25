resource "aws_s3_bucket" "frontend" {
  bucket = "hygieia-webapp-frontend-${lookup(var.workspace_to_stage, terraform.workspace)}"
  force_destroy = "false"
}

resource "aws_s3_bucket_acl" "frontend" {
  bucket = aws_s3_bucket.frontend.id
  acl = "public-read"
}

resource "aws_s3_bucket_website_configuration" "frontend" {
  bucket = aws_s3_bucket.frontend.id
  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}


resource "aws_s3_bucket" "rest_apis_lambdas" {
  bucket = "hygieia-webapp-rest-apis-lambdas-${lookup(var.workspace_to_stage, terraform.workspace)}"
  force_destroy = "false"
}

resource "aws_s3_bucket_acl" "rest_apis_lambdas" {
  bucket = aws_s3_bucket.rest_apis_lambdas.id
  acl = "private"
}

resource "aws_s3_bucket_public_access_block" "rest_apis_lambdas" {
  bucket = aws_s3_bucket.rest_apis_lambdas.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}


resource "aws_s3_bucket" "handlers_lambdas" {
  bucket = "hygieia-webapp-handlers-lambdas-${lookup(var.workspace_to_stage, terraform.workspace)}"
  force_destroy = "false"
}

resource "aws_s3_bucket_acl" "handlers_lambdas" {
  bucket = aws_s3_bucket.handlers_lambdas.id
  acl = "private"
}

resource "aws_s3_bucket_public_access_block" "handlers_lambdas" {
  bucket = aws_s3_bucket.handlers_lambdas.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}


resource "aws_s3_bucket" "anonymousuploads" {
  bucket = "hygieia-webapp-anonymousuploads-${lookup(var.workspace_to_stage, terraform.workspace)}"
  force_destroy = "false"
}

resource "aws_s3_bucket_acl" "anonymousuploads" {
  bucket = aws_s3_bucket.anonymousuploads.id
  acl = "private"
}

resource "aws_s3_bucket_public_access_block" "anonymousuploads" {
  bucket = aws_s3_bucket.anonymousuploads.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_cors_configuration" "anonymousuploads" {
  bucket = aws_s3_bucket.anonymousuploads.bucket

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST"]
    allowed_origins = ["*"]
    expose_headers  = []
    max_age_seconds = 3000
  }
}

resource "aws_iam_policy" "anonymousuploads_readwrite" {
  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "s3:GetBucketLocation",
                "s3:GetObject",
                "s3:GetObjectTagging",
                "s3:ListBucket",
                "s3:ListBucketMultipartUploads",
                "s3:ListMultipartUploadParts",
                "s3:AbortMultipartUpload",
                "s3:PutObject"
            ],
            "Resource": [
                "${aws_s3_bucket.anonymousuploads.arn}",
                "${aws_s3_bucket.anonymousuploads.arn}/*"
            ]
        }
    ]
}
EOF
}


resource "aws_s3_bucket_notification" "anonymousuploads" {
  bucket = aws_s3_bucket.anonymousuploads.id

  lambda_function {
    lambda_function_arn = aws_lambda_function.file_check_scan.arn
    events              = ["s3:ObjectCreated:*"]
  }

  lambda_function {
    lambda_function_arn = aws_lambda_function.handlers_file_check_result.arn
    events              = ["s3:ObjectTagging:Put"]
  }
}
