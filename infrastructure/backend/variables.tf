variable "resource_group_name" {
  description = "The name of the Resource Group for storing the backend storage account"
  type        = string
  default     = "veka0011-githubactions-rg"
}

variable "location" {
  description = "Azure region for backend resources"
  type        = string
  default     = "East US"
}

variable "storage_account_name" {
  description = "Globally unique name for the storage account"
  type        = string
  default     = "veka0011githubactions"
}

variable "container_name" {
  description = "Name of the blob container to store the terraform state file"
  type        = string
  default     = "tfstate"
}
