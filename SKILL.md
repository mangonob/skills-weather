---
name: skills-weather
description: Get the weather for a specific location or coordinates
version: 1.0.0
entry: index.js
runtime: node
repository: https://github.com/mangonob/skills-weather
tags:
  - weather
  - qwweather
permissions:
  - network:request
author: mangonob
metadata: { "clawbot": { "emoji": "☁️", "os": ["darwin", "linux", "windows"] } }
---

# Weather Skill

## Parameters

- `-l, --location`: Specify the location to get the weather for.
- `-c, --coordinates`: Specify the coordinates to get the weather for.
- `-h, --help`: Show help information.
- `-v, --version`: Show version.

## Examples

Get weather by location
