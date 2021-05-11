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
}

resource "aws_route_table_association" "my_route_table_association" {
  subnet_id      = aws_subnet.my_subnet.id
  route_table_id = aws_route_table.my_route_table.id
}

resource "aws_security_group" "my_security_group" {
  name_prefix = "Thomas"
  vpc_id      = aws_vpc.my_vpc.id

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
  key_name   = "newkey"
  public_key = file("../.ssh/id_rsa_aws.pub")
}

resource "aws_instance" "web" {
  ami                         = data.aws_ami.ubuntu.id
  subnet_id                   = aws_subnet.my_subnet.id
  instance_type               = "t2.micro"
  vpc_security_group_ids      = [aws_security_group.my_security_group.id]
  associate_public_ip_address = true
  key_name                    = aws_key_pair.mykey.key_name
}

resource "local_file" "hosts" {
  content = templatefile("${path.module}/templates/hosts.tpl",
    {
      web = aws_instance.web.public_ip
    }
  )
  filename = "../20_ansible/inventories/hosts.cfg"
}