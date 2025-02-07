# Imagem base
FROM node:22.13.1-alpine as build

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código-fonte do projeto
COPY ./src ./src
COPY ./public ./public

# Construi o projeto React (criação do build otimizado)
RUN npm run build

# Etapa 2: Cria a imagem de produção (imagem final)
FROM nginx:alpine

# Copia os arquivos gerados pelo build para o diretório do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expõe a porta 80 (padrão do Nginx)
EXPOSE 80

# Inicia o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]