package main

import (
	"net/http"
	"os"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "${method}  ${uri}  ${latency_human}  ${status}\n",
	}))
	e.Use(middleware.GzipWithConfig(middleware.GzipConfig{
		Level: 5,
	}))

	if os.Getenv("ENV") == "dev" {
		e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
			AllowOrigins: []string{"http://localhost:3000"},
			AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
		}))
		e.GET("/*", func(c echo.Context) (err error) {
			url := "http://localhost:3000" + c.Request().RequestURI
			return c.Redirect(http.StatusTemporaryRedirect, url)
		})
	} else {
		// prod - serve static files
		e.File("/*", "public/index.html")
		e.Static("/assets/*", "public/assets")
	}

	routes(e)
	e.Start(":8080")
}

func routes(e *echo.Echo) {
	e.GET("/api", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})

	e.GET("/api/chart", func(c echo.Context) error {
		type ChartData struct {
			Name string `json:"name"`
			Uv   int    `json:"uv"`
			Pv   int    `json:"pv"`
			Amt  int    `json:"amt"`
		}
		data := []ChartData{
			{Name: "Page A", Uv: 400, Pv: 2400, Amt: 2400},
			{Name: "Page B", Uv: 300, Pv: 4567, Amt: 2400},
			{Name: "Page C", Uv: 200, Pv: 1398, Amt: 2400},
			{Name: "Page D", Uv: 278, Pv: 3908, Amt: 2400},
			{Name: "Page E", Uv: 189, Pv: 4800, Amt: 2400},
			{Name: "Page F", Uv: 239, Pv: 3800, Amt: 2400},
			{Name: "Page G", Uv: 349, Pv: 4300, Amt: 2400},
			{Name: "Page H", Uv: 349, Pv: 4300, Amt: 2400},
			{Name: "Page I", Uv: 349, Pv: 4300, Amt: 2400},
			{Name: "Page J", Uv: 349, Pv: 4300, Amt: 2400},
			{Name: "Page K", Uv: 349, Pv: 4300, Amt: 2400},
		}
		return c.JSON(http.StatusOK, data)
	})
}
