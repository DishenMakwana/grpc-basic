#### Generate protobuf files

```bash
protoc -I=. ./protos/greet.proto \
 --js_out=import_style=commonjs,binary:./server \
 --grpc_out=./server \
 --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin`
```

#### Knex migration

- create new migration

```bash
../node_modules/.bin/knex migrate:make blogs
```

- run migration

```bash
../node_modules/.bin/knex migrate:latest
```

#### Knex seed

- create new seed

```bash
../node_modules/.bin/knex seed:make blogs
```

- run seed

```bash
../node_modules/.bin/knex seed:run
```

#### Useful tool

- [Evans](https://github.com/ktr0731/evans)
