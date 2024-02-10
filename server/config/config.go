package config

import (
	"os"
	"strconv"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

var logger = log.With().Str("pkg", "config").Logger()

type Config struct {
	Port     uint16
	LogLevel zerolog.Level
}

func Init() *Config {
	return &Config{
		Port:     parseEnv("PORT", 8080, parseUint16),
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

func parseUint(s string, bits int) (uint64, error) {
	return strconv.ParseUint(s, 10, bits)
}

func parseUint16(s string) (uint16, error) {
	i, e := parseUint(s, 16)
	return uint16(i), e
}

func parseLogLevel(s string) (zerolog.Level, error) {
	l, err := zerolog.ParseLevel(s)
	if err != nil {
		return zerolog.NoLevel, err
	}
	return l, nil
}
