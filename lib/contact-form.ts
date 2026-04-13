export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors: Partial<Record<'name' | 'email' | 'brief', string>>
  values: {
    name: string
    email: string
    company: string
    projectType: string
    brief: string
  }
}

export const initialContactFormState: ContactFormState = {
  status: 'idle',
  message: undefined,
  errors: {},
  values: {
    name: '',
    email: '',
    company: '',
    projectType: '',
    brief: '',
  },
}
