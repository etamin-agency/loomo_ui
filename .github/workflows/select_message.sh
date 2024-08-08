#!/bin/bash

# Array of informal motivational messages
MESSAGES=(
  "A new commit just dropped! 🚀\n\n👨‍💻 **Author:** ${GITHUB_COMMIT_AUTHOR}\n📜 **Message:** ${GITHUB_COMMIT_MESSAGE}\n\nGreat job, team! 🌟"
)
RANDOM_INDEX=$((RANDOM % ${#MESSAGES[@]}))

echo "${MESSAGES[$RANDOM_INDEX]}"
