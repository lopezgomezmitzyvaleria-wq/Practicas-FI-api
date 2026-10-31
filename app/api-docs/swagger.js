export const swaggerSpec = {
    openapi: "3.0.3",

    info: {
        title: "API de Practicas",
        version: "1.0.0",
        description: "API desarrollada con Next.js y SQL Server."
    },

    servers: [
        {
            url: "/",
            description: "Servidor actual"
        }
    ],

    paths: {
        "/api/Practicas_FI": {
            get: {
                summary: "Consultar Practicas",
                tags: ["Practicas"],

                responses: {
                    "200": {
                        description: "Consulta exitosa"
                    },
                    "500": {
                        description: "Error de servidor"
                    }
                }
            },
            post: {
                summary: "Registrar practica",
                tags: ["Practicas"],

                requestBody: {
                    required: true,

                    content: {
                        "application/json": {
                            schema: {
                                type: "object",

                                required: [
                                    "id_profesor",
                                    "tipo_transporte",
                                    "chofer",
                                    "capacidad",
                                    "placas",
                                    "empresa"
                                ],

                                properties: {
                                    transporte_id: {
                                        type: "int",
                                        example: "15"
                                    },
                                    tipo_transporte_id: {
                                        type: "int",
                                        example: "2"
                                    },
                                    nombre_chofer: {
                                        type: "string",
                                        example: "Pérez"
                                    },
                                    capacidad_max: {
                                        type: "int",
                                        example: "20"
                                    },
                                    placa: {
                                        type: "string",
                                        example: "528-458-st"
                                    },
                                    empresa: {
                                        type: "string",
                                        example: "abb"

                                    }
                                }
                            }
                        }
                    }
                },

                responses: {
                    "201": {
                        description: "A registrado"
                    },
                    "400": {
                        description: "Datos inválidos"
                    },
                    "409": {
                        description: "Registro duplicado"
                    },
                    "500": {
                        description: "Error de servidor"
                    }
                }
            }
        },
        "/api/Transportes": {
            get: {
                summary: "Consultar Transportes",
                tags: ["Transportes"],
                description: "Devuelve la lista de todos los transportes registrados.",
                responses: {
                    "200": {
                        description: "Consulta exitosa de transportes"
                    },
                    "500": {
                        description: "Error de servidor"
                    }
                }
            }
        },

        "/api/Practicas_FI/con-direccion": {
            post: {
                summary: "Registrar transporte",
                description:
                    "Ejecuta el procedimiento almacenado sp_RegistrarTransporte",
                tags: ["Transportes"],

                requestBody: {
                    required: true,

                    content: {
                        "application/json": {
                            schema: {
                                type: "object",

                                required: [
                                    "id_profesor",
                                    "tipo_transporte",
                                    "chofer",
                                    "capacidad",
                                    "placas",
                                    "empresa"
                                ],

                                properties: {
                                    id_profesor: {
                                        type: "int",
                                        example: "1"
                                    },
                                    tipo_transporte: {
                                        type: "int",
                                        example: "2"
                                    },
                                    chofer: {
                                        type: "string",
                                        example: "Pérez"
                                    },
                                    capacidad: {
                                        type: "int",
                                        example: "20"
                                    },
                                    placas: {
                                        type: "string",
                                        example: "528-458-st"
                                    },
                                    empresa: {
                                        type: "string",
                                        example: "abb"

                                    }
                                }
                            }
                        }
                    },

                    responses: {
                        "201": {
                            description: "Transporte y datos registrados"
                        },
                        "400": {
                            description: "Datos inválidos"
                        },
                        "409": {
                            description: "Registro duplicado"
                        },
                        "500": {
                            description: "Error de servidor"
                        }
                    }
                }
            }
        }
    }
}