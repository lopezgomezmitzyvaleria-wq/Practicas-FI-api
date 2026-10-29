import { NextResponse } from "next/server";
import { getConnection, sql } from "@/lib/db";

export const runtime = "nodejs";


export async function GET() {
    try {
        const pool = await getConnection();

        const resultado = await pool.request().query(
            "SELECT [practica_id] ,[Presupuesto] ,[Viaticos],[fecha_inicio],[fecha_fin],[destino] FROM [dbo].[Practica]"
        );

        return NextResponse.json({
            status:"success",
            data: resultado.recordset
        });

    } catch (error) {
        console.error("Ocurrió un error al consultar prácticas");
        return NextResponse.json(
            {
                status: "error",
                message: "No fue posible consultar los registros de prácticas",
                detalle: error.message
            },
            { status: 500 }
        );
    }
}


export async function POST(request) {
    try {
        const datos = await request.json();
        const {
            transporte_id,
                    tipo_transporte_id,
                    nombre_chofer,
                    capacidad_max,
                    placa,
                    empresa
        } = datos;

        //Mecanismos de protección

        const pool = await getConnection();

        const resultado = await pool.request()
            .input("transporte_id", sql.Int,transporte_id)
            .input("tipo_transporte", sql.Int, tipo_transporte_id)
            .input("chofer", sql.NVarChar(30), nombre_chofer)
            .input("capacidad", sql.Int, capacidad_max)
            .input("placas", sql.NVarChar(20), placa)
            .input("empresa", sql.NVarChar(100), empresa)
            .query(`INSERT INTO dbo.Transporte (
                    transporte_id,
                    tipo_transporte_id,
                    nombre_chofer,
                    capacidad_max,
                    placa,
                    empresa
                )
                OUTPUT

                    INSERTED.transporte_id,
                    INSERTED.tipo_transporte_id,
                    INSERTED.nombre_chofer,
                    INSERTED.capacidad_max,
                    INSERTED.placa,
                    INSERTED.empresa
                VALUES
                    (
                    @transporte_id,
                    @tipo_transporte,
                    @chofer,
                    @capacidad,
                    @placas,
                    @empresa
                    )
                `
            );

        return NextResponse.json(
            {
                status: "success",
                message: "Registraste el transporte correctamente",
                data: resultado.recordset[0]
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                status: "error",
                message: "Ocurrió un error al insertar el transporte"
            }
        );

    }

}
