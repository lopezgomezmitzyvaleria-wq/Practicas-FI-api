import { NextResponse } from "next/server";
import { getConnection, sql } from "@/lib/db";

export const runtime = "nodejs";


export async function GET() {
    try {
        const pool = await getConnection();

        const resultado = await pool.request().query(
            "SELECT [nombre_chofer],[capacidad_max],[placa],[empresa],tipo_transporte FROM [Practicas_FI].[dbo].[Transporte] t inner join tipo_transporte  tt on t.tipo_transporte_id=tt.tipo_transporte_id"
        );

        return NextResponse.json({
            status: "success",
            data: resultado.recordset
        });

    } catch (error) {
        console.error("Ocurrió un error al consultar transportes");
        return NextResponse.json(
            {
                status: "error",
                message: "No fue posible consultar los registros de transportes",
                detalle: error.message
            },
            { status: 500 }
        );
    }
}