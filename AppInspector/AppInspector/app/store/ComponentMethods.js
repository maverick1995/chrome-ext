/*
 * File: app/store/ComponentMethods.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('AI.store.ComponentMethods', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.util.Sorter',
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'ComponentMethods',
            data: [
                {
                    name: 'Name 1',
                    value: 'Value 1',
                    isOverride: false,
                    isOwn: false
                },
                {
                    name: 'Name 2',
                    value: 'Value 2',
                    isOverride: false,
                    isOwn: true
                },
                {
                    name: 'Name 3',
                    value: 'Value 3',
                    isOverride: false,
                    isOwn: false
                },
                {
                    name: 'Name 4',
                    value: 'Value 4',
                    isOverride: true,
                    isOwn: true
                },
                {
                    name: 'Name 5',
                    value: 'Value 5',
                    isOverride: true,
                    isOwn: false
                },
                {
                    name: 'Name 6',
                    value: 'Value 6',
                    isOverride: false,
                    isOwn: true
                },
                {
                    name: 'Name 7',
                    value: 'Value 7',
                    isOverride: false,
                    isOwn: true
                },
                {
                    name: 'Name 8',
                    value: 'Value 8',
                    isOverride: false,
                    isOwn: true
                },
                {
                    name: 'Name 9',
                    value: 'Value 9',
                    isOverride: true,
                    isOwn: true
                },
                {
                    name: 'Name 10',
                    value: 'Value 10',
                    isOverride: false,
                    isOwn: false
                },
                {
                    name: 'Name 11',
                    value: 'Value 11',
                    isOverride: true,
                    isOwn: false
                },
                {
                    name: 'Name 12',
                    value: 'Value 12',
                    isOverride: true,
                    isOwn: false
                },
                {
                    name: 'Name 13',
                    value: 'Value 13',
                    isOverride: false,
                    isOwn: false
                },
                {
                    name: 'Name 14',
                    value: 'Value 14',
                    isOverride: true,
                    isOwn: true
                },
                {
                    name: 'Name 15',
                    value: 'Value 15',
                    isOverride: false,
                    isOwn: true
                },
                {
                    name: 'Name 16',
                    value: 'Value 16',
                    isOverride: true,
                    isOwn: true
                },
                {
                    name: 'Name 17',
                    value: 'Value 17',
                    isOverride: false,
                    isOwn: true
                },
                {
                    name: 'Name 18',
                    value: 'Value 18',
                    isOverride: true,
                    isOwn: true
                },
                {
                    name: 'Name 19',
                    value: 'Value 19',
                    isOverride: false,
                    isOwn: true
                },
                {
                    name: 'Name 20',
                    value: 'Value 20',
                    isOverride: true,
                    isOwn: false
                }
            ],
            sorters: {
                property: 'name'
            },
            fields: [
                {
                    name: 'name',
                    type: 'string'
                },
                {
                    name: 'value',
                    type: 'auto'
                },
                {
                    defaultValue: null,
                    name: 'isOverride',
                    type: 'boolean',
                    useNull: true
                },
                {
                    defaultValue: null,
                    name: 'isOwn',
                    type: 'boolean',
                    useNull: true
                }
            ]
        }, cfg)]);
    }
});