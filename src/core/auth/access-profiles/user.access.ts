export const UserAccess = {
  allowedRoutes: [
    { method: 'GET', path: '/users/:id' },
    { method: 'PATCH', path: '/users/:id' },
    { method: 'DELETE', path: '/users/:id' },
  ],

  blockedRoutes: [
    { method: 'GET', path: '/users' },
    { method: 'POST', path: '/users' },
  ],
};
