# Frontend Auth Integration Plan

This document covers the current backend contract for these auth-related frontend flows:

- `login`
- `signup`
- `forget password`
- `reset password`
- `verify email`

## Base Rules

- Base API prefix: `/api`
- Auth cookie name: `sanad_auth_token`
- Login sets an `httpOnly` cookie and also returns `access_token` in JSON
- Frontend requests that need cookie support should use `credentials: 'include'`
- CORS is configured with `credentials: true`
- Validation uses NestJS `ValidationPipe` with:
  - `whitelist: true`
  - `forbidNonWhitelisted: true`

## Important Backend Notes

1. Signup is **not** under `/api/auth`. It is currently `POST /api/user`.
2. Forgot/reset password routes are currently spelled `rest-password` in the backend, not `reset-password`.
3. Email verification mail is not sent during signup. It is triggered when an unverified user tries to log in.
4. There is an extra endpoint `POST /api/auth/rest-password/verify` that can be used before the final reset request, even though it was not in the requested list.

---

## 1. Login

### Endpoint

`POST /api/auth/login`

### Request Body

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

### Frontend Example

```ts
await fetch(`${API_BASE}/api/auth/login`, {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: '123456',
  }),
});
```

### Success Response Pattern

```json
{
  "user": {
    "id": 12,
    "email": "user@example.com",
    "role": "USER",
    "isEmailVerified": true,
    "avatar": null
  },
  "access_token": "jwt-token-here"
}
```

### Backend Side Effects

- Sets cookie: `sanad_auth_token`
- Cookie flags:
  - `httpOnly: true`
  - `secure: true`
  - `sameSite: "lax"`
  - `path: "/"`
  - `maxAge: 5 days`

### Common Error Patterns

Invalid credentials:

```json
{
  "statusCode": 400,
  "message": "Invalid email or password",
  "error": "Bad Request"
}
```

Email not verified:

```json
{
  "statusCode": 403,
  "message": "you need to verify your email first",
  "error": "Forbidden"
}
```

When the email is not verified, the backend tries to send a verification email before returning `403`.

---

## 2. Signup

### Endpoint

`POST /api/user`

### Request Body

Minimum payload:

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

Full payload example:

```json
{
  "email": "user@example.com",
  "name": "Ahmed Ali",
  "avatar": "https://cdn.example.com/avatar.png",
  "role": "USER",
  "googleId": "",
  "password": "123456"
}
```

### Frontend Example

```ts
await fetch(`${API_BASE}/api/user`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    name: 'Ahmed Ali',
    password: '123456',
  }),
});
```

### Success Response Pattern

Current backend behavior returns the saved user entity. Typical shape:

```json
{
  "id": 12,
  "email": "user@example.com",
  "name": "Ahmed Ali",
  "avatar": null,
  "role": "USER",
  "status": "ACTIVE",
  "googleId": null,
  "updatedAt": "2026-04-29T10:00:00.000Z",
  "createdAt": "2026-04-29T10:00:00.000Z",
  "isEmailVerified": false,
  "emailVerificationToken": null,
  "emailVerificationTokenExpiry": null,
  "passwordResetToken": null,
  "passwordResetTokenExpiry": null
}
```

### Frontend Integration Note

- Signup does **not** log the user in
- Signup does **not** return an auth token
- Signup does **not** send a verification email by itself
- Recommended current flow:
  - signup
  - redirect to login
  - if login returns `403`, show "check your email to verify your account"

### Common Error Pattern

```json
{
  "statusCode": 400,
  "message": "The user is Already Exists",
  "error": "Bad Request"
}
```

---

## 3. Forget Password

### Endpoint

`POST /api/auth/rest-password/send`

### Request Body

```json
{
  "email": "user@example.com"
}
```

### Frontend Example

```ts
await fetch(`${API_BASE}/api/auth/rest-password/send`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
  }),
});
```

