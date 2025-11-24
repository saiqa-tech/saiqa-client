# Developer Notes

Quick reference for developers working on the SAIQA frontend.

## Quick Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Architecture

### MCP (Model Context Protocol) Pattern

The application follows MCP architecture:
- **Models**: API response types and data structures
- **Context**: React Context for state management (Auth)
- **Providers**: API endpoints and data fetching

### State Management

- **Global State**: React Context (AuthContext)
- **Local State**: useState hooks in components
- **URL State**: React Router for query params
- **No Redux**: Not needed for this scale

### API Communication

All API calls go through `src/api/client.js`:
```javascript
// Automatic features:
- JWT token injection from cookies
- 401 handling with auto-refresh
- 403 error handling
- Timeout after 30s
- Automatic retry for transient failures
```

## Adding New Features

### 1. Adding a New Page

```javascript
// 1. Create page in src/pages/YourFeature.jsx
import React from 'react';
import { Typography } from 'antd';

const YourFeaturePage = () => {
  return <Typography.Title>Your Feature</Typography.Title>;
};

export default YourFeaturePage;

// 2. Add route in src/App.jsx
<Route
  path="/your-feature"
  element={
    <ProtectedRoute allowedRoles={['admin']}>
      <Layout>
        <YourFeaturePage />
      </Layout>
    </ProtectedRoute>
  }
/>

// 3. Add to menu in src/utils/rbac.js → getAccessibleMenuItems
```

### 2. Adding a New API Endpoint

```javascript
// In src/api/endpoints/yourapi.js
import apiClient from '../client';

export const yourAPI = {
  getItems: async () => {
    const response = await apiClient.get('/api/your-endpoint');
    return response.data;
  },
  // ... more methods
};

// Usage in component:
import { yourAPI } from '../api/endpoints/yourapi';

const fetchData = async () => {
  try {
    const data = await yourAPI.getItems();
    setData(data);
  } catch (error) {
    message.error('Failed to fetch data');
  }
};
```

### 3. Adding RBAC Rules

```javascript
// In src/utils/rbac.js
export const canDoSomething = (role) => {
  return isAdmin(role) || isManager(role);
};

// Usage in component:
import { useAuth } from '../hooks/useAuth';
import { canDoSomething } from '../utils/rbac';

const { user } = useAuth();
if (canDoSomething(user?.role)) {
  // Show feature
}
```

### 4. Adding Form Validation

```javascript
// In src/utils/validators.js
export const customValidator = (value) => {
  if (!value || value.length < 5) {
    return { valid: false, message: 'Must be at least 5 characters' };
  }
  return { valid: true };
};

export const formRules = {
  // ... existing rules
  customField: [
    { required: true, message: 'Field is required' },
    {
      validator: (_, value) => {
        const result = customValidator(value);
        return result.valid ? Promise.resolve() : Promise.reject(result.message);
      },
    },
  ],
};
```

## Common Patterns

### Protected API Call Pattern

```javascript
const [loading, setLoading] = useState(false);
const [data, setData] = useState([]);

const fetchData = async () => {
  setLoading(true);
  try {
    const response = await someAPI.getData();
    setData(response.data);
  } catch (error) {
    message.error(error.response?.data?.message || 'Failed to fetch');
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchData();
}, []);
```

### Form Submission Pattern

```javascript
const [form] = Form.useForm();
const [loading, setLoading] = useState(false);

const onFinish = async (values) => {
  setLoading(true);
  try {
    await someAPI.create(values);
    message.success('Created successfully!');
    navigate('/list');
  } catch (error) {
    message.error(error.response?.data?.message || 'Failed to create');
  } finally {
    setLoading(false);
  }
};
```

### Table with Pagination Pattern

```javascript
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [pagination, setPagination] = useState({
  current: 1,
  pageSize: 10,
  total: 0,
});

const fetchData = async (page = 1, pageSize = 10) => {
  setLoading(true);
  try {
    const response = await someAPI.getData({ page, limit: pageSize });
    setData(response.data);
    setPagination({
      current: response.page,
      pageSize: response.limit,
      total: response.total,
    });
  } catch (error) {
    message.error('Failed to fetch');
  } finally {
    setLoading(false);
  }
};

const handleTableChange = (newPagination) => {
  fetchData(newPagination.current, newPagination.pageSize);
};

<Table
  dataSource={data}
  pagination={pagination}
  onChange={handleTableChange}
  loading={loading}
/>
```

## Debugging Tips

### 1. API Errors

Check browser console and Network tab:
```javascript
// The API client logs all errors
console.error('API Error:', error.response?.data);
```

