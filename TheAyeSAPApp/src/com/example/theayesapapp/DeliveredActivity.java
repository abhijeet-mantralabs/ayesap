package com.example.theayesapapp;

import java.util.ArrayList;
import java.util.HashMap;

import android.content.Context;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.widget.ExpandableListView;
import android.widget.TextView;

public class DeliveredActivity extends AppCompatActivity {

	Context context;

	private Toolbar toolbar;

	ArrayList<Parent> parents;
	HashMap<String, Child> children;

	ExpandableListView Exp_list;
	DeliveredAdapter adapter;

	String[] order_num = { "425365", "425366", "425367" };
	String[] customer_name = { "Customer One", "Customer Two", "Customer Three" };
	String[] customer_mob = { "9999425365", "8888425366", "7777425367" };
	String[] db_name = { "Akshay", "Srinivas", "Basappa" };
	String[] db_number = { "7669298685", "7669298686", "7669298687" };
	String[] amount = { "425", "870", "1425" };
	String[] time_taken = { "20", "30", "40" };
	String[] cust_number = { "9678456389", "9967563459", "9678456389" };
	String[] add_line_1 = { "#101 1st Floor, ABC Apartment",
			"#202 2nd Floor, XYZ Apartment", "#101 1st Floor, ABC Apartment" };
	String[] add_line_2 = { "4th Main, 5th Cross", "5th Main, 6th Cross",
			"4th Main, 5th Cross" };
	String[] add_line_3 = { "Kormangala", "Kormangala", "Kormangala" };
	final int n = order_num.length;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_expandable_list);

		parents = new ArrayList<Parent>();
		children = new HashMap<String, Child>();
		context = this;

		toolbar = (Toolbar) findViewById(R.id.tool_bar);
		toolbar.setTitle("");
		setSupportActionBar(toolbar);
		getSupportActionBar().setDisplayHomeAsUpEnabled(true);
		TextView title = (TextView) toolbar.findViewById(R.id.title);
		title.setText("Delivered");

		for (int i = 0; i < n; i++) {

			Parent parent = new Parent();
			Child child = new Child();

			parent.setCustomerMob(customer_mob[i]);
			parent.setOrderNo(order_num[i]);
			parent.setDbName(db_name[i]);
			parent.setDbNumber(db_number[i]);
			parent.setAmount(amount[i]);
			parent.setDelTime(time_taken[i]);

			child.setOrderNo(order_num[i]);
			child.setCustomerName(customer_name[i]);
			child.setCustNumber(cust_number[i]);
			child.setAddLine1(add_line_1[i]);
			child.setAddLine2(add_line_2[i]);
			child.setAddLine3(add_line_3[i]);
			children.put(parent.orderNo, child);
			parents.add(parent);

		}

		Exp_list = (ExpandableListView) findViewById(R.id.expList);

		adapter = new DeliveredAdapter(this, parents, children);
		Exp_list.setAdapter(adapter);

	}

}
