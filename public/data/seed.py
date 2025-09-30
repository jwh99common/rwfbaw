import json

def escape(text):
    return text.replace("'", "''")

with open("products.json", "r", encoding="utf-8") as f:
    products = json.load(f)

lines = []
for p in products:
    line = f"""INSERT INTO products (id, title, description, price, category, image, longDescription)
VALUES ({p['id']}, '{escape(p['title'])}', '{escape(p['description'])}', {p['price']}, '{escape(p['category'])}', '{escape(p['image'])}', '{escape(p['longDescription'])}');"""
    lines.append(line)

with open("seed.sql", "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print("✅ seed.sql generated in db/")
