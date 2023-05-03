export const CustomerTypes = ['Regular', 'Senior Citizen', 'Student', 'PWD'] as const

export type CustomerType = typeof CustomerTypes[number]
