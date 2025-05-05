export const AdminAccess = {
  allowedRoutes: [
    { method: 'GET', path: '/users' },
    { method: 'POST', path: '/users' },
    { method: 'GET', path: '/users/:id' },
    { method: 'PATCH', path: '/users/:id' },
    { method: 'DELETE', path: '/users/:id' },
  ],
  blockedRoutes: [],
};
