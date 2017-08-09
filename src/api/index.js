import parse from 'parse-link-header';

export default (username, reposPerPage, page, orderBy, direction) => {
    const headers = new Headers();
    headers.append('Accept', 'application/vnd.github.v3+json');
    headers.append('Content-Type', 'application/json');

    const init = {
        headers,
    };

    let url = `https://api.github.com/users/${username}/repos?per_page=${reposPerPage}`;
    if (page) {
        url += `&page=${page}`;
    }

    if (orderBy) {
        url += `&order=${orderBy}`;
    }

    if (direction) {
        url += `&direction=${direction};`;
    }

    return fetch(url, init)
        .then(response => ({
            links: parse(response.headers.get('Link')),
            repos: response.json(),
        }))
        .then((response) => {
            const links = response.links;
            const repos = Promise.resolve(response.repos);
            repos.then((result) => {
                const res = result;
                res.links = links;
            });

            return repos;
        }).then(data => data);
};
