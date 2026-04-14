export type VulnReportFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors: Partial<Record<'name' | 'email' | 'summary' | 'steps' | 'impact' | 'version', string>>
  values: {
    name: string
    email: string
    summary: string
    steps: string
    impact: string
    version: string
  }
}

export const initialVulnReportFormState: VulnReportFormState = {
  status: 'idle',
  message: undefined,
  errors: {},
  values: {
    name: '',
    email: '',
    summary: '',
    steps: '',
    impact: '',
    version: '',
  },
}
