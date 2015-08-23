<?php

$data = array();
foreach ($_POST as $param_name => $param_val) {
        $data[$param_name] = $param_val;
}

$curl = curl_init();

// Set some options - we are passing in a useragent too here
curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => 'http://localhost:1340/order/updateOrderStatus',
    CURLOPT_POST => 1,
    CURLOPT_POSTFIELDS => $data,
    //CURLOPT_HTTPHEADER => array(
    //	'Content-Type: multipart/form-data'
    //)
));
// Send the request & save response to $resp
$resp = curl_exec($curl);
echo $resp;
// Close request to clear up some resources
curl_close($curl);
