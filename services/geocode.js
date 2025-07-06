import axios from "axios";

const ORS_API_KEY = process.env.ORS_API_KEY;

export async function geocodeAddress(address) {
  const url = "https://api.openrouteservice.org/geocode/search";
  const response = await axios.get(url, {
    params: {
      api_key: ORS_API_KEY,
      text: address,
      size: 1
    }
  });
  const features = response.data.features;
  if (!features || features.length === 0)
    throw new Error(`Could not geocode: ${address}`);
  return features[0].geometry.coordinates; // [lon, lat]
}