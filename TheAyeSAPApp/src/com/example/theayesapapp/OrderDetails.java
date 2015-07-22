package com.example.theayesapapp;

import java.util.List;

public class OrderDetails {

	List<String> orderId, orderAmount, paymentType, orderStatusBackend, taskId,
			lastStatus, lastStatusText, currentStatus, currentStatusText,
			updatedTime;
	List<String> retailerId, retailerName, retailerMobile, retailerAddress;
	List<String> customerId, customerName, customerMobile, customerAddress;
	List<String> resId, resName, resMobile, resLat, resLng;

	public OrderDetails(List<String> orderId, List<String> orderAmount,
			List<String> paymentType, List<String> orderStatusBackend,
			List<String> taskId, List<String> lastStatus,
			List<String> lastStatusText, List<String> currentStatus,
			List<String> currentStatusText, List<String> updatedTime,
			List<String> retailerId, List<String> retailerName,
			List<String> retailerMobile, List<String> retailerAddress,
			List<String> customerId, List<String> customerName,
			List<String> customerMobile, List<String> customerAddress,
			List<String> resId, List<String> resName, List<String> resMobile,
			List<String> resLat, List<String> resLng) {
		super();
		this.orderId = orderId;
		this.orderAmount = orderAmount;
		this.paymentType = paymentType;
		this.orderStatusBackend = orderStatusBackend;
		this.taskId = taskId;
		this.lastStatus = lastStatus;
		this.lastStatusText = lastStatusText;
		this.currentStatus = currentStatus;
		this.currentStatusText = currentStatusText;
		this.updatedTime = updatedTime;
		this.retailerId = retailerId;
		this.retailerName = retailerName;
		this.retailerMobile = retailerMobile;
		this.retailerAddress = retailerAddress;
		this.customerId = customerId;
		this.customerName = customerName;
		this.customerMobile = customerMobile;
		this.customerAddress = customerAddress;
		this.resId = resId;
		this.resName = resName;
		this.resMobile = resMobile;
		this.resLat = resLat;
		this.resLng = resLng;
	}

	public List<String> getOrderId() {
		return orderId;
	}

	public void setOrderId(List<String> orderId) {
		this.orderId = orderId;
	}

	public List<String> getOrderAmount() {
		return orderAmount;
	}

	public void setOrderAmount(List<String> orderAmount) {
		this.orderAmount = orderAmount;
	}

	public List<String> getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(List<String> paymentType) {
		this.paymentType = paymentType;
	}

	public List<String> getOrderStatusBackend() {
		return orderStatusBackend;
	}

	public void setOrderStatusBackend(List<String> orderStatusBackend) {
		this.orderStatusBackend = orderStatusBackend;
	}

	public List<String> getTaskId() {
		return taskId;
	}

	public void setTaskId(List<String> taskId) {
		this.taskId = taskId;
	}

	public List<String> getLastStatus() {
		return lastStatus;
	}

	public void setLastStatus(List<String> lastStatus) {
		this.lastStatus = lastStatus;
	}

	public List<String> getLastStatusText() {
		return lastStatusText;
	}

	public void setLastStatusText(List<String> lastStatusText) {
		this.lastStatusText = lastStatusText;
	}

	public List<String> getCurrentStatus() {
		return currentStatus;
	}

	public void setCurrentStatus(List<String> currentStatus) {
		this.currentStatus = currentStatus;
	}

	public List<String> getCurrentStatusText() {
		return currentStatusText;
	}

	public void setCurrentStatusText(List<String> currentStatusText) {
		this.currentStatusText = currentStatusText;
	}

	public List<String> getUpdatedTime() {
		return updatedTime;
	}

	public void setUpdatedTime(List<String> updatedTime) {
		this.updatedTime = updatedTime;
	}

	public List<String> getRetailerId() {
		return retailerId;
	}

	public void setRetailerId(List<String> retailerId) {
		this.retailerId = retailerId;
	}

	public List<String> getRetailerName() {
		return retailerName;
	}

	public void setRetailerName(List<String> retailerName) {
		this.retailerName = retailerName;
	}

	public List<String> getRetailerMobile() {
		return retailerMobile;
	}

	public void setRetailerMobile(List<String> retailerMobile) {
		this.retailerMobile = retailerMobile;
	}

	public List<String> getRetailerAddress() {
		return retailerAddress;
	}

	public void setRetailerAddress(List<String> retailerAddress) {
		this.retailerAddress = retailerAddress;
	}

	public List<String> getCustomerId() {
		return customerId;
	}

	public void setCustomerId(List<String> customerId) {
		this.customerId = customerId;
	}

	public List<String> getCustomerName() {
		return customerName;
	}

	public void setCustomerName(List<String> customerName) {
		this.customerName = customerName;
	}

	public List<String> getCustomerMobile() {
		return customerMobile;
	}

	public void setCustomerMobile(List<String> customerMobile) {
		this.customerMobile = customerMobile;
	}

	public List<String> getCustomerAddress() {
		return customerAddress;
	}

	public void setCustomerAddress(List<String> customerAddress) {
		this.customerAddress = customerAddress;
	}

	public List<String> getResId() {
		return resId;
	}

	public void setResId(List<String> resId) {
		this.resId = resId;
	}

	public List<String> getResName() {
		return resName;
	}

	public void setResName(List<String> resName) {
		this.resName = resName;
	}

	public List<String> getResMobile() {
		return resMobile;
	}

	public void setResMobile(List<String> resMobile) {
		this.resMobile = resMobile;
	}

	public List<String> getResLat() {
		return resLat;
	}

	public void setResLat(List<String> resLat) {
		this.resLat = resLat;
	}

	public List<String> getResLng() {
		return resLng;
	}

	public void setResLng(List<String> resLng) {
		this.resLng = resLng;
	}

}
