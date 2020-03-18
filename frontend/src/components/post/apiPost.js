export const create = (userId, token, post) => {
    return fetch(`https://tranquil-temple-06509.herokuapp.com/post/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const list = () => {
    return fetch("https://tranquil-temple-06509.herokuapp.com/posts", {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const listByUser = (userId, token) => {
    return fetch(`https://tranquil-temple-06509.herokuapp.com/posts/by/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const singlePost = (postId) => {
    return fetch(`https://tranquil-temple-06509.herokuapp.com/post/${postId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const remove = (postId, token) => {
    return fetch(`https://tranquil-temple-06509.herokuapp.com/post/${postId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};