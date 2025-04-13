variable "env_name" {
  description = "The environment name (test or prod)"
  type        = string
}

variable "location" {
  description = "Azure region for deployment"
  type        = string
}

variable "resource_group_name" {
  description = "Resource group name for the AKS and other infra"
  type        = string
}

variable "vm_size" {
  description = "VM size for AKS nodes"
  type        = string
}

variable "kubernetes_version" {
  description = "Kubernetes version"
  type        = string
}

variable "resource_prefix" {
  description = "Prefix used for naming Azure resources (e.g., veka0011)"
  type        = string
}

variable "weather_api_key" {
  description = "Weather API key for the application"
  type        = string
  sensitive   = true  
}

variable "image_tag" {
  description = "Docker image tag for the application"
  type        = string
  default     = "latest"
}

variable "acr_login_server" {
  description = "Azure Container Registry login server"
  type        = string
}

variable "acr_name" {
  description = "Name of the Azure Container Registry"
  type        = string
}

variable "image_name" { 
  description = "Name of the Docker image to deploy"
  type        = string
  default     = "remix-weather"
}

variable "redis_hostname" {
  description = "Hostname of the Redis cache"
  type        = string
  default     = "redis-cache"
}

variable "service_cidr" {
  description = "Service CIDR range for AKS networking"
  type        = string
  default     = "10.10.0.0/16"
}

variable "dns_service_ip" {
  description = "DNS service IP address"
  type        = string
  default     = "10.10.0.10"
}
