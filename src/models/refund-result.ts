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
 * @interface RefundResult
 */
export interface RefundResult {
    /**
     * 
     * @type {boolean}
     * @memberof RefundResult
     */
    success?: boolean;
    /**
     * 
     * @type {string}
     * @memberof RefundResult
     */
    result?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RefundResult
     */
    status?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RefundResult
     */
    statusCode?: string | null;
    /**
     * 
     * @type {Array<StringStringStringBooleanValueTuple>}
     * @memberof RefundResult
     */
    errors?: Array<StringStringStringBooleanValueTuple> | null;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof RefundResult
     */
    customProperties?: { [key: string]: string; } | null;
    /**
     * 
     * @type {string}
     * @memberof RefundResult
     */
    responseCode?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RefundResult
     */
    responseMessage?: string | null;
}
