FROM ubuntu

WORKDIR /backend

COPY . .

RUN yarn

ENV PORT 4000

CMD ['yarn', 'start:dev']