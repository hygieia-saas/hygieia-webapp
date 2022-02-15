variable "workspace_to_stage" {
  type = map(string)
  default = {
    default = "prod"
    preprod = "preprod"
  }
}

variable "workspace_to_infra_webapp_aws_account_id" {
  type = map(string)
  default = {
    default = "199387562978"
    preprod = "039307614955"
  }
}

variable "workspace_to_root_domain" {
  type = map(string)
  default = {
    default = "app.virusaas.com"
    preprod = "preprod.app.virusaas.com"
  }
}
