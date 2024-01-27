package main

import (
	"github.com/aboqasem/portfolio-server/config"
	"github.com/joho/godotenv"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

var logger = log.With().Str("pkg", "main").Logger()
var conf config.Config

func init() {
	if err := godotenv.Load(); err != nil {
		logger.Info().Err(err).Msg("No .env file found")
	}

	conf = config.New()

	zerolog.SetGlobalLevel(conf.LogLevel)
}

func main() {
	logger.Info().Msg("Hello, World!")
}
