terraform {
  backend "s3" {
    bucket         = "terraform-state-efurrax-front"
    key            = "s3/terraform.tfstate"
    region         = "eu-west-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
