## Export Software Frontend

Built on top of [fe-zen-arch](git@github.com:shivamkj/fe-zen-arch.git) — the core shared architecture for B2B SaaS frontends.

### Libraries

- **React** [Docs](https://react.dev/reference/react)
- **Tailwind CSS** [Docs](https://tailwindcss.com/docs/installation)
- **React Query** [Docs](https://tanstack.com/query/latest/docs/framework/react/overview)
- **React Hook Form** [Docs](https://www.react-hook-form.com/get-started)
- **Zustand** [Docs](https://zustand.docs.pmnd.rs/)

### Setup

```bash
pnpm install   # fe-zen-arch is included as a git submodule, init it first if missing
pnpm dev       # dev server on port 5173
pnpm lint      # prettier + tsc + eslint (fe-zen-arch lint pipeline)
pnpm build     # production build
```

### Notes

- `core`, `ui`, `auth`, `icons` are fe-zen-arch workspace packages, aliased via tsconfig paths & vite aliases.
- Forms are built directly with `useForm` from `core/form` + `Form` / `SubmitButton` from `core/form/components` — no generic form templates.
- Routing uses fe-zen-arch's zustand router: routes defined in `src/shared/routes.tsx`, paths in `src/shared/route-paths.ts`.
- Auth uses the fe-zen-arch auth module (routes, interceptors, login pages) out of the box.
- API base URL comes from `PUBLIC_API_URL` (`.env`).
- Don't use react-query mutation for react-hook-form submit handler.
- For HMR (hot refresh), the file must export only react component, and not any other constant or object.
- While most input elements use `...register('name')`, custom elements like select require `<Select<T> name="name" />` instead.

### AI Usage & Approach

AI assistance was used to review the existing codebase, identify focused refactoring opportunities, troubleshoot TypeScript issues, and improve form and dashboard behavior. Changes were made incrementally, with existing functionality checked after each step.

**Approach**
- Kept the existing React, TypeScript, and shared UI architecture.
- Used a service layer for asynchronous shipping-bill operations, with a configurable mock API mode for local development.
- Added dashboard loading and error feedback, retry support, and an empty state.
- Improved save handling with an in-progress indicator and duplicate-submission protection.
- Verified changes using the TypeScript compiler and `git diff --check`, and manually tested bill creation, editing, dashboard loading, and saving behavior.

**Limitations**
- Mock mode is intended for local development. Real backend integration still depends on a reachable API and compatible request/response formats.
- Testing described above is based on the checks and manual scenarios performed; it does not imply a complete automated test suite.
