import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('layouts/layout.tsx', [
    index('routes/dashboard.tsx'),
    route('/users', 'routes/users.tsx'),
    route('/tasks', 'routes/tasks.tsx'),
    route('/task/new', 'routes/task-new.tsx'),
    route('/task/edit/:id', 'routes/task-edit.tsx'),
  ]),
  route('api/chat', 'routes/api.chat.ts'),
  route('api/chat-message', 'routes/api.chat-message.ts'),
] satisfies RouteConfig;
