
provider "azurerm" {
  features {}
  subscription_id = "aa8bf277-fdd4-4ec4-bcd4-3458ddb8af6c" # your correct sub ID
}

terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 3.70.0, < 4.0.0"
    }
  }
}
