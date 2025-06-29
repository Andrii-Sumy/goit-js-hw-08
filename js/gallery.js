const images = [
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
      description: 'Hokkaido Flower',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
      description: 'Container Haulage Freight',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
      description: 'Aerial Beach View',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
      description: 'Flower Blooms',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
      description: 'Alpine Mountains',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
      description: 'Mountain Lake Sailing',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
      description: 'Alpine Spring Meadows',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
      description: 'Nature Landscape',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
      description: 'Lighthouse Coast Sea',
    },
  ];
  

const galleryContainer = document.querySelector('.gallery');


const galleryMarkup = images
  .map(
    ({ preview, original, description }) => `
    <li class="gallery-item">
      <a class="gallery-link" href="${original}">
        <img
          class="gallery-image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
  `
  )
  .join('');

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

let currentIndex = 0;
let instance = null;

galleryContainer.addEventListener('click', (event) => {
  event.preventDefault();

  const target = event.target;
  if (target.nodeName !== 'IMG') return;

  const largeImageURL = target.dataset.source;

  currentIndex = images.findIndex(img => img.original === largeImageURL);

  openModal(largeImageURL, target.alt);
});

function openModal(src, alt) {
  instance = basicLightbox.create(`
    <div style="
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1440px;
      height: 696px;
      background: rgba(46, 47, 66, 0.8);
      padding: 24px 0;
    ">
      <img 
        src="${src}" 
        alt="${alt}" 
        style="width: 1112px; height: 640px; object-fit: cover;" 
      />
    </div>
  `, {
    onShow: () => window.addEventListener('keydown', onKeyPress),
    onClose: () => window.removeEventListener('keydown', onKeyPress),
  });

  instance.show();
}

function onKeyPress(e) {
  if (e.key === 'Escape') {
    instance.close();
  } else if (e.key === 'ArrowLeft') {
    showPrevImage();
  } else if (e.key === 'ArrowRight') {
    showNextImage();
  }
}

function showPrevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateModalImage();
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  updateModalImage();
}

function updateModalImage() {
  const { original, description } = images[currentIndex];

  
  const newContent = `
    <div style="
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1440px;
      height: 696px;
      background: rgba(46, 47, 66, 0.8);
      padding: 24px 0;
    ">
      <img 
        src="${original}" 
        alt="${description}" 
        style="width: 1112px; height: 640px; object-fit: cover;" 
      />
    </div>
  `;

  instance.element().innerHTML = newContent;
}
