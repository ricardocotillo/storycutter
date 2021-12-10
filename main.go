package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"math"
	"mime/multipart"
	"net/http"
	"os"
	"path"
	"strconv"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"github.com/jtguibas/cinema"
)

func main() {
	args := os.Args[1:]

	r := mux.NewRouter()

	r.HandleFunc("/video/", imageHandler)

	http.Handle("/", r)

	// serve static and medio on development
	if len(args) > 0 && args[0] == "--dev" {
		fs := http.FileServer(http.Dir("./build"))
		ms := http.StripPrefix("/media/", http.FileServer(http.Dir("./media")))
		r.PathPrefix("/media/").Handler(ms)
		r.PathPrefix("/").Handler(fs)
		log.Println("Listening on http://localhost:3000")
	}
	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal(err)
	}
}

func imageHandler(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(32 << 20)

	l := r.Form.Get("length")

	file, header, err := r.FormFile("video")
	fmt.Println("holaaaa")
	check(err)
	defer file.Close()

	fn, err := saveVideo(file, header.Filename)
	check(err)

	v, err := cinema.Load(fn)
	check(err)

	length, err := strconv.Atoi(l)

	fmt.Println("is too short: ", v.Duration() < time.Duration(length)*time.Second)
	fmt.Println("length: ", time.Duration(length)*time.Second)
	fmt.Println("video duration: ", v.Duration())
	if v.Duration() < time.Duration(length)*time.Second {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Video is too short"})
		return
	}

	check(err)
	files, err := splitVideo(v, length, fn)
	check(err)

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(files)

}

func splitVideo(v *cinema.Video, l int, fn string) ([]string, error) {
	fnList := []string{}
	d := v.Duration()

	numParts := math.Ceil(d.Seconds() / float64(l))
	sfn := strings.Split(fn, ".")

	for i := 0; i < int(numParts); i++ {
		start := time.Duration(i*l) * time.Second

		end := time.Duration((i+1)*l) * time.Second

		if end > d {
			end = d
		}

		v.Trim(start, end)

		name := uuid.New().String() + "." + sfn[1]

		sf, err := os.Create(path.Join("media", name))

		if err != nil {
			return nil, err
		}

		defer sf.Close()

		err = v.Render(sf.Name())

		if err != nil {
			return nil, err
		}

		fnList = append(fnList, "/"+sf.Name())
	}
	return fnList, nil
}

func saveVideo(mf multipart.File, fn string) (string, error) {
	var buf bytes.Buffer
	io.Copy(&buf, mf)

	f, err := os.Create("media/" + fn)
	if err != nil {
		return "", err
	}
	defer f.Close()

	_, err = f.Write(buf.Bytes())
	if err != nil {
		return "", err
	}
	buf.Reset()
	fmt.Println("__________________________________________", f.Name())
	return f.Name(), nil
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}
