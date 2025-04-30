## Blog Next

A personal website built with Next.js and Tailwind CSS.

## Build

```bash
yarn

yarn dev

yarn build

yarn start
```

`.env`

```
TURSO_DATABASE_URL=libsql://<turso_database_url>.turso.io
TURSO_AUTH_TOKEN=<turso_auth_token>
```

## Common Commands

Transform all jpg to webp

```bash
find . -name "*.jpg" -print0 | xargs -0 -n 1 -I {} bash -c 'cwebp -q 80 "$0" -o "${0%.jpg}.webp"' {}
```

```bash
openssl base64 -in /path/to/your/image.jpg -out /path/to/your/image.txt
```