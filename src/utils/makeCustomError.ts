import {HttpError} from "http-errors";
import {CustomError} from "@/utils/customError.util";

export function makeCustomError(err: unknown){
    const error = err as HttpError

    return new CustomError(error.name, error.message, error.statusCode);

}