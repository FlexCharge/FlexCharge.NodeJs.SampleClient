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
 * @interface Payer
 */
export interface Payer {
    /**
     * 
     * @type {string}
     * @memberof Payer
     */
    id?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof Payer
     */
    birthdate?: Date | null;
    /**
     * 
     * @type {string}
     * @memberof Payer
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof Payer
     */
    phone?: string | null;
}