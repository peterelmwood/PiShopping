import { headers } from "./Headers";

export const get = async (url, callback) => {
  const fetchResponse = await fetch(url);
  fetchResponse.json().then(response => {
    if (response) {
      callback(response);
    }
  });
}

export const update = async (id, method, body, url, callback) => {
  const postResponse = await fetch(url + id + "/", {
    method: method,
    headers: headers,
    body: JSON.stringify(body)
  })
  postResponse.text().then(response => {
    if (response.error_message) {
      alert(response.error_message)
    } else {
      if (callback) {
        callback(response);
      }
    }
  })
}

export const post = async (body, url, callback) => {
  console.log(body);
  const postResponse = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body)
  })
  postResponse.json().then(response => {
    if (callback) {
      callback(response);
    }
  })
}

export const del = async (url,id, callback) => {
  const deleteResponse = await fetch(url + id + "/", {
    method: "delete",
    headers: headers,
  });
  deleteResponse.text().then(response => {
    if (callback) {
      callback(response);
    }
  })
}
