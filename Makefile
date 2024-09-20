help:
	@echo "Usage: make [command]"
	@echo "Commands:"
	@echo "  start - Start the development server"

start:
	foreman start -f Procfile.dev

routes:
	cd rails_api && bin/rails routes