export const AffiliatesSortOptions = [
  { text: "Fecha creación", value: "createdAt" },
  { text: "Fecha actualización", value: "updatedAt" },
  { text: "Nombre", value: "name" },
  { text: "Apellido Paterno", value: "fatherSurname" },
  { text: "Apellido Materno", value: "motherSurname" },
  { text: "Email", value: "email" },
  { text: "Teléfono", value: "cellPhoneNumber" },
  { text: "C.P.", value: "cp" },
  { text: 'Colonia', value: 'neighborhood' },
  { text: "Ciudad", value: "city" },
  { text: "Municipio", value: "township" },
  { text: "Sección", value: "electoralSection" },
  { text: "Tipo de registro", value: "typeRegister" },
]

export const AffiliatesPeriodOptions = [
  { text: "Últimos 7 días", value: "last7Days" },
  { text: "Últimos 15 días", value: "last15Days" },
  { text: "Último mes", value: "last30Days" },
  { text: "Últimos 3 meses", value: "last90Days" },
  { text: "Últimos 6 meses", value: "last180Days" },
  { text: "Último año", value: "last365Days" },
]

export const PeriodOptions = Object.freeze({
  SEVEN_DAYS: 'last7Days',
  FIFTEEN_DAYS: 'last15Days',
  ONE_MONTH: 'last30Days',
  THREE_MONTHS: 'last90Days',
  SIX_MONTHS: 'last180Days',
  ONE_YEAR: 'last365Days',
})

export const RequestTypes = Object.freeze({
  Urbanismo: 'Urbanismo',
  Obras: 'Obras',
  Servicios: 'Servicios',
  Seguridad: 'Seguridad',
  Otros: 'Otros',
})

export const RequestTypesArray = [
  'Urbanismo',
  'Obras',
  'Servicios',
  'Seguridad',
  'Otros',
]