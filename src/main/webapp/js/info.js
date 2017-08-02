Ext.onReady(function () {
    new Ext.grid.PropertyGrid({
        id : 'ownerInfo',
        title: 'Owner Info',
        autoHeight: true,
        width: 300,
        renderTo: 'east-region-container'
    });
});