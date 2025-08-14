# Reference existing resource group
data "azurerm_resource_group" "main" {
  name = var.resource_group_name
}

# Create the Static Web App using variables
resource "azurerm_static_web_app" "portfolio" {
  name                = "${var.app_name}-${var.environment}"
  resource_group_name = data.azurerm_resource_group.main.name
  location            = var.location

  # Free tier configuration
  sku_tier = "Free"
  sku_size = "Free"

  # GitHub integration configuration
  app_settings = {
    "GITHUB_REPO"        = var.github_repo_url
    "GITHUB_BRANCH"      = var.github_repo_branch
    "APP_LOCATION"       = var.app_location
    "API_LOCATION"       = var.api_location
    "OUTPUT_LOCATION"    = var.output_location
  }

  tags = merge(var.tags, {
    Environment = var.environment
    DeployedBy  = "terraform"
  })
}

resource "azurerm_static_web_app_custom_domain" "portfolio" {
   static_web_app_id = azurerm_static_web_app.portfolio.id
   domain_name       = "jimmy.kumpulainen.se"
   validation_type   = "dns-txt-token"
}