package router

import (
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"rcotillo.tech/storycutter/handlers"
)

func GetRoutes() *mux.Router {
	args := os.Args[1:]
	r := mux.NewRouter()
	r.HandleFunc("/video/", handlers.VideoHandler)

	// serve static and medio on development
	if len(args) > 0 && args[0] == "--dev" {
		fs := http.FileServer(http.Dir("./build"))
		ms := http.StripPrefix("/media/", http.FileServer(http.Dir("./media")))
		r.PathPrefix("/media/").Handler(ms)
		r.PathPrefix("/").Handler(fs)
	}
	return r
}
