package main

import (
	"log"
	"net/http"

	"rcotillo.tech/storycutter/router"
)

func main() {
	r := router.GetRoutes()
	http.Handle("/", r)
	log.Println("Listening on http://localhost:3000")
	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal(err)
	}
}
