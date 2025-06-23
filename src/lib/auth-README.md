# Authentication Context Documentation

## Overview

This authentication system provides a React context-based solution for handling user authentication in your Next.js application. It includes login, logout, registration, and route protection features.

## Features

- 🔐 User authentication with login/logout
- 👤 User registration
- 🛡️ Protected routes
- 💾 Persistent authentication state
- 🔄 Loading states
- ⚡ TypeScript support
- 🎣 Custom hooks for easy usage

## Setup

The authentication context is already integrated into your app through the root layout. All components can now access authentication state.

## Usage

### Basic Authentication Hook

```tsx
import { useAuth } from "@/lib/auth-context";

function MyComponent() {
  const { user, isAuthenticated, loading, login, logout } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>Please log in</div>
      )}
    </div>
  );
}
```

### Login Function

```tsx
const handleLogin = async () => {
  try {
    await login("user@example.com", "password");
    // User is now logged in, context will update automatically
  } catch (error) {
    console.error("Login failed:", error);
  }
};
```

### Registration Function

```tsx
const handleRegister = async () => {
  try {
    await register("user@example.com", "password", "John Doe");
    // User is now registered and logged in
  } catch (error) {
    console.error("Registration failed:", error);
  }
};
```

### Protected Routes

Routes in the `(authenticated)` folder are automatically protected. Users will be redirected to the login page if not authenticated.

### Using Higher-Order Component

```tsx
import { withAuth } from "@/lib/auth-context";

const ProtectedComponent = () => {
  return <div>This is protected content</div>;
};

export default withAuth(ProtectedComponent);
```

## API Integration

### Making Authenticated Requests

```tsx
import { authenticatedFetch, getAuthHeaders } from "@/lib/auth-utils";

// Using the helper function
const response = await authenticatedFetch("/api/protected-endpoint");

// Or manually adding headers
const response = await fetch("/api/protected-endpoint", {
  headers: getAuthHeaders(),
});
```

### Getting Auth Token

```tsx
import { getAuthToken } from "@/lib/auth-utils";

const token = getAuthToken();
if (token) {
  // Use token for API calls
}
```

## Customization

### Backend Integration

Update the API endpoints in `auth-context.tsx`:

- `login` function: Update `/api/auth/login` endpoint
- `register` function: Update `/api/auth/register` endpoint
- `logout` function: Update `/api/auth/logout` endpoint (optional)

### Token Validation

Modify the `initializeAuth` function to validate tokens with your backend:

```tsx
const initializeAuth = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      // Validate token with your backend
      const response = await fetch("/api/auth/validate", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // Token is invalid, clear it
        clearAuthData();
      }
    }
  } catch (error) {
    clearAuthData();
  } finally {
    setLoading(false);
  }
};
```

## Context Properties

### AuthContextType

```tsx
interface AuthContextType {
  user: User | null; // Current user data
  loading: boolean; // Auth loading state
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  isAuthenticated: boolean; // Whether user is logged in
}
```

### User Type

```tsx
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}
```

## Error Handling

All authentication functions throw errors that you can catch:

```tsx
try {
  await login(email, password);
} catch (error) {
  if (error.message === "Login failed") {
    setError("Invalid credentials");
  }
}
```

## Security Notes

- Tokens are stored in localStorage (consider using httpOnly cookies for production)
- Always validate tokens on the server side
- Implement proper CSRF protection
- Use HTTPS in production
- Consider implementing token refresh logic

## Example: Complete Login Form

```tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

export default function LoginForm() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
```
