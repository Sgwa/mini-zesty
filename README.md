# Mini Zesty -- Portafolio en tiempo real

Aplicación desarrollada en **React Native (Expo)** que muestra el
portafolio de inversión de un usuario, con posiciones, valor total, P&L
y precios en tiempo real.\
La app consume precios en vivo e histórico de 2 meses a través de un
**WebSocket mock** provisto.

------------------------------------------------------------------------

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

``` bash
git clone https://github.com/Sgwa/mini-zesty.git
cd mini-zesty
```

### 2. Instalar dependencias

``` bash
yarn install
```

### 3. Ejecutar el servidor WebSocket mock

En otra terminal:

``` bash
cd ws-server
npm install
node ws-mock.js
```

Esto levanta el servidor en `ws://localhost:8082`.

### 4. Crear .env con variable EXPO_PUBLIC_WS_URL
> ⚠️ Se debe usar la IP local del pc, no `localhost`
``` bash
EXPO_PUBLIC_WS_URL=ws://[ip-local-pc]:8082
```

### 5. Hacer un dev build (primera vez)

#### Android
> Debe tener conectado el dispositivo y tener instalado Java 17
``` bash
npx expo prebuild -p android --clean
yarn android -d
```

#### iOS
> Debe tener conectado el dispositivo a un Mac con Xcode instalado y una sesión de apple iniciada para obtener un cetificado
``` bash
npx expo prebuild -p ios --clean
yarn ios -d
```

### 6. Correr la aplicación las siguientes veces
``` bash
yarn start
```

------------------------------------------------------------------------

## 📊 Funcionalidades

-   **Portafolio**:
    -   Valor total del portafolio
    -   P&L total absoluto y porcentual
    -   Cambio intradía absoluto y porcentual
-   **Gráfico histórico** (portafolio y por stock):
    -   Selector de temporalidad: hoy, 1 semana, 1 mes o 2 meses
    -   Interacción animada al tocar el gráfico
-   **Tabla/lista de posiciones** con:
    -   Ticker, cantidad, precio promedio, precio actual, P&L, % del
        portafolio
-   **Filtros y búsqueda**:
    -   Por ticker
    -   Por rango de P&L porcentual
    -   Ordenar por P&L porcentual y absoluto; peso en portafolio y precio
-   **Precios en tiempo real** vía WebSocket

------------------------------------------------------------------------

## ⚙️ Decisiones técnicas y trade-offs

-   **WebSocket nativo** \
    *Trade-off*: rapido de levantar para demo, pero no hay reconexiones ni gestión de room/tópicos 
-   **Manejo de estados con Zustand** (para data del websocket). \
    *Trade-off*: librería liviana, API simple.
-   **Gráficos con React Native Skia**.\
    *Trade-off*: Render nativo de alta performance.
-   **Animaciones con React Native Reanimated**.\
    *Trade-off*: Animaciones suaves en el UI Thread.
-   **Tanstack Query** para llamada a endpoint.\
    *Trade-off*: Maneja fetch, cache, invalidaciones y estado de los datos.
-   **Axios interceptor** para responder endpoint con mock de portafolio.
    *Trade-off*: Útil para demo.
-   **Mock de datos de portafolio** con randomización controlada para
    simular posiciones.\
    *Trade-off:* no hay persistencia, solo runtime.
-   **Filtro y ordenamiento in-memory** para performance aceptable en
    datasets pequeños.\
    *Trade-off:* en producción real debería ir paginado y filtros aplicados por parte del servidor.
-   **i18n** para internacionalización, se implementó inglés y español.
-   **Shopify Restyle** para manejo de estilos con tipado fuerte.
-   **Eslint con prettier** para analisis y formato del código.
-   **Uso de atomic design** para los componentes.

------------------------------------------------------------------------

## ⚠️ Límites conocidos

-   Sin autenticación ni manejo multiusuario.
-   Sin backend real (solo mock).
-   Portafolio no persiste al recargar, se randomiza un mock cada vez.
-   WebSocket no tiene reconexión automática.
-   Escala pensada para un número no muy alto de tickers, en esta demo se usan **20 tickers** solamente.

------------------------------------------------------------------------

## ⏱️ Tiempo invertido
~25 horas

------------------------------------------------------------------------

## 🤖 Uso de IA

-   Generación inicial del **README**.
-   Sugerencias para optimización de estados.
-   Ayuda en el uso de React Native Skia con worklets de Reanimated.
-   Uso the timers en la store de zustand para generar un único tick para el conjunto de tickers que llegan a la vez por el webhook.
-   Código de ejemplo para mock en axios.
-   Solución de errores.
-   Lógica de filtros

**Propio:**
- Implementación de Restyle
- i18n
- Tanstack Query
- Componentes
- Navegación
- Diseño de la app
