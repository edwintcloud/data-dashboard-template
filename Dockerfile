FROM golang:1.22-alpine as base
WORKDIR /app
COPY server/go.mod server/go.sum ./
RUN go mod download
COPY server/ .

FROM base as dev
RUN go install github.com/cosmtrek/air@latest
ENTRYPOINT ["air"]

FROM base as build
RUN go build -o main .

FROM node:20-alpine as client
WORKDIR /app
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

FROM build as prod
COPY --from=client /app/dist public
CMD ["./main"]