# Copyright (c) 2024, Shantanu and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class CakeOrder(Document):
	
	#Validating Basic Calucations And Data Entries 
	def validate(self):
		self.validate_amount()
	#Making Status Pending
	def before_submit(self):
		self.status = "Pending"


	def validate_amount(self):
		total_amount = 0.0
		for child in self.items:
			if child.amount <0:
				frappe.throw(
							_("Amount Cannot be Negative For Cake Order Item{0}").format(
								child.idx
							)
						)
			total_amount += child.amount
		if total_amount == None:
			frappe.throw("Total Amount Cannot Be None")
		self.total_amount = total_amount
