resource "aws_acm_certificate" "root_domain" {
  domain_name = data.aws_route53_zone.root.name
  subject_alternative_names = ["*.${data.aws_route53_zone.root.name}"]
  validation_method = "DNS"
}

resource "aws_route53_record" "acm_certificate_validation_root_domain" {
  for_each = {
    for dvo in aws_acm_certificate.root_domain.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.root.zone_id
}

resource "aws_acm_certificate_validation" "root_domain" {
  certificate_arn         = aws_acm_certificate.root_domain.arn
  validation_record_fqdns = [for record in aws_route53_record.acm_certificate_validation_root_domain : record.fqdn]
}
