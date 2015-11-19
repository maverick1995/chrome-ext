/*

Siesta 2.0.5
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
Ext.define('Siesta.Harness.Browser.UI.TestGrid', {
    extend : 'Ext.tree.Panel',
    alias  : 'widget.testgrid',

    requires    : [
        'Siesta.Harness.Browser.UI.FilterableTreeView'
    ],

    // TODO seems there's 4.2.0 bug related to stateful
    stateful    : false,
    forceFit    : true,
    rootVisible : false,
    header      : false,
    rowLines    : false,

    cls                 : 'tr-testgrid',
    width               : 300,
    lines               : false,
    filter              : null,
    enableColumnMove    : false,
    title               : 'Double click a test to run it',
    filterGroups        : false,
    viewType            : 'filterabletreeview',
    resultSummary       : null,
    
    stateConfig         : null,
    
    expanded            : true,
    coverageReportButton    : null,


    initComponent : function () {
        var me = this;

        Ext.apply(this, {

            viewConfig : {
                store               : this.store.nodeStore,
                enableTextSelection : true,
                toggleOnDblClick    : false,
                markDirty           : false,
                trackOver           : false,

                // HACK, prevent layouts on update of a row
                onUpdate            : function () {
                    this.refreshSize = Ext.emptyFn;
                    var val = Ext.tree.View.prototype.onUpdate.apply(this, arguments);
                    this.refreshSize = Ext.tree.View.prototype.refreshSize;

                    return val;
                }
            },

            columns : [
                {
                    xtype    : 'treecolumn',
                    header   : 'Name',
                    sortable : false,

                    dataIndex    : 'title',
                    menuDisabled : true,
                    width        : 180,
                    renderer     : this.treeColumnRenderer,
                    tdCls        : 'test-name-column',
                    scope        : this
                },
                { header : 'Pass', width : 30, sortable : false, tdCls : 'x-unselectable', menuDisabled : true, dataIndex : 'passCount', align : 'center', renderer : this.passedColumnRenderer, scope : this },
                { header : 'Fail', width : 30, sortable : false, tdCls : 'x-unselectable', menuDisabled : true, dataIndex : 'failCount', align : 'center', renderer : this.failedColumnRenderer, scope : this }
//                { header : 'Time', width : 50, sortable : false, dataIndex : 'time', align : 'center', hidden : true }
            ],

            tbar : {
                height : 44,
                border : false,
                cls    : 'main-tbar',
                items  : [
                    {
                        xtype           : 'treefilter',
                        emptyText       : 'Filter tests',
                        
                        itemId          : 'trigger',
                        filterGroups    : this.filterGroups,
                        filterField     : 'title',
                        
                        store           : this.store,
                        
                        width           : 180,
                    
                        cls             : 'filterfield',
                        height          : 30,
                        flex            : 1,

                        trigger1Cls     : 'icon-close',
                        triggerLeafCls  : 'icon-file-2',
                        triggerGroupCls : 'icon-folder'
                    },
                    {
                        width       : 14,
                        cls         : 'toggle-expand',
                        tooltip     : 'Expand / Collapse all',
                        tooltipType : 'title',
                        scope       : this,
                        margin      : '0 0 0 1',

                        handler : function () {
                            this.expanded = !this.expanded;

                            if (this.expanded) {
                                this.expandAll()
                            } else {
                                this.collapseAll()
                            }
                        }
                    }
                ]
            },

            bbar : {
                xtype  : 'container',
                layout : 'hbox',
                items  : [
                    {
                        xtype    : 'toolbar',
                        cls      : 'main-bbar',
                        border   : false,
                        flex     : 1,
                        defaults : {
                            height      : 30,
                            width       : 30,
                            tooltipType : 'title'
                        },

                        items : [
                            {
                                cls        : 'tr-icon-run-checked',
                                iconCls    : 'icon-play',
                                tooltip    : 'Run checked',
                                actionName : 'run-checked',
                                scope      : this,
                                handler    : this.onBtnClicked
                            },
                            {
                                iconCls    : 'icon-forward tr-icon-run-all',
                                tooltip    : 'Run all',
                                actionName : 'run-all',
                                scope      : this,
                                handler    : this.onBtnClicked
                            },
                            {
                                iconCls    : 'icon-play tr-icon-run-failed',
                                tooltip    : 'Run failed',
                                actionName : 'run-failed',
                                scope      : this,
                                handler    : this.onBtnClicked
                            },
                            '->',
                            {
                                tooltip         : 'Show coverage report',
                                action          : 'show-coverage',
                                iconCls         : 'icon-book',
                                width           : 24,
                                disabled        : true,
                                scope           : this,
                                handler         : this.onShowCoverageReport
                            },
                            {
                                tooltip : 'Options...',
                                cls     : 'tr-icon-options',
                                iconCls : 'icon-cog',
                                width   : 38,
                                action  : 'options',
                                menu    : {
                                    itemId    : 'tool-menu',
                                    defaults  : {
                                        scope        : this,
                                        checkHandler : this.onOptionChange
                                    },
                                    listeners : {
                                        beforeshow : this.onSettingsMenuBeforeShow,
                                        scope      : this
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype     : 'component',
                        cls       : 'summary-bar',
                        border    : false,
                        width     : 65,
                        itemId    : 'result-summary',
                        renderTpl : '<div><span class="total-pass">{pass}</span><span class="icon-checkmark"></span></div><div><span class="total-fail">{fail}</span><span class="icon-bug"></span></div>'
                    }
                ]
            }
        })

        this.callParent(arguments);
        
        var me          = this
        
        this.store.on({
            'filter-set'        : function () {
                me.down('[cls="toggle-expand"]').disable()
            },
            'filter-clear'      : function () {
                me.down('[cls="toggle-expand"]').enable()
            }            
        })
        
        this.getView().on('beforerefresh', function () {
            var trigger     = me.down('trigger')
            
            if (me.filterGroups)    trigger.setFilterGroups(me.filterGroups)
            if (me.filter)          trigger.setValue(me.filter)

            // fixes wrong widths of the columns
            // TODO remove after upgrade of UI to 4.2.1 or later
            if (!me.filter) setTimeout(function () {
                me.doLayout()
            }, 10)

            // cancel refresh if there's a filter - in this case an additional refresh will be triggered by 
            // the filtering which will be already not canceled since this is 1 time listener
            return !me.filter
        }, null, { single : true })

        this.coverageReportButton = this.down('[action=show-coverage]');
    },

    
    getFilterValue : function () {
        return this.down('trigger').getValue()
    },


    getFilterGroups : function () {
        return this.down('trigger').getFilterGroups()
    },
    
    
    treeColumnRenderer : function (value, metaData, testFile, rowIndex, colIndex, store) {
        metaData.tdCls = 'tr-test-status '
        var cls = '';

        if (testFile.isLeaf()) {

            var test = testFile.get('test')

            if (test) {

                if (testFile.get('isFailed'))
                    cls = 'icon-flag'

                else if (testFile.get('isRunning') && !test.isFinished())
                    cls = 'icon-lightning'
                else if (test.isFinished()) {

                    if (test.isPassed())
                        cls = 'icon-checkmark'
                    else
                        cls = 'icon-bug'
                } else
                    cls = 'icon-busy'

            } else {

                if (testFile.get('isMissing'))
                    cls = 'icon-close'
                else if (testFile.get('isStarting'))
                    cls = 'icon-busy'
                else
                    cls = 'icon-file-2'
            }
        } else {
            cls = (testFile.data.expanded ? 'icon-folder-open' : 'icon-folder') + ' tr-folder-' + testFile.get('folderStatus')
        }
        return '<span class="test-icon ' + cls + '"></span>' + value;
    },


    passedColumnRenderer : function (value, meta, record) {
        if (!record.isLeaf()) return ''

        if (record.data.todoPassCount > 0) {
            value += ' <span title="' + record.data.todoPassCount + ' todo assertion(s) passed" class="tr-test-todo tr-test-todo-pass">+ ' + record.data.todoPassCount + '</span>';
        }
        return value;
    },


    failedColumnRenderer : function (value, meta, record) {
        if (!record.isLeaf()) return ''

        if (record.data.todoFailCount > 0) {
            value += ' <span title="' + record.data.todoFailCount + ' todo assertion(s) failed" class="tr-test-todo tr-test-todo-fail">+ ' + record.data.todoFailCount + '</span>';
        }
        return value;
    },

    onBtnClicked : function (btn) {
        if (btn.actionName) {
            this.fireEvent('buttonclick', this, btn, btn.actionName);
        }
    },

    onSettingsMenuBeforeShow : function (menu) {
        this.fireEvent('beforesettingsmenushow', this, menu);
    },

    onOptionChange : function (button, state) {
        this.fireEvent('optionchange', this, button.option, state);
    },

    // Add menu items lazily
    addMenuItems   : function () {
        var state = this.stateConfig;

        this.down('#tool-menu').add([
            {
                text    : 'View DOM',
                option  : 'viewDOM',
                checked : state.viewDOM
            },
            {
                text    : 'Transparent exceptions',
                option  : 'transparentEx',
                checked : state.transparentEx
            },
            {
                text    : 'Cache preloads',
                option  : 'cachePreload',
                checked : state.cachePreload
            },
            {
                text    : 'Auto launch',
                option  : 'autoRun',
                checked : state.autoRun
            },
            {
                text    : 'Keep results',
                option  : 'keepResults',
                checked : state.keepResults
            },
            {
                text    : 'Speed run',
                option  : 'speedRun',
                checked : state.speedRun
            },
            {
                text    : 'Break on fail',
                option  : 'breakOnFail',
                checked : state.breakOnFail
            },
            { xtype : 'menuseparator' },
            {
                text    : 'About Siesta',
                handler : function () {
                    new Siesta.Harness.Browser.UI.AboutWindow().show();
                }
            },
            {
                text       : 'Siesta Documentation',
                href       : 'http://bryntum.com/docs/siesta',
                hrefTarget : '_blank'
            }
        ]);
    },

    afterRender : function () {
        this.callParent(arguments);

        this.resultSummary = this.down('#result-summary');
        this.down('[action=options]').el.on('mousedown', this.addMenuItems, this, { single : true });
    },

    updateStatus : function (pass, fail) {
        var el = this.resultSummary.el;

        el.update(this.resultSummary.renderTpl.apply({ pass : pass, fail : fail }));
    },

    enableCoverageButton : function () {
        this.coverageReportButton.enable()
    },

    disableCoverageButton : function () {
        this.coverageReportButton.disable()
    },

    onShowCoverageReport : function () {
        this.fireEvent('showcoverageinfo', this);
    }
})
