output "instance_ip" {
  value = aws_instance.web.public_ip
}

output "postgres_endpoint" {
  value = aws_db_instance.default.endpoint
}

output "mongo_ip" {
  value = aws_instance.mongo.public_ip
}

output "redis_endpoint" {
  value = aws_instance.mongo.public_ip
}