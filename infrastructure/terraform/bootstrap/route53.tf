resource "aws_route53_zone" "root" {
  name = lookup(var.workspace_to_root_domain, terraform.workspace)
}
