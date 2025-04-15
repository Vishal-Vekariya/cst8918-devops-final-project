output "resource_group_name" {
  value = azurerm_resource_group.backend_rg.name
}

output "storage_account_name" {
  value = azurerm_storage_account.backend_sa.name
}

output "container_name" {
  value = azurerm_storage_container.tfstate.name
}

output "arm_access_key" {
  value     = azurerm_storage_account.backend_sa.primary_access_key
  sensitive = true
}
