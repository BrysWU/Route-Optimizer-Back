import axios from "axios";

const ORS_API_KEY = process.env.ORS_API_KEY;

/**
 * Calls the OpenRouteService optimization API (TSP).
 * @param {Array} jobs - Array of jobs (stops), each { id, location: [lon, lat] }
 * @param {Object} vehicle - { id, start: [lon, lat], end: [lon, lat] }
 * @returns {Array} - Array of indexes for the optimal order of stops
 */
export async function optimizeRoute(jobs, vehicle) {
  const url = "https://api.openrouteservice.org/optimization";
  const response = await axios.post(
    url,
    {
      jobs,
      vehicles: [vehicle]
    },
    {
      headers: {
        Authorization: ORS_API_KEY,
        "Content-Type": "application/json"
      }
    }
  );
  // Find the optimized order of job IDs
  const steps = response.data.routes[0].steps.filter(s => s.type === "job");
  return steps.map(step => step.job - 1);
}