import sql from 'mssql/msnodesqlv8';

const config = {
    connectionString:
        `Driver={ODBC Driver 18 for SQL Server};` +
        `Server=${process.env.DB_SERVER};` + 
        `Database=${process.env.DB_NAME};` +
        `Trusted_Connection=yes;` +
        `TrustServerCertificate=yes;`
};
//powershell como admin
//PS C:\Users\fiuna> winget --version
//PS C:\Users\fiuna> winget install --id Cloudflare.cloudflared -e
//correr api


let poolPromise;

export async function getConnection() {
    if (!poolPromise) {
        poolPromise = sql.connect(config).catch(error => {
            poolPromise = null;
            throw error;
        })
    }
    return poolPromise;
}

export { sql };