package services

import (
	"fmt"
	"log"
	"time"

	"github.com/go-resty/resty/v2"
)

const (
	vkAPIURL   = "https://api.vk.com/method"
	vkAPIToken = "89f5973e89f5973e89f5973eb28ad2cd36889f589f5973eee77d13facf67bc6878c4f88"
)

type VKPost struct {
	Text  string `json:"text"`
	Likes struct {
		Count int `json:"count"`
	} `json:"likes"`
	Reposts struct {
		Count int `json:"count"`
	} `json:"reposts"`
	Views struct {
		Count int `json:"count"`
	} `json:"views"`
}

type VKResponse struct {
	Response struct {
		Items []VKPost `json:"items"`
	} `json:"response"`
}

func SearchVKPosts(brand string) ([]VKPost, error) {
	client := resty.New()

	// Задаем временной промежуток (последние 7 дней)
	now := time.Now().Unix()
	startTime := now - 30*24*60*60 // 30 дней назад
	endTime := now
	// startTime := now - 7*24*60*60 // 7 дней назад
	// endTime := now

	var result VKResponse
	resp, err := client.R().
		SetQueryParams(map[string]string{
			"q":            brand,
			"access_token": vkAPIToken,
			"v":            "5.131",
			"count":        "200", // Максимум 200
			"start_time":   fmt.Sprintf("%d", startTime),
			"end_time":     fmt.Sprintf("%d", endTime),
		}).
		SetResult(&result).
		Get(vkAPIURL + "/newsfeed.search")

	if err != nil {
		log.Printf("Ошибка при запросе к VK API: %v", err)
		return nil, err
	}

	if resp.StatusCode() != 200 {
		log.Printf("VK API вернул статус: %d", resp.StatusCode())
		return nil, fmt.Errorf("VK API вернул статус: %d", resp.StatusCode())
	}

	// Логирование данных для отладки
	log.Printf("Найдено постов: %d", len(result.Response.Items))

	return result.Response.Items, nil
}
