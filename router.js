export default class Router {
  #routers = [];

  addRouter = (path, component) => {
    this.#routers.push({ path, component });
  };

  setNotFound = (notFound) => {
    this.addRouter('/NotFound', notFound);
  };

  start = () => {
    this.backOrForwardPage();

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
    const routersWithParam = this.findRouterWithParam();
    const param = routersWithParam?.params[1] ?? null;

    routersWithParam
      ? routersWithParam.router.component(param)
      : this.renderNotFoundComponet();
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

  backOrForwardPage = () => {
    window.addEventListener('popstate', this.renderComponent);
  };

  pathToRegex = (path) =>
    new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

  findRouterWithParam = () => {
    const routersWithParams = this.#routers.map((router) => {
      return {
        router,
        params: location.pathname.match(this.pathToRegex(router.path)),
      };
    });

    const routersWithParam = routersWithParams.find(
      (router) => router.params !== null
    );

    return routersWithParam;
  };
}
