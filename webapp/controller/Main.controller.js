sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
	"use strict";
	return Controller.extend("CRUDJSON.controller.Main", {

		onInit: function() {

		},

		/**
		 *@memberOf CRUDJSON.controller.Main
		 */
		AddEmployee: function() {
			// Get the Model in the view
			var oModel = this.getView().getModel();
			// Get the Number of records in the OData Employees
			var EmployeesNumber = oModel.getProperty("/Employees").length;
			// Populate the new Employee ID
			var NewEmployeeID = EmployeesNumber + 1;
			// Display a popup to Insert the new Employee First Name and Employee Last Name
			// call Dialog popup
			var dialog = new sap.m.Dialog({
				title: "Add Employee",
				type: "Message",
				content: [new sap.ui.layout.HorizontalLayout({
					content: [new sap.ui.layout.VerticalLayout({
						width: "150px",
						content: [
							new sap.m.Label({
								text: "Employee ID"
							}),
							new sap.m.Input("EmployeeID", {
								value: NewEmployeeID,
								editable: false
							}),
							new sap.m.Label({
								text: "EmployeeFirstName"
							}),
							new sap.m.Input("EmployeeFirstName"),
							new sap.m.Label({
								text: "EmployeeLastName"
							}),
							new sap.m.Input("EmployeeLastName")
						]
					})]
				})],
				beginButton: new sap.m.Button({
					text: "Save",
					press: function() {
						// Read the new Employee ID / Employee First Name / Employee Last Name
						var NewEmployeeID = sap.ui.getCore().byId("EmployeeID").getValue();
						var NewEmployeeFirstName = sap.ui.getCore().byId("EmployeeFirstName").getValue();
						var NewEmployeeLastName = sap.ui.getCore().byId("EmployeeLastName").getValue();
						// Create Object
						var oEmployee = {};
						oEmployee = {
							"ID": NewEmployeeID,
							"LastName": NewEmployeeLastName,
							"FirstName": NewEmployeeFirstName
						};
						//Get the OData 
						var oEmployees = oModel.getProperty("/Employees");
						// Add the new record to the Odata
						oEmployees.push(oEmployee);
						oModel.setProperty("/Employees", oEmployees);
						// Close the popup
						dialog.close();
					}
				}),
				endButton: new sap.m.Button({
					text: "Cancel",
					press: function() {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});
			dialog.open();
		},
		/**
		 *@memberOf CRUDJSON.controller.Main
		 */
		EditEmployee: function(oEvent) {
			//Get the Model.
			var oModel = this.getView().getModel();
			// Configure the Path /Employees/EmployeeIdSelected
			var oPath = "/Employees/" + this._EmployeeIdSelected;
			// Get the ID, First Name and Last Name corresponding to the EmployeeID Selected
			var oEmployeeFirstNameSelected = oModel.getProperty(oPath).FirstName;
			var oEmployeeLastNameSelected = oModel.getProperty(oPath).LastName;
			var oEmployeeIdSelected = this._EmployeeIdSelected;
			// Display Popup
			// call Dialog popup
			var dialog = new sap.m.Dialog({
				title: "Edit Employee",
				type: "Message",
				content: [new sap.ui.layout.HorizontalLayout({
					content: [new sap.ui.layout.VerticalLayout({
						width: "150px",
						content: [
							new sap.m.Label({
								text: "Employee ID"
							}),
							new sap.m.Input("EmployeeID", {
								value: oEmployeeIdSelected,
								editable: false
							}),
							new sap.m.Label({
								text: "EmployeeFirstName"
							}),
							new sap.m.Input("EmployeeFirstName", {
								value: oEmployeeFirstNameSelected
							}),
							new sap.m.Label({
								text: "EmployeeLastName"
							}),
							new sap.m.Input("EmployeeLastName", {
								value: oEmployeeLastNameSelected
							})
						]
					})]
				})],
				beginButton: new sap.m.Button({
					text: "Save",
					press: function() {
						// Read the new Employee ID / Employee First Name / Employee Last Name
						var EmployeeID = sap.ui.getCore().byId("EmployeeID").getValue();
						var NewEmployeeFirstName = sap.ui.getCore().byId("EmployeeFirstName").getValue();
						var NewEmployeeLastName = sap.ui.getCore().byId("EmployeeLastName").getValue();
						// Create Object
						var oEmployee = {};
						oEmployee = {
							"ID": EmployeeID,
							"LastName": NewEmployeeLastName,
							"FirstName": NewEmployeeFirstName
						};
						// Configure the employee path
						var oEmployeePath = "/Employees/" + EmployeeID;
						// Update the Employee 
						oModel.setProperty(oEmployeePath, oEmployee);
						// Close the popup
						dialog.close();
					}
				}),
				endButton: new sap.m.Button({
					text: "Cancel",
					press: function() {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});
			dialog.open();
		},
		/**
		 *@memberOf CRUDJSON.controller.Main
		 */
		OnItemPress: function(oEvent) {
			//Get the Employee ID Selected
			var oEmployeeIdSelected = oEvent.getSource().getProperty("number");
			// Save the Employee ID Selected in This to use it later
			this._EmployeeIdSelected = oEmployeeIdSelected;
		},
		/**
		 *@memberOf CRUDJSON.controller.Main
		 */
		DeleteEmployee: function() {
			//Get the Model.
			var oModel = this.getView().getModel();
			// Configure the Path /Employees/EmployeeIdSelected
			var oPath = "/Employees/" + this._EmployeeIdSelected;
			// Get the ID, First Name and Last Name corresponding to the EmployeeID Selected
			var oEmployeeFirstNameSelected = oModel.getProperty(oPath).FirstName;
			var oEmployeeLastNameSelected = oModel.getProperty(oPath).LastName;
			var oEmployeeIdSelected = this._EmployeeIdSelected;
			//Get the OData 
			var oEmployees = oModel.getProperty("/Employees");
			// Delete the record from the oEmployees Object
			oEmployees.splice(oEmployeeIdSelected, 1);
			// Update the Model
			oModel.setProperty("/Employees", oEmployees);
		},
		/**
		 *@memberOf CRUDJSON.controller.Main
		 */
		RefreshEmployees: function(oEvent) {

			// Get the List 
			var oList = this.byId("List");

			// Create a new JsonModel
			var oJsonModel = new sap.ui.model.json.JSONModel();

			// Load the data in the Json File to the Json Model
			oJsonModel.loadData("data/data.json");
			oJsonModel.attachRequestCompleted(function(oEventModel) {});

			// Bind the Json model to the List items
			oList.setModel(oJsonModel);

			// Update the view with the new JsonModel
			var oView = this.getView();
			oView.setModel(oJsonModel);

		}
	});
});
