<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">Items</h4>
            <hr>
            <p>This page demonstrates audit functionality.</p>
            <p style="margin-bottom:0">
              Using pgAdmin you can track changes made by the app. We are
              dealing with
              <b>Items</b> table.
            </p>
            <br>
            <p style="margin-bottom:0">
              Create record and have a look at
              <b>CreationTime</b>,
              <b>CreatorID</b> and
              <b>TenantID</b>.
            </p>
            <p style="margin-bottom:0">
              Modify record and have a look at
              <b>ModificationTime</b> and
              <b>ModifierID</b>.
            </p>
            <br>
            <p style="margin-bottom:0">
              Try switching between tenants ('subdomain1' and 'subdomain2') and see that
              the
              app only pulls records which belong to current tenant.
            </p>
          </md-card-header>
          <md-card-content>
            <div>
              <md-button
                class="md-dense md-raised md-info"
                @click="showItemDialog(null)"
              >Add Item</md-button>
              <br>
              <br>
              <md-table v-model="items" :table-header-color="tableHeaderColor">
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="Id">{{ item.id }}</md-table-cell>
                  <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
                  <md-table-cell md-label="Description">{{ item.description }}</md-table-cell>
                  <md-table-cell md-label>
                    <md-button
                      class="md-dense md-raised md-secondary"
                      @click="showItemDialog(item)"
                    >Edit</md-button>
                  </md-table-cell>
                  <md-table-cell md-label>
                    <md-button
                      class="md-dense md-raised md-secondary"
                      @click="deleteItem(item)"
                    >Delete</md-button>
                  </md-table-cell>
                </md-table-row>
              </md-table>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>

    <div>
      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title v-if="!id">Add Item</md-dialog-title>
        <md-dialog-title v-if="id">Update Item</md-dialog-title>

        <md-dialog-content>
          <div>
            <md-field>
              <label>Name</label>
              <md-input v-model="name"></md-input>
            </md-field>

            <md-field>
              <label>Description</label>
              <md-textarea v-model="description"></md-textarea>
            </md-field>
          </div>
        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-info" v-if="!id" @click="add()">Add</md-button>
          <md-button class="md-info" v-if="id" @click="update()">Update</md-button>
          <md-button class="md-secondary" @click="showDialog = false">Cancel</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
  </div>
</template>

<script>
import http from "../helpers/axios-helper";
import toastr from "../helpers/notification-helper";

export default {
  components: {
  },
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: [],
      items: [],
      showDialog: false,
      name: "",
      description: "",
      id: null
    };
  },
  methods: {
    reset() {
      this.name = "";
      this.description = "";
      this.id = null;
    },
    showItemDialog(item) {
      this.reset();

      if (item !== null) {
        this.id = item.id;
        this.name = item.name;
        this.description = item.description;
      }

      this.showDialog = true;
    },
    add() {
      var self = this;
      http
        .post("Item/Add", {
          name: self.name,
          description: self.description
        })
        .then(function() {
          toastr.success("Item Added");
          self.loadData();
          self.showDialog = false;
        });
    },
    update() {
      var self = this;
      http
        .post("Item/Update", {
          id: self.id,
          name: self.name,
          description: self.description
        })
        .then(function() {
          toastr.success("Item Updated");
          self.loadData();
          self.showDialog = false;
        });
    },
    deleteItem(item) {
      var self = this;
      http
        .post("Item/Delete", {
          id: item.id
        })
        .then(function() {
          toastr.success("Item Deleted");
          self.loadData();
          self.showDialog = false;
        });
    },
    loadData() {
      var self = this;
      http.get("Item/GetAll").then(function(response) {
        self.items = response.data;
      });
    }
  },
  created: function() {
    this.loadData();
  }
};
</script>