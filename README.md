# Project Setup

This project uses the following technologies:
- **Next.js**: 15
- **React**: 19
- **Nest.js**: 10
- **Prisma**: 6 (with MongoDB@latest)
- **Sass**: 1.83
- **TypeScript**: 5.5.4

## Development Environment Setup

### Prerequisites

Ensure you have the following installed:
- Node.js (version 18 or higher)
- npm (version 9 or higher)

### Getting Started

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

### Backend Setup

1. Configure environment variables:
    Create a [.env](http://_vscodecontentref_/0) file in the directory and add the following variables:
    ```env
    JWT_SECRET=<your-session-secret>
    MONGO_DB_CONNECTION_STRING=mongodb+srv://<db_username>:<db_password>@HOST:PORT/<app-name>
    JWT_EXPIRE_DURATION=7d
    LINKEDIN_USERNAME=<your-linkedin-username>
    LINKEDIN_PASSWORD=<your-linkedin-password>
    ```
    Note: To enable LinkedIn scraping, add your LinkedIn credentials (LINKEDIN_USERNAME and LINKEDIN_PASSWORD) to the backend .env file.

2. Generate a JWT secret: (OR use any string for development)
    ```sh
    openssl rand -base64 32
    ```

3. Prepare Prisma:
    ```sh
    npx prisma generate
    npx prisma db push
    ```

    Note: Prisma requires the MongoDB connection string to be in the following format:
    ```env
    mongodb+srv://<db_username>:<db_password>@HOST:PORT/<app-name>
    ```
    For more details, refer to the [Prisma documentation](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb/connect-your-database-typescript-mongodb).

### Frontend Setup

1. Navigate to the frontend directory:
    ```sh
    cd <repository-directory>/apps/web
    ```

2. Create a [.env](http://_vscodecontentref_/1) file and provide the secrets as shown in the `.env.example`:
    ```env
    BACKEND_URL=http://localhost:8000
    SESSION_SECRET=<your-session-secret>
    ```

### Running the Application

1. Navigate to the root directory:
    ```sh
    cd <repository-directory>
    ```

2. Run the application in development mode:
    ```sh
    npm run dev
    ```

Both the frontend and the backend will run in development mode.
- The backend will run at: http://localhost:8000
- The frontend will run at: http://localhost:3000