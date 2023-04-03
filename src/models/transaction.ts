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
/**
 *
 * @export
 * @interface Transaction
 */
export interface Transaction {
    /**
     *
     * @type {string}
     * @memberof Transaction
     */
    id: string;
    /**
     *
     * @type {Date}
     * @memberof Transaction
     */
    timestampUtc: Date | string;
    /**
     *
     * @type {number}
     * @memberof Transaction
     */
    timezoneUtcOffset: number;
    /**
     *
     * @type {string}
     * @memberof Transaction
     */
    transactionType?: string | null;
    /**
     *
     * @type {number}
     * @memberof Transaction
     */
    amount: number;
    /**
     *
     * @type {string}
     * @memberof Transaction
     */
    currency: string;
    /**
     *
     * @type {string}
     * @memberof Transaction
     */
    responseCode: string;
    /**
     *
     * @type {string}
     * @memberof Transaction
     */
    responseDescription?: string | null;
    /**
     *
     * @type {string}
     * @memberof Transaction
     */
    responseStatus?: string | null;
    /**
     *
     * @type {string}
     * @memberof Transaction
     */
    responseSubStatus?: string | null;
    /**
     *
     * @type {string}
     * @memberof Transaction
     */
    responseCodeSource: string;
    /**
     *
     * @type {string}
     * @memberof Transaction
     */
    processorName?: string | null;
    /**
     *
     * @type {string}
     * @memberof Transaction
     */
    avsResultCode: string;
    /**
     *
     * @type {string}
     * @memberof Transaction
     */
    cvvResultCode: string;
    /**
     *
     * @type {string}
     * @memberof Transaction
     */
    cavvResultCode: string;
    /**
     *
     * @type {boolean}
     * @memberof Transaction
     */
    cardNotPresent: boolean;
}
