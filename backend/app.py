import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import cohere

app = Flask(__name__)
CORS(app)

# Get your COHERE_API_KEY from environment variables
COHERE_API_KEY = os.getenv("COHERE_API_KEY")

if not COHERE_API_KEY:
    raise ValueError("Please set the COHERE_API_KEY environment variable")

# Initialize the Cohere client
co = cohere.Client(COHERE_API_KEY)

@app.route("/api/generate-description", methods=["POST"])
def generate_description():
    data = request.json
    product_type = data.get("productType")
    product_name = data.get("productName")

    if not product_type or not product_name:
        return jsonify({"error": "Missing productType or productName"}), 400

    prompt = (
        f"Generate a detailed product catalog description for a {product_type} product called '{product_name}'. "
        "Write it in a friendly, professional tone."
    )

    try:
        response = co.generate(
            model="command-xlarge-nightly",
            prompt=prompt,
            max_tokens=150,
            temperature=0.7,
            stop_sequences=["--"]
        )
        description = response.generations[0].text.strip()
        return jsonify({"description": description})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
