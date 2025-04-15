variable "env_name" {
  description = "The environment name (test or prod)"
  type        = string
}

variable "location" {
  description = "The Azure region to deploy the AKS cluster"
  type        = string
}

variable "resource_group_name" {
  description = "Resource group for AKS"
  type        = string
}

variable "subnet_id" {
  description = "Subnet ID for AKS node pool"
  type        = string
}

variable "vm_size" {
  description = "VM size for AKS node pool"
  type        = string
  default     = "Standard_B2s"
}

variable "kubernetes_version" {
  description = "Kubernetes version to use"
  type        = string
  default     = "1.32.0"
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
