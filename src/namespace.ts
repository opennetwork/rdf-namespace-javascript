import {DefaultDataFactory, Literal} from "@opennetwork/rdf-data-model";

export const string = DefaultDataFactory.namedNode("http://www.w3.org/2001/XMLSchema#string")
export const double = DefaultDataFactory.namedNode("http://www.w3.org/2001/XMLSchema#double")
export const boolean = DefaultDataFactory.namedNode("http://www.w3.org/2001/XMLSchema#boolean")
export const integer = DefaultDataFactory.namedNode(`http://www.w3.org/2001/XMLSchema#integer`)
export const dateTimeStamp = DefaultDataFactory.namedNode("http://www.w3.org/2001/XMLSchema#dateTimeStamp")

export type LiteralInput =
    | string
    | number
    | boolean
    | BigInt
    | Date

export type LiteralDataType =
    | typeof string
    | typeof double
    | typeof boolean
    | typeof integer
    | typeof dateTimeStamp

export interface LiteralTypeMap {
    "http://www.w3.org/2001/XMLSchema#string": string
    "http://www.w3.org/2001/XMLSchema#double": number
    "http://www.w3.org/2001/XMLSchema#boolean": boolean
    "http://www.w3.org/2001/XMLSchema#integer": BigInt
    "http://www.w3.org/2001/XMLSchema#dateTimeStamp": Date
}

export type LiteralTypeMapKey<K extends string> = K extends keyof LiteralTypeMap ? LiteralTypeMap[K] : never

export interface TypedLiteral<Value extends string = string, Language extends string = string, DataType extends LiteralDataType = LiteralDataType> extends Literal<Value, Language, DataType> {

}

export const literalDataTypes: LiteralDataType[] = [
    string,
    double,
    boolean,
    integer,
    dateTimeStamp
]

export type TypedLiteralOutput<L extends TypedLiteral> = LiteralTypeMapKey<L["datatype"]["value"]>
