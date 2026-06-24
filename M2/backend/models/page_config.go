package models

import "encoding/json"

type PageConfig struct {
	Global   GlobalConfig `json:"global"`
	Sections []Section    `json:"sections"`
}

type GlobalConfig struct {
	Theme ThemeConfig `json:"theme"`
	Font  FontConfig  `json:"font"`
}

type ThemeConfig struct {
	BackgroundColor string `json:"backgroundColor"`
	TextColor       string `json:"textColor"`
	PrimaryColor    string `json:"primaryColor"`
}

type FontConfig struct {
	Heading string `json:"heading"`
	Body    string `json:"body"`
}

type Section struct {
	ID      string          `json:"id"`
	Variant int             `json:"variant"`
	Props   json.RawMessage `json:"props"`
}
