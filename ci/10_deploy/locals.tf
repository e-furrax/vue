locals {
  availability_zone  = "${data.aws_region.current.name}${var.availability_zone_suffix}"
  availability_zone2 = "${data.aws_region.current.name}${var.availability_zone_suffix2}"
}