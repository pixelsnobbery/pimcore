
pimcore.registerNS("pimcore.document.printpage");
pimcore.document.printpage = Class.create(pimcore.document.printabstract, {

    urlprefix: "/admin/",
    type: "printpage",

    init: function () {

        this.edit = new pimcore.document.edit(this);

        if (this.isAllowed("settings")) {
            this.settings = new pimcore.document.snippets.settings(this, "printpage");
            this.notes = new pimcore.element.notes(this, "document");
        }
        if (this.isAllowed("properties")) {
            this.properties = new pimcore.document.properties(this, "document");
        }
        if (this.isAllowed("versions")) {
            this.versions = new pimcore.document.versions(this);
        }

        this.dependencies = new pimcore.element.dependencies(this, "document");
        this.preview = new pimcore.document.pages.preview(this);
        this.pdfpreview = new pimcore.document.printpages.pdfpreview(this);
    },

    getTabPanel: function () {
        var items = [];
        items.push(this.edit.getLayout());
        items.push(this.preview.getLayout());
        items.push(this.pdfpreview.getLayout());
        if (this.isAllowed("settings")) {
            items.push(this.settings.getLayout());
        }
        if (this.isAllowed("properties")) {
            items.push(this.properties.getLayout());
        }
        if (this.isAllowed("versions")) {
            items.push(this.versions.getLayout());
        }

        items.push(this.dependencies.getLayout());

        if (this.isAllowed("settings")) {
            items.push(this.notes.getLayout());
        }

        this.tabbar = new Ext.TabPanel({
            tabPosition: "top",
            region:'center',
            deferredRender:true,
            enableTabScroll:true,
            defaults: {autoScroll:true},
            border: false,
            items: items,
            activeTab: 0
        });
        return this.tabbar;
    }

});

