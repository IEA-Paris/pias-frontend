terraform {
  source = "../../../modules//pias-frontend"
}

include {
  path = find_in_parent_folders()
}
