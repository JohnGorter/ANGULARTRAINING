### A route can have child routes

```ts
export const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminPage,
    children: [
      {
        path: 'users',
        children: [
          { path: '', component: AdminUsersPage }
          { path: ':id', component: AdminUserDetailPage },
        ]
      }
    ]
  }
];
```