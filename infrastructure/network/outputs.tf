output "resource_group_name" {
  value = var.resource_group_name
}

output "vnet_name" {
  value = var.vnet_name
}

output "subnet_ids" {
  value = {
     test  = azurerm_subnet.test.id
  }
}
