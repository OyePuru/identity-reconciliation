# Install Dependecies
```
npm install
```

# Intialise Database
Enter Directory: `cd docker`

Start MySQL
```
docker compose up -d
```

Stop MySQL
```
docker compose down
```

# Migrations

Run migrations
```
npx typeorm-ts-node-commonjs migration:run --dataSource ./src/database/data.source.ts
```

Revert migrations
```
npx typeorm-ts-node-commonjs migration:revert --dataSource ./src/database/data.source.ts
```

# Run Server
```
npm run dev
```