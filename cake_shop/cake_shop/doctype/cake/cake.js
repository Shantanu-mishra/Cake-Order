// Copyright (c) 2024, Shantanu and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Cake", {
// 	refresh(frm) {

// 	},
// });
// Copyright (c) 2024, Shantanu and contributors
// For license information, please see license.txt



// Cake Order Item Customisations 
frappe.ui.form.on("Recipe",{
	rate:function(frm,cdt,cdn){
		var child = locals[cdt][cdn];
		child.amount = child.rate * child.required
		frm.refresh_field("recipe")
		calculate_amount(frm)
	},
	required:function(frm,cdt,cdn){
		var child = locals[cdt][cdn];
		child.amount = child.rate * child.required
		frm.refresh_field("recipe")
		calculate_amount(frm)
	},

	


})

var calculate_amount = function(frm) {
	let tl = frm.doc.recipe || [];
	let total_amount = 0;
	for(var i=0; i<tl.length; i++) {
		if (tl[i].amount) {
			total_amount += tl[i].amount;
		}
	}
	var amount = frm.doc.total_making_cost + total_amount;
	frm.set_value("total_making_cost", amount);
	frm.refresh_field("total_making_cost")
};