### Success Response Pattern

This endpoint always returns the same message whether the user exists or not:

```json
{
  "message": "If an account exists with this email, a reset link has been sent."
}
```

### Frontend Integration Note

- Show the success message as-is
- Do not try to infer whether the email exists from the API response

---

## 4. Reset Password

### Endpoint

`POST /api/auth/rest-password`

### Request Body

```json
{
  "email": "user@example.com",
  "password": "newStrongPassword123",
  "token": "token-from-email-link"
}
```

### Frontend Example

```ts
await fetch(`${API_BASE}/api/auth/rest-password`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'newStrongPassword123',
    token: resetToken,
  }),
});
```

### Success Response Pattern

```json
{
  "message": "password changed successfully"
}
```

### Common Error Patterns

Expired token:

```json
{
  "statusCode": 400,
  "message": "Token has expired",
  "error": "Bad Request"
}
```

Invalid token:

```json
{
  "statusCode": 400,
  "message": "Invalid token",
  "error": "Bad Request"
}
```

Invalid request:

```json
{
  "statusCode": 400,
  "message": "Invalid request",
  "error": "Bad Request"
}
```

### Recommended Frontend Flow

1. Read `token` and `e` from the reset-password page URL
2. Optionally call `POST /api/auth/rest-password/verify` before showing the final submit state
3. Submit `email`, `password`, and `token` to `POST /api/auth/rest-password`
4. On success, redirect to login

### Optional Pre-check Endpoint

`POST /api/auth/rest-password/verify`

Request:

```json
{
  "email": "user@example.com",
  "token": "token-from-email-link"
}
```

Success response:

```json
{
  "message": "This token is valid",
  "userId": 12
}
```

---

## 5. Verify Email

### Endpoint

`POST /api/auth/verify-email?token=verification-token`

### Request Params

Query param:

```txt
token=verification-token
```

Body:

```json
{}
```

### Frontend Example

```ts
await fetch(
  `${API_BASE}/api/auth/verify-email?token=${encodeURIComponent(token)}`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  },
);
```

### Success Response Pattern

```json
{
  "message": "Email verified successfully"
}
```

### Common Error Patterns

Missing token:

```json
{
  "statusCode": 400,
  "message": "The token is required",
  "error": "Bad Request"
}
```

Already verified:

```json
{
  "statusCode": 400,
  "message": "The user is already verified",
  "error": "Bad Request"
}
```

Invalid or expired token:

```json
{
  "statusCode": 400,
  "message": "Invalid or expired token",
  "error": "Bad Request"
}
```

### Frontend Integration Note

- The verification page should read the token from the URL
- After success, redirect to login
- If verification fails, show a retry/help message and offer navigation back to login

---

## Suggested Frontend Pages

### Login Page

- Call `POST /api/auth/login`
- Use `credentials: 'include'`
- If `403`, explain that verification email was sent

### Signup Page

- Call `POST /api/user`
- After success, redirect to login or a "registration complete" page

### Forgot Password Page

- Call `POST /api/auth/rest-password/send`
- Always show generic success confirmation

### Reset Password Page

- Read `token` and `e` from URL
- Optionally call `POST /api/auth/rest-password/verify`
- Submit final password to `POST /api/auth/rest-password`

### Verify Email Page

- Read `token` from URL
- Call `POST /api/auth/verify-email?token=...`

---

## Quick Endpoint Table

| Flow | Method | URL | Body |
| --- | --- | --- | --- |
| Login | `POST` | `/api/auth/login` | `{ email, password }` |
| Signup | `POST` | `/api/user` | `{ email, password, name?, avatar?, role?, googleId? }` |
| Forget password | `POST` | `/api/auth/rest-password/send` | `{ email }` |
| Reset password | `POST` | `/api/auth/rest-password` | `{ email, password, token }` |
| Verify email | `POST` | `/api/auth/verify-email?token=...` | empty body |

