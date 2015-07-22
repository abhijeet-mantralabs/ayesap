package com.example.theayesapapp;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.ExecutionException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request.Method;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.JsonObjectRequest;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GooglePlayServicesUtil;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;

public class DashboardActivity extends AppCompatActivity implements
		OnButtonClickListener {

	protected static final String TAG = "DASHBOARD";
	private static final String TAG_AREA_COORDS = "CO ORDINATES";
	private GoogleMap mMap;
	private Toolbar toolbar;

	Context context;

	Button logout;
	Button bookNow;
	TextView eta;

	int length;
	int min;

	String TITLES[] = { "Home", "Out for Pickup", "Out for Delivery",
			"Delivered", "Order Summary", "Settings", "About Retailer App" };
	String NAME = "";
	int PROFILE = R.drawable.dp;

	RecyclerView mRecyclerView;
	RecyclerView.Adapter mAdapter;
	RecyclerView.LayoutManager mLayoutManager;
	DrawerLayout Drawer;
	ActionBarDrawerToggle mDrawerToggle;

	private SharedPreferences sharedPreferences;
	Editor editor;

	String rDetails;

	JSONObject retailerDetails;

	String url = ConstantClass.baseUrl + "api/retailer/logOut";

	ProgressDialog pDialog;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		// show error dialog if GoolglePlayServices not available
		if (!isGooglePlayServicesAvailable()) {
			finish();
		}

		setContentView(R.layout.activity_dashboard);

		context = this;

		eta = (TextView) findViewById(R.id.nearestNotif);

		sharedPreferences = getSharedPreferences("Reg", 0);
		editor = sharedPreferences.edit();

		rDetails = sharedPreferences.getString("retailerDetails", null);

		try {
			retailerDetails = new JSONObject(rDetails);
			Log.d("Retailer Details", "" + retailerDetails);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		setUpMapIfNeeded();

		toolbar = (Toolbar) findViewById(R.id.tool_bar);
		toolbar.setTitle("");
		setSupportActionBar(toolbar);

		TextView title = (TextView) toolbar.findViewById(R.id.title);
		title.setText("");

		ImageView logo = (ImageView) toolbar.findViewById(R.id.logo);
		logo.setVisibility(View.VISIBLE);

		try {
			NAME = retailerDetails.getString("name");
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		mRecyclerView = (RecyclerView) findViewById(R.id.RecyclerView);
		mRecyclerView.setHasFixedSize(true);
		mAdapter = new MyAdapter(this, TITLES, NAME, PROFILE);
		MyAdapter.click = DashboardActivity.this;
		mRecyclerView.setAdapter(mAdapter);
		mLayoutManager = new LinearLayoutManager(this);
		mRecyclerView.setLayoutManager(mLayoutManager);
		Drawer = (DrawerLayout) findViewById(R.id.DrawerLayout);
		mDrawerToggle = new ActionBarDrawerToggle(this, Drawer, toolbar,
				R.string.openDrawer, R.string.closeDrawer) {

			@Override
			public void onDrawerOpened(View drawerView) {
				super.onDrawerOpened(drawerView);
			}

			@Override
			public void onDrawerClosed(View drawerView) {
				super.onDrawerClosed(drawerView);
			}

		};
		Drawer.setDrawerListener(mDrawerToggle);
		mDrawerToggle.syncState();

		logout = (Button) findViewById(R.id.logoutButton);
		logout.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub

				makeJsonObjReq();
			}
		});

		bookNow = (Button) findViewById(R.id.bookNowButton);
		bookNow.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub

				if (!isOnline()) {
					Intent i = new Intent(context, NoInternetActivity.class);
					startActivity(i);
					finish();
				} else {

					min = min / 60;
					Intent i = new Intent(context, BookNowActivity.class);
					i.putExtra("eta", min);
					startActivity(i);
				}
			}
		});

	}

	@Override
	protected void onResume() {
		super.onResume();
		if (pDialog != null) {
			pDialog.dismiss();
		}
	}

	@Override
	protected void onStop() {
		super.onStop();
		if (pDialog != null) {
			pDialog.dismiss();
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
	public void onOptionClick(int position) {
		// TODO Auto-generated method stub
		if (position == 1) {
			Intent i = new Intent(context, PickupNewActivity.class);
			startActivity(i);
		}
		if (position == 2) {
			Intent i = new Intent(context, OutForDeliveryActivity.class);
			startActivity(i);
		}
		if (position == 3) {
			Intent i = new Intent(context, DeliveredActivity.class);
			startActivity(i);
		}
		if (position == 4) {
			Intent i = new Intent(context, OrderSummaryActivity.class);
			startActivity(i);
		}
		if (position == 5) {
			Intent i = new Intent(context, SettingsActivity.class);
			startActivity(i);
		}

		Drawer.closeDrawers();
	}

	@Override
	public void onCardOptionClick(int position, boolean isCancel) {
		// TODO Auto-generated method stub

	}

	Marker marker;
	Marker dbMarker;

	private void setUpMapIfNeeded() {

		if (mMap != null) {
			return;
		}
		mMap = ((SupportMapFragment) getSupportFragmentManager()
				.findFragmentById(R.id.map)).getMap();

		setUserMarker();

	}

	private void setUserMarker() {

		String latitude = "";
		String longitude = "";
		try {
			latitude = retailerDetails.getString("latitude");
			longitude = retailerDetails.getString("longitude");
		} catch (JSONException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		double lat = Double.parseDouble(latitude);
		double lng = Double.parseDouble(longitude);

		Log.d(TAG_AREA_COORDS, lat + " " + lng);

		LatLng userLoc = new LatLng(lat, lng);

		marker = mMap.addMarker(new MarkerOptions().position(userLoc).title(
				"Pickup Point"));

		mMap.moveCamera(CameraUpdateFactory.newLatLng(userLoc));
		mMap.animateCamera(CameraUpdateFactory.zoomTo(12));

		setDbMarker(lat, lng);

	}

	private void setDbMarker(double latitude, double longitude) {

		double[] dbLatitude = { 13.0209799, 13.0200011, 13.0346269 };
		double[] dbLongitude = { 77.6034508, 77.6594509, 77.6478851 };

		length = dbLatitude.length;

		String urlString = "https://maps.googleapis.com/maps/api/distancematrix/json?origins="
				+ latitude + "," + longitude + "&destinations=";

		for (int i = 0; i < length; i++) {
			LatLng dbLatLng = new LatLng(dbLatitude[i], dbLongitude[i]);
			dbMarker = mMap
					.addMarker(new MarkerOptions()
							.icon(BitmapDescriptorFactory
									.fromResource(R.drawable.bike))
							.position(dbLatLng)
							.title("Delivery Boy " + (i + 1)));

			urlString = urlString + dbLatitude[i] + "," + dbLongitude[i];
			if (i != length - 1) {
				urlString = urlString + "|";
			}
		}

		AsyncTask theTask = new AsyncTask();

		try {
			theTask.execute(urlString).get();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ExecutionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	private boolean isGooglePlayServicesAvailable() {
		int status = GooglePlayServicesUtil.isGooglePlayServicesAvailable(this);
		if (ConnectionResult.SUCCESS == status) {
			return true;
		} else {
			GooglePlayServicesUtil.getErrorDialog(status, this, 0).show();
			return false;
		}
	}

	class AsyncTask extends android.os.AsyncTask<String, Void, Integer> {

		@Override
		protected Integer doInBackground(String... params) {
			// TODO Auto-generated method stub

			HttpURLConnection urlConnection;
			int timeInt = 0;
			min = 86400;
			try {
				urlConnection = (HttpURLConnection) new URL(params[0])
						.openConnection();
				urlConnection.setRequestMethod("GET");
				urlConnection.setDoOutput(true);
				urlConnection.setDoInput(true);
				urlConnection.connect();
				InputStream inStream = urlConnection.getInputStream();
				BufferedReader bReader = new BufferedReader(
						new InputStreamReader(inStream));
				String temp, response = "";
				while ((temp = bReader.readLine()) != null) {
					// Parse data
					response += temp;
				}
				// Close the reader, stream & connection
				bReader.close();
				inStream.close();
				urlConnection.disconnect();

				// Sortout JSONresponse
				JSONObject object = (JSONObject) new JSONTokener(response)
						.nextValue();
				Log.d("AsyncTask Object", object + "");
				JSONArray rows = object.getJSONArray("rows");

				JSONObject elements = rows.getJSONObject(0);

				JSONArray element00 = elements.getJSONArray("elements");
				for (int i = 0; i < length; i++) {
					JSONObject duration = element00.getJSONObject(i)
							.getJSONObject("duration");

					timeInt = duration.getInt("value");

					Log.d("INT TIME", timeInt + "SEC");

					if (timeInt <= min) {
						min = timeInt;
						Log.d("INT TIME", "MIN" + timeInt + " SEC");
					}
				}

			} catch (MalformedURLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return min;

		}

		@Override
		protected void onPostExecute(Integer min) {
			if (min != null) {
				min = min / 60;
				String textref = min + " mins for nearest delivery boy";
				eta.setText(textref);
				editor.putInt("eta", min);
				editor.commit();
			}
		}

	}

	private void makeJsonObjReq() {
		String tag_json_obj = "json_obj_req";

		pDialog = new ProgressDialog(this);
		pDialog.setMessage("Logging Out...");
		pDialog.show();

		JsonObjectRequest jsonObjReq = new JsonObjectRequest(Method.POST, url,
				null, new Response.Listener<JSONObject>() {
					@Override
					public void onResponse(JSONObject response) {
						Log.d(TAG, response.toString());
						pDialog.dismiss();

						try {
							String message = response.getString("message");

							editor.putBoolean("status", false);
							editor.commit();

							Toast.makeText(context, message, Toast.LENGTH_LONG)
									.show();

						} catch (JSONException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						pDialog.dismiss();
						Intent i = new Intent(context, MainActivity.class);
						startActivity(i);
						finish();

					}
				}, new Response.ErrorListener() {

					@Override
					public void onErrorResponse(VolleyError error) {
						// TODO Auto-generated method stub
						VolleyLog.d(TAG, "Error: " + error.getMessage());
						pDialog.dismiss();

					}
				});

		AppController.getInstance().addToRequestQueue(jsonObjReq, tag_json_obj);
	}

	public boolean isOnline() {
		ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
		NetworkInfo netInfo = cm.getActiveNetworkInfo();
		return netInfo != null && netInfo.isConnectedOrConnecting();
	}

	@Override
	public void onSettingClick(int position) {
		// TODO Auto-generated method stub

	}

}
