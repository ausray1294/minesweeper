FROM app/

WORKDIR /app

COPY . app/

RUN npm install -g nodemon && npm intall

COPY . .

CMD ["npm", "run", "start:dev"]
