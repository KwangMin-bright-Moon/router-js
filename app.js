import Router from './router.js';

const $main = document.querySelector('main');

const components = {
  home: () => ($main.innerText = 'Home'),
  about: () => ($main.innerText = 'About'),
  content: () => ($main.innerText = 'Content'),
  contentDetail: (id) => ($main.innerText = `Content${id}`),
  notFound: () => ($main.innerText = 'NotFound'),
};

const router = new Router();

router.addRouter('/', components.home);
router.addRouter('/about', components.about);
router.addRouter('/content/:id', components.contentDetail);
router.setNotFound(components.notFound);
router.start();
