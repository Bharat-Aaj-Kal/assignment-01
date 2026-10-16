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

### Shipping Bill refactor

The Shipping Bill form separates UI behavior from asynchronous option loading
and draft submission. The option service owns the form's choice data and
searchable document/file options; the submission service performs domain
checks before saving to the browser demo store. The form supports multiple
invoices and nested goods, shipment details, supporting documents, and licences.

Validation covers positive quantities and prices, positive optional weights,
whole-number package counts, and net weight not exceeding gross weight.
Fractional weights, prices, quantities, rates, and amounts are supported.
Searchable fields communicate loading, no-results, and retry states where
applicable.

See [IMPLEMENTATION.md](./IMPLEMENTATION.md) for the architecture and changed files.

### AI Usage & Approach

AI assisted with reviewing the assignment, refactoring the form and service
boundaries, and browser-driven testing. The implementation was reviewed
against the assignment requirements and refined based on issues found during
testing. TypeScript and production build checks passed, and no dependencies
were added. Further implementation and verification details are in
[IMPLEMENTATION.md](./IMPLEMENTATION.md).
