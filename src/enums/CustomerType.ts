export const CustomerTypes = ['Regular', 'Senior Citizen', 'Student'] as const

export type CustomerType = typeof CustomerTypes[number]
