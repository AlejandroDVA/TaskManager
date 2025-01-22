# Task Manager

Web app CRUD desarrollado en **TypeScript** con **NestJS** y **React**.

## Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/AlejandroDVA/TaskManager
2. **Navegar a la carpeta del proyecto**
   ```bash
   cd TaskManager
3. **Configurar las variables de entorno**
   Cree un archivo .env en el directorio ./backend del proyecto y configure las siguientes variables:
   ```bash
   PORT=3000
   DATABASE_DIALECT=postgres
   #DATABASE_HOST=postgres #online
   DATABASE_HOST=localhost #offline
   DATABASE_PORT=5432
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=admin
   DATABASE_NAME=todolist
   AUTO_LOAD_MODELS=true
   SYNCHRONIZE=true
4. **Levantar el entorno con Docker**
   En la raíz del proyecto, ejecute el siguiente comando:
   ```bash
   docker-compose up --build
5. **Abrir la aplicación**
   Desde su navegador, ingrese a: http://localhost:8080/

## Estructura del proyecto
  **Backend**
  
        tests/
        src/
    ├── modules/
    │   ├── tasks/
    │   │   ├── tasks.controller.ts
    │   │   ├── tasks.service.ts
    │   │   └── tasks.module.ts
    ├── common/
    │   ├── decorators/
    │   └── exceptions/
    ├── main.ts
    └── app.module.ts.

  **Frontend**
  
      src/
    ├── components/
    │   ├── TaskList.tsx
    │   ├── TaskForm.tsx
    ├── store/
    │   ├── slices/
    │   │   └── tasksSlice.ts
    │   └── store.ts
    ├── App.tsx
    └── main.tsx

  ## Variables de Enterno ##
  
    PORT=3000
    DATABASE_DIALECT=postgres
    DATABASE_HOST=postgres #online
    DATABASE_HOST=localhost #offline
    DATABASE_PORT=5432
    DATABASE_USERNAME=postgres
    DATABASE_PASSWORD=admin
    DATABASE_NAME=todolist
    AUTO_LOAD_MODELS=true
    SYNCHRONIZE=true
    
  DATABASE_HOST se debe mantener una según se la necesidad (Online|Offline)
