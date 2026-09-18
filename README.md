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

La unión está disponible desde **nivel de ciudad 4**: cuatro viviendas del mismo nivel, todas **N4 o superior**, en un cuadrado 2×2, sin incendios. Inspecciona una y pulsa **Unir 4 viviendas**. Conserva la suma de capacidad, ocupación, consumos y mantenimiento; crea un conjunto N4 mejorable.

Sonidos gratuitos con sus créditos y licencias en `public/ciudad-viva/audio/CREDITS.md`.

## Interfaz y parcelas

Pantalla de inicio con controles básicos, barra superior compacta y Registro Urbano en movimiento. El progreso urbano depende únicamente de población y satisfacción; el requisito de satisfacción aumenta linealmente del 60% al 85%.

El mapa tiene 36×36 casillas. Las partidas de 30×24 y 36×24 se amplían conservando edificios y terreno; las casillas nuevas permanecen bloqueadas. Universidad 2×2, intercambiador 1×2 rotatorio y depuradoras junto a un río; las construcciones antiguas conservan su superficie hasta ampliarlas o trasladarlas. Los parques buscan espacio de expansión en todas las direcciones.

Capital inicial: 15.000 €. Los costes de construcción y mejora son propios de cada edificio y no aumentan por el nivel de ciudad. La cobertura integra capacidad y demanda de los servicios en una sola métrica; las depuradoras requieren investigación. Controles de pausa, velocidad normal y triple; tras 15 minutos sin actividad la simulación se pausa automáticamente. Música y efectos tienen controles independientes y los parques llegan a N8.

## Inventario, paseo y meteorología

El botón de caja permite guardar hasta 256 edificios y volver a colocarlos sin coste, conservando nivel y apariencia. Mientras están guardados no producen ni consumen; las viviendas se vacían. No se pueden guardar carreteras, el Ayuntamiento ni edificios en llamas. El inventario se conserva en el servidor.

Los edificios guardados se agrupan por tipo, nivel y capacidad con un contador de unidades; cada unidad conserva su propia apariencia. Colocarlos mantiene activo el inventario. **Deshacer** revierte la última construcción, demolición, mejora, traslado, unión o acción de inventario durante 10 segundos, sin retroceder el reloj ni restaurar la tesorería completa. Los trazados de carretera y «Al máximo» se revierten como una sola acción.

En móvil se requiere pantalla horizontal, con aviso y pausa en vertical. Un toque coloca el edificio sin confirmación adicional. Un dedo desplaza; el botón Cámara permite girar e inclinar. Con dos dedos se reconoce desplazamiento o zoom y se mantiene ese gesto hasta levantar los dedos. Deshacer está disponible en la barra inferior.

La geometría estática se reconstruye al cambiar edificios, terreno o capa; ventanas e iluminación usan un lote de materiales separado. La red viaria y sus componentes se reutilizan, y las rutas almacenadas se validan contra sus costes de congestión. Los flujos sensibles a cargas se recalculan. Humo y fuego comparten un único lote con transparencia por vértice. En pausa se congelan los efectos decorativos y el render duerme hasta una interacción, salvo lluvia, inundaciones o animaciones de colocación pendientes. Las noticias continúan sin despertar el render; no se generan ni avanzan incendios con el tiempo detenido.

Para pasear, arrastra el muñeco hasta una carretera. En PC, clic o Esc libera el cursor; otro clic en el mapa vuelve a capturarlo. Con el cursor libre la vista no gira. En móvil se usa el joystick y el arrastre para mirar. El botón superior termina el paseo.

Cada nuevo día se sortea un 10% de lluvia, con un 20% de inundación si llueve. La lluvia dura 24 horas; la inundación dura entre 24 y 72 horas según los bomberos operativos, su plantilla y suministros al iniciarse. Durante ella: ingresos de negocios −20%, producción industrial −15%, velocidad de vehículos −30% y satisfacción −8 puntos; no se puede pasear. Agua, lluvia y cielo cambian visualmente y los plazos se conservan al guardar.

Los parques aportan entretenimiento. Debug llena viviendas y plantillas, reanuda el tiempo al activarse y conserva los controles de velocidad. Las cifras visibles tienen como máximo dos decimales.

Las pruebas automatizadas cubren lógica, guardado e interacción simulada de PC y móvil. No sustituyen la comprobación visual ni la captura real del cursor en cada navegador.

## Modelos e intersecciones

El Ayuntamiento ocupa 2×2 desde N1, incorpora parterres desde N2 y mantiene su nivel ligado al de la ciudad. Las sedes antiguas se amplían al cargar si el terreno contiguo está libre y conectado; si no hay espacio conservan su parcela sin desplazar otros edificios.

Los cruces alternan el paso por ejes con intervalos de despeje y reserva de salida. Los semáforos muestran esa misma fase; esperar un rojo no elimina el vehículo. El asfalto queda ligeramente bajo la acera, los pasos de cebra siguen el sentido de circulación y luces y sombras se ajustan a la superficie receptora.

Árboles residenciales de tamaño natural con probabilidad del 25%, fachadas más coloridas, cúpula dorada del teatro, cubo monumental giratorio, bancos más pequeños y fuentes animadas. El cielo aclara hacia el horizonte, el ocaso es más cálido y la lluvia usa gotas más finas. El color de nivel se aplica solo a su nombre.
