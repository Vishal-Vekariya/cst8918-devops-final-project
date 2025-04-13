terraform {
  backend "azurerm" {
    resource_group_name  = "veka0011-githubactions-rg"
    storage_account_name = "veka0011githubactions"
    container_name       = "tfstate"
    key                  = "test.terraform.tfstate"
  }
}
