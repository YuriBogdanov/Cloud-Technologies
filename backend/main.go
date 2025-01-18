package main

import (
	"encoding/json"
	"log"
	"my-app/backend/services"
	"net/http"
	"time"

	"github.com/rs/cors"
)

type AnalysisResult struct {
	Mentions int `json:"mentions"`
	Likes    int `json:"likes"`
	Reposts  int `json:"reposts"`
	Views    int `json:"views"`
}

func analyzeHandler(w http.ResponseWriter, r *http.Request) {
	brand := r.URL.Query().Get("brand")
	startDate := r.URL.Query().Get("start_date")
	endDate := r.URL.Query().Get("end_date")

	// Конвертация дат в Unix timestamp
	startTime, err := time.Parse("2006-01-02", startDate)
	if err != nil {
		http.Error(w, "Неверный формат начальной даты", http.StatusBadRequest)
		return
	}

	endTime, err := time.Parse("2006-01-02", endDate)
	if err != nil {
		http.Error(w, "Неверный формат конечной даты", http.StatusBadRequest)
		return
	}

	// Поиск постов в VK
	vkPosts, err := services.SearchVKPosts(brand, startTime.Unix(), endTime.Unix())
	if err != nil {
		http.Error(w, "Ошибка при поиске в VK", http.StatusInternalServerError)
		return
	}

	// Анализ данных
	var mentions, likes, reposts, views int
	for _, post := range vkPosts {
		mentions++
		likes += post.Likes.Count
		reposts += post.Reposts.Count
		views += post.Views.Count
	}

	result := AnalysisResult{
		Mentions: mentions,
		Likes:    likes,
		Reposts:  reposts,
		Views:    views,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/analyze", analyzeHandler)

	// Настройка CORS
	handler := cors.Default().Handler(mux)

	log.Println("Сервер запущен на http://localhost:8080")
	http.ListenAndServe(":8080", handler)
}
