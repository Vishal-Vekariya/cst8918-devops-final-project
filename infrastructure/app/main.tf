provider "azurerm" {
  features {}
}

resource "azurerm_container_registry" "acr" {
  name                = "finalprojectparm0100"
  location            = var.location
  resource_group_name = var.resource_group_name
  sku                 = "Basic"
  admin_enabled       = true
}

resource "azurerm_redis_cache" "redis" {
  name                = "redis-parm0100"
  location            = var.location
  resource_group_name = var.resource_group_name
  capacity            = 0
  family              = "C"
  sku_name            = "Basic"
  minimum_tls_version = "1.2"
}

resource "kubernetes_deployment" "remix_app"{
  metadata {
    name = "remix-weather"
    labels = {
      app = "remix"
    }
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "remix-weather"
      }
    }

    template {
      metadata {
        labels = {
          app = "remix-weather"
        }
      }

      spec {
        container {
          name  = "remix-weather"
          image = "${var.acr_login_server}/remix-weather:${var.image_tag}"
          port {
            container_port = 3000
          }

          env {
            name  = "REDIS_URL"
            value = "redis://${azurerm_redis_cache.redis.hostname}:6380"
          }

          env {
            name  = "WEATHER_API_KEY"
            value = var.weather_api_key
          }
        }
      }
    }
  }
}
resource "kubernetes_service" "remix_service" {
  metadata {
    name = "remix-weather-service"
  }

  spec {
    selector = {
      app = "remix"
    }

    port {
      port        = 80
      target_port = 3000
    }

    type = "LoadBalancer"
  }
}