### 2. Authentication Issues

```javascript
// Check if token exists
import Cookies from 'js-cookie';
console.log('Access Token:', Cookies.get('accessToken'));

// Check auth state
const { user, isAuthenticated } = useAuth();
console.log('User:', user, 'Authenticated:', isAuthenticated);
```

### 3. RBAC Issues

```javascript
import { useAuth } from '../hooks/useAuth';
const { user } = useAuth();
console.log('Current role:', user?.role);
```

### 4. Re-render Issues

```javascript
// Use React DevTools Profiler
// Check for unnecessary re-renders
// Add memoization where needed
const memoizedValue = useMemo(() => expensiveCalculation(), [deps]);
```

## Code Style Guide

### Naming Conventions

```javascript
// Components: PascalCase
Layout.jsx, UsersList.jsx

// Hooks: camelCase with 'use' prefix
useAuth.js, useFetch.js

// Utils: camelCase
validators.js, rbac.js

// Constants: UPPER_SNAKE_CASE
export const ROLES = { ADMIN: 'admin' };

// Variables: camelCase
const userName = 'John';
```

### Component Structure

```javascript
// 1. Imports
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useAuth } from '../hooks/useAuth';

// 2. Component
const MyComponent = () => {
  // 3. Hooks
  const { user } = useAuth();
  const [data, setData] = useState([]);
  
  // 4. Effects
  useEffect(() => {
    fetchData();
  }, []);
  
  // 5. Functions
  const fetchData = async () => {
    // ...
  };
  
  // 6. Render
  return (
    <div>
      <h1>Title</h1>
      {/* Content */}
    </div>
  );
};

// 7. Export
export default MyComponent;
```

## Performance Tips

### 1. Use React.memo for Heavy Components

```javascript
const HeavyComponent = React.memo(({ data }) => {
  // Component that doesn't need to re-render often
});
```

### 2. Debounce Search Inputs

```javascript
import { debounce } from 'lodash';

const debouncedSearch = debounce((value) => {
  fetchSearchResults(value);
}, 300);
```

### 3. Lazy Load Components

```javascript
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Spin />}>
  <HeavyComponent />
</Suspense>
```

## Testing (Future)

### Unit Tests (Jest + React Testing Library)

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from './Login';

test('renders login form', () => {
  render(<LoginPage />);
  expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
});
```

### E2E Tests (Cypress)

```javascript
describe('Login', () => {
  it('should login successfully', () => {
    cy.visit('/login');
    cy.get('input[type=email]').type('admin@example.com');
    cy.get('input[type=password]').type('password');
    cy.get('button[type=submit]').click();
    cy.url().should('include', '/dashboard');
  });
});
```

## Common Issues & Solutions

### Issue: "Cannot read property 'user' of null"
**Solution**: Wrap component with AuthProvider or check if user exists
```javascript
const { user } = useAuth();
if (!user) return <Spin />;
```

### Issue: "Network Error"
**Solution**: Check backend is running and CORS is configured
```javascript
// In backend, allow frontend origin
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
```

### Issue: "401 Unauthorized"
**Solution**: Token expired or missing
```javascript
// Check cookies in browser DevTools → Application → Cookies
// API client auto-refreshes, check console for refresh errors
```

### Issue: Build warnings about chunk size
**Solution**: Implement code splitting (future enhancement)
```javascript
// Use dynamic imports
const AdminPanel = lazy(() => import('./AdminPanel'));
```

## Useful Resources

- [React Docs](https://react.dev)
- [Ant Design Components](https://ant.design/components/overview)
- [React Router Docs](https://reactrouter.com)
- [Axios Docs](https://axios-http.com/docs/intro)
- [Vite Docs](https://vitejs.dev)

## Environment Setup

### VS Code Extensions
- ESLint
- Prettier
- ES7+ React/Redux/React-Native snippets
- Auto Rename Tag
- Bracket Pair Colorizer

### Chrome Extensions
- React Developer Tools
- Redux DevTools (for future use)

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push to remote
git push origin feature/new-feature

# Create pull request on GitHub
```

## Deployment

### Production Build
```bash
npm run build
# Outputs to dist/
```

### Deploy to Vercel/Netlify
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables for Production
Set these in your hosting platform:
```
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_API_TIMEOUT=30000
VITE_NODE_ENV=production
```

## Support

- Check `QUICKSTART.md` for setup issues
- Check `README.md` for general documentation
- Check `frontend-development-guide.md` for architecture details
- Open GitHub issue for bugs

Happy coding! 🎉
