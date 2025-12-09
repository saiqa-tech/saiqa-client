---
inclusion: fileMatch
fileMatchPattern: "src/routes/**"
---

# Route Organization Guidelines

## Feature-Based Structure

Routes should be organized by feature, not by route type. This makes the codebase more maintainable and scalable.

### Structure Pattern

```
src/routes/_layout/
└── [feature-name]/
    ├── index.tsx              # List/main view
    ├── create.tsx             # Create new item
    └── $id/
        ├── index.tsx          # Detail view
        └── edit.tsx           # Edit view
```

### Current Structure

```
src/routes/
├── __root.tsx                 # Root layout with providers
├── _layout.tsx                # Protected layout wrapper
├── _layout.index.tsx          # Dashboard (home page)
├── login.tsx                  # Public login page
└── _layout/
    ├── profile.tsx            # User profile page
    └── users/                 # User management feature
        ├── index.tsx          # Users list
        ├── create.tsx         # Create user
        └── $userId/
            ├── index.tsx      # User detail
            └── edit.tsx       # Edit user
```

### Examples

**User Management (Current):**
```
_layout/users/
├── index.tsx                  # GET /users - Users list
├── create.tsx                 # GET /users/create - Create user form
└── $userId/
    ├── index.tsx              # GET /users/:userId - User detail
    └── edit.tsx               # GET /users/:userId/edit - Edit user form
```

**Units Management (Future Example):**
```
_layout/units/
├── index.tsx                  # GET /units - Units list
├── create.tsx                 # GET /units/create - Create unit form
└── $unitId/
    ├── index.tsx              # GET /units/:unitId - Unit detail
    └── edit.tsx               # GET /units/:unitId/edit - Edit unit form
```

**Designations Management (Future Example):**
```
_layout/designations/
├── index.tsx                  # GET /designations - Designations list
├── create.tsx                 # GET /designations/create - Create designation form
└── $designationId/
    ├── index.tsx              # GET /designations/:designationId - Designation detail
    └── edit.tsx               # GET /designations/:designationId/edit - Edit designation form
```

## Naming Conventions

### Directory Names
- Use lowercase for directory names: `users`, `units`, `designations`
- Use descriptive names that match the feature domain
- Keep names singular or plural based on REST conventions (usually plural for collections)

### File Names
- Use lowercase with extensions: `index.tsx`, `create.tsx`, `edit.tsx`
- Use descriptive names: `create.tsx` not `new.tsx`, `edit.tsx` not `update.tsx`
- Use `index.tsx` for the main/list view of a feature

### Dynamic Segments
- Use camelCase with $ prefix: `$userId`, `$unitId`, `$designationId`
- Match the parameter name to the resource: `$userId` for users, not `$id`
- Be consistent across features

## File Placement Rules

### Feature Routes
Place feature-related routes in `_layout/[feature]/`:
- List view: `_layout/users/index.tsx`
- Create view: `_layout/users/create.tsx`
- Detail view: `_layout/users/$userId/index.tsx`
- Edit view: `_layout/users/$userId/edit.tsx`

### Standalone Pages
Place standalone pages directly in `_layout/`:
- Profile: `_layout/profile.tsx`
- Dashboard: `_layout.index.tsx`
- Settings: `_layout/settings.tsx`

### Public Routes
Place public routes at root level:
- Login: `login.tsx`
- Register: `register.tsx`
- Forgot Password: `forgot-password.tsx`

## Route Component Structure

Each route file should follow this structure:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { /* components */ } from "@/components/antd-wrappers";
import { /* API functions */ } from "@/api/endpoints/[feature]";
import { /* hooks */ } from "@/hooks/[hook]";
import { /* utilities */ } from "@/utils/[utility]";
import type { /* types */ } from "@/types/[type]";

// Export the route configuration
export const Route = createFileRoute("/_layout/[feature]/[path]")({
  component: ComponentName,
});

// Define the component
function ComponentName() {
  // Component logic
  return (
    // JSX
  );
}
```

## Benefits of This Structure

1. **Clarity**: Related routes are grouped together
2. **Scalability**: Easy to add new features without cluttering root
3. **Maintainability**: Easier to find and update related files
4. **Team Collaboration**: Clear ownership boundaries
5. **Consistency**: Predictable structure across features
6. **Navigation**: Intuitive URL structure matches file structure

## When Creating New Features

1. Create a new directory under `_layout/` with the feature name
2. Create `index.tsx` for the list view
3. Create `create.tsx` for the create form
4. Create `$id/` directory for detail and edit views
5. Follow the naming conventions above
6. Use wrappers from `@/components/antd-wrappers`
7. Implement proper RBAC checks

## Migration from Flat Structure

If you find routes in a flat structure (e.g., `_layout/users.index.tsx`):

**Before:**
```
_layout/
├── users.index.tsx
├── users.create.tsx
├── users.$userId.index.tsx
└── users.$userId.edit.tsx
```

**After:**
```
_layout/users/
├── index.tsx
├── create.tsx
└── $userId/
    ├── index.tsx
    └── edit.tsx
```

TanStack Router automatically handles the route changes based on file structure, so no manual route configuration is needed.

## Common Patterns

### List Page
```tsx
// _layout/users/index.tsx
export const Route = createFileRoute("/_layout/users/")({
  component: UsersListPage,
});

function UsersListPage() {
  // Fetch list data
  // Display table with pagination
  // Add search and filters
  // Link to create and detail pages
}
```

### Create Page
```tsx
// _layout/users/create.tsx
export const Route = createFileRoute("/_layout/users/create")({
  component: CreateUserPage,
});

function CreateUserPage() {
  // Display form
  // Handle submission
  // Redirect to list or detail on success
}
```

### Detail Page
```tsx
// _layout/users/$userId/index.tsx
export const Route = createFileRoute("/_layout/users/$userId/")({
  component: UserDetailPage,
});

function UserDetailPage() {
  const { userId } = Route.useParams();
  // Fetch detail data
  // Display information
  // Add action buttons (edit, delete)
}
```

### Edit Page
```tsx
// _layout/users/$userId/edit.tsx
export const Route = createFileRoute("/_layout/users/$userId/edit")({
  component: EditUserPage,
});

function EditUserPage() {
  const { userId } = Route.useParams();
  // Fetch current data
  // Display pre-filled form
  // Handle update
  // Redirect to detail on success
}
```

## Remember

- ✅ Group related routes by feature
- ✅ Use consistent naming conventions
- ✅ Follow the directory structure pattern
- ✅ Keep standalone pages in `_layout/`
- ✅ Keep public routes at root level
- ❌ Don't create flat route structures
- ❌ Don't mix feature routes with standalone pages
