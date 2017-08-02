Ext.onReady(function () {
    function recordConverter(record) {
        var owner;
        if (record.data.ownerId == null && record.data.ownerName == null) {
            owner = null;
        } else {
            owner = {
                id: record.data.ownerId,
                name: record.data.ownerName
            }
        }
        return {
            id: record.data.id,
            name: record.data.name,
            photoUrl: record.data.photoUrl,
            price: record.data.price,
            owner: owner
        }
    }

    var Pet = Ext.data.Record.create([
        {name: 'id', type: 'integer'},
        {
            name: 'name',
            type: 'string',
            allowBlank: false
        }, {
            name: 'photoUrl',
            type: 'string'
        }, {
            name: 'price',
            type: 'double'
        },
        {
            name: 'ownerId',
            type: 'integer',
            mapping: function (val) {
                return val.owner ? val.owner.id : null;
            },
            useNull: true
        }, {
            name: 'ownerName',
            type: 'string',
            mapping: function (val) {
                return val.owner ? val.owner.name : null;
            },
            useNull: true
        }, {
            name: 'ownerPhotoUrl',
            type: 'string',
            mapping: function (val) {
                return val.owner ? val.owner.photoUrl : null;
            },
            useNull: true
        }
    ]);

    var proxy = new Ext.data.HttpProxy({
        url: "api/pets",
        type: "ajax",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });

    var reader = new Ext.data.JsonReader({
            type: "json",
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'id',
            root: 'data',
            messageProperty: 'message'
        },
        Pet);

    var writer = new Ext.data.JsonWriter({
        type: "json",
        encode: false,
        writeAllFields: true,
        updateRecord: function (record) {
            return recordConverter(record)
        }
    });

    // Typical Store collecting the Proxy, Reader and Writer together.
    var store = new Ext.data.Store({
        proxy: proxy,
        reader: reader,
        writer: writer,
        autoLoad: true,
        autoSync: true,
        autoSave: true,
        restful: true
    });

    store.load();

    Ext.data.DataProxy.addListener('exception', function (proxy, type, action, options, res) {
        Ext.Msg.show({
            title: 'ERROR',
            msg: res.message,
            icon: Ext.MessageBox.ERROR,
            buttons: Ext.Msg.OK
        });
    });


    var editor = new Ext.ux.grid.RowEditor({
        saveText: 'Update'
    });


    // create grid
    var grid = new Ext.grid.GridPanel({
        renderTo: 'cetner-region-container',
        store: store,
        columns: [
            {
                header: "NAME",
                width: 170,
                sortable: true,
                dataIndex: 'name',
                align: "center",
                css: "vertical-align: middle;",
                editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }
            }, {
                header: "PHOTO",
                width: 170,
                sortable: false,
                dataIndex: 'photoUrl',
                fixed: true,
                align: "center",
                renderer: function (value) {
                    if (value) {
                        return '<img width="170" src="' + value + '" />';
                    } else {
                        return '<img width="170" src="' + Ext.BLANK_IMAGE_URL + '" />';
                    }
                },
                editor: {
                    xtype: 'textfield'
                }
            }, {
                header: "PRICE",
                width: 170,
                sortable: true,
                dataIndex: 'price',
                css: "vertical-align: middle;",
                renderer: Ext.util.Format.usMoney,
                align: "center",
                editor: {
                    xtype: 'textfield'
                }
            }, {
                header: "OWNER",
                width: 170,
                sortable: true,
                dataIndex: 'ownerName',
                css: "vertical-align: middle;",
                align: "center"
            }
        ],
        viewConfig: {forcefit: true},
        plugins: [editor],
        height: "700",
        width: "100%",
        tbar: [{
            iconCls: 'icon-add',
            text: 'Add Pet',
            handler: function () {
                var e = new Pet({
                    name: 'Name'
                });
                editor.stopEditing();
                store.insert(0, e);
                grid.getView().refresh();
                grid.getSelectionModel().selectRow(0);
                editor.startEditing(0);
            }
        }, {
            iconCls: 'icon-delete',
            text: 'Remove Pet',
            handler: function () {
                editor.stopEditing();
                var s = grid.getSelectionModel().getSelections();
                for (var i = 0, r; r = s[i]; i++) {
                    store.remove(r);
                }
            }
        }, {
            xtype: 'tbfill'
        }, {
            xtype: 'textfield',
            emptyText: 'Enter pet name',
            enableKeyEvents: true,
            listeners: {
                keyup: function (obj) {
                    grid.store.filter('name', obj.getValue(), true, false);
                }
            }
        }
        ],
        listeners: {
            viewready: function (thisGrid) {
                thisGrid.getSelectionModel().selectFirstRow();
            }
        },
        sm: new Ext.grid.RowSelectionModel({
            listeners: {
                rowselect: function (thisGrid, selectedIndex, data) {
                    var infoGrid = Ext.getCmp('ownerInfo');
                    if (data.data.ownerName) {
                        infoGrid.setSource({name: data.data.ownerName});
                        infoGrid.getView().refresh();
                    } else {
                        infoGrid.setSource({name: ""});
                        infoGrid.getView().refresh();
                    }
                    if (data.data.ownerPhotoUrl) {
                        document.getElementById('ownerPhoto').src = data.data.ownerPhotoUrl;
                    } else {
                        document.getElementById('ownerPhoto').src = Ext.BLANK_IMAGE_URL;
                    }
                }

            }
        })
    });

});