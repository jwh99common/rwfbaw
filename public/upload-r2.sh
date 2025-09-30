#!/bin/bash
for file in r2-*.png; do
  name=$(basename "$file")
  echo "Uploading $name..."
  npx wrangler r2 object put r2-images/"$name" --file "$file"
done
