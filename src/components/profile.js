import { getInfoUserServer } from "../components/api.js";
import {
  nameInput,
  jobInput,
  linkNewPhotoProfile,
} from "../components/utils/constants.js";

export let currentUserId;

// profile
const profileElement = document.querySelector(".profile");
export const profilePhoto = profileElement.querySelector(".profile__image");
export const profileBtnUpdatePhoto = profileElement.querySelector(
  ".profile__image-overlay"
);
export const profileTitle = profileElement.querySelector(".profile__title");
export const profileSubtitle =
  profileElement.querySelector(".profile__subtitle");

export const profileBtnEdit = profileElement.querySelector(".profile__edit");
export const profileBtnAdd = profileElement.querySelector(".profile__add");

export function loaderProfileInfo(user) {
    currentUserId = user._id;
    linkNewPhotoProfile.value = user.avatar;
    profilePhoto.src = user.avatar;
    profileTitle.textContent = user.name;
    profileSubtitle.textContent = user.about;
    nameInput.value = user.name;
    jobInput.value = user.about;
}
