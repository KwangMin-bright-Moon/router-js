export default class Router {
  #routes = [];

  addRouter = (path, component) => {
    this.#routes.push({ path, component });
    return this;
  };

  setNotFound = (notFound) => {
    this.addRouter('/NotFound', notFound);
    return this;
  };

  start = () => {
    window.addEventListener('popstate', this.renderComponent);

    window.addEventListener('DOMContentLoaded', () => {
      this.handleOnClickLink();
    });

    this.renderComponent();
  };

  handleOnClickLink = () => {
    document.body.addEventListener('click', (e) => {
      if (!e.target.closest('[data-link]')) {
        return;
      }

      e.preventDefault();
      history.pushState(null, null, e.target.href);
      this.renderComponent();
    });
  };

  renderComponent = () => {
    const matchRoute = this.getMatchRoutes();
    const param = matchRoute?.params[1] ?? null;

    matchRoute
      ? matchRoute.route.component(param)
      : this.renderNotFoundComponet();
  };

  renderNotFoundComponet = () => {
    const notFoundRouter = this.#routes.find(
      (route) => route.path === '/NotFound'
    );

    if (!notFoundRouter) {
      document.querySelector('main').innerHTML = 'NotFound';
    }

    notFoundRouter.component();
  };

  getMatchRoutes = () => {
    const matchRoutes = this.#routes.map((route) => {
      return {
        route,
        params: location.pathname.match(this.pathToRegex(route.path)),
      };
    });

    const matchRoute = matchRoutes.find((route) => route.params !== null);

    return matchRoute;
  };

  pathToRegex = (path) =>
    new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');
}
