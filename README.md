# Desafio de Frontend - Mira Educacional


## Arquitetura

O projeto foi feito utilizando React + Redux para organizar o fluxo de dados e controle de estados da aplicação.
Além disso, estruturei o projeto para se adequar a seguinte modelo:

![archtecture](https://bitbucket.org/marciohariki/mira-frontend/raw/e3a9e6d864f00103c5719b7e5d44acd3f6b11032/docs/archtecture.png)

A ideia é ter uma camada de comunicação com a API que ficaria do Middleware, uma camada de regras de negócio com os services e depois com base nisso a arquitetura com Redux para gereneciamento de estado e componentes.

## Requirementos

- Docker v18+

## Executando o projeto

O projeto é executado em localhost:8080

```bash
docker-compose up 
```

## Melhorias para o projeto
- Testes para os componentes criados