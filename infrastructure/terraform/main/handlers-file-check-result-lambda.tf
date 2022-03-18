resource "aws_lambda_function" "handlers_file_check_result" {
  function_name = "handlers_file_check_result"

  s3_bucket = aws_s3_bucket.handlers_lambdas.bucket
  s3_key    = "default/${var.deployment_number}/handlers_file_check_result.zip"

  handler = "index.handler"
  runtime = "nodejs14.x"

  role = aws_iam_role.lambda_handlers_file_check_result.arn

  environment {
    variables = {
      STAGE = lookup(var.workspace_to_stage, terraform.workspace)
      ANONYMOUSUPLOADS_BUCKET_NAME = aws_s3_bucket.anonymousuploads.bucket
      ANONYMOUSUPLOADS_BUCKET_DOMAIN_NAME = aws_s3_bucket.anonymousuploads.bucket_domain_name
      ANONYMOUSUPLOADS_BUCKET_REGION = aws_s3_bucket.anonymousuploads.region
    }
  }
}


resource "aws_s3_bucket_notification" "file_check_scan_on_new_object_in_anonymousuploads_bucket" {
  bucket = aws_s3_bucket.anonymousuploads.id

  lambda_function {
    lambda_function_arn = aws_lambda_function.file_check_scan.arn
    events              = ["s3:ObjectTagging:Put"]
  }
}
