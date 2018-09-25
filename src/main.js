import VueBootstrapTable from './VueBootstrapTable.vue';

var renderfu = function (colname, entry) {
    return '<div class="btn-group" role="group" >'+
        '  <button type="button" class="btn btn-sm btn-primary"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></button>'+
        '  <button type="button" class="btn btn-sm btn-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>'+
        '</div><span>'+JSON.stringify(entry)+'</span>';
};

var handleRow = function (event, entry) {
    console.log("CLICK ROW: " + JSON.stringify(entry));
};

new Vue({
    el: '#app',
    components: {
        VueBootstrapTable,
    },
    data: {
        logging: [],
        showFilter: true,
        showPicker: true,
        paginated: true,
        multiColumnSortable: true,
        handleRowFunction: handleRow,
        columnToSortBy:"stix_id",
        ajax: {
            enabled: false,
            url: "http://localhost:8081/",
            method: "POST",
            delegate: true
        },
        columns: [
            {
              title: 'STIX ID',
              name: 'stix_id'
            },
            {
              title: 'Object Type',
              name: 'object_type'
            },            
            {
              title: 'Field',
              name: 'field' ,
            },
            {
              title: 'Action Date',
              name: 'action_date' ,
            },
            {
              title: 'Value',
              name: 'value'
            },
            {
              title: 'Action',
              name: 'action'
            },
          ],
        values: [
            {
              "stix_id": "S1",
              "object_type": "Indicator",
              "field": "F1",
              "action_date": "091718",
              "value": "V1",
              "action": "Confirm",
            },
            {
              "stix_id": "S1",
              "object_type": "Indicator",
              "field": "F2",
              "action_date": "091718",
              "value": "V2",
              "action": "Confirm",
            },
            {
              "stix_id": "S2",
              "object_type": "Indicator",
              "field": "F3",
              "action_date": "091718",
              "value": "V3",
              "action": "Redact",
            },
            {
              "stix_id": "S2",
              "object_type": "Indicator",
              "field": "F4",
              "action_date": "091718",
              "value": "V4",
              "action": "Not PII",
            }, 
            {
              "stix_id": "S3",
              "object_type": "Indicator",
              "field": "F5",
              "action_date": "091718",
              "value": "V4",
              "action": "Edit",
            },

          ]
    },
    created: function () {
        var self = this;
        this.$on('cellDataModifiedEvent',
            function( originalValue, newValue, columnTitle, entry) {
                self.logging.push("cellDataModifiedEvent - Original Value : " + originalValue +
                                         " | New Value : " + newValue +
                                         " | Column : " + columnTitle +
                                         " | Complete Entry : " +  entry );
            }
        );
        this.$on('ajaxLoadedEvent',
            function( data ) {
                this.logging.push("ajaxLoadedEvent - data : " + data );
            }
        );
        this.$on('ajaxLoadingError',
            function( error ) {
                this.logging.push("ajaxLoadingError - error : " + error );
            }
        );
    },
    methods: {
        refreshTable: function(){
            this.$refs.exampleTable.refresh();
        },
        setNewPageSize:function(){
            this.$refs.exampleTable.setPageSize(1);
        },
        addItem: function () {
            var self = this;
            var item = {
                "group_number": this.values.length + 1,
                "title": "title " + (this.values.length + 1)
            };
            this.values.push(item);
        },
        toggleFilter: function () {
            this.showFilter = !this.showFilter;
        },
        togglePicker: function () {
            this.showPicker = !this.showPicker;
        },
        togglePagination: function () {
            this.paginated = !this.paginated;
        }
    },
});