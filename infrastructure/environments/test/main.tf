
provider "kubernetes" {
  host                   = module.aks.kube_config["host"]
  client_certificate     = base64decode(module.aks.kube_config["client_certificate"])
  client_key             = base64decode(module.aks.kube_config["client_key"])
  cluster_ca_certificate = base64decode(module.aks.kube_config["cluster_ca_certificate"])
}

module "network" {
  source              = "../../network"
  resource_group_name = var.resource_group_name
  location            = var.location
  vnet_name           = "cst8918-vnet"
  vnet_address_space  = "10.4.0.0/16"
}


module "aks" {
  source              = "../../aks"
  env_name            = var.env_name
  location            = var.location
  resource_group_name = var.resource_group_name

  # Replace this with your actual subnet ID
  subnet_id           = module.network.subnet_ids["test"]
  vm_size             = var.vm_size
  kubernetes_version  = var.kubernetes_version
  service_cidr     = "10.10.0.0/16"
  dns_service_ip   = "10.10.0.10"
}


module "app" {
  source              = "../../app"
  resource_group_name = var.resource_group_name
  location            = var.location
  resource_prefix     = var.resource_prefix
  acr_name            = var.acr_name
  acr_login_server    = var.acr_login_server
  image_name          = var.image_name
  image_tag           = var.image_tag
  redis_hostname      = module.app.redis_hostname
  weather_api_key     = var.weather_api_key

  providers = {
    kubernetes = kubernetes
  }
}
