export class Router {
  constructor() {
    this.routes = new Map();
  }

  register(routeName, handler) {
    this.routes.set(routeName, handler);
  }

  resolve(pathname, routeFromQuery = null) {
    const normalizedPath = pathname.replace(/^\//, '').split('?')[0] || 'home';
    const normalizedQuery = (routeFromQuery || '').toLowerCase();
    const routeName = normalizedQuery || normalizedPath || 'home';
    const handler = this.routes.get(routeName);

    if (handler) {
      handler();
      return;
    }

    if (this.routes.has('home')) {
      this.routes.get('home')();
    }
  }
}
