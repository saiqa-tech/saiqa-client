# Quick Start Guide

This guide will help you get the SAIQA frontend up and running in minutes.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Backend API server running

## Quick Setup (5 minutes)

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` and set your backend API URL:
```env
VITE_API_BASE_URL=http://localhost:5000
```

### 3. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

## Default Login (Backend Demo Data)

If your backend has demo data, you can use:

- **Admin**: admin@example.com
- **Manager**: manager@example.com
- **User**: user@example.com
- **Password**: (as configured in backend)

## Testing the Application

### As Admin:
1. Login with admin credentials
2. Navigate to Users → Create User
3. Fill in the form and create a test user
4. Try editing and deleting users
5. Navigate to Units and Designations to manage organizational structure

### As Manager:
1. Login with manager credentials
2. Try to access Users page (should work)
3. Try to create a user (should work for non-admin users)
4. Try to edit an admin user (should fail with permission error)

### As User:
1. Login with user credentials
2. Access Dashboard (should work)
3. Navigate to Profile (should work)
4. Try to access Users page (should redirect to unauthorized)

## Troubleshooting

### Port Already in Use
If port 3000 is taken, you can change it in `vite.config.js`:
```javascript
server: {
  port: 3001, // Change this
}
```

### API Connection Error
Check that:
1. Backend server is running
2. `VITE_API_BASE_URL` in `.env` is correct
3. CORS is enabled on backend for your frontend URL

### Build Errors
Clean install:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Project Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Review [frontend-development-guide.md](./frontend-development-guide.md) for architecture details
- Explore the codebase in `src/` directory

## Feature Checklist

After setup, verify these features work:

- [ ] Login with valid credentials
- [ ] View dashboard with statistics
- [ ] Navigate between pages using sidebar
- [ ] Create a new user (admin/manager only)
- [ ] Edit user details
- [ ] Change your password in Profile
- [ ] Logout and login again
- [ ] Create units with parent-child hierarchy
- [ ] Create designations
- [ ] Test role-based access (try accessing restricted pages)

## Support

If you encounter issues:
1. Check the console for error messages
2. Verify backend API is responding
3. Review environment variables
4. Open an issue on GitHub

Happy coding! 🚀
