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

  backOrForwardPage = () => {
    window.addEventListener('popstate', this.renderComponent);
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

  renderComponent = () => {
    const routersWithParam = this.findRouterWithParam();
    const param = routersWithParam?.params[1] ?? null;

    routersWithParam
      ? routersWithParam.router.component(param)
      : this.renderNotFoundComponet();
  };

  renderNotFoundComponet = () => {
    const notFoundRouter = this.#routers.find(
      (router) => router.path === '/NotFound'
    );
    notFoundRouter.component();
  };

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

  pathToRegex = (path) =>
    new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');
}
