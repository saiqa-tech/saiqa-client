# SAIQA Frontend Development Plan

**Status:** Rebuilt from scratch with React + TanStack Start + Ant Design 6.0
**Backend API Contract:** Stable & Production-Ready (21 endpoints, RBAC enforced)
**Last Updated:** November 24, 2025
**Target:** Production-ready MVP
---

## Executive Summary

- **Backend Status:** ✅ 100% complete (21 API endpoints, comprehensive RBAC, audit logging)
- **Frontend Status:** 🟡 0%
- **Alignment Gap:** Significant - Backend ready, frontend needs complete rebuild
- **Approach:** Build incrementally from authentication → core features → hardening

---

## Phase 1: Project Setup & Infrastructure
### 1.1 Environment Configuration
- ✅ Initialize React + TanStack Start + Ant Design 6.0 project
- ✅ Set environment variables (API_BASE_URL, NODE_ENV)
- ✅ Use TypeScript exclusively (no JavaScript)
- ✅ Set up .env.example template with required variables
- ✅ Configure CORS settings for API communication

## File Structure & Organization

### Recommended Project Layout

```plaintext
saiqa-client/
├── src/
│   ├── app.tsx                          # App entry point
│   ├── routes/
│   │   ├── __root.tsx                   # Root layout
│   │   ├── index.lazy.tsx               # Dashboard
│   │   ├── login.lazy.tsx               # Login page
│   │   ├── profile.lazy.tsx             # User profile
│   │   ├── users/
│   │   │   ├── index.lazy.tsx           # User list
│   │   │   ├── $id.lazy.tsx             # User detail
│   │   │   ├── create.lazy.tsx          # Create user
│   │   │   ├── $id.edit.lazy.tsx        # Edit user
│   │   ├── units/
│   │   │   ├── index.lazy.tsx           # Unit list
│   │   │   ├── create.lazy.tsx          # Create unit
│   │   │   ├── $id.edit.lazy.tsx        # Edit unit
│   │   ├── designations/
│   │   │   ├── index.lazy.tsx           # Designation list
│   │   │   ├── create.lazy.tsx          # Create designation
│   │   │   ├── $id.edit.lazy.tsx        # Edit designation
│   ├── components/
│   │   ├── ProtectedRoute.tsx           # Route protection wrapper
│   │   ├── RoleBasedRoute.tsx           # Role-based route guard
│   │   ├── Layout.tsx                   # App layout
│   │   ├── Header.tsx                   # Header component
│   │   ├── Sidebar.tsx                  # Sidebar navigation
│   │   ├── AuthLayout.tsx               # Login page layout
│   │   ├── LoadingSpinner.tsx           # Loading indicator
│   │   ├── EmptyState.tsx               # Empty data state
│   │   ├── ErrorBoundary.tsx            # Error fallback
│   ├── context/
│   │   ├── AuthContext.tsx              # Authentication context
│   │   ├── AuthProvider.tsx             # Auth provider wrapper
│   │   ├── ErrorContext.tsx             # Error notifications
│   │   ├── ErrorProvider.tsx            # Error provider wrapper
│   ├── hooks/
│   │   ├── useAuth.ts                   # Auth context hook
│   │   ├── useError.ts                  # Error context hook
│   │   ├── useFetch.ts                  # Data fetching hook
│   │   ├── useForm.ts                   # Form state hook
│   ├── api/
│   │   ├── client.ts                    # HTTP client setup
│   │   ├── interceptors.ts              # Request/response interceptors
│   │   ├── endpoints/
│   │   │   ├── auth.ts                  # Auth API calls
│   │   │   ├── users.ts                 # User API calls
│   │   │   ├── units.ts                 # Unit API calls
│   │   │   ├── designations.ts          # Designation API calls
│   ├── utils/
│   │   ├── rbac.ts                      # Role checking utilities
│   │   ├── validators.ts                # Form validation rules
│   │   ├── constants.ts                 # App constants
│   │   ├── storage.ts                   # Session/localStorage helpers
│   ├── types/
│   │   ├── api.ts                       # API response types
│   │   ├── auth.ts                      # Auth types
│   │   ├── user.ts                      # User types
│   │   ├── common.ts                    # Common types
│   ├── styles/
│   │   ├── globals.css                  # Global styles
│   │   ├── theme.css                    # Ant Design overrides
├── .env.example                         # Environment template
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

***

## SAIQA Frontend Directory Structure Justification
This is a **feature-based, scalable directory structure** designed for React + TanStack Start + Ant Design projects. It prioritizes developer experience, maintainability, and clear separation of concerns.

### 1. **`src/routes/` - File-Based Routing** ✅ BEST FOR TANSTACK START

**Why This Approach?**
- TanStack Start uses **file-based routing** (like Next.js)
- Each `.lazy.tsx` file = automatic route
- No manual route configuration needed
- Reduces boilerplate significantly
- Aligns with modern React meta-frameworks

**Structure Explanation:**

```
routes/
├── __root.tsx         → "/" (root layout, wraps all routes)
├── index.lazy.tsx     → "/" (dashboard homepage)
├── login.lazy.tsx     → "/login" (public, no layout)
├── profile.lazy.tsx   → "/profile" (authenticated)
├── users/
│   ├── index.lazy.tsx → "/users" (list)
│   ├── $id.lazy.tsx   → "/users/:id" (detail)
│   ├── create.lazy.tsx → "/users/create" (form)
│   └── $id.edit.lazy.tsx → "/users/:id/edit" (edit form)
├── units/             → "/units/*" (mirrored structure)
└── designations/      → "/designations/*" (mirrored structure)
```

**Advantages:**
- ✅ **Automatic routing** - no Router config files needed
- ✅ **Intuitive** - folder structure matches URL paths
- ✅ **Nested routes** - users/ folder = /users/... URLs
- ✅ **Lazy loading** - .lazy.tsx = code-split by default
- ✅ **Scalable** - add new routes by creating new files
- ✅ **Clear organization** - each feature in its own folder

**Disadvantages:**
- ❌ File names matter (must match routes exactly)
- ❌ Learning curve for new developers
- ❌ Unusual naming ($id, __root) initially confusing

**Why NOT use `pages/` folder?**
- Pages pattern is for Next.js, not TanStack Start
- TanStack Start routing is more explicit with `__root.tsx`
- `.lazy.tsx` extension makes code-splitting intentions clear

***

### 2. **`src/components/` - Shared UI Components** ✅ CORRECT APPROACH

**Why This Directory?**
- Holds **reusable UI components** used across multiple routes
- Not specific to any single feature
- Can be imported from any route file
- Keeps code DRY (Don't Repeat Yourself)

**What Goes Here:**
- **Layout components**: Layout.tsx, Header.tsx, Sidebar.tsx
- **Route protection**: ProtectedRoute.tsx, RoleBasedRoute.tsx
- **Shared utilities**: LoadingSpinner.tsx, EmptyState.tsx, ErrorBoundary.tsx
- **AuthLayout.tsx**: Special layout for login page

**What Does NOT Go Here:**
- ❌ User-specific components (should be in routes/users/)
- ❌ Unit-specific components (should be in routes/units/)
- ❌ Feature-specific logic (should be co-located with route)

**Why This Organization?**
- Clear separation: shared vs feature-specific
- Easy to find layout/shared components
- Prevents duplication across features
- Proper code reuse

**Example Usage:**
```
// In routes/users/index.lazy.tsx
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Layout } from '@/components/Layout'

