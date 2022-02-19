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
