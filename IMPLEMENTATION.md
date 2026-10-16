# File and Function Changes

## `src/shipping-bills/shipping-bill-form.tsx`

- `billSchema` — Added validation for positive quantities and prices, positive
  optional weights, whole-number package counts, and non-negative invoice
  totals so invalid domain values are rejected before submission.
- `decimalStep` — Added a shared `step="any"` setting to decimal-capable inputs
  so valid fractional weights, prices, quantities, rates, and amounts are not
  blocked by browser number-input validation.
- `AsyncPartySelect` — Added asynchronous option searching with loading,
  no-results, retry, and selected-label behavior for searchable form fields.
- `PartyFields` — Connected exporter, consignee, buyer, and third-party
  selectors to the party service and preserved quick-add and branch selection.
- `InvoiceEditor` — Kept invoice and goods fields organized in a reusable
  section and corrected item-unit lookup for goods in additional invoices.
- `DocumentItem` — Connected document and file type selectors to asynchronous
  search and label-lookup functions.
- `BillEditor` — Loads form options asynchronously, reports option-load errors
  with a retry action, keeps tab fields mounted, and preserves add/remove
  workflows for invoices, goods, containers, packing ranges, documents, and
  licences.
- `handleSave` — Submits through `submitShippingBillDraft`, updates the saved
  draft ID, and navigates to the saved bill.
- `handleQuickSaved` — Applies a newly created party and its first branch to
  the relevant form fields.

## `src/shipping-bills/shipping-bill-options-service.ts`

- `waitForMockResponse` — Simulates asynchronous service latency for option
  requests.
- `getShippingBillFormOptions` — Returns the shared form option sets through a
  Promise rather than loading those arrays inside the form component.
- `searchDocumentTypeOptions` and `getDocumentTypeLabel` — Search document
  codes and resolve the display label for an existing selection.
- `searchFileTypeOptions` and `getFileTypeLabel` — Search file types and
  resolve the display label for an existing selection.

## `src/shipping-bills/shipping-bill-mock-service.ts`

- `submitShippingBillDraft` — Added an asynchronous draft-save boundary that
  checks gross and net weights, prevents net weight from exceeding gross
  weight, validates package counts, and saves valid data to the demo store.

## `src/shipping-bills/shipping-bill-service.ts`

- `getAvailableBills` — Combines locally saved drafts with seeded bills,
  avoids duplicate IDs, and resolves exporter and consignee names for display.
- `getInitialBills` and `getById` — Updated initial listing and bill lookup to
  include locally saved drafts as well as seeded records.
- `list` — Replaced the previous fetch-and-fallback behavior with an
  asynchronous mock list response using the available demo bills.

## `src/dashboard/list-dashboard.tsx`

- `fetchBills` — Replaces the visible list with the latest service result,
  including an empty result, and reports refresh failures with a logged error
  and user-visible message.

## `README.md`

- Shipping Bill refactor section — Summarizes the service boundaries and
  validation behavior and links to this document for the file- and
  function-level change details.
- AI Usage & Approach section — Records the AI-assisted workflow and
  verification approach requested by the assignment.
