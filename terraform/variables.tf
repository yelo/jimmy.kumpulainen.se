variable "resource_group_name" {
  description = "The name of the resource group"
  type        = string
}

variable "location" {
  description = "The Azure region where resources will be created"
  type        = string
  default     = "West Europe"
}

variable "app_name" {
  description = "The name of the static web app"
  type        = string
  default     = "jimmy-kumpulainen-portfolio"
}

variable "environment" {
  description = "The environment (dev, staging, prod)"
  type        = string
  default     = "prod"
}

variable "github_repo_url" {
  description = "The GitHub repository URL"
  type        = string
  default     = "https://github.com/yelo/jimmy.kumpulainen.se"
}

variable "github_repo_branch" {
  description = "The GitHub repository branch"
  type        = string
  default     = "main"
}

variable "app_location" {
  description = "The location of the app source code"
  type        = string
  default     = "/src"
}

variable "api_location" {
  description = "The location of the API source code"
  type        = string
  default     = ""
}

variable "output_location" {
  description = "The location of the built app"
  type        = string
  default     = "/src"
}

variable "tags" {
  description = "A map of tags to assign to the resources"
  type        = map(string)
  default = {
    Environment   = "production"
    Project       = "portfolio"
    ManagedBy     = "terraform"
    Owner         = "jimmy-kumpulainen"
  }
}
