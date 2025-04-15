terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 3.70.0, < 4.0.0"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = "aa8bf277-fdd4-4ec4-bcd4-3458ddb8af6c"
}

# ➕ Create ACR
resource "azurerm_container_registry" "acr" {
  name                = "finalprojectparm0100"
  location            = var.location
  resource_group_name = var.resource_group_name
  sku                 = "Basic"
  admin_enabled       = true
}

# ➕ Create AKS
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


resource "azurerm_role_assignment" "aks_acr_pull" {
  scope                = azurerm_container_registry.acr.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_kubernetes_cluster.aks.kubelet_identity[0].object_id


  depends_on = [
    azurerm_kubernetes_cluster.aks,
    azurerm_container_registry.acr
  ]
}
