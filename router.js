export default class Router {
  #routers = [];

  mainPage = document.querySelector('main');

  #pages = {
    home: () => this.mainPage.innerText('Home'),
    about: () => this.mainPage.innerText('about'),
    content: () => this.mainPage.innerText('content'),
  };
}
