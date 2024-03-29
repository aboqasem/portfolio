# Change these variables as necessary.
MAIN_PACKAGE_PATH := ./
BINARY_NAME ?= app

# ==================================================================================== #
# HELPERS
# ==================================================================================== #

## help: print this help message
.PHONY: help
help:
	@echo 'Usage:'
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s ':' |  sed -e 's/^/ /'

.PHONY: confirm
confirm:
	@echo -n 'Are you sure? [y/N] ' && read ans && [ $${ans:-N} = y ]

.PHONY: no-dirty
no-dirty:
	git diff --exit-code

.PHONY: env
env:
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
	fi


# ==================================================================================== #
# QUALITY CONTROL
# ==================================================================================== #

## tidy: format code and tidy modfile
.PHONY: tidy
tidy:
	go fmt ./...
	go mod tidy -v

## audit: run quality control checks
.PHONY: audit
audit: tidy
	go mod verify
	go vet ./...
	go run honnef.co/go/tools/cmd/staticcheck@latest ./...
	go test -race -buildvcs -vet=off ./...


## vulncheck: check for known vulnerabilities
.PHONY: vulncheck
vulncheck:
	go run golang.org/x/vuln/cmd/govulncheck@latest ./...


# ==================================================================================== #
# DEVELOPMENT
# ==================================================================================== #

## test: run all tests
.PHONY: test
test:
	go test -v -race -buildvcs ./...

## test/cover: run all tests and display coverage
.PHONY: test/cover
test/cover:
	go test -v -race -buildvcs -coverprofile=/tmp/coverage.out ./...
	go tool cover -html=/tmp/coverage.out

## build: build the application
.PHONY: build
build:
	go build -o=./tmp/${BINARY_NAME} ${MAIN_PACKAGE_PATH}

## build/prod: build the application for production (stripped binary)
.PHONY: build/prod
build/prod:
	go build -tags netgo -ldflags '-s -w' -o=./${BINARY_NAME} ${MAIN_PACKAGE_PATH}

## run: run the  application
.PHONY: run
run: env build
	./tmp/${BINARY_NAME}

## run/live: run the application with reloading on file changes
.PHONY: run/live
run/live: env
	go run github.com/cosmtrek/air@v1.49.0
