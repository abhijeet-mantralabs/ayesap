package com.example.theayesapapp;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.inputmethod.EditorInfo;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.TextView.OnEditorActionListener;
import android.widget.Toast;

import com.android.volley.NetworkResponse;
import com.android.volley.Request.Method;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.JsonObjectRequest;

public class MainActivity extends Activity {

	Context context;

	TextView register;
	TextView forgot;
	Button buttonLogin;
	EditText usernameEditText;
	EditText passwordEditText;

	public static Activity finish;

	final String TAG = "Main Activity";
	String regexStr = "^[0-9]{10}$";

	JSONObject jsonObj = null;
	JSONObject retailerDetails = null;

	SharedPreferences sharedPreferences;
	Editor editor;
	JSONArray jArray;
	public String userCredentials;
	JSONObject jObject;
	public boolean IS_LOGGED_IN = false;

	String url = ConstantClass.baseUrl + "api/retailer/login";

	ProgressDialog pDialog;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		context = this;
		finish = this;

		sharedPreferences = getApplicationContext().getSharedPreferences("Reg",
				0);
		editor = sharedPreferences.edit();

		IS_LOGGED_IN = sharedPreferences.getBoolean("status", false);
		if (IS_LOGGED_IN) {
			if (!isOnline()) {
				Intent i = new Intent(context, NoInternetActivity.class);
				startActivity(i);
				finish();
			}

			userCredentials = sharedPreferences.getString("credentials", null);
			try {
				jObject = new JSONObject(userCredentials);
				makeJsonObjReq(jObject);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		else {

			setContentView(R.layout.activity_main);

			usernameEditText = (EditText) findViewById(R.id.username);
			passwordEditText = (EditText) findViewById(R.id.password);

			buttonLogin = (Button) findViewById(R.id.loginButton);
			buttonLogin.setOnClickListener(new OnClickListener() {

				@Override
				public void onClick(View v) {
					// TODO Auto-generated method stub

					String user = usernameEditText.getText().toString();
					String pass = passwordEditText.getText().toString();

					if (user.isEmpty()) {
						usernameEditText.setError("Cannot Be Left Blank");
						usernameEditText.requestFocus();
					} else if (!isValidEmail(user) && !user.matches(regexStr)) {
						usernameEditText.setError("Invalid Username");
						usernameEditText.requestFocus();
					} else if (pass.isEmpty()) {
						passwordEditText.setError("Cannot Be Left Blank");
						passwordEditText.requestFocus();
					} else if (!isValidPassword(pass)) {
						passwordEditText.setError("Invalid Password");
						passwordEditText.requestFocus();
					} else {

						if (!isOnline()) {
							Intent i = new Intent(context,
									NoInternetActivity.class);
							startActivity(i);
							finish();
						}

						jsonObj = new JSONObject();

						if (isValidEmail(user)) {
							try {
								jsonObj.put("email", user);
								jsonObj.put("password", pass);
							} catch (JSONException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
						}

						else if (user.matches(regexStr)) {
							try {
								jsonObj.put("mobile", user);
								jsonObj.put("password", pass);
							} catch (JSONException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
						}

						makeJsonObjReq(jsonObj);

					}

				}

			});

			passwordEditText
					.setOnEditorActionListener(new OnEditorActionListener() {

						@Override
						public boolean onEditorAction(TextView arg0,
								int actionId, KeyEvent event) {
							// TODO Auto-generated method stub
							if ((event != null && (event.getKeyCode() == KeyEvent.KEYCODE_ENTER))
									|| (actionId == EditorInfo.IME_ACTION_DONE)) {
								Log.i(TAG, "Enter pressed");

								String user = usernameEditText.getText()
										.toString();
								String pass = passwordEditText.getText()
										.toString();

								if (user.isEmpty()) {
									usernameEditText
											.setError("Cannot Be Left Blank");
									usernameEditText.requestFocus();
								} else if (!isValidEmail(user)
										&& !user.matches(regexStr)) {
									usernameEditText
											.setError("Invalid Username");
									usernameEditText.requestFocus();
								} else if (pass.isEmpty()) {
									passwordEditText
											.setError("Cannot Be Left Blank");
									passwordEditText.requestFocus();
								} else if (!isValidPassword(pass)) {
									passwordEditText
											.setError("Invalid Password");
									passwordEditText.requestFocus();
								} else {
									if (!isOnline()) {
										Intent i = new Intent(context,
												NoInternetActivity.class);
										startActivity(i);
										finish();
									}

									jsonObj = new JSONObject();

									if (isValidEmail(user)) {
										try {
											jsonObj.put("email", user);
											jsonObj.put("password", pass);
										} catch (JSONException e) {
											// TODO Auto-generated catch block
											e.printStackTrace();
										}
									}

									else if (user.matches(regexStr)) {
										try {
											jsonObj.put("mobile", user);
											jsonObj.put("password", pass);
										} catch (JSONException e) {
											// TODO Auto-generated catch block
											e.printStackTrace();
										}
									}

									makeJsonObjReq(jsonObj);

								}

							}

							return false;
						}
					});

			register = (TextView) findViewById(R.id.registerText02);
			register.setOnClickListener(new OnClickListener() {

				@Override
				public void onClick(View v) {
					// TODO Auto-generated method stub
					Intent i = new Intent(MainActivity.this,
							RegisterActivity.class);
					startActivity(i);
				}
			});

		}
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

	@Override
	protected void onStop() {
		super.onStop();
		if (pDialog != null) {
			pDialog.dismiss();
		}
	}

	private boolean isValidEmail(String email) {
		String EMAIL_PATTERN = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
				+ "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
		Pattern pattern = Pattern.compile(EMAIL_PATTERN);
		Matcher matcher = pattern.matcher(email);
		return matcher.matches();
	}

	private boolean isValidPassword(String pass) {
		if (pass != null && pass.length() >= 6) {
			return true;
		}
		return false;

	}

	private void makeJsonObjReq(final JSONObject jObject) {
		String tag_json_obj = "json_obj_req";

		pDialog = new ProgressDialog(this);
		pDialog.setMessage("Logging In...");
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
							JSONObject user = details.getJSONObject("user");
							String retailerId = user.getString("retailerId");
							String name = user.getString("name");
							String retailerType = user
									.getString("retailerType");
							String mobile = user.getString("mobile");
							String address = user.getString("address");
							String street = user.getString("street");
							String area = user.getString("area");
							String city = user.getString("city");
							String pincode = user.getString("pincode");
							String latitude = user.getString("latitude");
							String longitude = user.getString("longitude");
							String zone = user.getString("zone");

							retailerDetails = new JSONObject();

							retailerDetails.put("retailerId", retailerId);
							retailerDetails.put("name", name);
							retailerDetails.put("retailerType", retailerType);
							retailerDetails.put("mobile", mobile);
							retailerDetails.put("address", address);
							retailerDetails.put("street", street);
							retailerDetails.put("area", area);
							retailerDetails.put("city", city);
							retailerDetails.put("pincode", pincode);
							retailerDetails.put("latitude", latitude);
							retailerDetails.put("longitude", longitude);
							retailerDetails.put("zone", zone);

							Toast.makeText(context, message, Toast.LENGTH_LONG)
									.show();

							editor.putString("credentials", jObject.toString());
							editor.putString("Name", name);
							editor.putString("street", street);
							editor.putString("area", area);
							editor.putBoolean("status", true);
							editor.putString("retailerDetails",
									retailerDetails.toString());
							editor.commit();

						} catch (JSONException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}

						pDialog.dismiss();
						Intent i = new Intent(MainActivity.this,
								DashboardActivity.class);
						startActivity(i);
						finish();
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
							}

						}
					}
				});

		AppController.getInstance().addToRequestQueue(jsonObjReq, tag_json_obj);
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

	public boolean isOnline() {
		ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
		NetworkInfo netInfo = cm.getActiveNetworkInfo();
		return netInfo != null && netInfo.isConnectedOrConnecting();
	}

}
