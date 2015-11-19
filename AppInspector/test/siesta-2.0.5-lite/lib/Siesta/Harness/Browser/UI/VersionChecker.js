/*

Siesta 2.0.5
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
Ext.define('Siesta.Harness.Browser.UI.VersionChecker', {
    extend      : 'Ext.AbstractPlugin',

    renderTo    : null,

    init : function(viewport) {
        if (Siesta.meta.VERSION) {
            viewport.on('render', this.onViewportRender, this, { delay : 3000 });
        }
    },

    onViewportRender : function() {

        Ext.data.JsonP.request({
            url         : 'http://bryntum.com/siesta_version',
            params      : { v : Siesta.meta.VERSION },
            scope       : this,
            callback    : this.onRequestCompleted
        });
    },

    onRequestCompleted : function(success, data) {
        if (success &&
            data &&
            data.name &&
            new Ext.Version(data.name).isGreaterThan(Siesta.meta.VERSION || '1.0.0'))
        {
            var btn = new Ext.Button({
                renderTo    : this.renderTo,
                style       : 'opacity:0;transition:opacity 1s;',
                text        : 'New Update Available...',
                cls         : 'light-button',
                action      : 'upgrade-siesta',
                handler     : function() { this.showWindow(data.name) },
                scope       : this
            });

            Ext.defer(function() {
                btn.el.setStyle('opacity', 1);
            }, 200);
        }
    },

    showWindow : function (latestVersion) {
        var win = new Ext.Window({
            cls         : 'changelog-window',
            title       : 'New version available for download! Current version: ' + (Siesta.meta.VERSION || '1.0.0'),
            bodyPadding : 5,
            modal       : true,
            width       : 500,
            height      : 380,
            closeAction : 'destroy',
            plain       : true,
            autoScroll  : true,
            buttons  : {
                padding : '10 13',
                style : 'background: transparent',

                items :[
                    {
                        cls         : 'light-button',
                        href        : 'http://www.bryntum.com/products/siesta/download-lite',
                        hrefTarget  : '_blank',
                        scale       : 'medium',
                        text        : 'Download v' + latestVersion + ' (Lite)'
                    },
                    {
                        cls         : 'light-button',
                        href        : 'http://bryntum.com/customerzone',
                        hrefTarget  : '_blank',
                        scale       : 'medium',
                        text        : 'Download v' + latestVersion + ' (Standard)'
                    },
                    {
                        text    : 'Cancel',
                        scale       : 'medium',
                        handler : function() { this.up('window').close(); }
                    }
                ]
            }
        })

        win.show();
        win.body.mask('Loading changelog...');
        Ext.data.Connection.prototype.useDefaultXhrHeader = false;

        Ext.Ajax.request({
            url         : 'http://bryntum.com/changelogs/_siesta.php',
            callback    : function(o, success, response) {
                win.body.unmask();

                if (success && response && response.responseText) {
                    win.body.update(response.responseText);
                } else {
                    win.body.update('Bummer! Failed to fetch changelog.');
                }
            }
        })

        Ext.data.Connection.prototype.useDefaultXhrHeader = true;
    }
});