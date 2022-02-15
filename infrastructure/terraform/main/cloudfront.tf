resource "aws_cloudfront_cache_policy" "api_gateway_optimized" {
  name        = "ApiGatewayOptimized"

  default_ttl = 0
  max_ttl     = 0
  min_ttl     = 0

  parameters_in_cache_key_and_forwarded_to_origin {
    cookies_config {
      cookie_behavior = "none"
    }

    headers_config {
      header_behavior = "none"
    }
    query_strings_config {
      query_string_behavior = "none"
    }
  }
}

resource "aws_cloudfront_origin_request_policy" "api_gateway_optimized" {
  name    = "ApiGatewayOptimized"

  cookies_config {
    cookie_behavior = "none"
  }

  headers_config {
    header_behavior = "whitelist"
    headers {
      items = ["Accept-Charset", "Accept", "User-Agent", "Referer", "X-Hygieia-Webapp-Default-Rest-Api-Key-Id"]
    }
  }

  query_strings_config {
    query_string_behavior = "all"
  }
}

resource "aws_cloudfront_distribution" "default" {
  enabled  = true

  aliases = [data.aws_route53_zone.root.name]

  price_class = "PriceClass_All"

  origin {
    domain_name = "${aws_s3_bucket.frontend.id}.s3-website-${aws_s3_bucket.frontend.region}.amazonaws.com"
    origin_id   = "s3-${aws_s3_bucket.frontend.id}"

    custom_origin_config {
      http_port                = 80
      https_port               = 443
      origin_keepalive_timeout = 5
      origin_protocol_policy   = "http-only"
      origin_read_timeout      = 30
      origin_ssl_protocols     = ["TLSv1.2"]
    }
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD", "OPTIONS"]
    target_origin_id       = "s3-${aws_s3_bucket.frontend.id}"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    forwarded_values {
      query_string = true
      cookies {
        forward = "all"
      }
      headers = ["Access-Control-Request-Headers", "Access-Control-Request-Method", "Origin"]
    }
  }


  origin {
    domain_name = replace(
      replace(aws_apigatewayv2_stage.default_api.invoke_url, "https://", ""),
      "/api",
      ""
    )
    origin_id = "api-gateway-default"
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }


  ordered_cache_behavior {
    allowed_methods = ["GET", "HEAD", "OPTIONS", "POST", "PUT", "DELETE", "PATCH"]
    cached_methods  = ["GET", "HEAD", "OPTIONS"]
    path_pattern = "api*"
    target_origin_id = "api-gateway-default"
    viewer_protocol_policy = "https-only"
    cache_policy_id = aws_cloudfront_cache_policy.api_gateway_optimized.id
    origin_request_policy_id = aws_cloudfront_origin_request_policy.api_gateway_optimized.id
  }


  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn            = aws_acm_certificate.root_domain.arn
    minimum_protocol_version       = "TLSv1.2_2019"
    ssl_support_method             = "sni-only"
    cloudfront_default_certificate = "false"
  }

  // This way, URIs like https://app.virusaas.com/form-definitions/new still work,
  // although physically, only /index.html (and therefore https://app.virusaas.com/index.html)
  // exists on S3.
  custom_error_response {
    error_caching_min_ttl = 60
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }

  is_ipv6_enabled = true
}
