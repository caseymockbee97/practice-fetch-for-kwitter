let bodyDiv = document.getElementById("body");
let userToken = "";
let userName = "";
let baseURL = "http://kwitter-api-b.herokuapp.com/";

function displayMessages(messages) {
  messages
    .sort((a, b) => b.likes.length - a.likes.length)
    .slice(0, 10)
    .forEach((message) => {
      let div = document.createElement("div");
      div.textContent =
        message.text + " - " + message.username + " - " + message.likes.length;
      bodyDiv.appendChild(div);
    });
}
function fetchMessages() {
  fetch(baseURL + "messages")
    .then((resp) => resp.json())
    .then((body) => body.messages)
    .then((res) => {
      console.log(res);
      return res;
    })
    .then((res) => displayMessages(res));
}
const postMessage = (token, message) => {
  fetch(baseURL + "messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      text: message,
    }),
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
};
const signupRequest = (username, displayName, password) => {
  fetch(baseURL + "users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      displayName: displayName,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
};
const loginRequest = (username, password) => {
  fetch(baseURL + "auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      userToken = res.token;
      userName = res.username;
    });
};
const getMessageByID = (id) => {
  return fetch(baseURL + "messages/" + id)
    .then((res) => res.json())
    .then((res) => console.log(res));
};
const deleteMessage = (token, messageId) => {
  return fetch(baseURL + "messages/" + messageId, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((res) => res.json());
};
const likeMessage = (token, messageId) => {
  fetch(baseURL + "likes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      messageId: messageId,
    }),
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
};
const deleteLike = (token, likeId) => {
  return fetch(baseURL + "likes/" + likeId, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((res) => res.json());
};
const deleteUser = (token, userName) => {
  return fetch(baseURL + "users/" + userName, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((res) => res.json());
};

function fetchUsers() {
  fetch(baseURL + "users?limit=10")
    .then((resp) => resp.json())
    .then((body) => body.users)
    .then((res) => {
      console.log(res);
      return res;
    });
}
const getSpecificUser = (userName) => {
  fetch(baseURL + "users/" + userName)
    .then((res) => res.json())
    .then((res) => console.log(res));
};
const updateProfile = (token, userName, newDisplayName) => {
  fetch(baseURL + "users/" + userName, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      about: newDisplayName,
    }),
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
};

fetchMessages();

//need key value pairs for storing likeId with messageId
//look through likes array to find if the current username is in the array, if so get the corresponding like ID
//5461
