package com.example.theayesapapp;

import java.util.ArrayList;

public class Parent {

	String customerMob;
	String orderNo;
	String amount;
	String dbName;
	String dbNumber;
	String delTime;

	ArrayList<Child> children;

	public String getCustomerMob() {
		return customerMob;
	}

	public void setCustomerMob(String customerMob) {
		this.customerMob = customerMob;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getDbName() {
		return dbName;
	}

	public void setDbName(String dbName) {
		this.dbName = dbName;
	}

	public String getDbNumber() {
		return dbNumber;
	}

	public void setDbNumber(String dbNumber) {
		this.dbNumber = dbNumber;
	}

	public String getDelTime() {
		return delTime;
	}

	public void setDelTime(String delTime) {
		this.delTime = delTime;
	}

	public ArrayList<Child> getChildren() {
		return children;
	}

	public void setChildren(ArrayList<Child> children) {
		this.children = children;
	}

}
