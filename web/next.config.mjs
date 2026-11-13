/** @type {import('next').NextConfig} */
export default {
  // geotiff y proj4 corren tal cual en el servidor: empaquetarlos puede cambiar el resultado del estudio
  serverExternalPackages: ['geotiff', 'proj4'],
}
