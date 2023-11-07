build:
	bin/sam build

start-local-api:
	bin/sam local start-api

deploy:
	bin/sam deploy --profile $(PROFILE)

.PHONY: build start-local-api deploy
