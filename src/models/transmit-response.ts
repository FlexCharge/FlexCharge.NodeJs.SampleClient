/* tslint:disable */
/* eslint-disable */
/**
 * flexCharge-service
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { StringStringStringBooleanValueTuple } from './string-string-string-boolean-value-tuple';
/**
 *
 * @export
 * @interface TransmitResponse
 */
export interface TransmitResponse {
    /**
     *
     * @type {boolean}
     * @memberof TransmitResponse
     */
    success?: boolean;
    /**
     *
     * @type {string}
     * @memberof TransmitResponse
     */
    result?: string | null;
    /**
     *
     * @type {string}
     * @memberof TransmitResponse
     */
    status?: number;
    /**
     *
     * @type {string}
     * @memberof TransmitResponse
     */
    statusCode?: string | null;
    /**
     *
     * @type {Array<StringStringStringBooleanValueTuple>}
     * @memberof TransmitResponse
     */
    errors?: Array<StringStringStringBooleanValueTuple> | null;
    /**
     *
     * @type {{ [key: string]: string; }}
     * @memberof TransmitResponse
     */
    customProperties?: { [key: string]: string; } | null;
    /**
     *
     * @type {string}
     * @memberof TransmitResponse
     */
    transmitId?: string;
}
