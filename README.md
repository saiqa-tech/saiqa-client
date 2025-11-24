# SAIQA Frontend

A modern React.js frontend application built with Vite, Ant Design 6.0, and React Router DOM.

## Features

- 🔐 **Authentication & Authorization**: JWT-based authentication with role-based access control (RBAC)
- 👥 **User Management**: Full CRUD operations for users with role-based permissions
- 🏢 **Unit Management**: Hierarchical organization unit management
- 🏷️ **Designation Management**: Employee designation/position management
- 📊 **Dashboard**: Overview with statistics and recent activities
- 👤 **Profile Management**: User profile viewing and password change
- 🎨 **Modern UI**: Clean, responsive interface built with Ant Design 6.0
- 🔒 **Secure**: Token-based authentication with automatic refresh

## Technology Stack

- **React 18+** - JavaScript framework (no TypeScript)
- **React Router DOM** - Client-side routing
- **Ant Design 6.0** - UI component library
- **Axios** - HTTP client for API communication
- **Vite** - Fast build tool and dev server
- **js-cookie** - Cookie management

## Prerequisites

- Node.js 18+ and npm
- Backend API server running (see backend documentation)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/saiqa-tech/saiqa-client.git
cd saiqa-client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_API_TIMEOUT=30000
VITE_NODE_ENV=development
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

The build output will be in the `dist/` directory.

## Project Structure

```
src/
├── api/                    # API communication layer
│   ├── client.js          # Axios instance with interceptors
│   └── endpoints/         # API endpoint functions
├── components/            # Reusable React components
│   ├── Layout.jsx         # Main app layout
│   └── ProtectedRoute.jsx # Route protection wrapper
├── context/               # React Context providers
│   └── AuthContext.jsx    # Authentication state
├── hooks/                 # Custom React hooks
│   └── useAuth.js         # Authentication hook
├── pages/                 # Page components (routes)
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Profile.jsx
│   ├── users/             # User management pages
│   ├── units/             # Unit management pages
│   └── designations/      # Designation management pages
├── utils/                 # Utility functions
│   ├── constants.js       # App constants
│   ├── rbac.js            # Role-based access control
│   ├── validators.js      # Form validation
│   └── storage.js         # Storage helpers
├── styles/                # Global styles
│   └── globals.css
├── App.jsx                # Main app component
└── main.jsx               # Entry point
```

## User Roles & Permissions

### Admin
- Full access to all features
- Can create, read, update, and delete users
- Can manage roles
- Can reset user passwords
- Can manage units and designations

### Manager
- Can view and create non-admin users
- Can update managers and regular users (not admins)
- Cannot delete users or reset passwords
- Can manage units and designations

### User
- Can view own profile only
- Can change own password
- Cannot access management features

## API Integration

The frontend communicates with the backend API using Axios with the following features:

- **Automatic token injection**: JWT tokens from cookies
- **Token refresh**: Automatic refresh on 401 errors
- **Error handling**: Global error interceptor
- **Request timeout**: Configurable timeout (default 30s)
- **Credentials**: Automatic cookie inclusion

Base URL is configured via `VITE_API_BASE_URL` environment variable.

## Available Routes

- `/login` - Login page (public)
- `/` - Dashboard (protected)
- `/profile` - User profile (protected)
- `/users` - User list (admin/manager only)
- `/users/create` - Create user (admin/manager only)
- `/users/:id/edit` - Edit user (admin/manager only)
- `/units` - Unit list (admin/manager only)
- `/units/create` - Create unit (admin/manager only)
- `/units/:id/edit` - Edit unit (admin/manager only)
- `/designations` - Designation list (admin/manager only)
- `/designations/create` - Create designation (admin/manager only)
- `/designations/:id/edit` - Edit designation (admin/manager only)
- `/unauthorized` - 403 error page
- `*` - 404 error page

## Authentication Flow

1. User submits email and password on login page
2. Backend returns JWT tokens (access & refresh)
3. Tokens stored in httpOnly cookies
4. Access token sent with every API request
5. On 401 error, automatic token refresh
6. On logout, tokens cleared and redirect to login

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:5000` |
| `VITE_API_TIMEOUT` | API request timeout (ms) | `30000` |
| `VITE_NODE_ENV` | Environment mode | `development` |
| `VITE_ENABLE_AUDIT_LOGS` | Enable audit logging | `false` |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Support

For issues, questions, or contributions, please visit:
- GitHub Issues: https://github.com/saiqa-tech/saiqa-client/issues
- Documentation: See `frontend-development-guide.md`

## Acknowledgments

- Built with React and Vite
- UI components by Ant Design
- Icons by Ant Design Icons
