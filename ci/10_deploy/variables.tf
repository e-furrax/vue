variable "number_of_instances" {
  type = number
}

variable "user" {
  type = string
}

variable "subnet_cidr_block" {
  type = string
}

variable "availability_zone_suffix" {
  type = string
}

variable "egress_ports" {
  type = list(string)
}

variable "ingress_ports" {
  type = list(string)
}