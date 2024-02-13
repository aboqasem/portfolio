package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/aboqasem/portfolio/server/config"
	"github.com/aboqasem/portfolio/server/ws"
	_ "github.com/joho/godotenv/autoload"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

var logger = log.With().Str("pkg", "main").Logger()
var conf = config.Get()

func init() {
	zerolog.SetGlobalLevel(conf.LogLevel)
}

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Access-Control-Allow-Origin", conf.CorsOrigin)
		w.Write([]byte("OK"))
	})

	http.HandleFunc("/ws/hub", ws.ServeWsHub)

	server := &http.Server{
		Addr:              fmt.Sprintf(":%d", conf.Port),
		ReadHeaderTimeout: 3 * time.Second,
	}

	logger.Info().Msgf("Running server on http://localhost:%d", conf.Port)
	err := server.ListenAndServe()
	if err != nil {
		logger.Fatal().Err(err).Msg("ListenAndServe")
	}
}
