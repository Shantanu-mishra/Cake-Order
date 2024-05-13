// Copyright (c) 2024, Shantanu and contributors
// For license information, please see license.txt

frappe.ui.form.on("Cake Order", {
	refresh:function(frm){
		frm.set_query("address", function () {
			if (!frm.doc.customer) {
				frappe.throw(__("Please set Customer"));
			}

			return {
				query: "frappe.contacts.doctype.address.address.address_query",
				filters: {
					link_doctype: "Customer",
					link_name: frm.doc.customer,
				},
			};
		});
		frm.set_query("contact", function () {
			if (!frm.doc.customer) {
				frappe.throw(__("Please set Customer"));
			}

			return {
				query: "frappe.contacts.doctype.contact.contact.contact_query",
				filters: {
					link_doctype: "Customer",
					link_name: frm.doc.customer,
				},
			};
		});
	},
	address:function(frm) {
	    console.log(frm.doc);
		if(frm.doc.address){
      return frm.call({
      method: "frappe.contacts.doctype.address.address.get_address_display",
      args: {
         "address_dict": frm.doc.address
      },
      callback: function(r) {
        if(r.message)
            frm.set_value("address_html", r.message);
        
      }
     });
    }
    else{
        frm.set_value("address_html", "");
    }
	},
});

// Cake Order Item Customisations 
frappe.ui.form.on("Cake Order Item",{
	rate:function(frm,cdt,cdn){
		var child = locals[cdt][cdn];
		child.amount = child.rate * child.qty
		frm.refresh_field("items")
		calculate_amount(frm)
	},
	qty:function(frm,cdt,cdn){
		var child = locals[cdt][cdn];
		child.amount = child.rate * child.qty
		frm.refresh_field("items")
		calculate_amount(frm)
	},

	


})

var calculate_amount = function(frm) {
	let tl = frm.doc.items || [];
	let total_amount = 0;
	for(var i=0; i<tl.length; i++) {
		if (tl[i].amount) {
			total_amount += tl[i].amount;
		}
	}
	var amount = frm.doc.total_amount + total_amount;
	frm.set_value("total_amount", amount);
	frm.refresh_field("total_amount")
};