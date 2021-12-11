package main

import (
	"log"
	"net/http"

	"rcotillo.tech/storycutter/router"
)

func main() {

	r := router.GetRoutes()

	http.Handle("/", r)

	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal(err)
	}
}
