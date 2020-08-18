import { DefaultDataFactory, Literal } from "@opennetwork/rdf-data-model"
import * as ns from "./namespace"

export type LiteralInput =
    | string
    | number
    | boolean
    | BigInt
    | Date

export interface LiteralTypeMap {
    "http://www.w3.org/2001/XMLSchema#string": string
    "http://www.w3.org/2001/XMLSchema#double": number
    "http://www.w3.org/2001/XMLSchema#boolean": boolean
    "http://www.w3.org/2001/XMLSchema#integer": BigInt
    "http://www.w3.org/2001/XMLSchema#dateTimeStamp": Date
}

export function isLiteralInput(value: unknown): value is LiteralInput {
    return (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean" ||
        typeof value === "bigint" ||
        value instanceof Date
    )
}

export function literal(input: LiteralInput): Literal {
    if (typeof input === "string") {
        return new Literal(input, "", ns.string)
    } else if (typeof input === "number") {
        if (isNaN(input)) {
            throw new Error("Input is NaN")
        }
        // Double because xsd defines double as 64 bit float, which is what js uses _double-precision 64-bit binary format IEEE 754 _
        return new Literal(input.toString(), "", ns.double)
    } else if (typeof input === "boolean") {
        return new Literal(input.toString(), "", ns.boolean)
    } else if (typeof input === "bigint") {
        return new Literal(input.toString(), "", ns.integer)
    } else if (input instanceof Date) {
        return new Literal(input.toISOString(), "", ns.dateTimeStamp)
    }
    throw new Error("Expected one of string, number, boolean, bigint, or Date")
}
