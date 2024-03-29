provider "aws" {
  assume_role {
    role_arn = "arn:aws:iam::${lookup(var.workspace_to_infra_webapp_aws_account_id, terraform.workspace)}:role/AccountManager"
  }
  region = "us-east-1"
}

data "aws_region" "current" {}

data "aws_iam_policy" "AWSLambdaBasicExecutionRole" {
  arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
