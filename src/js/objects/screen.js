const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                                            <img src="${user.avatarUrl}" alt="Foto de perfil do usuário" />
                                            <div class="data">
                                                <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                                <p class="bio">${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                                                <p><span>👥${user.followers}</span> Seguidores · <span>👤${user.following}</span> Seguindo</p>
                                            </div>
                                        </div>`

        let repositoryItens = ''
        user.repositories.forEach(repo => repositoryItens += `<li>
                                                                <a href="${repo.html_url}" target="_blank">${repo.name}
                                                                    <span class="info-repo">
                                                                        <span class="item">🍴: ${repo.forks_count}</span>
                                                                        <span class="item">🌟: ${repo.stargazers_count}</span> 
                                                                        <span class="item">👀: ${repo.watchers_count}</span>
                                                                        <span class="item">💻: ${repo.language}</span>
                                                                    </span>
                                                                </a>
                                                            </li>`);

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoryItens}</ul>
                                           </div>`

        }

        let eventItens = ''
        user.events.forEach((event) => {
            if (event.type === 'PushEvent') {
                eventItens += `<li><span>${event.repo.name}</span> -${event.payload.commits[0].message}</li>`
            }
        })

        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events">
                                                <h2>Eventos</h2>
                                                <ul>${eventItens}</ul>
                                            </div>`
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado 😵</h3>"
    }
}

export { screen }