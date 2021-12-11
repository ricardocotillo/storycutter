package utils

import (
	"bytes"
	"io"
	"math"
	"mime/multipart"
	"os"
	"path"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/jtguibas/cinema"
)

func SplitVideo(v *cinema.Video, l int, fn string) ([]string, error) {
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

func SaveVideo(mf multipart.File, fn string) (string, error) {
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
	return f.Name(), nil
}

func Check(e error) {
	if e != nil {
		panic(e)
	}
}
