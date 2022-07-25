import { showSnackbar } from '@/utils/showSnackbar'

export function errorAuthUser(response) {
  if (response.errorText == 'internalError') {
    showSnackbar('Ocurrió un error en el servidor', 'red')
  } else if (response.errorText == 'incorrectPassword') {
    showSnackbar('Usuario o contraseña incorrectos', 'red')
  } else if (response.errorText == 'userNotFound') {
    showSnackbar('No se encontró un usuario con esas credenciales', 'red')
  } else {
    showSnackbar('Ocurrió un error de servidor', 'red')
  }
}