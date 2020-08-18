import {Literal} from "@opennetwork/rdf-data-model";
import {literalDataTypes, TypedLiteral, TypedLiteralOutput} from "./namespace"
import * as ns from "./namespace"

export function isTypedLiteral(literal: Literal): literal is TypedLiteral {
    return !!literalDataTypes.find(dataType => dataType.equals(literal.datatype))
}

export function isTypedLiteralOutput<L extends TypedLiteral>(literal: L, output: unknown): output is TypedLiteralOutput<L> {
    if (ns.string.equals(literal.datatype)) {
        return typeof output === "string"
    }
    if (ns.boolean.equals(literal.datatype)) {
        return typeof output === "boolean"
    }
    if (ns.integer.equals(literal.datatype)) {
        return typeof output === "bigint"
    }
    if (ns.double.equals(literal.datatype)) {
        return typeof output === "number"
    }
    if (ns.dateTimeStamp.equals(literal.datatype)) {
        return output instanceof Date
    }
    return false
}

export function literalValue<L extends TypedLiteral>(literal: L): TypedLiteralOutput<L> {
    const output = value(literal)

    if (!isTypedLiteralOutput(literal, output)) {
        throw new Error("Did not expect to get this error, it is a type guard, please report this on github")
    }

    return output

    function value(literal: L): unknown {
        if (ns.string.equals(literal.datatype)) {
            return literal.value
        }
        if (ns.boolean.equals(literal.datatype)) {
            return literal.value === "true"
        }
        if (ns.integer.equals(literal.datatype)) {
            return BigInt(literal.value)
        }
        if (ns.double.equals(literal.datatype)) {
            return +literal.value
        }
        if (ns.dateTimeStamp.equals(literal.datatype)) {
            return new Date(literal.value)
        }
        throw new Error(`Unknown datatype ${literal.datatype}`)
    }
}
