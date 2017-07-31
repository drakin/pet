Ext.onReady(function () {
    var Pet = Ext.data.Record.create([
        {name: 'id', type: 'integer'},
        {
            name: 'name',
            type: 'string'
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
        encode: false
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

    Ext.data.DataProxy.addListener('exception', function(proxy, type, action, options, res) {
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
        store: store,
        columns: [
            {
                header: "NAME",
                width: 170,
                sortable: true,
                dataIndex: 'name',
                editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }
            }
        ],
        viewConfig: {forcefit: true},
        plugins: [editor],
        title: 'Pets',
        height: "700",
        width: "100%",
        frame: true,
        tbar: [{
            iconCls: 'icon-add',
            text: 'Add Pet',
            handler: function () {
                var e = new Pet({
                    id : 0,
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
        }
        ]
    });

    grid.render('pet-grid');
});