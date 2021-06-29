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

resource "aws_subnet" "my_subnet2" {
  availability_zone = local.availability_zone2
  cidr_block        = var.subnet_cidr_block2
  vpc_id            = aws_vpc.my_vpc.id
}

resource "aws_route_table_association" "my_route_table_association" {
  subnet_id      = aws_subnet.my_subnet.id
  route_table_id = aws_route_table.my_route_table.id
}

resource "aws_security_group" "my_security_group" {
  vpc_id = aws_vpc.my_vpc.id

  dynamic "ingress" {
    for_each = var.ingress_ports
    content {
      from_port   = ingress.value
      to_port     = ingress.value
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "my_db_security_group" {
  vpc_id = aws_vpc.my_vpc.id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.my_security_group.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
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
      web               = aws_instance.web.public_ip
      postgres_endpoint = aws_db_instance.default.endpoint
    }
  )
  filename = "../20_ansible/inventories/hosts.cfg"
}

resource "aws_db_subnet_group" "default" {
  name       = "main"
  subnet_ids = [aws_subnet.my_subnet.id, aws_subnet.my_subnet2.id]
}

resource "aws_db_instance" "default" {
  allocated_storage      = 10
  engine                 = "postgres"
  engine_version         = "12.6"
  instance_class         = "db.t2.micro"
  name                   = "furrax"
  username               = "furrax"
  vpc_security_group_ids = [aws_security_group.my_db_security_group.id]
  password               = var.postgres_password # must be set with the -var command line option
  db_subnet_group_name   = aws_db_subnet_group.default.name
}

# DNS ==============================================================
resource "aws_route53_zone" "efurrax" {
  name     = "e-furrax.com"
}

resource "aws_route53_record" "main" {
  zone_id = aws_route53_zone.efurrax.zone_id
  name    = "e-furrax.com"
  ttl     = 300
  type    = "A"
  records = [aws_instance.web.public_ip]
}

resource "aws_route53_record" "nameservers" {
  allow_overwrite = true
  name            = "e-furrax.com"
  ttl             = 172800
  type            = "NS"
  zone_id         = aws_route53_zone.efurrax.zone_id    
  records = [
    aws_route53_zone.efurrax.name_servers[0],
    aws_route53_zone.efurrax.name_servers[1],
    aws_route53_zone.efurrax.name_servers[2],
    aws_route53_zone.efurrax.name_servers[3],
  ]
}

resource "aws_route53_record" "api" {
  zone_id = aws_route53_zone.efurrax.zone_id
  name    = "api.e-furrax.com"
  ttl     = 300
  type    = "CNAME"
  records = ["e-furrax.com"]
}

resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.efurrax.zone_id
  name    = "www.e-furrax.com"
  ttl     = 300
  type    = "CNAME"
  records = ["e-furrax.com"]
}
