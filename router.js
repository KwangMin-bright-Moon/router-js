export default class Router {
  #routers = [];

  addRouter = (path, component) => {
    this.#routers.push({ path, component });
  };

  setNotFound = (notFound) => {
    this.addRouter('/NotFound', notFound);
  };

  start = () => {
    window.addEventListener('DOMContentLoaded', () => {
      this.handleOnClickLink();
    });

    this.renderComponent();
  };

  renderNotFoundComponet = () => {
    const notFoundRouter = this.#routers.find(
      (router) => router.path === '/NotFound'
    );
    notFoundRouter.component();
  };

  renderComponent = () => {
    const currentRouter = this.#routers.find(
      (router) => router.path === window.location.pathname
    );

    currentRouter ? currentRouter.component() : this.renderNotFoundComponet();
  };

  handleOnClickLink = () => {
    document.body.addEventListener('click', (e) => {
      if (e.target.matches('[data-link]')) {
        e.preventDefault();
        history.pushState(null, null, e.target.href);
        this.renderComponent();
      }
    });
  };
}
