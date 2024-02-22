const header = document.querySelector('header');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const userCon = document.getElementById('user-container');
const reposCon = document.getElementById('latest-repos-container');
const repos = document.getElementById('latest-repos');
const oldSearchUser = sessionStorage.getItem('user');
let newSearchUser = searchInput.value;

window.onload = () => {
    if (oldSearchUser != null) {
        searchInput.value = oldSearchUser
        startLoading();
    }
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        startLoading();
    }
})

searchBtn.onclick = () => {
    startLoading();
}

header.onclick = () => {
    sessionStorage.clear();
    window.location.reload();
}

async function searchingUser() {
    sessionStorage.setItem('user', searchInput.value)
    const userData = await getGithubUserData(searchInput.value)
    const reposData = await getReposData(searchInput.value)

    setGithubUserData(userData)
    setReposData(reposData)
}

function startLoading() {
    userCon.style.height = '50vh'
    reposCon.style.display = 'none';
    userCon.innerHTML = `<div id="loading">
                                        <img src="assets/loading.gif" alt="">
                                        <div>Searching ...</div>
                                      </div>`
    setTimeout(function () {
        searchingUser()
    }, 2000)
}

async function getGithubUserData(user) {
    try {
        const userDataRes = await fetch(`https://api.github.com/users/${user}`);
        const userData = await userDataRes.json();
        return userData;
    } catch (error) {
        console.log('error', error);
    }
}

async function getReposData(user) {
    try {
        const reposDataRes = await fetch(`https://api.github.com/users/${user}/repos`);
        const reposData = await reposDataRes.json();

        let latestFiveRepos = [];
        reposData.map((repo) => {
            repo.updated_at = new Date(repo.updated_at);
        })
        reposData.sort(compareByDateDescending); // compare

        for (let i = 0; i < 5; i++) {
            latestFiveRepos.push(reposData[i]);
        }

        return latestFiveRepos;
    } catch (error) {
        console.log('error', error);
    }

}

function compareByDateDescending(a, b) {
    return b.updated_at.getTime() - a.updated_at.getTime();
}

function setGithubUserData(userData) {
    if (userData.message === 'Not Found') {
        userCon.style.height = '50vh'
        reposCon.style.display = 'none';
        userCon.innerHTML = `<div id="no-search-result">
                                        <img src="assets/github.png" alt="">
                                        <div>No results found</div>
                                      </div>`
    } else if (userData.message) {
        userCon.style.height = '50vh'
        reposCon.style.display = 'none';
        userCon.innerHTML = `<div id="no-search-result">
                                        <img src="assets/github.png" alt="">
                                        <div>[ERROR 403] Too many request</div>
                                      </div>`
    } else {
        userCon.style.height = ''
        reposCon.style.display = 'block';
        userCon.innerHTML =
            `<div id="img-container">
                <div id="img" style="background-image: url(${userData.avatar_url});"></div>
                <a href=${userData.html_url}>
                    <button id="view-img-btn">View Profile</button>
                </a>
            </div>
            <div id="detail-container">
                <div class="button-container">
                    <button id="public-repo-btn">Public Repos: ${userData.public_repos}</button>
                    <button id="public-gists-btn">Public Gists: ${userData.public_gists}</button>
                    <button id="followers-btn">Followers: ${userData.followers}</button>
                    <button id="following-btn">Following: ${userData.following}</button>
                </div>
                <div id="info-container">
                    <div class="info"><div class="info-title">Company: </div><div class="info-content">${userData.company ? userData.company : "No Company"}</div></div>
                    <div class="info"><div class="info-title">Website/Blog: </div><div class="info-content">${userData.blog ? userData.blog : "No Blog"}</div></div>
                    <div class="info"><div class="info-title">Location: </div><div class="info-content">${userData.location ? userData.location : "No Location"}</div></div>
                    <div class="info"><div class="info-title">Member Since: </div><div class="info-content">${userData.created_at.split("T")[0]}</div></div>
                </div>
            </div>`
    }
}
function setReposData(latestFiveRepos) {
    repos.innerHTML = latestFiveRepos.map((repo) => `<div class="repo">
                                                            <a href=${repo.html_url} class="repo-name">
                                                                <div >${repo.name}</div>
                                                            </a>
                                                            <div class="button-container">
                                                                <button class="stars-btn">Stars: ${repo.stargazers_count}</button>
                                                                <button class="watchers-btn">Watchers: ${repo.watchers_count}</button>
                                                                <button class="forks-btn">Forks: ${repo.forks_count}</button>
                                                            </div>
                                                        </div>`).join('')
}