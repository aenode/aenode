# Suffix files recursively

find . -type f -exec sh -c 'for f; do mv "$f" "$f.template"; done' sh {} +
