resource "aws_s3_bucket" "frontend" {
  bucket = "hygieia-webapp-frontend-${lookup(var.workspace_to_stage, terraform.workspace)}"
  force_destroy = "false"
  website {
    index_document = "index.html"
    error_document = "error.html"
  }
  acl = "public-read"
}


resource "aws_s3_bucket" "rest_apis_lambdas" {
  bucket = "hygieia-webapp-rest-apis-lambdas-${lookup(var.workspace_to_stage, terraform.workspace)}"
  force_destroy = "false"
  acl = "private"
}

resource "aws_s3_bucket_public_access_block" "rest_apis_lambdas" {
  bucket = aws_s3_bucket.rest_apis_lambdas.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
