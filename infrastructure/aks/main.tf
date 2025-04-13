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


resource "azurerm_kubernetes_cluster" "aks" {
  name                = "test-aks-cluster"
  location            = var.location
  resource_group_name = var.resource_group_name
  dns_prefix          = "${var.env_name}-aks"

  kubernetes_version  = var.kubernetes_version

  default_node_pool {
    name       = "default"
    node_count = var.env_name == "prod" ? 1 : 1
    vm_size    = var.vm_size

    # Auto-scaling only for prod
    enable_auto_scaling = var.env_name == "prod" ? true : false
    min_count           = var.env_name == "prod" ? 1 : null
    max_count           = var.env_name == "prod" ? 3 : null

    vnet_subnet_id = var.subnet_id
  }

  identity {
    type = "SystemAssigned"
  }

  network_profile {
     network_plugin    = "azure"
    load_balancer_sku = "standard"
    service_cidr      = var.service_cidr
    dns_service_ip    = var.dns_service_ip
        }



  tags = {
    Environment = var.env_name
  }
}
