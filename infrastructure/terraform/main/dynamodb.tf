resource "aws_iam_policy" "dynamodb_default" {
  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "dynamodb:PutItem",
                "dynamodb:BatchWriteItem",
                "dynamodb:GetItem",
                "dynamodb:Query",
                "dynamodb:GetRecords",
                "dynamodb:GetShardIterator",
                "dynamodb:DescribeStream",
                "dynamodb:ListShards",
                "dynamodb:ListStreams"
            ],
            "Resource": [
                "${aws_dynamodb_table.credentials.arn}",
                "${aws_dynamodb_table.users.arn}",
                "${aws_dynamodb_table.api_keys.arn}",
                "${aws_dynamodb_table.file_check_slots.arn}"
            ]
        }
    ]
}
EOF
}

resource "aws_dynamodb_table" "credentials" {
  name           = "credentials"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "email"

  attribute {
    name = "email"
    type = "S"
  }
}

resource "aws_dynamodb_table" "users" {
  name           = "users"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "api_keys" {
  name           = "api_keys"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "file_check_slots" {
  name           = "file_check_slots"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }
}
