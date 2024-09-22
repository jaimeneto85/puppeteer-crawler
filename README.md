# Puppeteer Crawler

This project is a basic implementation of a crawler using Puppeteer to search for the most expensive product on an online store. The crawler navigates to the store's page, logs in, extracts product information, and finds the most expensive one. The crawler is executed through an HTTP GET request to the `/most-expensive-product` endpoint. JSON return of the most expensive product. Format:
```json
{
  "title": "Most expensive product",
  "price": 100.00,
  "description": "Description of the most expensive product",
  "image": "URL of the image of the most expensive product"
}
```

## Project Structure

- `src/crawler.js`: Implementation of the crawler.
- `src/server.js`: Express server to host the API.
- `src/logger.js`: Implementation of the logger using Winston.
- `logs/`: Directory to store logs.

## How to run

1. Clone the repository:
   ```bash
   git clone https://github.com/seu-usuario/puppeteer-crawler.git
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Run the server:
   ```bash
   yarn start
   ```

4. Access the endpoint:
   ```bash
   curl http://localhost:3000/most-expensive-product
   ```

## Support

## Stay in touch

- Author - [@jaimeneto85](https://github.com/jaimeneto85)


