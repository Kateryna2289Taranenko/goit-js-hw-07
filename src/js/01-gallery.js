import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);
const galleryEl = document.querySelector(".gallery");
console.log(galleryEl);
function createGalleryItems(elements) {
  return elements
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
        <a class="gallery__link" 
        href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </div>`;
    })
    .join("");
}
const cardsMarkup = createGalleryItems(galleryItems);
galleryEl.insertAdjacentHTML("beforeend", cardsMarkup);
galleryEl.addEventListener("click", onGalleryElClick);
let instance = null;
function onGalleryElClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== "IMG") {
    return;
  }
  const bigImageModal = evt.target.dataset.source;
  instance = basicLightbox.create(
    `<img src="${bigImageModal}" width="800" height="600">`
  );
  instance.show(() => {
    window.addEventListener("keydown", onEscPress);
  });
}

function onEscPress(evt) {
  if (evt.code === "Escape") {
    instance.close(() => {
      window.removeEventListener("keydown", onEscPress);
    });
  }
}
