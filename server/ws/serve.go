package ws

import (
	"net/http"

	"github.com/aboqasem/portfolio/server/config"
	"github.com/gorilla/websocket"
	"github.com/rs/zerolog/log"
)

var (
	logger = log.With().Str("pkg", "ws").Logger()

	conf = config.Get()

	hub = newHub()

	upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin: func(r *http.Request) bool {
			return conf.CorsOrigin == "*" || conf.CorsOrigin == r.Header.Get("Origin")
		},
	}
)

func init() {
	go hub.run()
}

func ServeWsHub(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		logger.Error().Err(err).Msg("failed to upgrade connection")
		return
	}

	client := &Client{hub: hub, conn: conn, send: make(chan []byte, 256)}
	client.hub.register <- client

	// Allow collection of memory referenced by the caller by doing all work in new goroutines.
	go client.writePump()
	go client.readPump()

}
