output "instance_ip" {
  value = aws_instance.web.public_ip
}

output "postgres_endpoint" {
  value = aws_db_instance.default.endpoint
}