<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">People</h4>
            <hr>
            <p>This page demonstrates audit functionality.</p>
            <p style="margin-bottom:0">
              Using pgAdmin you can track changes made by the app. We are
              dealing with
              <b>Persons</b> table.
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
            <p style="margin-bottom:0">
              Delete record and have a look at
              <b>DeletionTime</b> and
              <b>DeleterID</b>.
            </p>
            <br>
            <p style="margin-bottom:0">
              Try switching between tenants ('subdomain1' and 'subdomain2') and see that
              the
              app only pulls records which belong to current tenant.
            </p>
            <br>
            <p style="margin-bottom:0">
              Note that we've applied Dynamic Filter to avoid pulling soft-deleted
              records.
            </p>
          </md-card-header>
          <md-card-content>
            <div>
              <md-button
                class="md-dense md-raised md-info"
                @click="showPersonDialog(null)"
              >Add Person</md-button>
              <br>
              <br>
              <md-table v-model="persons" :table-header-color="tableHeaderColor">
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="Id">{{ item.id }}</md-table-cell>
                  <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
                  <md-table-cell md-label="Description">{{ item.description }}</md-table-cell>
                  <md-table-cell md-label>
                    <md-button
                      class="md-dense md-raised md-secondary"
                      @click="showPersonDialog(item)"
                    >Edit</md-button>
                  </md-table-cell>
                  <md-table-cell md-label>
                    <md-button
                      class="md-dense md-raised md-secondary"
                      @click="deletePerson(item)"
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
        <md-dialog-title v-if="!id">Add Person</md-dialog-title>
        <md-dialog-title v-if="id">Update Person</md-dialog-title>

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
import { SimpleTable, OrderedTable } from "@/components";
import http from "../helpers/axios-helper";
import { notify } from "../helpers/notification-helper";

export default {
  components: {
    OrderedTable,
    SimpleTable
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
      persons: [],
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
    showPersonDialog(person) {
      this.reset();

      if (person !== null) {
        this.id = person.id;
        this.name = person.name;
        this.description = person.description;
      }

      this.showDialog = true;
    },
    add() {
      var self = this;
      http
        .post("Person/Add", {
          name: self.name,
          description: self.description
        })
        .then(function(response) {
          notify("success", "Person Added");
          self.loadData();
          self.showDialog = false;
        });
    },
    update() {
      var self = this;
      http
        .post("Person/Update", {
          id: self.id,
          name: self.name,
          description: self.description
        })
        .then(function(response) {
          notify("success", "Person Updated");
          self.loadData();
          self.showDialog = false;
        });
    },
    deletePerson(person) {
      var self = this;
      http
        .post("Person/Delete", {
          id: person.id
        })
        .then(function(response) {
          notify("success", "Person Deleted");
          self.loadData();
          self.showDialog = false;
        });
    },
    loadData() {
      var self = this;
      http.get("Person/GetAll").then(function(response) {
        self.persons = response.data;
      });
    }
  },
  created: function() {
    this.loadData();
  }
};
</script>