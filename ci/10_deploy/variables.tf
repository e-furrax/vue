variable "user" {
  type = string
}

variable "subnet_cidr_block" {
  type = string
}

variable "subnet_cidr_block2" {
  type = string
}

variable "availability_zone_suffix" {
  type = string
}

variable "availability_zone_suffix2" {
  type = string
}

variable "postgres_password" {
  type = string
}

variable "egress_ports" {
  type = list(string)
}

variable "ingress_ports" {
  type = list(string)
}