export default function UserList() {
  return (
    <ProtectedRoute>
      <Layout>
        {/* User list content */}
      </Layout>
    </ProtectedRoute>
  )
}
```

***

### 3. **`src/context/` - Global State Management** ✅ REACT CONTEXT BEST PRACTICE

**Why Context API (not Redux)?**
- Saiqa needs only 2 global states: Auth + Error
- Redux adds complexity not needed
- React Context is sufficient for this scale
- Less boilerplate, faster development

**Structure:**
```
context/
├── AuthContext.tsx      → Defines auth context & interface
├── AuthProvider.tsx     → Wraps app with auth context
├── ErrorContext.tsx     → Defines error notifications context
└── ErrorProvider.tsx    → Wraps app with error context
```

**Why Separate Context & Provider?**
- **Context**: Just the interface (created with createContext)
- **Provider**: Component that wraps app (supplies context value)
- **Benefit**: Cleaner, more reusable, follows best practice
- **Convention**: Makes code more professional

**Usage Pattern:**
```
// App.tsx wraps everything
<AuthProvider>
  <ErrorProvider>
    <App />
  </ErrorProvider>
</AuthProvider>

// Any component uses it
const { user, role } = useAuth()
```

**Why NOT use Redux?**
- Redux is for complex, multi-level state
- Saiqa has simple linear state (user, error)
- Redux adds 5+ new files, boilerplate per feature
- Context is cleaner, faster development

***

### 4. **`src/hooks/` - Custom React Hooks** ✅ SEPARATION OF CONCERNS

**Why Extract into Hooks?**
- Hooks encapsulate logic, make it reusable
- Keep components focused on rendering
- Easier to test
- Easier to maintain

**What Goes Here:**
- `useAuth.ts` → Access auth context (role, user, login, logout)
- `useError.ts` → Show/hide error notifications
- `useFetch.ts` → Generic data fetching with loading/error states
- `useForm.ts` → Form state management (optional, can use Ant Form instead)

**Example Usage:**
```
// In any component
const { user, logout } = useAuth()
const { showError } = useError()
const { data, loading, error } = useFetch('/api/users')
```

**Why NOT Inline This Logic?**
- ❌ Duplicated in multiple components
- ❌ Harder to test
- ❌ Violates DRY principle
- ❌ Makes components harder to read

***

### 5. **`src/api/` - API Communication Layer** ✅ ENCAPSULATION

**Why Separate API Logic?**
- Centralized HTTP client configuration
- Request/response interceptors in one place
- Error handling consistent across app
- Easy to swap HTTP client (axios → fetch)
- Easy to add authentication headers
- Easy to handle token refresh

**Structure:**
```
api/
├── client.ts                → Axios instance with base config
├── interceptors.ts          → Request/response middleware
└── endpoints/
    ├── auth.ts              → /api/auth/* calls
    ├── users.ts             → /api/users/* calls
    ├── units.ts             → /api/units/* calls
    └── designations.ts      → /api/designations/* calls
```

**Why Organize by Endpoint?**
- Each file groups related API calls
- Easy to find auth vs user endpoints
- Easy to mock for testing
- Mirrors backend API structure

**Example Usage:**
```
// In route
import { loginUser, logoutUser } from '@/api/endpoints/auth'
import { getUsers, createUser } from '@/api/endpoints/users'

// Use directly
const response = await loginUser(email, password)
```

**Why NOT Make API Calls in Components?**
- ❌ Duplicated HTTP code across components
- ❌ Hard to change API base URL
- ❌ Hard to add global headers
- ❌ Error handling inconsistent
- ❌ Hard to test components

***

### 6. **`src/utils/` - Helper Functions** ✅ UTILITY EXTRACTION

**Why This Directory?**
- Holds **pure functions** that aren't components
- Reusable across app
- No React dependency
- Easy to unit test

**What Goes Here:**
- `rbac.ts` → `isAdmin()`, `isManager()`, `canEditUser()`
- `validators.ts` → Email, password, phone validation rules
- `constants.ts` → ROLE_TYPES, API_ENDPOINTS, MESSAGES
- `storage.ts` → `getToken()`, `setToken()`, `clearToken()`

**Example Usage:**
```
// In component
import { isAdmin, isManager } from '@/utils/rbac'
import { validateEmail } from '@/utils/validators'

if (isAdmin(user.role)) {
  showDeleteButton()
}

if (!validateEmail(email)) {
  showError('Invalid email')
}
```

**Why NOT Inline These?**
- ❌ Duplicated validation logic
- ❌ Hard to change rules globally
- ❌ Makes components harder to read
- ❌ Harder to test

***

### 7. **`src/types/` - TypeScript Type Definitions** ✅ TYPE SAFETY

**Why Separate Types?**
- Centralized type definitions
- Reusable across components
- Easy to maintain API contracts
- Self-documenting code
- Enhanced IDE support with autocompletion and error checking

**Structure:**
```
types/
├── api.ts          → API response/request types
├── auth.ts         → User, auth-related types
├── user.ts         → User-specific types (UserForm, UserDetail)
└── common.ts       → Shared types (Pagination, ErrorResponse)
```

**Example Types:**
```typescript
// api.ts
export interface ApiResponse<T> {
  data: T
  error?: string
  status: number
}

// auth.ts
export interface User {
  id: string
  email: string
  role: 'admin' | 'manager' | 'user'
  firstName: string
  lastName: string
}
```

**Why NOT Inline Types?**
- ❌ Repeated across files
- ❌ Hard to maintain consistency
- ❌ Changes require finding all usages
- ❌ Harder to understand API contract

***

### 8. **`src/styles/` - Global & Theme Styles** ✅ CONSISTENT THEMING

**Why Separate Styles?**
- Global styles in one place
- Theme overrides centralized
- Easy to maintain design system
- Prevents CSS conflicts

**Structure:**
```
styles/
├── globals.css    → Reset, base, global rules
└── theme.css      → Ant Design overrides (colors, sizes)
```

**What Goes Here:**
- ✅ Global reset (margin, padding, font)
- ✅ Body, html, a tag styles
- ✅ Ant Design customization
- ✅ CSS variables for colors/spacing

**What Does NOT Go Here:**
- ❌ Component-specific styles (use CSS Modules or inline)
- ❌ Feature-specific styles (keep with feature)

**Why This Approach?**
- Single source of truth for theming
- Easy to implement dark mode
- Consistent across entire app
- Changes propagate globally

***

### 9. **Root Level Files** ✅ ESSENTIAL CONFIGURATION

```
├── .env.example       → Template for environment variables
├── package.json       → Dependencies & scripts
├── tsconfig.json      → TypeScript configuration
├── vite.config.ts     → Vite build configuration
└── README.md          → Project documentation
```

**Why These Files?**
- ✅ `.env.example` → Required for onboarding, security (don't commit .env)
- ✅ `package.json` → npm scripts: dev, build, lint, test
- ✅ `tsconfig.json` → TypeScript strict mode, path aliases
- ✅ `vite.config.ts` → Dev server, build optimization
- ✅ `README.md` → Quick start guide for developers

***

## Comparison: Why This Structure Over Alternatives?

### Option 1: Domain-Based (Recommended ✅)
```
src/
├── routes/         → File-based routing
├── components/     → Shared UI
├── context/        → Global state
├── hooks/          → Reusable logic
├── api/            → API calls
├── utils/          → Helpers
├── types/          → TypeScript
└── styles/         → CSS

Pros: Clear separation, reusable code, scalable
Cons: More directories to manage
VERDICT: ✅ BEST FOR SAIQA
```

### Option 2: Feature-Based (Not Recommended ❌)
```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── context/
│   │   ├── api/
│   │   └── hooks/
│   ├── users/
│   │   ├── components/
│   │   ├── api/
│   │   └── hooks/
```

Cons:
- ❌ Duplicated utils/types/styles per feature
- ❌ Hard to find shared components
- ❌ Overkill for small-medium apps
- ❌ More directories to navigate

### Option 3: Flat Structure (Not Recommended ❌)
```
src/
├── UserList.tsx
├── UserForm.tsx
├── Header.tsx
├── api.ts
├── utils.ts
```

Cons:
- ❌ Becomes chaos as app grows
- ❌ Hard to find anything
- ❌ No organization
- ❌ Violates SRP

***

## File Naming Conventions

### Routes (`.lazy.tsx` - TanStack Start convention)
- ✅ `index.lazy.tsx` → List page
- ✅ `create.lazy.tsx` → Create form
- ✅ `$id.lazy.tsx` → Detail/view page
- ✅ `$id.edit.lazy.tsx` → Edit form
- ✅ `__root.tsx` → Root layout (wraps all)

**Why `.lazy.tsx`?**
- Tells TanStack Start to code-split this route
- Automatic lazy loading
- Improves initial page load time
- Industry standard convention

### Components (`PascalCase.tsx`)
- ✅ `Header.tsx` → Renders header
- ✅ `UserList.tsx` → Renders user list
- ✅ `ProtectedRoute.tsx` → Wrapper component

**Why PascalCase?**
- React convention for components
- Distinguished from files (lowercase = non-React)
- IDE auto-completion works better

### Utilities & Hooks (`camelCase.ts`)
- ✅ `useAuth.ts` → Custom hook (not `.tsx`)
- ✅ `rbac.ts` → Utility functions
- ✅ `validators.ts` → Form validation

**Why camelCase?**
- Standard JavaScript/TypeScript convention
- Not a component, just functions
- Easy to distinguish from components

***

## How Routes Map to URLs

| File Path | URL | Purpose |
|-----------|-----|---------|
| `routes/__root.tsx` | (layout) | Wraps all routes |
| `routes/index.lazy.tsx` | `/` | Dashboard |
| `routes/login.lazy.tsx` | `/login` | Login page |
| `routes/profile.lazy.tsx` | `/profile` | User profile |
| `routes/users/index.lazy.tsx` | `/users` | User list |
| `routes/users/create.lazy.tsx` | `/users/create` | Create user |
| `routes/users/$id.lazy.tsx` | `/users/:id` | User detail |
| `routes/users/$id.edit.lazy.tsx` | `/users/:id/edit` | Edit user |
| `routes/units/index.lazy.tsx` | `/units` | Unit list |
| `routes/units/create.lazy.tsx` | `/units/create` | Create unit |

**Deliverable:** Buildable project with no errors, .env configuration working, directory structure as per the guide.

### 1.2 API Client Setup
- ✅ Create HTTP client wrapper (axios/fetch with interceptors)
- ✅ Implement request/response interceptor middleware
- ✅ Handle JWT token injection from cookies (headers.Authorization)
- ✅ Implement 401/403 error handling (redirect to login/unauthorized)
- ✅ Create global error handler for network failures
- ✅ Add request timeout configuration (30s default)
- ✅ Implement retry logic for transient failures

**Note:** Cookie handling should be automatic (credentials: 'include' in requests)

**Deliverable:** Reusable API client with proper error boundaries

### 1.3 State Management & Context
- ✅ Set up React Context for authentication state
- ✅ Create AuthContext (user, role, isAuthenticated, loginDate)
- ✅ Implement localStorage for session persistence (JWT stored in cookie, not localStorage)
- ✅ Create error context for global error notifications
- ✅ Set up loading state management
- ✅ Implement role-based visibility helpers (isAdmin(), isManager(), isUser())

**Deliverable:** Global state system with proper structure

### 1.4 Routing & Layout Structure
- ✅ Create main layout component (header, sidebar, content area)
- ✅ Set up protected route wrapper component
- ✅ Configure TanStack Start routing (public vs private routes)
- ✅ Create breadcrumb system
- ✅ Implement responsive navigation (mobile-friendly sidebar)
- ✅ Create layout variants (auth layout, app layout, admin layout)

**Deliverable:** Working navigation structure with proper route protection

---

## Phase 2: Authentication Module

### 2.1 Login Flow
- ✅ Design login form (email, password inputs - Ant Design Form)
- ✅ Implement form validation (email format, password strength)
- ✅ Create login API integration
- ✅ Handle success: store user data in context, redirect to dashboard
- ✅ Handle failure: display error messages (incorrect credentials, network error)
- ✅ Implement "Remember Me" (optional, low priority)
- ✅ Add loading state during request

**Backend Endpoint:** POST /api/auth/login
**Response:** { accessToken, refreshToken, user: { id, email, role, firstName, lastName } }

**Deliverable:** Fully functional login screen

### 2.2 Session Management
- ✅ Implement token refresh logic (POST /api/auth/refresh)
- ✅ Auto-refresh before expiration using background worker/timer
- ✅ Handle token expiration → automatic logout
- ✅ Create logout API integration (POST /api/auth/logout)
- ✅ Clear user context on logout
- ✅ Redirect to login after logout

**Deliverable:** Seamless session persistence & refresh

### 2.3 Authentication Guards
- ✅ Create ProtectedRoute component (check authentication)
- ✅ Redirect unauthenticated users to login
- ✅ Create RoleBasedRoute component (check role-based access)
- ✅ Show 403 error for unauthorized roles
- ✅ Persist deep links (redirect to original page after login)

**Deliverable:** All protected routes enforce authentication & authorization

### 2.4 User Profile & Settings
- ✅ Create GET /api/auth/me endpoint integration
- ✅ Design user profile page (email, name, role display)
- ✅ Create change password form (POST /api/auth/change-password)
- ✅ Add password validation (min 8 chars, special chars)
- ✅ Implement profile update form (first name, last name)
- ✅ Add success/error notifications

**Deliverable:** User can view profile & change password

---

## Phase 3: Core Features - User Management

### 3.1 User List View
- ✅ Create paginated user list table
- ✅ Display columns: email, name, role, unit, designation, status (active/inactive)
- ✅ Implement sorting (by any column)
- ✅ Implement filtering (by role, status, unit)
- ✅ Search functionality (by email/name)
- ✅ Pagination controls (10, 25, 50 items per page)
- ✅ Show "No data" state when empty
- ✅ Add loading skeleton during data fetch

**Backend Endpoint:** GET /api/users (supports query params: page, limit, search, role, status)

**RBAC Rules:** Admin ✅, Manager ✅, User ❌

**Deliverable:** Functional user list with all filter/search/pagination

### 3.2 User Detail View
- ✅ Create user detail page (modal or dedicated route)
- ✅ Display all user fields (id, email, name, role, unit, designation, createdAt, etc.)
- ✅ Show user's assignment history (optional MVP)
- ✅ Add action buttons (edit, delete, reset password)
- ✅ Display audit trail of actions taken on this user (optional Phase 4)

**Backend Endpoint:** GET /api/users/:id

**RBAC Rules:** Admin ✅, Manager ✅, User ❌

**Deliverable:** Read-only user detail view

### 3.3 Create User Form
- ✅ Design form with fields: email, firstName, lastName, role, unit, designation, password
- ✅ Form validation:
  - Email: valid format, unique (check on server)
  - Password: min 8 chars, special chars, numbers (same as backend)
  - Role: dropdown (admin, manager, user)
  - Unit: dropdown/autocomplete (GET /api/units)
  - Designation: dropdown/autocomplete (GET /api/designations)
- ✅ Implement form submission (POST /api/users)
- ✅ Handle validation errors (field-level & global)
- ✅ Show success notification, redirect to user list
- ✅ Cancel button returns to list

**Backend Endpoint:** POST /api/users
**Request:** { email, firstName, lastName, role, unitId, designationId, password }
**Response:** { id, email, role, createdAt, ... }

**RBAC Rules:** Admin-only ✅

**Deliverable:** Functional create user form with validation

### 3.4 Update User Form
- ✅ Pre-fill form with user data (GET /api/users/:id)
- ✅ Allow editing: firstName, lastName, unit, designation
- ✅ Admin-only fields: role (with dropdown)
- ✅ Manager limitations:
  - ❌ Cannot edit admin users (show error message)
  - ❌ Cannot change roles (hide role field)
  - ✅ Can edit managers and users
- ✅ Implement form submission (PUT /api/users/:id)
- ✅ Show success notification, refresh user data
- ✅ Show conflict errors (e.g., "Only admins can update admin users")

**Backend Endpoint:** PUT /api/users/:id
**Request:** { firstName?, lastName?, role?, unitId?, designationId? }
**Response:** { id, email, role, updatedAt, ... }

**RBAC Rules:** Admin ✅ (anyone), Manager ✅ (non-admin users only), User ❌

**Deliverable:** Functional update user form with RBAC enforcement

### 3.5 Delete User
- ✅ Implement confirmation dialog before deletion
- ✅ Show user details in confirmation (email, name, role)
- ✅ Implement delete (POST /api/users/:id/delete or via soft delete)
- ✅ Handle error: cannot delete admin user (manager)
- ✅ Refresh user list after deletion
- ✅ Show success/error notification

**Backend Endpoint:** DELETE /api/users/:id (soft delete)

**RBAC Rules:** Admin-only ✅

**Deliverable:** Safe delete functionality with confirmation

### 3.6 Reset Password (Admin Only)
- ✅ Add "Reset Password" button on user detail/edit page
- ✅ Show reset password modal with new password
- ✅ Implement POST /api/users/:id/reset-password
- ✅ Confirmation dialog before reset
- ✅ Show success message with new password (copy to clipboard)
- ✅ Notify user (optional: email notification from backend)

**Backend Endpoint:** POST /api/users/:id/reset-password
**Response:** { newPassword: "..." }

**RBAC Rules:** Admin-only ✅

**Deliverable:** Admin can reset user passwords

---

## Phase 4: Core Features - Unit & Designation Management

### 4.1 Unit Management
- ✅ Create unit list page (similar structure to users)
- ✅ Columns: name, parent unit, created by, actions
- ✅ Implement hierarchical display (tree view or indentation)
- ✅ Filtering by active/inactive status
- ✅ Search by unit name
- ✅ Create unit form (name, parent unit, description)
- ✅ Update unit form
- ✅ Delete unit with error handling (cannot delete if has children/users)
- ✅ Show assigned users count

**Backend Endpoints:**
- GET /api/units (list)
- GET /api/units/:id (detail)
- POST /api/units (create)
- PUT /api/units/:id (update)
- DELETE /api/units/:id (delete)

**RBAC Rules:** Admin ✅, Manager ✅, User ❌ (read only)

**Validation Rules:**
- ❌ Cannot delete unit with child units
- ❌ Cannot delete unit with assigned users
- ❌ Cannot set unit as its own parent (circular reference)

**Deliverable:** Full CRUD for units with validation

### 4.2 Designation Management
- ✅ Create designation list page
- ✅ Columns: name, code, description, assigned users count
- ✅ Create designation form (name, code, description)
- ✅ Update designation form
- ✅ Delete designation with error handling
- ✅ Show assigned users count

**Backend Endpoints:**
- GET /api/designations (list)
- GET /api/designations/:id (detail)
- POST /api/designations (create)
- PUT /api/designations/:id (update)
- DELETE /api/designations/:id (delete)

**RBAC Rules:** Admin ✅, Manager ✅, User ❌ (read only)

**Validation Rules:**
- ❌ Cannot delete designation with assigned users

**Deliverable:** Full CRUD for designations with validation

### 4.3 Navigation Updates
- ✅ Add menu items: Users, Units, Designations (admin/manager only)
- ✅ Update breadcrumb paths
- ✅ Hide items from users based on RBAC (use isAdmin(), isManager() helpers)

**Deliverable:** Complete navigation system

---

## Phase 5: RBAC & Security Hardening

### 5.1 Role-Based UI Visibility
- ✅ Hide admin-only features from non-admins
  - Create User button (managers cannot see)
  - Reset Password button (managers cannot see)
  - Delete User button (for admins only)
  - Role field in forms (for admins only)
- ✅ Show info messages when features unavailable ("This action requires admin permissions")
- ✅ Disable buttons instead of hiding (optional - depends on UX preference)

### 5.2 Form Validation Alignment
- ✅ Match backend validation rules exactly
- ✅ Password: min 8 chars, special chars, numbers
- ✅ Email: RFC 5322 format
- ✅ Role: only valid roles (admin, manager, user)
- ✅ Unit/Designation: must exist in database
- ✅ Show field-level validation errors

### 5.3 Error Handling & Recovery
- ✅ 401 Unauthorized: redirect to login, clear session
- ✅ 403 Forbidden: show error message, stay on page (suggest permission escalation if applicable)
- ✅ 400 Bad Request: show field-level errors
- ✅ 404 Not Found: show "Resource not found" message
- ✅ 500 Server Error: show generic error, contact support message
- ✅ Network errors: show retry button, offline indicator

### 5.4 Session Security
- ✅ No sensitive data in localStorage (use httpOnly cookies)
- ✅ Implement session timeout warning (5 mins before expiry)
- ✅ Auto-logout on tab close (optional)
- ✅ Disable back button after logout (optional)
- ✅ CSRF protection (let backend handle via cookies)

### 5.5 API Security Validation
- ✅ Verify all requests include Authorization header
- ✅ Verify cookies are sent (credentials: 'include')
- ✅ Never expose sensitive data in URLs
- ✅ Test all 403 scenarios (from RBAC.md)

**Deliverable:** Secure, production-ready authentication system

---

## Phase 6: Dashboard & Analytics (Optional Phase 4+)

### 6.1 Dashboard Components (MVP)
- ✅ Show logged-in user info (role, department, last login)
- ✅ Quick stats (total users, total units, total designations)
- ✅ Recent activity (last 10 actions)
- ✅ Role-specific dashboard (show different content for admin/manager/user)

**Deliverable:** Welcome dashboard with key metrics

### 6.2 Audit Log Viewer (Optional)
- ✅ View all create/update/delete operations
- ✅ Filter by user, entity type, date range
- ✅ Show actor, action, entity, timestamp, IP address
- ✅ Read-only view

**Backend Endpoint:** GET /api/audit-logs?action=CREATE,UPDATE,DELETE&userId=...

**RBAC Rules:** Admin-only (managers cannot see audit logs)

**Deliverable:** Audit trail transparency

---

## Phase 7: Responsive Design & Polish

### 7.1 Mobile Responsiveness
- ✅ Sidebar collapse on mobile (<768px)
- ✅ Mobile-friendly tables (card layout or horizontal scroll)
- ✅ Touch-friendly buttons (min 44px height)
- ✅ Modal forms on mobile
- ✅ Test on common device sizes (375px, 768px, 1024px, 1440px)

### 7.2 UI/UX Polish
- ✅ Consistent spacing & typography (Ant Design defaults)
- ✅ Loading states (spinners, skeleton screens)
- ✅ Empty states (no users, no units, etc.)
- ✅ Success/error notifications (Toast messages)
- ✅ Confirmation dialogs for destructive actions
- ✅ Hover states, focus states, disabled states

### 7.3 Accessibility
- ✅ ARIA labels on form inputs
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Color contrast compliance (WCAG AA)
- ✅ Screen reader friendly (role, aria-label)

**Deliverable:** Polished, responsive UI matching Ant Design standards

---

## Phase 8: Testing & Quality Assurance (2-3 days)

### 8.1 Manual Testing Scenarios

**Authentication Testing:**
- ✅ Login with valid credentials → redirect to dashboard
- ✅ Login with invalid credentials → show error message
- ✅ Session timeout after 30 mins → auto logout
- ✅ Token refresh works silently → no interruption
- ✅ Logout → clear session, redirect to login
- ✅ Direct URL to /dashboard when logged out → redirect to login

**RBAC Testing (All 3 roles):**
- ✅ Admin: can access all features
- ✅ Manager: can see user list, create/update (non-admin), cannot delete users
- ✅ Manager: cannot create/manage admin users
- ✅ Manager: cannot reset passwords
- ✅ User: cannot see management pages (redirect or 403)
- ✅ User: can only view own profile

**User Management Testing:**
- ✅ Create user: validation errors for invalid fields
- ✅ Create user: successful creation redirects to list
- ✅ Update user: manager cannot update admin
- ✅ Delete user: requires confirmation
- ✅ Reset password: admin only, generates new password
- ✅ List page: filters, search, pagination all working

**Unit Management Testing:**
- ✅ Create unit: parent unit selection works
- ✅ Delete unit: cannot delete with child units (error shown)
- ✅ Delete unit: cannot delete with assigned users (error shown)
- ✅ Hierarchy display: tree view or proper indentation

**Designation Management Testing:**
- ✅ Create designation: all fields required
- ✅ Delete designation: cannot delete if users assigned

### 8.2 API Integration Testing
- ✅ All 21 endpoints tested from UI
- ✅ Verify correct HTTP methods (GET, POST, PUT, DELETE)
- ✅ Verify correct request payloads
- ✅ Verify correct response structures
- ✅ Verify error responses match documentation

**21 Endpoints to Test:**
1. POST /api/auth/login
2. POST /api/auth/refresh
3. POST /api/auth/logout
4. GET /api/auth/me
5. POST /api/auth/change-password
6. GET /api/users
7. GET /api/users/:id
8. POST /api/users
9. PUT /api/users/:id
10. DELETE /api/users/:id
11. POST /api/users/:id/reset-password
12. GET /api/units
13. GET /api/units/:id
14. POST /api/units
15. PUT /api/units/:id
16. DELETE /api/units/:id
17. GET /api/designations
18. GET /api/designations/:id
19. POST /api/designations
20. PUT /api/designations/:id
21. DELETE /api/designations/:id

### 8.3 Error Scenario Testing
- ✅ Network disconnected → show offline message
- ✅ API returns 500 → show generic error
- ✅ API returns 404 → show "not found"
- ✅ API returns 403 → show permission error
- ✅ Form validation errors → show field-level errors
- ✅ Duplicate email on create → show validation error
- ✅ Circular unit reference → show validation error

### 8.4 Performance Testing
- ✅ Page load time < 3s
- ✅ List with 1000 users → pagination handles efficiently
- ✅ Search/filter responsiveness (debounce implemented)
- ✅ No memory leaks (check browser DevTools)
- ✅ No unnecessary re-renders (check React DevTools)

**Deliverable:** Comprehensive test report, all scenarios passing

---
## Development Guidelines for AI Agents
### Naming Conventions
- Components: PascalCase (UserList, EditUserForm, ProtectedRoute)
- Hooks: camelCase with `use` prefix (useAuth, useFetch, useForm)
- Utilities: camelCase (rbacUtils, validators, formatters)
- Types: PascalCase with `Type` suffix or interface (UserType, ApiResponseType)
- CSS classes: kebab-case (user-list, edit-form, button-primary)

### API Integration Rules
- ✅ All API calls go through `api/client.ts`
- ✅ Request/response interception for auth tokens
- ✅ Consistent error handling (401, 403, 400, 500)
- ✅ Loading states for all async operations
- ✅ No hardcoded URLs - use environment variables

### Form Handling Rules
- ✅ Use Ant Design Form component
- ✅ Implement client-side validation
- ✅ Show server-side validation errors
- ✅ Disable submit during request
- ✅ Show success notification after submit
- ✅ Handle form reset after successful submit

### State Management Rules
- ✅ Use React Context for global auth state
- ✅ Use local state for component state (useState)
- ✅ Use URL state for filters/pagination (query params)
- ✅ No Redux/Zustand required (Context sufficient for now)

### RBAC Implementation Rules
- ✅ Check role in component: `const isAdmin = useAuth().user?.role === 'admin'`
- ✅ Use helper functions: `isAdmin()`, `isManager()`, `isUser()`
- ✅ Hide buttons/features for unauthorized roles
- ✅ Show warning message: "This action requires admin permissions"
- ✅ Never trust frontend RBAC - always rely on backend 403s

### Error Handling Rules
- ✅ Catch all API errors and display user-friendly messages
- ✅ Log errors to console in development
- ✅ Retry transient errors (network timeouts)
- ✅ Don't expose sensitive data in error messages
- ✅ Implement global error boundary

### Code Organization Rules
- ✅ One component per file (except tiny helpers)
- ✅ Keep components < 300 lines
- ✅ Extract complex logic into custom hooks
- ✅ Keep API logic in `api/` directory
- ✅ Keep utilities in `utils/` directory
- ✅ Keep types in `types/` directory
- ✅ Use TypeScript interfaces and types for all props and state

### TypeScript Specific Rules
- ✅ Define interfaces for all component props
- ✅ Use TypeScript generics where appropriate
- ✅ Define return types for all functions
- ✅ Use `typeof` operator for type inference when possible
- ✅ Avoid using `any` type unless absolutely necessary
- ✅ Use union types for enum-like values (e.g., roles, statuses)
- ✅ Leverage TypeScript's strict mode for better type safety
- ✅ Use `interface` for object shapes and `type` for aliases
- ✅ Organize imports alphabetically and group by source (external, internal, types)
- ✅ Use `as const` for readonly arrays and objects when appropriate

---

## Testing Checklist for Each Feature

### Login Feature
- [ ] Form validation (email format, password required)
- [ ] Success: user logged in, redirected to dashboard
- [ ] Error: invalid credentials shown
- [ ] Error: network failure handled
- [ ] Remember Me works (if implemented)

### User List
- [ ] Table displays all users
- [ ] Pagination works (10, 25, 50 per page)
- [ ] Search filters results (by email/name)
- [ ] Role filter works
- [ ] Status filter works
- [ ] Sorting by any column works
- [ ] Empty state shown when no results
- [ ] Loading skeleton shown during fetch
- [ ] Delete button only for admin
- [ ] Create button only for admin/manager

### User Create/Edit
- [ ] Form validation (email, password strength)
- [ ] Email uniqueness checked on server
- [ ] Role field only for admin
- [ ] Manager cannot edit admin users
- [ ] Success notification shown
- [ ] User list refreshed after save
- [ ] Error messages displayed

### User Detail
- [ ] All user fields displayed
- [ ] Edit button visible (based on role)
- [ ] Delete button visible (admin only)
- [ ] Reset password button visible (admin only)

### Unit Management
- [ ] Create unit: hierarchy selection works
- [ ] Edit unit: cannot set circular parent
- [ ] Delete unit: error if has children
- [ ] Delete unit: error if has assigned users
- [ ] Tree view or proper hierarchy display

### Designation Management
- [ ] Create designation: all fields required
- [ ] Edit designation: fields updatable
- [ ] Delete designation: error if users assigned

### Session Management
- [ ] Logout clears session
- [ ] Logout redirects to login
- [ ] Token refresh works silently
- [ ] Session timeout handled
- [ ] Deep link preserved after login

---

## Backend API Contract Reference

### Authentication Endpoints (5)
1. **POST /api/auth/login** → { accessToken, refreshToken, user }
2. **POST /api/auth/refresh** → { accessToken, refreshToken }
3. **POST /api/auth/logout** → { message: "Logged out" }
4. **GET /api/auth/me** → { user }
5. **POST /api/auth/change-password** → { message: "Password changed" }

### User Management Endpoints (6)
6. **GET /api/users** → { users: [], total, page, limit }
7. **GET /api/users/:id** → { user }
8. **POST /api/users** → { user }
9. **PUT /api/users/:id** → { user }
10. **DELETE /api/users/:id** → { message: "User deleted" }
11. **POST /api/users/:id/reset-password** → { newPassword }

### Unit Management Endpoints (5)
12. **GET /api/units** → { units: [], total }
13. **GET /api/units/:id** → { unit }
14. **POST /api/units** → { unit }
15. **PUT /api/units/:id** → { unit }
16. **DELETE /api/units/:id** → { message: "Unit deleted" }

### Designation Management Endpoints (5)
17. **GET /api/designations** → { designations: [], total }
18. **GET /api/designations/:id** → { designation }
19. **POST /api/designations** → { designation }
20. **PUT /api/designations/:id** → { designation }
21. **DELETE /api/designations/:id** → { message: "Designation deleted" }

### Health Check Endpoint (1)
22. **GET /api/health** → { status: "ok", timestamp }

---

## Known RBAC Restrictions & Edge Cases

### Admin Restrictions
- ✅ Only admins can create users
- ✅ Only admins can delete users
- ✅ Only admins can reset user passwords
- ✅ Only admins can change user roles
- ✅ Managers cannot interact with admin users at all

### Manager Restrictions
- ✅ Can view & create users (but NOT admin users)
- ✅ Can update managers and regular users (NOT admins)
- ✅ Cannot change any user roles (including user→manager)
- ✅ Cannot promote anyone to admin
- ✅ Cannot delete users
- ✅ Cannot reset passwords
- ✅ Can create/update/delete units & designations

### User Restrictions
- ✅ Can view own profile only
- ✅ Can change own password
- ✅ Cannot access any management pages (users, units, designations)
- ✅ Cannot perform any create/update/delete operations

### UI Implementation Strategy for Edge Cases

| Scenario | Admin UI | Manager UI | User UI |
|----------|----------|-----------|---------|
| User Create Button | ✅ Show | ✅ Show | ❌ Hide |
| User Delete Button | ✅ Show | ❌ Hide | ❌ Hide |
| User Reset Password | ✅ Show | ❌ Hide | ❌ Hide |
| Role Field in Form | ✅ Show | ❌ Hide | ❌ N/A |
| Update Admin User | ✅ Allow | ❌ Disable (show error) | ❌ Hide |
| Update Manager User | ✅ Allow | ✅ Allow | ❌ Hide |
| Unit Management | ✅ Show | ✅ Show | ❌ Hide |
| Designation Management | ✅ Show | ✅ Show | ❌ Hide |
