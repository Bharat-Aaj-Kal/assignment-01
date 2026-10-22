import { getDemoData, saveBill } from './demo-store'
import { shippingBillService } from './shipping-bill-service'
import type { SavedBill, ShippingBillFormValues } from './model'

const MOCK_LATENCY_MS = 300

function waitForMockResponse(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS))
}

function nonEmptyText(value?: string): string | undefined {
  const trimmed = value?.trim()
  if (trimmed === '') return undefined
  return trimmed
}

/**
 * Combines the starter's API-shaped sample records with locally saved bills.
 * Locally saved records take precedence if a seeded record has been edited.
 */
function getMockBills(): SavedBill[] {
  const seedBills = shippingBillService.getInitialBills()
  const demoData = getDemoData()
  const seededIds = new Set(seedBills.map((bill) => bill.id))
  const billsById = new Map<number, SavedBill>()

  for (const bill of seedBills) {
    billsById.set(bill.id, bill)
  }

  for (const bill of demoData.bills) {
    // The starter's untouched local placeholder (ID 3000) was not part of the dashboard list.
    // Keep that initial display stable, but include it if a user has edited and saved it.
    const isUntouchedPlaceholder = bill.id === 3000 && bill.created === bill.updated && !seededIds.has(bill.id)
    if (isUntouchedPlaceholder) continue
    billsById.set(bill.id, bill)
  }

  // Drafts store stable party IDs. Resolve display names at the service boundary so UI
  // components do not need to import or search mock-data arrays themselves.
  return Array.from(billsById.values()).map((bill) => {
    const exporter = demoData.exporters.find((party) => String(party.id) === bill.values.exporterId)
    const consignee = demoData.businesses.find((party) => String(party.id) === bill.values.consigneeId)

    return {
      ...bill,
      values: {
        ...bill.values,
        exporterName: exporter?.name ?? nonEmptyText(bill.values.exporterName) ?? '',
        consigneeName: consignee?.name ?? nonEmptyText(bill.values.consigneeName) ?? ''
      }
    }
  })
}

/**
 * Promise-based mock data access for the Shipping Bill UI.
 * Replace this implementation with an HTTP adapter without changing the form or dashboard.
 */
export const shippingBillMockService = {
  async list(): Promise<SavedBill[]> {
    await waitForMockResponse()
    return getMockBills()
  },

  async getById(id: string | number): Promise<SavedBill | undefined> {
    await waitForMockResponse()
    return getMockBills().find((bill) => String(bill.id) === String(id))
  },

  async saveDraft(values: ShippingBillFormValues, existingId?: number): Promise<SavedBill> {
    await waitForMockResponse()
    return saveBill(values, existingId)
  },

  async submit(values: ShippingBillFormValues, existingId?: number): Promise<SavedBill> {
    await waitForMockResponse()
    return saveBill(values, existingId)
  }
}
