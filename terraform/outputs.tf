output "static_web_app_id" {
  description = "The ID of the Static Web App"
  value       = azurerm_static_web_app.portfolio.id
}

output "static_web_app_name" {
  description = "The name of the Static Web App"
  value       = azurerm_static_web_app.portfolio.name
}

output "static_web_app_default_host_name" {
  description = "The default hostname of the Static Web App"
  value       = azurerm_static_web_app.portfolio.default_host_name
}

output "static_web_app_url" {
  description = "The URL of the Static Web App"
  value       = "https://${azurerm_static_web_app.portfolio.default_host_name}"
}

output "static_web_app_api_key" {
  description = "The API key for the Static Web App"
  value       = azurerm_static_web_app.portfolio.api_key
  sensitive   = true
}

output "static_web_app_deployment_token" {
  description = "The deployment token for the Static Web App"
  value       = azurerm_static_web_app.portfolio.api_key
  sensitive   = true
}

output "resource_group_name" {
  description = "The name of the resource group"
  value       = data.azurerm_resource_group.main.name
}

output "location" {
  description = "The Azure region"
  value       = data.azurerm_resource_group.main.location
}
