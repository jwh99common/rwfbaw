#!/bin/bash
for file in *.png; do
  name=$(basename "$file")
  echo "Uploading $name..."
  npx wrangler r2 object put r2-test/"$name" --file "$file"
done
