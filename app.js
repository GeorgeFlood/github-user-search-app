const profilePicture = document.querySelector('#profilePicture');
const profileName = document.querySelector('#profileName');
const profileDate = document.querySelector('#profileDate');
const bio = document.querySelector('#bio');
const repos = document.querySelector('#repos');
const followers = document.querySelector('#followers');
const following = document.querySelector('#following');
const location1 = document.querySelector('#location');
const website = document.querySelector('#website');
const twitter = document.querySelector('#twitter');
const company = document.querySelector('#company');
const searchBar = document.querySelector('#search');

const request = new XMLHttpRequest();
request.open('GET', 'https://api.github.com/users/octocat');
request.send();

const userSearch = () => {
    searchBar.addEventListener('change', (e) => {
        let userName = e.target.value;
        request.open('GET', `https://api.github.com/users/${userName}`)
        request.send();
        console.log(request)
    });
};

userSearch();

request.addEventListener('readystatechange', (e) => {
    if (e.target.readyState === 4 && e.target.status === 200) {
        const data = JSON.parse(e.target.responseText);
        console.log(data);

        profilePicture.src = `${data.avatar_url}`;
        profileName.textContent = `${data.login}`
        profileDate.textContent = `Joined ${data.created_at}`.substring(0, 17);;
        data.bio === null ? bio.textContent = 'No Bio available' : bio.textContent = `${data.bio}`;
        repos.textContent = `${data.public_repos}`
        followers.textContent = `${data.followers}`;
        following.textContent = `${data.following}`
        data.location === null ? location1.textContent = `Location: Anonymous` : location1.textContent = `Location: ${data.location}`;
        data.blog === '' ? website.textContent = 'No website available' : website.textContent = `Website: ${data.blog}`
        data.twitter_username === null ? twitter.textContent = 'No Twitter' : twitter.textContent = `Twitter: ${data.twitter_username}`;
        data.company === null ? company.textContent = 'Not available' : company.textContent = `Company: ${data.company}`;
    }
})