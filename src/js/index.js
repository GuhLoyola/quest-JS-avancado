import { getUser } from '/src/js/services/user.js'
import { getRepos } from '/src/js/services/repositories.js'
import { getEvent } from '/src/js/services/event.js'

import { user } from '/src/js/objects/user.js'
import { screen } from '/src/js/objects/screen.js'

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if(validateEmptyInput(userName)) return
    getUserData(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if (isEnterKeyPressed) {
        if(validateEmptyInput(userName)) return
        getUserData(userName)
    }
})

async function getUserData(userName) {
    const userResponse = await getUser(userName)

    if(userResponse.message === "Not Found") {
        screen.renderNotFound()
        return
    }

    const repoResponse = await getRepos(userName)

    const eventResponse = await getEvent(userName)

    console.log(repoResponse)

    user.setInfo(userResponse)
    user.setRepositories(repoResponse)
    user.setEvents(eventResponse)

    screen.renderUser(user)
}

function validateEmptyInput(userName) {
    if(userName.length === 0) {
        alert('Preencha o campo com o nome do usuário do GitHub.')
        return true
    }
}