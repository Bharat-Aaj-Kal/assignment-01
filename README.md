# Export Software Frontend

Built on top of [`fe-zen-arch`](https://github.com/shivamkj/fe-zen-arch) — the shared core architecture for B2B SaaS frontends.

## Libraries

- **React**: https://react.dev/reference/react
- **Tailwind CSS**: https://tailwindcss.com/docs/installation
- **React Query**: https://tanstack.com/query/latest/docs/framework/react/overview
- **React Hook Form**: https://www.react-hook-form.com/get-started
- **Zustand**: https://zustand.docs.pmnd.rs/

## Setup

```bash
pnpm install
pnpm dev
```

Initialize the `fe-zen-arch` Git submodule first if it is missing. The development server runs on port `5173`.

## Architecture and refactoring decisions

### UI and data access

- `src/shipping-bills/shipping-bill-form.tsx` owns the form UI, field arrays, tab navigation, and field-level validation. It requests the party directory and selected party labels through Promise-based service methods rather than directly reading party records from the demo store.
- `src/shipping-bills/party-mock-service.ts` provides asynchronous party-directory loading, exporter/consignee and branch searches, and port lookups. The simulated delay makes loading behavior visible and provides the Promise boundary a future HTTP adapter can implement.
- `src/shipping-bills/shipping-bill-mock-service.ts` provides asynchronous bill listing, detail lookup, draft saving, and final submission. It combines seeded bill records with locally persisted demo records and resolves exporter/consignee display names at the service boundary.
- `src/shipping-bills/demo-store.ts` remains the existing local demo-persistence mechanism behind the service layer. Draft data is stored locally; this is not real server-side persistence.
- Static domain code lists remain in their existing `src/data` modules. Party, branch, port, and bill operations use Promise-based service methods.
- `src/dashboard/list-dashboard.tsx` loads the bill list asynchronously and exposes loading and error feedback. Flat-file download continues to use the existing service, including its local fallback when the configured backend is unavailable.

### Form handling and domain assumptions

- Reuse the existing schema-based form system and React Hook Form state rather than introducing another form library.
- `Save & Next` validates the current tab before saving the draft or advancing. Negative monetary amounts and out-of-range percentage rates are rejected by the schema.
- Exporter, branch, consignee, and port fields store stable IDs/codes; display names are resolved for presentation. This keeps form state suitable for later API integration.
- The assignment is a frontend exercise. Mock records and local demo persistence are intentional; no real customs backend or exhaustive customs-rule engine is included.

## Development and validation

Commands to validate the current working tree:

```bash
pnpm exec tsc --incremental
pnpm exec eslint src/shipping-bills/shipping-bill-mock-service.ts src/shipping-bills/party-mock-service.ts src/shipping-bills/shipping-bill-form.tsx src/dashboard/list-dashboard.tsx --no-cache
pnpm build
```

Manual browser checks performed during development included creating and reopening a draft, refreshing the dashboard, checking exporter/consignee name resolution, confirming invoice item totals, checking persistence after a page reload, and verifying that a negative freight rate is rejected. Re-run the commands and repeat these checks after applying the final files; previous checks do not verify later edits automatically.

The build script invokes Vite directly so `pnpm build` does not depend on Unix-only `NODE_ENV=production` shell syntax.

## AI Usage & Approach

### Tools used

ChatGPT was used as a coding assistant. VS Code, Git/Git Bash, Node.js, pnpm, TypeScript, ESLint, Vite, and Chrome DevTools were used to inspect, run, and verify the application. These are development tools; no new runtime dependency was added for the refactor.

### How AI was used

AI assistance was used to interpret the assignment criteria, identify boundaries between UI, form state, and data access, reason about TypeScript and lint diagnostics, and draft focused code changes. Suggestions were applied incrementally rather than as a wholesale rewrite, keeping the existing form fields, workflow, and flat-file download path intact.

### Additional workflows

After changes, the workflow was to run the TypeScript check, lint the changed files without auto-fixing unrelated source, run a production build, and manually test create/edit, dropdown selection, save/refresh, reload persistence, totals, and validation in the browser. Browser storage was inspected read-only when diagnosing why a party name differed between the form and dashboard.

### Engineering judgment

The mock layer deliberately returns Promises and simulates latency while keeping demo data access behind service methods. Stable party IDs are retained in saved form data and display names are resolved at the service boundary. The existing local store is still the persistence source because the assignment has no backend. No new dependencies or unrelated infrastructure were introduced.

### Learnings and validation

The work highlighted the difference between a form displaying a selected label and the underlying ID actually saved, the need to validate tab navigation as well as final submission, and the value of checking both TypeScript compilation and browser behavior. AI-generated suggestions were refined against the actual code and terminal/browser results; all final changes should be understood and retested by the submitter before the technical interview.
