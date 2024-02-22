const user = sessionStorage.getItem('user');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchResult = document.getElementById('search-result-container');

searchBtn.onclick = () => {
    getGithubData(searchInput.value)
    sessionStorage.setItem('user', searchInput.value)
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        getGithubData(searchInput.value)
        sessionStorage.setItem('user', searchInput.value)
    }
})

window.onload = () => {
    if (user != null) {
        getGithubData(user)
    }
    searchInput.value = user
}


async function getGithubData(user) {
    try {
        const response = await fetch(`https://api.github.com/users/${user}`);
        const jsonRes = await response.json();
        if (jsonRes.message === 'Not Found') {
            searchResult.style.height = '100%'
            searchResult.innerHTML = `<div id="no-search-result">
                                        <img src="assets/github.png" alt="">
                                        <div>No results found</div>
                                      </div>`
            return false
        } else {
            searchResult.style.height = ''
            searchResult.innerHTML =
                `<div id="on-search-result">
                <div id="user-container">
                    <div id="img-container">
                        <div id="img"
                            style="background-image: url(${jsonRes.avatar_url});">
                        </div>
                        <a href=${jsonRes.html_url}>
                        <button id="view-img-btn">View Profile</button>
                        </a>
                    </div>
                    <div id="detail-container">
                        <div class="button-container">
                            <button id="public-repo-btn">Public Repos: ${jsonRes.public_repos}</button>
                            <button id="public-gists-btn">Public Gists: ${jsonRes.public_gists}</button>
                            <button id="followers-btn">Followers: ${jsonRes.followers}</button>
                            <button id="following-btn">Following: ${jsonRes.following}</button>
                        </div>
                        <div id="info-container">
                            <div class="info"><div class="info-title">Company: </div><div class="info-content">${jsonRes.company ? jsonRes.company : "No Company"}</div></div>
                            <div class="info"><div class="info-title">Website/Blog: </div><div class="info-content">${jsonRes.blog ? jsonRes.blog : "No Blog"}</div></div>
                            <div class="info"><div class="info-title">Location: </div><div class="info-content">${jsonRes.location ? jsonRes.location : "No Location"}</div></div>
                            <div class="info"><div class="info-title">Member Since: </div><div class="info-content">${jsonRes.created_at.split("T")[0]}</div></div>
                        </div>
                    </div>
                </div>
                <div id="latest-repos-container">
                    <h2 id="latest-repos-title">Latest Repos</h2>
                    <div id="latest-repos">
                    </div>
                </div>
            </div>`
            const latestRepos = document.getElementById('latest-repos');
            getReposData(user, latestRepos);
        }
    } catch (error) {
        console.log('error', error);
    }
}

async function getReposData(user, latestRepos) {
    try {
        const response = await fetch(`https://api.github.com/users/${user}/repos`);
        const jsonRes = await response.json();
        let latestFiveRepos = [];
        jsonRes.map((repo) => {
            repo.updated_at = new Date(repo.updated_at);
        })
        jsonRes.sort(compareByDateDescending); // compare

        for (let i = 0; i < 5; i++) {
            latestFiveRepos.push(jsonRes[i]);
        }
        latestRepos.innerHTML = latestFiveRepos.map((repo) => `<div class="repo">
                                                                <a href=${repo.html_url} class="repo-name">
                                                                    <div >${repo.name}</div>
                                                                </a>
                                                                <div class="button-container">
                                                                    <button class="stars-btn">Stars: ${repo.stargazers_count}</button>
                                                                    <button class="watchers-btn">Watchers: ${repo.watchers_count}</button>
                                                                    <button class="forks-btn">Forks: ${repo.forks_count}</button>
                                                                </div>
                                                            </div>`).join('')




    } catch (error) {
        console.log('error', error);
    }

}

function compareByDateDescending(a, b) {
    return b.updated_at.getTime() - a.updated_at.getTime();
}