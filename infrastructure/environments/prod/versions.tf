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
  subscription_id = "aa8bf277-fdd4-4ec4-bcd4-3458ddb8af6c" # your correct sub ID
}
