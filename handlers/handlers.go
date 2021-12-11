package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/jtguibas/cinema"
	"rcotillo.tech/storycutter/utils"
)

func VideoHandler(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(32 << 20)

	l := r.Form.Get("length")

	file, header, err := r.FormFile("video")
	utils.Check(err)
	defer file.Close()

	fn, err := utils.SaveVideo(file, header.Filename)
	utils.Check(err)

	v, err := cinema.Load(fn)
	utils.Check(err)

	length, err := strconv.Atoi(l)

	if v.Duration() < time.Duration(length)*time.Second {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Video is too short"})
		return
	}

	utils.Check(err)
	files, err := utils.SplitVideo(v, length, fn)
	utils.Check(err)

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(files)

}
