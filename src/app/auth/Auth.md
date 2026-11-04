For thsoe who come after..

# JWT Auth Checklist (React web + Expo mobile + Fastify)

Setup: React web on GitHub Pages, API on a separate domain, Expo mobile app. No cookies, so no CSRF.

## Tokens

- [ ] Access token: short-lived (about 15 minutes), sent as `Authorization: Bearer <token>`
- [ ] Refresh token: 7 days or less, sent only to the refresh route in the request body
- [ ] Login returns both tokens in the response body

## Storage

- [ ] Web: localStorage (both tokens)
- [ ] Mobile: `expo-secure-store` (both tokens)
- [ ] One small storage wrapper with the same functions on both platforms

## Server (Fastify)

- [ ] Protected routes read the access token only from the `Authorization` header
- [ ] Server never accepts auth from cookies (keeps CSRF out of the picture)
- [ ] Refresh route takes the refresh token from the body and returns a new pair
- [ ] Rotate the refresh token on every use
- [ ] Store only a hash of each refresh token in the database
- [ ] Reuse detection: if an old refresh token is used, revoke the whole session
- [ ] Grace period (about 20 seconds): accept a just-rotated token again, so two tabs refreshing at once don't cause a logout
- [ ] Session id per login/device, so one device can be logged out without affecting others
- [ ] Logout revokes the session on the server
- [ ] CORS: exact web origin (never `*`), allow the `Authorization` header, no `credentials: true` needed
- [ ] No data changes on GET requests
- [ ] Validate and size-limit every input on the server

## Client (shared web + mobile)

- [ ] One API wrapper that adds the Bearer header
- [ ] On a 401: refresh once, save the new tokens, retry the request once
- [ ] Share one in-progress refresh between parallel requests (single-flight)

## Multiple tabs (web only)

- [ ] `storage` event (or BroadcastChannel) so login, refresh and logout sync across tabs
- [ ] `navigator.locks.request("refresh", ...)` so only one tab refreshes at a time
- [ ] After a lock wait, re-read tokens from localStorage before refreshing again

## XSS defense (the one remaining risk)

- [ ] Strict CSP: `script-src 'self'`, no `unsafe-inline`, no `unsafe-eval`
- [ ] `connect-src` limited to your API domain (stops injected code from sending tokens elsewhere)
- [ ] Also set `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`
- [ ] GitHub Pages cannot set headers: use a CSP `<meta>` tag (no `frame-ancestors` or reporting there)
- [ ] Never use `dangerouslySetInnerHTML` / `innerHTML` with user content
- [ ] If HTML must be allowed, sanitize with DOMPurify (and on the server if other clients show it)
- [ ] Only allow `http`/`https` URLs in user-provided links (block `javascript:`)
- [ ] Avoid third-party scripts and CDNs
- [ ] Pin, audit and update npm dependencies

## Later upgrade path

- [ ] Server can accept the refresh token from the body OR an HttpOnly cookie
- [ ] If the web app moves to a host with rewrites (Vercel, Netlify, Cloudflare Pages) or shares a parent domain with the API, move only the web refresh token to an HttpOnly cookie (`Secure; SameSite=Lax`, no `Domain`, scoped `Path`, `Origin` check on the refresh route). Mobile keeps working unchanged.

## Quick facts to remember

- CSRF only exists when the browser sends credentials automatically (cookies). Bearer headers are immune.
- localStorage, sessionStorage and IndexedDB are equally readable by XSS.
- HttpOnly cookies block token theft but not requests made from an XSS-infected open page.
- Cross-site cookies (`SameSite=None`) are blocked in Safari and often Firefox, so they are unreliable across different domains.
