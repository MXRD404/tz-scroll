# Установка стадии сборки
FROM node:20 as build-stage

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальной исходный код
COPY . .

# Сборка Angular-приложения для продакшена
RUN npm run build -- --output-path=dist --configuration production

# Установка стадии для сервера
FROM nginx:stable-alpine as production-stage

# Копируем собранное приложение в nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Копируем файл конфигурации для nginx (опционально)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Экспонируем порт
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
