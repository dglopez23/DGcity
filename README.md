# DGcity · Ciudad Viva

Juego urbano 3D low poly, con cuentas y una ciudad guardada por usuario.
Importado de la versión 107 publicada en la web de DGLopez. El desarrollo continúa aquí; no hay despliegue automático.

## Ejecutar

Requiere Node.js 22.13 o superior (recomendado 24). Sin dependencias adicionales.

```sh
npm start
```

Abre http://localhost:3000/ciudad-viva/ y crea una cuenta. SQLite guarda las ciudades en `data/city.sqlite`. Conserva ese archivo entre ejecuciones; no se sube a GitHub.
Para un servidor público, configura `PUBLIC_ORIGIN` con su URL HTTPS y coloca el servidor detrás de un proxy HTTPS. `PORT` permite cambiar el puerto. Las cuentas y ciudades de la web original permanecen allí: copiar código no copia datos de usuarios.

```sh
npm test
```

## Cambios de arte

Carreteras con asfalto por encima de la acera; bases discretas; oficinas con tres paletas; depósitos octogonales y silos avanzados; refrigeración nuclear baja de ocho caras; luces nocturnas, partículas facetadas y smog desde el 20 % de contaminación. Materiales sencillos con rugosidad y brillo metálico moderados.

La unión está disponible desde **nivel de ciudad 4**: cuatro viviendas del mismo nivel en un cuadrado 2×2, sin incendios. Inspecciona una y pulsa **Unir 4 viviendas**. Conserva la suma de capacidad, ocupación, consumos y mantenimiento; crea un conjunto N4 mejorable. Debug omite el requisito de nivel de ciudad.

Sonidos gratuitos con sus créditos y licencias en `public/ciudad-viva/audio/CREDITS.md`.
