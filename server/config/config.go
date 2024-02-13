package config

import (
	"os"
	"strconv"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

var logger = log.With().Str("pkg", "config").Logger()
var conf *Config

type Config struct {
	Port       uint16
	CorsOrigin string
	LogLevel   zerolog.Level
}

func new() *Config {
	return &Config{
		Port:       parseEnv("PORT", 8080, parseUint16),
		CorsOrigin: parseEnv("CORS_ORIGIN", "*", nop),
		LogLevel:   parseEnv("LOG_LEVEL", zerolog.InfoLevel, parseLogLevel),
	}
}

func Get() *Config {
	if conf == nil {
		conf = new()
	}
	return conf
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

func nop(s string) (string, error) {
	return s, nil
}

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
