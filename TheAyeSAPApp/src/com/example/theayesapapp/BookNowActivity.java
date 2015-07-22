package com.example.theayesapapp;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.View.OnFocusChangeListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.DefaultRetryPolicy;
import com.android.volley.NetworkResponse;
import com.android.volley.Request.Method;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.JsonObjectRequest;

public class BookNowActivity extends Activity {

	String TAG = "Book Now";

	Context context;

	TextView eta;
	EditText amount, amountTBC, custMobNum, custName, custAdd, custStreet,
			custArea, custCity, custPincode;
	Button bookNow;

	private SharedPreferences sharedPreferences;
	Editor editor;

	String regexStr = "^[0-9]{10}$";

	ProgressDialog pDialog;
	public int min;
	String rDetails;

	JSONObject jsonObj = null;
	JSONObject retailerDetails = null;
	JSONObject customerDetails = null;
	JSONObject address = null;

	int addFlag = 0;
	int repeatedFlag = 0;

	String url = ConstantClass.baseUrl + "api/order/bookOrder";

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_book_now);

		context = this;

		long time = System.currentTimeMillis();
		Log.d("CURRENT Time", time + "");

		sharedPreferences = getSharedPreferences("Reg", 0);
		editor = sharedPreferences.edit();

		min = sharedPreferences.getInt("eta", 0);
		eta = (TextView) findViewById(R.id.timeDigit);
		eta.setText(min + " mins from now");

		amount = (EditText) findViewById(R.id.amount);
		amountTBC = (EditText) findViewById(R.id.amountCollected);
		amount.setOnFocusChangeListener(new OnFocusChangeListener() {

			@Override
			public void onFocusChange(View v, boolean hasFocus) {
				// TODO Auto-generated method stub
				String a = amount.getText().toString();
				if (!hasFocus)
					amountTBC.setText(a, TextView.BufferType.EDITABLE);
			}
		});

		rDetails = sharedPreferences.getString("retailerDetails", null);
		try {
			retailerDetails = new JSONObject(rDetails);
			Log.d("Retailer Details", "" + retailerDetails);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		custMobNum = (EditText) findViewById(R.id.custMobNum);
		custName = (EditText) findViewById(R.id.custName);
		custAdd = (EditText) findViewById(R.id.custAddress);
		custStreet = (EditText) findViewById(R.id.street);
		custArea = (EditText) findViewById(R.id.area);
		custCity = (EditText) findViewById(R.id.city);
		custPincode = (EditText) findViewById(R.id.pincode);

		bookNow = (Button) findViewById(R.id.bookNowButton);
		bookNow.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub

				// else {
				String amountText = amount.getText().toString();
				String amountTBCText = amountTBC.getText().toString();

				String custMobText = custMobNum.getText().toString();
				String custNameText = custName.getText().toString();
				String custAddText = custAdd.getText().toString();
				String custStreetText = custStreet.getText().toString();
				String custAreaText = custArea.getText().toString();
				String custCityText = custCity.getText().toString();
				String custPinText = custPincode.getText().toString();

				long lastOrder = sharedPreferences.getLong("lastOrder", 0);
				// String rMobile = sharedPreferences.getString("rMobile",
				// null);
				String cMobile = sharedPreferences.getString("cMobile", null);
				String lastOrderAmt = sharedPreferences.getString(
						"lastOrderAmt", null);
				long currTime = System.currentTimeMillis();
				long timeGap = currTime - lastOrder;
				Log.d("Time GAP", timeGap + "");

				if (timeGap < 300000 && cMobile.equals(custMobText)
						&& lastOrderAmt.equals(amountText)) {

					AlertDialog.Builder builder = new AlertDialog.Builder(
							context);
					builder.setMessage("Order is same as previous one. Do you still want to continue?.");
					builder.setPositiveButton("Continue",
							new DialogInterface.OnClickListener() {

								@Override
								public void onClick(DialogInterface arg0,
										int arg1) {
									// TODO Auto-generated method stub

									editor.putLong("lastOrder", 0);
									editor.commit();
									repeatedFlag = 1;

								}
							});
					builder.setNegativeButton("Cancel",
							new DialogInterface.OnClickListener() {

								@Override
								public void onClick(DialogInterface dialog,
										int which) {
									// TODO Auto-generated method stub
									repeatedFlag = 0;

								}
							});
					builder.show();

					// Toast.makeText(
					// context,
					// "Order same as previous one. Please try after some time.",
					// Toast.LENGTH_LONG).show();
				}

				if (repeatedFlag == 1 || timeGap >= 300000) {

					if (!custAddText.isEmpty()) {
						addFlag = addFlag + 1;
					}
					if (!custStreetText.isEmpty()) {
						addFlag = addFlag + 1;
					}
					if (!custAreaText.isEmpty()) {
						addFlag = addFlag + 1;
					}
					if (!custCityText.isEmpty()) {
						addFlag = addFlag + 1;
					}
					if (!custPinText.isEmpty()) {
						addFlag = addFlag + 1;
					}

					jsonObj = new JSONObject();
					customerDetails = new JSONObject();
					address = new JSONObject();

					if (amountText.isEmpty()) {
						amount.setError("Cannot Be Left Blank");
						amount.requestFocus();
					} else if (amountTBCText.isEmpty()) {
						amountTBC.setText("0");
					} else if (!amountTBCText.isEmpty()
							&& Integer.parseInt(amountText) < Integer
									.parseInt(amountTBCText)) {
						amountTBC.setError("Invalid COD Amount");
						amountTBC.requestFocus();
					} else if (custMobText.isEmpty()) {
						custMobNum.setError("Cannot Be Left Blank");
						custMobNum.requestFocus();
					} else if (!custMobText.matches(regexStr)) {
						custMobNum.setError("Invalid Number");
						custMobNum.requestFocus();
					} else if (!custNameText.isEmpty()
							&& !isValidName(custNameText)) {
						custName.setError("Invalid Name");
						custName.requestFocus();
					} else if (addFlag != 0 && addFlag != 5) {
						Toast.makeText(context, "Enter Complete Address",
								Toast.LENGTH_LONG).show();
						addFlag = 0;
					} else if (addFlag == 5 && custPinText.length() != 6) {
						custPincode.setError("Invalid Pin Code");
						custPincode.requestFocus();
					} else if (!amountText.isEmpty()
							&& custMobText.matches(regexStr)) {
						if (addFlag == 5) {
							try {
								address.put("address", custAddText);
								address.put("street", custStreetText);
								address.put("area", custAreaText);
								address.put("city", custCityText);
								address.put("pinCode", custPinText);

								customerDetails.put("address", address);
							} catch (JSONException e2) {
								// TODO Auto-generated catch block
								e2.printStackTrace();
							}
							Log.d("ADDRESS of Customer", "" + address);

						}

						try {
							customerDetails.put("name", custNameText);
							customerDetails.put("mobile", custMobText);

						} catch (JSONException e1) {
							// TODO Auto-generated catch block
							e1.printStackTrace();
						}

						Log.d("Customer Details", "" + customerDetails);

						try {
							int orderAmount = Integer.parseInt(amountText);
							jsonObj.put("orderAmount", orderAmount);
							jsonObj.put("paymentType", "COD");
							jsonObj.put("CODValue", amountTBCText);
							jsonObj.put("retailerDetails", retailerDetails);
							jsonObj.put("customerDetails", customerDetails);
							Log.d("JSON Object SENT", "" + jsonObj);
						} catch (JSONException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						makeJsonObjReq(jsonObj);

					}
				}

			}
		});

	}

	private void makeJsonObjReq(final JSONObject jObject) {
		// String tag_json_obj = "json_obj_req";

		pDialog = new ProgressDialog(this);
		pDialog.setMessage("Loading...");
		pDialog.setCancelable(false);
		pDialog.show();

		JsonObjectRequest jsonObjReq = new JsonObjectRequest(Method.POST, url,
				jObject, new Response.Listener<JSONObject>() {
					@Override
					public void onResponse(JSONObject response) {
						Log.d(TAG, response.toString());
						try {
							String message = response.getString("message");
							JSONObject details = response
									.getJSONObject("details");
							JSONObject order = details.getJSONObject("order");
							String retailerMobile = order
									.getString("retailerMobile");
							String customerMobile = order
									.getString("customerMobile");
							// String retailerId = order
							// .getString("orderStatusBackend");
							String orderAmount = order.getString("orderAmount");

							Toast.makeText(context, message, Toast.LENGTH_LONG)
									.show();

							long time = System.currentTimeMillis();
							repeatedFlag = 0;
							editor.putLong("lastOrder", time);
							editor.putString("rMobile", retailerMobile);
							editor.putString("cMobile", customerMobile);
							editor.putString("lastOrderAmt", orderAmount);
							editor.commit();

							Intent i = new Intent(BookNowActivity.this,
									DashboardActivity.class);
							startActivity(i);
							finish();

						} catch (JSONException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}

						pDialog.dismiss();

					}
				}, new Response.ErrorListener() {

					@Override
					public void onErrorResponse(VolleyError error) {
						// TODO Auto-generated method stub
						VolleyLog.d(TAG, "Error: " + error.getMessage());
						pDialog.dismiss();

						String jsonString = null;

						NetworkResponse response = error.networkResponse;
						if (response != null && response.data != null) {
							switch (response.statusCode) {
							case 401:
								jsonString = new String(response.data);
								jsonString = trimMessage(jsonString, "message");
								if (jsonString != null)
									displayMessage(jsonString);
								break;

							case 403:
								jsonString = new String(response.data);
								jsonString = trimMessage(jsonString, "message");
								if (jsonString != null)
									displayMessage(jsonString);
								break;
							}

						}
					}
				});
		jsonObjReq.setRetryPolicy(new DefaultRetryPolicy(0,
				DefaultRetryPolicy.DEFAULT_MAX_RETRIES,
				DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));

		AppController.getInstance().addToRequestQueue(jsonObjReq);
	}

	public String trimMessage(String json, String key) {
		String trimmedString = null;

		try {
			JSONObject obj = new JSONObject(json);
			trimmedString = obj.getString(key);
		} catch (JSONException e) {
			e.printStackTrace();
			return null;
		}

		return trimmedString;
	}

	public void displayMessage(String toastString) {
		Toast.makeText(context, toastString, Toast.LENGTH_LONG).show();
	}

	// @Override
	// public boolean onCreateOptionsMenu(Menu menu) {
	// // Inflate the menu; this adds items to the action bar if it is present.
	// getMenuInflater().inflate(R.menu.main, menu);
	// return true;
	// }

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

	@Override
	protected void onStop() {
		super.onStop();
		if (pDialog != null) {
			pDialog.dismiss();
		}
	}

}
