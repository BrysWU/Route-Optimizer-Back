# Route Optimizer Backend

Node.js/Express backend for optimizing multi-stop delivery routes using OpenRouteService.

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```

2. Set your OpenRouteService API key in Render as `ORS_API_KEY`. For local dev, create a `.env` file:
   ```
   ORS_API_KEY=your-api-key-here
   ```

3. Start the server:
   ```sh
   npm start
   ```

4. POST to `/api/optimize` with:
   ```json
   {
     "start": "address string",
     "stops": ["address1", "address2", ...],
     "end": "address string"
   }
   ```

## Deployment

- Deploy to [Render.com](https://render.com) as a Node.js web service.
- Set the `ORS_API_KEY` in the environment variables on Render.