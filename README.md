# Planificador de Presupuesto

Una aplicación desarrollada con React y TypeScript para definir un presupuesto, registrar gastos clasificados por categorías, visualizar el gasto total, disponible y porcentaje gastado en tiempo real. Incluye filtro de gastos, modo responsivo y reinicio de la app.


---

## Demo

[https://ts-control-gastos.netlify.app/](https://ts-control-gastos.netlify.app/)

---

## Características

- Definir un presupuesto inicial.
- Agregar gastos con nombre, cantidad, categoría y fecha.
- Visualización del porcentaje gastado mediante un gráfico circular.
- Mostrar presupuesto, disponible y total gastado en formato monetario.
- Editar y eliminar gastos mediante gestos (swipe).
- Filtro de gastos por categoría.
- Reiniciar la aplicación para comenzar desde cero.
- Diseño completamente responsivo, optimizado para móviles y escritorio.

---

## Tecnologías

- React 18+
- TypeScript
- TailwindCSS para estilos
- Headless UI para el modal
- Heroicons para iconos
- React Circular Progressbar para visualización del progreso
- UUID para generación de identificadores únicos
- Context API + useReducer para manejo global del estado

---

## Instalación

Clona el repositorio y accede a la carpeta:

```bash
git clone https://github.com/esotooo/PlanificadorPresupuesto.git
cd PlanificadorPresupuesto
```

Instala las dependencias:

```bash
npm install
```

Ejecuta la aplicacion en modo desarrollo:

```bash
npm run dev
```

Abre en tu navegador la URL que muestra Vite, normalmente:

```bash
http://localhost:5173
```
---

## Estructura principal

- `src/components/BudgetForm.tsx` – Formulario para definir presupuesto.
- `src/components/BudgetTracker.tsx` – Visualiza presupuesto, disponible y gastado.
- `src/components/ExpenseForm.tsx` – Formulario para agregar o editar gastos.
- `src/components/ExpenseDetailed.tsx` – Card para cada gasto con swipe para editar o eliminar.
- `src/components/ExpenseList.tsx` – Listado de gastos.
- `src/components/Filter.tsx` – Filtro por categoría.
- `src/components/ExpenseModal.tsx` – Modal para registrar o editar gastos.
- `src/context/BudgetContext.tsx` – Context API y proveedor del estado global.
- `src/reducers/budget-reducer.ts` – Lógica para actualizar el estado.
- `src/hooks/useBudget.ts` – Hook personalizado para acceder al contexto.
- `src/data/categories.ts` – Categorías predefinidas de gastos.
- `src/helpers/formatCurrency.ts` – Función para formatear cantidades como moneda.
- `src/helpers/formatDate.ts` – Función para formatear fechas en español.

---

## Uso

1. Define tu presupuesto inicial en la aplicación.
2. Agrega gastos eligiendo nombre, cantidad, categoría y fecha.
3. Visualiza cómo el gráfico circular y los totales se actualizan en tiempo real.
4. Edita o elimina gastos deslizando las tarjetas.
5. Filtra los gastos por categoría.
6. Pulsa "Resetear App" para reiniciar la aplicación.
7. Diseño completamente responsivo para escritorio y móviles.

---

## Próximas mejoras

- Añadir modo oscuro para mejorar la experiencia visual en ambientes con poca luz.
- Soporte para múltiples presupuestos o periodos.

---

## Demo Visual

### Vista Escritorio
<p><em>Muestra la aplicación funcionando en pantalla de escritorio.</em></p>
<img src="./img/propinasDesktop.gif" width="600" alt="Demo escritorio" />

### Vista Móvil
<p><em>Muestra la aplicación funcionando en un dispositivo móvil, con diseño responsivo.</em></p>
<img src="./img/propinasMobile%2017.35.11.gif" width="300" alt="Demo móvil" />

---

## Autor

Edwin Soto – [https://github.com/esotooo](https://github.com/esotooo) – edwinsoto.developer@gmail.com

