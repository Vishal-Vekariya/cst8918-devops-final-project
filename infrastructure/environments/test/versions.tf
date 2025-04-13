terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 3.70.0, < 4.0.0" # known to avoid bad preview versions
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = "1a090018-ec06-40f5-a2ce-cce51e825f21" # your correct sub ID
}
