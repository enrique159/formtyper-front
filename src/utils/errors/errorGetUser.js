import { showSnackbar } from '@/utils/showSnackbar'

export function errorGetUser(response) {
  if (response.errorText == 'unauthorized') {
    showSnackbar('No tienes permisos para r', 'red')
  } else if (response.errorText == 'expiredtoken') {
    showSnackbar('Tu sesión ha expirado, vuelve a iniciar sesión', 'red')
  } else if (response.errorText == 'internalError') {
    showSnackbar('Ha ocurrido un error en el servidor', 'red')
  } else if (response.errorText == 'nullToken') {
    showSnackbar('Ha ocurrido un error en el servidor', 'red')
  } else {
    showSnackbar('Ocurrió un error de servidor', 'red')
  }
}