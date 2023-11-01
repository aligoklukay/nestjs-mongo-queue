
# Mongo Queue Consumer




## Running

Clone the project,

Open the project and turn on the terminal.
You need to copy .env.sample to .env file.

```bash
  cd docker
  docker compose up -d
```

Install the packages

```bash
  yarn install
```

Run the project

```bash
  npm run start:dev
```

  
## API Usage

#### Creates a task

```http
  POST /tasks/create
```

| Parameter | Type     | Required                |
| :-------- | :------- | :------------------------- |
| `processPayload` | `string` | **true** |

#### Returns

Created tasks mongo id.

  