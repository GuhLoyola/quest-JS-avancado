import { baseUrl, eventQuantity } from "../variables.js";

async function getEvent(userName) {
    const response = await fetch(`${baseUrl}/${userName}/events?per_page=${eventQuantity}`)
    return await response.json()
}

export { getEvent }