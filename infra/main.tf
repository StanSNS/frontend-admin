terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.113"
    }
  }
}

provider "azurerm" {
  features {}
}

// FRONTEND-ADMIN SERVER
resource "azurerm_resource_group" "rgfsa" {
  name     = "RG-FSA"
  location = "North Europe"
}

resource "azurerm_service_plan" "aspfsa" {
  name                = "ASP-FSA"
  resource_group_name = azurerm_resource_group.rgfsa.name
  location            = azurerm_resource_group.rgfsa.location
  os_type             = "Windows"
  sku_name            = "B1"
}

resource "azurerm_windows_web_app" "awwafsa" {
  name                = "gymfitbulgaria-admin"
  resource_group_name = azurerm_resource_group.rgfsa.name
  location            = azurerm_service_plan.aspfsa.location
  service_plan_id     = azurerm_service_plan.aspfsa.id

  site_config {
    application_stack {
      current_stack = "node"
      node_version  = "~20"
    }
    always_on = false
  }
}