/**
 * Function to extract the csrf token from the DOM.
 * @param {String} name Name of the cookie to extract from the DOM.
 */
const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const csrftoken = getCookie('csrftoken');

export const headers = new Headers({
  "Content-Type": "application/json",
  "X-CSRFToken": csrftoken
});

