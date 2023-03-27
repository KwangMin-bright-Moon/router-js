export default class Router {
  #routers = [];

  addRouter = (hash, component) => {
    this.#routers.push({ hash, component });
  };

  setNotFound = (notFound) => {
    this.addRouter('#/NotFound', notFound);
  };

  start = () => {
    window.addEventListener('hashchange', this.renderComponetByhash);
    this.renderComponetByhash();
  };

  renderNotFoundComponet = () => {
    const notFoundRouter = this.#routers.find(
      (router) => router.hash === '#/NotFound'
    );
    notFoundRouter.component();
  };

  renderComponetByhash = () => {
    const currentRouter = this.#routers.find(
      (router) => router.hash === window.location.hash
    );

    currentRouter ? currentRouter.component() : this.renderNotFoundComponet();
  };
}
