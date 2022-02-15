variable "deployment_number" {
  type = string
}

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
    default = "325062206315"
    preprod = "000270780644"
  }
}

variable "workspace_to_root_domain" {
  type = map(string)
  default = {
    default = "app.virusaas.com"
    preprod = "preprod.app.virusaas.com"
  }
}
