terraform {
  backend "azurerm" {
    resource_group_name  = "parm0100-githubactions-rg"
    storage_account_name = "parm0100githubactions"
    container_name       = "tfstate"
    key                  = "test.terraform.tfstate"
  }
}
