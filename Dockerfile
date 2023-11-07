FROM public.ecr.aws/lambda/nodejs:18 as builder
LABEL stage=builder

WORKDIR /usr/app

COPY package*.json ./
COPY src/ ./src/

RUN npm install
RUN npm run build

FROM public.ecr.aws/lambda/nodejs:18

WORKDIR ${LAMBDA_TASK_ROOT}
COPY --from=builder /usr/app/build/* ./

# Command can be overwritten by providing a different command in the template directly.
CMD ["index.handler"]
