import { documentCodes } from '@/data/e-sanchit-codes'
import { quantityCodes } from '@/data/quantity-code'
import schemeCodes from '@/data/scheme-codes'
import { stateOptions } from '@/data/states'
import { Trades } from '@/data/trade-agrements'
import { cargoOptions, contractTypes, paymentTypes, priceInclusionTypes, sealTypes, weightUnits } from '@/data/types'
import { loadingPorts, ports } from './model'

const MOCK_DELAY_MS = 250
const fileTypeOptions = [{ value: 'pdf', label: 'PDF' }]

function waitForMockResponse() {
  return new Promise<void>((resolve) => setTimeout(resolve, MOCK_DELAY_MS))
}

const currencyOptions = ['USD', 'EUR', 'INR', 'AED', 'GBP', 'SGD'].map((value) => ({ value, label: value }))
const portOptions = ports.map((port) => ({ value: port.code, label: `${port.name} · ${port.code}` }))
const nfeiCategoryOptions = [
  { value: '01', label: '01 - Free trade sample' },
  { value: '02', label: '02 - Diplomatic goods' },
  { value: '03', label: '03 - Warranty replacement' },
  { value: '07', label: '07 - Gift parcel' },
  { value: '08', label: '08 - Other' }
]
const igstPaymentOptions = [
  { value: 'NA', label: 'Not applicable' },
  { value: 'LUT', label: 'Under LUT / bond' },
  { value: 'P', label: 'Against payment' }
]
const accessoryStatusOptions = [
  { value: '0', label: 'No accessory' },
  { value: '1', label: 'Included free of cost' },
  { value: '2', label: 'Entered separately' }
]
const containerSizeOptions = [
  { value: '20', label: '20 ft' },
  { value: '40', label: '40 ft' },
  { value: '45', label: '45 ft' }
]
const containerSealTypeOptions = [
  { value: 1, label: 'BTSL - Bottle Seal' },
  { value: 2, label: 'ESEAL - Electronic Seal' },
  { value: 3, label: 'RFID - Radio Frequency Identifier' }
]
const goodsSourceOptions = [
  { value: 'I', label: 'Imported' },
  { value: 'D', label: 'Indigenous' }
]

export const shippingBillFormOptions = {
  accessoryStatusOptions,
  cargoOptions,
  contractTypes,
  containerSealTypeOptions,
  containerSizeOptions,
  currencyOptions,
  goodsSourceOptions,
  igstPaymentOptions,
  loadingPorts,
  nfeiCategoryOptions,
  paymentTypes,
  portOptions,
  priceInclusionTypes,
  quantityCodes,
  schemeCodes,
  sealTypes,
  stateOptions,
  Trades,
  weightUnits
}

export type ShippingBillFormOptions = typeof shippingBillFormOptions

export async function getShippingBillFormOptions(): Promise<ShippingBillFormOptions> {
  await waitForMockResponse()
  return shippingBillFormOptions
}

export async function searchDocumentTypeOptions(query: string) {
  await waitForMockResponse()
  const normalizedQuery = query.trim().toLowerCase()
  return documentCodes
    .filter(
      (document) =>
        document.label.toLowerCase().includes(normalizedQuery) || document.value.toLowerCase().includes(normalizedQuery)
    )
    .map((document) => ({ value: document.value, label: document.label }))
}

export async function getDocumentTypeLabel(value: string) {
  await waitForMockResponse()
  return documentCodes.find((document) => document.value === value || document.label === value)?.label ?? value
}

export async function searchFileTypeOptions(query: string) {
  await waitForMockResponse()
  const normalizedQuery = query.trim().toLowerCase()
  return fileTypeOptions.filter(
    (fileType) =>
      fileType.label.toLowerCase().includes(normalizedQuery) || fileType.value.toLowerCase().includes(normalizedQuery)
  )
}

export async function getFileTypeLabel(value: string) {
  await waitForMockResponse()
  return fileTypeOptions.find((fileType) => fileType.value === value || fileType.label === value)?.label ?? value
}
