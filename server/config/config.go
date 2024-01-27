package config

import (
	"os"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

var logger = log.With().Str("pkg", "config").Logger()

type Config struct {
	LogLevel zerolog.Level
}

func New() Config {
	return Config{
		LogLevel: parseEnv("LOG_LEVEL", zerolog.InfoLevel, parseLogLevel),
	}
}

// UTILS

func parseEnv[V any, P func(string) (V, error)](key string, defaultVal V, parser P) V {
	if str, exists := os.LookupEnv(key); exists {
		if value, err := parser(str); err == nil {
			return value
		} else {
			logger.Warn().Err(err).Msgf("Failed to parse env var '%s'", key)
		}
	}

	return defaultVal
}

// PARSERS

func parseLogLevel(s string) (zerolog.Level, error) {
	l, err := zerolog.ParseLevel(s)
	if err != nil {
		return zerolog.NoLevel, err
	}
	return l, nil
}
