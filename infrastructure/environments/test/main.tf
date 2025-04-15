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

  subnet_id          = module.network.subnet_ids["test"]
  vm_size            = var.vm_size
  kubernetes_version = var.kubernetes_version
  service_cidr       = "10.10.0.0/16"
  dns_service_ip     = "10.10.0.10"
}

# 🔁 Build and push Docker image to ACR for test
resource "null_resource" "push_image_if_test" {
  count = var.env_name == "test" ? 1 : 0

  provisioner "local-exec" {
    command = <<EOT
      echo "🚀 Building and pushing image '${var.image_name}:${var.image_tag}' to ACR..."
      docker build -t ${var.image_name} ../..
      docker tag ${var.image_name} ${var.acr_login_server}/${var.image_name}:${var.image_tag}
      az acr login --name ${var.acr_name}
      docker push ${var.acr_login_server}/${var.image_name}:${var.image_tag}
    EOT
  }
}

module "app" {
  source              = "../../app"
  resource_group_name = var.resource_group_name
  location            = var.location
  resource_prefix     = var.resource_prefix

  #  ACR values passed through vars
  acr_name         = var.acr_name
  acr_login_server = var.acr_login_server

  image_name      = var.image_name
  image_tag       = var.image_tag
  weather_api_key = var.weather_api_key

  providers = {
    kubernetes = kubernetes
  }
}
