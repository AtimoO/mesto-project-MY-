import { config } from "./utils/constants.js";

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
};

export const getCardsServer = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
};

export const getInfoUserServer = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
};

export const sendDataProfile = (profileName, profileAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileAbout,
    }),
  }).then(checkResponse);
};

export const updatePhotoProfile = (urlPhoto) => {
  return fetch(`${config.baseUrl}/users/me/avatar `, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: urlPhoto,
    }),
  }).then(checkResponse);
};

export const addCardServer = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  }).then(checkResponse);
};

export const removeCardServer = (idCard) => {
  return fetch(`${config.baseUrl}/cards/${idCard}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

export const addLike = (idCard) => {
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
};

export const removeLike = (idCard) => {
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};
