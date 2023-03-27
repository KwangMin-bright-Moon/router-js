import Router from './router.js';

const $main = document.querySelector('main');

const components = {
  home: () => ($main.innerText = 'Home'),
  about: () => ($main.innerText = 'About'),
  content: () => ($main.innerText = 'Content'),
  notFound: () => ($main.innerText = 'NotFound'),
};

const router = new Router();

router.addRouter('#/', components.home);
router.addRouter('#/about', components.about);
router.setNotFound(components.notFound);
router.start();
