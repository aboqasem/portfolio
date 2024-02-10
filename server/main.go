package main

import (
	"fmt"
	"html"
	"net/http"
	"time"

	"github.com/aboqasem/portfolio/server/config"
	_ "github.com/joho/godotenv/autoload"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

var logger = log.With().Str("pkg", "main").Logger()
var conf *config.Config

func init() {
	conf = config.Init()

	zerolog.SetGlobalLevel(conf.LogLevel)
}

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		logger.Debug().Any("method", r.Method).Str("path", r.URL.Path).Send()

		w.Write([]byte("<h1>Hello, world!</h1><pre>"))
		w.Write([]byte(r.Method))
		w.Write([]byte{' '})
		w.Write([]byte(html.EscapeString(r.URL.Path)))
		w.Write([]byte("</pre>"))
	})

	server := &http.Server{
		Addr:              fmt.Sprintf(":%d", conf.Port),
		ReadHeaderTimeout: 3 * time.Second,
	}

	logger.Info().Uint16("port", conf.Port).Msg("Running server...")
	err := server.ListenAndServe()
	if err != nil {
		logger.Fatal().Err(err).Msg("ListenAndServe")
	}
}
