Ext.onReady(function () {
    new Ext.Panel({
        renderTo: document.body,
        width: "100%",
        height: 700,
        title: 'Pets',
        layout: 'border',
        items: [{
            region: 'east',
            margins: '5 0 0 5',
            width: 300,
            cmargins: '5 5 0 5',
            layout: 'hbox',
            id: 'east-region-container',
            xtype: 'container',
            style:  "text-align:center;",
            html: '<img id="ownerPhoto" width="170" src="'+Ext.BLANK_IMAGE_URL+'" />'
        }, {
            id: 'cetner-region-container',
            title: 'Center Region',
            flex: 1,
            region: 'center',
            xtype: 'container',
            layout: 'hbox',
            margins: '5 5 0 0'
        }]
    });
});