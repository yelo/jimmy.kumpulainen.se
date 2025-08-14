# Data source for existing resource group
data "azurerm_resource_group" "main" {
  name = var.resource_group_name
}

# Data source for client configuration
data "azurerm_client_config" "current" {}

# Static Web App
resource "azurerm_static_web_app" "portfolio" {
  name                = "${var.app_name}-${var.environment}"
  resource_group_name = data.azurerm_resource_group.main.name
  location            = var.location
  sku_tier            = "Free"
  sku_size            = "Free"

  identity {
    type = "SystemAssigned"
  }

  app_settings = {
    "ENVIRONMENT" = var.environment
  }

  tags = var.tags
}

# Custom domain (optional - uncomment if you have a custom domain)
# resource "azurerm_static_web_app_custom_domain" "portfolio_domain" {
#   static_web_app_id = azurerm_static_web_app.portfolio.id
#   domain_name       = "jimmy.kumpulainen.se"
#   validation_type   = "cname-delegation"
# }

# GitHub repository connection (if needed for advanced scenarios)
# Note: Basic GitHub integration is handled through the deployment token
# This is mainly for enterprise scenarios with advanced CI/CD requirements
