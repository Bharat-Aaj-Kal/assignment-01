import { getDemoData } from './demo-store'
import { Branch, Business, Exporter, loadingPorts, PortOption, ports } from './model'

const MOCK_DELAY_MS = 250

function delay<T>(value: T, ms = MOCK_DELAY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

export interface PartyDirectory {
  exporters: Exporter[]
  businesses: Business[]
}

/** Fetch the party directory through a separately typed async service function. */
export async function getPartyDirectory(): Promise<PartyDirectory> {
  const { exporters, businesses } = getDemoData()
  return delay({ exporters, businesses })
}

export const partyMockService = {

  /** Search exporters by name or IEC. */
  async searchExporters(query: string): Promise<Exporter[]> {
    const { exporters } = getDemoData()
    const q = query.trim().toLowerCase()
    const filtered = exporters.filter(
      (item) => !item.disabled && (item.name.toLowerCase().includes(q) || item.iec.toLowerCase().includes(q))
    )
    return delay(filtered)
  },

  /** Search branches belonging to a specific exporter ID. */
  async searchExporterBranches(exporterId: string, query: string): Promise<Branch[]> {
    if (!exporterId) return delay([])
    const { exporters } = getDemoData()
    const exporter = exporters.find((item) => String(item.id) === exporterId)
    if (!exporter) return delay([])

    const q = query.trim().toLowerCase()
    const filtered = exporter.branches.filter(
      (branch) => branch.branchName.toLowerCase().includes(q) || branch.city.toLowerCase().includes(q)
    )
    return delay(filtered)
  },

  /** Search consignees by name. */
  async searchConsignees(query: string): Promise<Business[]> {
    const { businesses } = getDemoData()
    const q = query.trim().toLowerCase()
    const filtered = businesses.filter((item) => item.isConsignee && item.name.toLowerCase().includes(q))
    return delay(filtered)
  },

  /** Search branches belonging to a specific consignee ID. */
  async searchConsigneeBranches(consigneeId: string, query: string): Promise<Branch[]> {
    if (!consigneeId) return delay([])
    const { businesses } = getDemoData()
    const consignee = businesses.find((item) => String(item.id) === consigneeId)
    if (!consignee) return delay([])

    const q = query.trim().toLowerCase()
    const filtered = consignee.branches.filter(
      (branch) => branch.branchName.toLowerCase().includes(q) || branch.city.toLowerCase().includes(q)
    )
    return delay(filtered)
  },

  /** Fetch one exporter by ID for selected-label resolution. */
  async getExporterById(exporterId: string): Promise<Exporter | undefined> {
    const { exporters } = getDemoData()
    return delay(exporters.find((item) => String(item.id) === exporterId), 100)
  },

  /** Fetch one consignee by ID for selected-label resolution. */
  async getConsigneeById(consigneeId: string): Promise<Business | undefined> {
    const { businesses } = getDemoData()
    return delay(businesses.find((item) => String(item.id) === consigneeId), 100)
  },

  /** Search Indian ports used for loading. */
  async searchLoadingPorts(query: string): Promise<PortOption[]> {
    const q = query.trim().toLowerCase()
    const portsList = loadingPorts.filter((port) => port.code.startsWith('IN'))
    const filtered = portsList.filter(
      (port) => port.name.toLowerCase().includes(q) || port.code.toLowerCase().includes(q)
    )
    return delay(filtered)
  },

  /** Search final destination ports. */
  async searchDestinationPorts(query: string): Promise<PortOption[]> {
    const q = query.trim().toLowerCase()
    const filtered = ports.filter(
      (port) => port.name.toLowerCase().includes(q) || port.code.toLowerCase().includes(q)
    )
    return delay(filtered)
  },

  /** Fetch a port by code for selected-label resolution. */
  async getPortByCode(code: string): Promise<PortOption | undefined> {
    return delay(ports.find((port) => port.code === code), 100)
  }
}
