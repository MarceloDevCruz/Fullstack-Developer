# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Default admin user
if defined?(User)
	User.find_or_create_by!(email: "admin@teste.com") do |u|
		u.full_name = "admin@admin"
		u.role = "admin"
		u.password = "admin123"
		u.password_confirmation = "admin123"
	end
end
