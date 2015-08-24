package com.example.theayesapapp;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.Request.Method;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.JsonObjectRequest;

public class RegisterActivity extends Activity {

	Context context;
	Button register;

	final String TAG = "Register Activity";

	String regexStr = "^[0-9]{10}$";
	String url = ConstantClass.baseUrl + "api/retailer/requestForRegister";

	EditText nameEditText;
	EditText mobileEditText;
	EditText emailEditText;

	JSONObject jsonObj = null;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_reg);

		context = this;

		nameEditText = (EditText) findViewById(R.id.fullName);
		mobileEditText = (EditText) findViewById(R.id.mobileNumber);
		emailEditText = (EditText) findViewById(R.id.emailReg);

		register = (Button) findViewById(R.id.registerButton);
		register.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub

				String name = nameEditText.getText().toString();
				String email = emailEditText.getText().toString();
				String mobile = mobileEditText.getText().toString();

				nameEditText.setError(null);
				emailEditText.setError(null);
				mobileEditText.setError(null);

				if (name.isEmpty()) {
					nameEditText.setError("Cannot Be Left Blank");
					nameEditText.requestFocus();
				} else if (!isValidName(name)) {
					nameEditText.setError("Invalid Name");
					nameEditText.requestFocus();
				} else if (mobile.isEmpty()) {
					mobileEditText.setError("Cannot Be Left Blank");
					mobileEditText.requestFocus();
				} else if (!mobile.matches(regexStr)) {
					mobileEditText.setError("Invalid Number");
					mobileEditText.requestFocus();
				} else if (!email.isEmpty() && !isValidEmail(email)) {
					emailEditText.setError("Invalid Email");
					emailEditText.requestFocus();
				} else if (isValidName(name) && mobile.matches(regexStr)) {

					if (!isOnline()) {
						Intent intent = new Intent(getApplicationContext(),
								NoInternetActivity.class);
						intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
						MainActivity.finish.finish();
						startActivity(intent);
						finish();
					}
					jsonObj = new JSONObject();
					try {
						jsonObj.put("name", name);
						jsonObj.put("email", email);
						jsonObj.put("mobile", mobile);
					} catch (JSONException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					makeJsonObjReq(jsonObj);
				}
			}
		});

	}

	// @Override
	// public boolean onCreateOptionsMenu(Menu menu) {
	// // Inflate the menu; this adds items to the action bar if it is present.
	// getMenuInflater().inflate(R.menu.main, menu);
	// return true;
	// }
	//
	// @Override
	// public boolean onOptionsItemSelected(MenuItem item) {
	// // Handle action bar item clicks here. The action bar will
	// // automatically handle clicks on the Home/Up button, so long
	// // as you specify a parent activity in AndroidManifest.xml.
	// int id = item.getItemId();
	// if (id == R.id.action_settings) {
	// return true;
	// }
	// return super.onOptionsItemSelected(item);
	// }

	private boolean isValidName(String name) {
		String NAME_PATTERN = "^[\\p{L} .'-]+$";
		Pattern pattern = Pattern.compile(NAME_PATTERN);
		Matcher matcher = pattern.matcher(name);
		return matcher.matches();
	}

	private boolean isValidEmail(String email) {
		String EMAIL_PATTERN = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
				+ "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
		Pattern pattern = Pattern.compile(EMAIL_PATTERN);
		Matcher matcher = pattern.matcher(email);
		return matcher.matches();
	}

	private void makeJsonObjReq(JSONObject jObject) {
		String tag_json_obj = "json_obj_req";

		final ProgressDialog pDialog = new ProgressDialog(this);
		pDialog.setMessage("Loading...");
		pDialog.show();

		JsonObjectRequest jsonObjReq = new JsonObjectRequest(Method.POST, url,
				jObject, new Response.Listener<JSONObject>() {
					@Override
					public void onResponse(JSONObject response) {
						Log.d(TAG, response.toString());
						pDialog.hide();
						Toast.makeText(
								context,
								"Your request has been registered. We will contact you shortly.",
								Toast.LENGTH_LONG).show();
					}
				}, new Response.ErrorListener() {

					@Override
					public void onErrorResponse(VolleyError error) {
						// TODO Auto-generated method stub
						VolleyLog.d(TAG, "Error: " + error.getMessage());
						pDialog.hide();
					}
				});
		AppController.getInstance().addToRequestQueue(jsonObjReq, tag_json_obj);
	}

	public boolean isOnline() {
		ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
		NetworkInfo netInfo = cm.getActiveNetworkInfo();
		return netInfo != null && netInfo.isConnectedOrConnecting();
	}

}
