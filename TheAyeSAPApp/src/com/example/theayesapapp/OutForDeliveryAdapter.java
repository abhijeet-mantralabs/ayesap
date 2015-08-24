package com.example.theayesapapp;

import java.util.ArrayList;
import java.util.HashMap;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseExpandableListAdapter;
import android.widget.TextView;

public class OutForDeliveryAdapter extends BaseExpandableListAdapter {

	private Context ctx;

	ArrayList<Parent> ParentView;
	HashMap<String, Child> childView;

	public OutForDeliveryAdapter(Context ctx, ArrayList<Parent> ParentView,
			HashMap<String, Child> ChildView) {
		this.ctx = ctx;

		this.ParentView = ParentView;
		this.childView = ChildView;
	}

	@Override
	public Object getChild(int parent, int child) {
		return childView.get(ParentView.get(parent).getOrderNo());
	}

	@Override
	public long getChildId(int parent, int child) {
		// TODO Auto-generated method stub
		return child;
	}

	@Override
	public View getChildView(int parent, int child, boolean lastChild,
			View convertview, ViewGroup parentview) {

		Parent parentItems = ParentView.get(parent);
		Child childItems = childView.get(parentItems.getOrderNo());

		if (convertview == null) {
			LayoutInflater inflator = (LayoutInflater) ctx
					.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
			convertview = inflator.inflate(R.layout.child_out_for_delivery,
					parentview, false);
		}

		// TextView mobileNum = (TextView)
		// convertview.findViewById(R.id.mobileNum);
		TextView customerName = (TextView) convertview.findViewById(R.id.name);
		TextView addLine1 = (TextView) convertview.findViewById(R.id.addLine1);
		TextView addLine2 = (TextView) convertview.findViewById(R.id.addLine2);
		TextView addLine3 = (TextView) convertview.findViewById(R.id.addLine3);

		// mobileNum.setText(childItems.getCustNumber());
		customerName.setText(childItems.getCustomerName());
		addLine1.setText(childItems.getAddLine1());
		addLine2.setText(childItems.getAddLine2());
		addLine3.setText(childItems.getAddLine3());

		return convertview;
	}

	@Override
	public int getChildrenCount(int child) {
		return 1;
	}

	@Override
	public Object getGroup(int arg0) {
		// TODO Auto-generated method stub
		return ParentView.get(arg0);
	}

	@Override
	public int getGroupCount() {
		// TODO Auto-generated method stub
		return ParentView.size();
	}

	@Override
	public long getGroupId(int arg0) {
		// TODO Auto-generated method stub
		return arg0;
	}

	@Override
	public View getGroupView(int parent, boolean isExpanded, View convertview,
			ViewGroup parentview) {
		// TODO Auto-generated method stub
		Parent parentItems = (Parent) getGroup(parent);

		if (convertview == null) {
			LayoutInflater inflator = (LayoutInflater) ctx
					.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
			convertview = inflator.inflate(R.layout.parent_out_for_delivery,
					parentview, false);
		}
		TextView customerMob = (TextView) convertview
				.findViewById(R.id.customerMob);
		TextView dbName = (TextView) convertview.findViewById(R.id.dbName);
		TextView dbNumber = (TextView) convertview.findViewById(R.id.dbNumber);
		// TextView amount = (TextView) convertview.findViewById(R.id.amount);
		// TextView timeTaken = (TextView)
		// convertview.findViewById(R.id.timeTaken);

		customerMob.setText(parentItems.getCustomerMob());
		dbName.setText(parentItems.getDbName());
		dbNumber.setText(parentItems.getDbNumber());
		// amount.setText(parentItems.getAmount());
		// timeTaken.setText(parentItems.getDelTime());

		return convertview;
	}

	@Override
	public boolean hasStableIds() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isChildSelectable(int arg0, int arg1) {
		// TODO Auto-generated method stub
		return false;
	}

}
