import { InternalError } from 'core/utils'
import { saveBill } from './demo-store'
import type { SavedBill, ShippingBillFormValues } from './model'

const MOCK_SUBMISSION_DELAY_MS = 400

export async function submitShippingBillDraft(values: ShippingBillFormValues, draftId?: number): Promise<SavedBill> {
  await new Promise<void>((resolve) => setTimeout(resolve, MOCK_SUBMISSION_DELAY_MS))

  const grossWeight = values.grossWeight ? Number(values.grossWeight) : undefined
  const netWeight = values.netWeight ? Number(values.netWeight) : undefined
  const totalPackages = values.totalPackages ? Number(values.totalPackages) : undefined

  if (grossWeight !== undefined && (!Number.isFinite(grossWeight) || grossWeight <= 0)) {
    throw new InternalError('Gross weight must be greater than zero.', 400)
  }
  if (netWeight !== undefined && (!Number.isFinite(netWeight) || netWeight <= 0)) {
    throw new InternalError('Net weight must be greater than zero.', 400)
  }
  if (grossWeight !== undefined && netWeight !== undefined && netWeight > grossWeight) {
    throw new InternalError('Net weight cannot exceed gross weight.', 400)
  }
  if (totalPackages !== undefined && (!Number.isInteger(totalPackages) || totalPackages <= 0)) {
    throw new InternalError('Total packages must be a whole number greater than zero.', 400)
  }

  return saveBill(values, draftId)
}
