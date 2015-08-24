package com.example.theayesapapp;

import org.json.JSONObject;

import android.content.Context;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class ChangePasswordActivity extends AppCompatActivity {

	Context context;
	Button changePass;

	String url = ConstantClass.baseUrl + "";

	private Toolbar toolbar;

	EditText oldPass;
	EditText newPass;
	EditText reenterPass;

	JSONObject jsonObj = null;

	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_change_password);

		toolbar = (Toolbar) findViewById(R.id.tool_bar);
		toolbar.setTitle("");
		setSupportActionBar(toolbar);
		getSupportActionBar().setDisplayHomeAsUpEnabled(true);

		TextView title = (TextView) toolbar.findViewById(R.id.title);
		title.setText("Change Password");

		oldPass = (EditText) findViewById(R.id.oldPassword);
		newPass = (EditText) findViewById(R.id.newPassword);
		reenterPass = (EditText) findViewById(R.id.reenterPassword);

		changePass = (Button) findViewById(R.id.submitPassword);
		changePass.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub

				String oldPassword = oldPass.getText().toString();
				String newPassword = newPass.getText().toString();
				String reenterPassword = reenterPass.getText().toString();

				oldPass.setError(null);
				newPass.setError(null);
				reenterPass.setError(null);

				if (oldPassword.isEmpty()) {
					oldPass.setError("Cannot Be Left Blank");
					oldPass.requestFocus();
				} else if (!isValidPassword(oldPassword)) {
					oldPass.setError("Invalid Password");
					oldPass.requestFocus();
				} else if (newPassword.isEmpty()) {
					newPass.setError("Cannot Be Left Blank");
					newPass.requestFocus();
				} else if (!isValidPassword(newPassword)) {
					newPass.setError("Invalid Pasword");
					newPass.requestFocus();
				} else if (reenterPassword.isEmpty()) {
					reenterPass.setError("Cannot Be Left Blank");
					reenterPass.requestFocus();
				} else if (!reenterPassword.equals(newPassword)) {
					reenterPass.setError("Passwords Don't Match");
					reenterPass.requestFocus();
				} else if (newPassword.equals(reenterPassword)) {

				}
			}

		});
	}

	private boolean isValidPassword(String pass) {
		if (pass.length() >= 6) {
			return true;
		}
		return false;
	}

}
