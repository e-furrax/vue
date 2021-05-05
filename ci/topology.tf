resource "aws_vpc" "my_vpc" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_internet_gateway" "my_ig" {
  vpc_id = aws_vpc.my_vpc.id
}

resource "aws_route_table" "my_route_table" {
  vpc_id = aws_vpc.my_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.my_ig.id
  }
}

resource "aws_subnet" "my_subnet" {
  availability_zone = local.availability_zone
  cidr_block        = var.subnet_cidr_block
  vpc_id            = aws_vpc.my_vpc.id
  tags = {
    Name = "Vue"
    User = "thomas.gorszczyk"
  }
}

resource "aws_route_table_association" "my_route_table_association" {
  subnet_id      = aws_subnet.my_subnet.id
  route_table_id = aws_route_table.my_route_table.id
}

resource "aws_security_group" "my_security_group" {
  name_prefix = "Thomas"
  vpc_id      = aws_vpc.my_vpc.id
  tags = {
    Name = "Vue"
    User = "thomas.gorszczyk"
  }

  dynamic "egress" {
    for_each = var.egress_ports
    content {
      from_port   = egress.value
      to_port     = egress.value
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }

  dynamic "ingress" {
    for_each = var.ingress_ports
    content {
      from_port   = ingress.value
      to_port     = ingress.value
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }
}


resource "aws_key_pair" "mykey" {
  key_name   = "mykey"
  // public_key = file("ssh-keys/id_rsa_aws.pub")
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDXrf5+hEhiNz1wSRMbL597O4cigEkdkdKPBPxAeha0bN5x20LEDKhQRr70TzofAq9tqZKSNs+b92QhjHT1rcM8B7om0o82o7Rsovjg06nWpv/kYrtuMpqKvuYxfeyOu+qh5uZBcYtKowdbZnFXQzEgw95xpLIJZMPJUbfAfyzjXoHn33VBhKdw6OYSL5HsY0aPsXasTwteHToaHbwWyAxP18loNqMLii/z/x8/B2cZQpkoKw+ZvCWk/ef1HfNyyZCJ7otDoRqUNSVG6BKHyjGhMs8vZgvas0qnp+12cK5hPUlXIgw+VakMrJ8kHsbXAoZMkT/jxehQfxYzD6PhQLeu0erSJRinFXg5aD7kDo+vPbdBL6Wsirwtdmk/TRhBZUQotm4uGhPlzCvnUH5YGkLYKOXH9weSPg2XMJ062AJzI8+z+HV7Op+4VZR23cWfaykWRG4AJnhhgEliUwwgIrfydwVtVe0bf9hAcnojHUhoBpOtaARPplyXAyUidRRTTSE= scorpiz@DESKTOP-21S920H"
}

resource "aws_instance" "web" {
  ami                         = data.aws_ami.ubuntu.id
  subnet_id                   = aws_subnet.my_subnet.id
  instance_type               = "t2.micro"
  vpc_security_group_ids      = [aws_security_group.my_security_group.id]
  associate_public_ip_address = true
  key_name                    = aws_key_pair.mykey.key_name
  tags = {
    Name = "Vue"
    User = "thomas.gorszczyk"
  }
}
