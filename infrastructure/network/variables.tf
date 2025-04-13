variable "resource_group_name" {
  description = "Name of the resource group for the network resources"
  type        = string
  default     = "cst8918-final-project-group-001"  # change your group number if needed
}

variable "location" {
  description = "Azure region for the resources"
  type        = string
  default     = "East US"
}

variable "vnet_name" {
  description = "Name of an existing VNet"
  type        = string
}

variable "vnet_address_space" {
  description = "CIDR block for the virtual network"
  type        = string
  default     = "10.0.0.0/14"
}

