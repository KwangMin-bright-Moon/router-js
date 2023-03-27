export default class Router {
  #routers = [];

  addRouter = (hashFragment, component) => {
    this.#routers.push({ hashFragment, component });
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
      (router) => router.hashFragment === '#/NotFound'
    );
    notFoundRouter.component();
  };

  renderComponetByhash = () => {
    const currentRouter = this.#routers.find(
      (router) => router.hashFragment === window.location.hash
    );

    currentRouter ? currentRouter.component() : this.renderNotFoundComponet();
  };
}
