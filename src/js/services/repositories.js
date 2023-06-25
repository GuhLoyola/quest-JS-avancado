import { baseUrl, repositoryQuantity } from "../variables.js";

async function getRepos(userName) {
    const response = await fetch(`${baseUrl}/${userName}/repos?per_page=${repositoryQuantity}`)
    return await response.json()
}

export { getRepos }