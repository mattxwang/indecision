/* tslint:disable */
/* eslint-disable */
/**
* @param {string} cnf_input
* @param {any} vtree_type_input
* @returns {any}
*/
export function vtree(cnf_input: string, vtree_type_input: any): any;
/**
* @param {string} cnf_input
* @returns {string}
*/
export function bdd(cnf_input: string): string;
/**
* @param {string} cnf_input
* @param {BigUint64Array} order
* @returns {string}
*/
export function bdd_with_var_order(cnf_input: string, order: BigUint64Array): string;
/**
* @param {string} cnf_input
* @param {any} vtree_type_input
* @returns {any}
*/
export function sdd(cnf_input: string, vtree_type_input: any): any;
