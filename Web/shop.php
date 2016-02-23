<?php
include('php-python/db_connect.php');              //needed for DB connection


//print_r ($_POST);

if (isset($_POST['submitSearch']))
{

	$query = $_POST['submitSearch'];
	$JSONresult = exec('python ./php-python/NCIXsearch.py ' . $query );
	$JSONresult2 = exec('python ./php-python/newegg.py ' . $query );

	//$myDict = json_decode(file_get_contents('/tmp/mydict'));

	//decode the JSON $JSONresult

	$JSONresult = trim($JSONresult, '[');       //remove the extra brackets
	$JSONresult = trim($JSONresult, ']');

	$JSONresult2 = trim($JSONresult2, '[');       //remove the extra brackets
	$JSONresult2 = trim($JSONresult2, ']');

    $JSONresult = str_replace("}, {", "}==x=={" ,$JSONresult );
    $JSONresult2 = str_replace("}, {", "}==x=={" ,$JSONresult2 );

    $itemArray = explode("==x==", $JSONresult);
    $itemArray2 = explode("==x==", $JSONresult2);
  // echo "=======================================";
  // var_dump($itemArray);
  //echo $itemArray[0];

    $allProducts = array();

    foreach ($itemArray as $value) {

     // echo $value;

      //\xa0 is actually non-breaking space in Latin1 (ISO 8859-1), also chr(160). You should replace it with a space.

    $itemExplode = str_replace('\xa0', ' ', $value );
    $itemExplode = str_replace("'", '"' ,$itemExplode);                  //replace single quotes with double quotes
    $itemExplode = str_replace(': u"', ': "' , $itemExplode);      //remove unicode mark
    array_push($allProducts, $itemExplode );
        //echo $itemExplode;
        //var_dump(json_decode($itemExplode));

  }


    foreach ($itemArray2 as $value) {

     // echo $value;

      //\xa0 is actually non-breaking space in Latin1 (ISO 8859-1), also chr(160). You should replace it with a space.
    $itemExplode = str_replace('\xa0', ' ', $value );
    $itemExplode = str_replace("'", '"' ,$itemExplode);                  //replace single quotes with double quotes
    $itemExplode = str_replace(': u"', ': "' , $itemExplode);      //remove unicode mark
    array_push($allProducts, $itemExplode );
    //echo $itemExplode;
    //var_dump(json_decode($itemExplode));

  }


//############## GET CHEAPEST FROM DATABASE ####################
    $conn = setUpConnection();
//SELECT A.webID, MIN(A.lowestPrice) AS minPrice
        //FROM
        //(


//######### CHEAPEST IN DB #####################


    $sql = "SELECT *
        FROM Product
        WHERE lowestPrice =  (SELECT MIN(lowestPrice)
        FROM Product
        WHERE name  LIKE '%" . $query   ."%') ;";

    $result = $conn->query($sql);


    if ($result->num_rows > 0) {

    // $cheapestInDB = $result->fetch_assoc();

    //echo 'results found:';

    // while($row = $result->fetch_assoc()) {
    //    echo $row['lowestPrice'];
    // }
    }

    $conn->close();

    //######################################################

    //array_pop($allProducts);          //pop weird empty element at the end
    //########################### SAVE TO DATABASE #############################

    // session_start();

    //$authenticated = false;


    $productList = array();
    //prepare database connection

    $conn = setUpConnection();

    for ($y = 0; $y < count($allProducts); $y++) {
        $currentItem = json_decode($allProducts[$y], true);         //decode JSON from python script


        //each JSON is in associative (Key-value pair) format
        // "URL"=>"", "Name"=>"", "Price"=>0.00, ...
        //hashing the URL to get a webID
        $webID =  md5($currentItem["URL"])  ;

        //###### CHECK if current product is already in Database #########

        $sql = "SELECT *
                FROM Product
                WHERE webID = '" . $webID . "';";

        // echo $sql;
        $duplicate = $conn->query($sql);

        // echo ("numrows:" . $duplicate->num_rows);

        //FOR CHECKING, print the duplicates
        //while($row = $duplicate->fetch_assoc()) {
        //echo $row["webID"];
        //}


        if ($duplicate->num_rows == 0)          //if there is no duplicates
        {
            //need to attach '' for MySQL strings
            $webID =  "'" . $webID . "'"   ;

            $productID =  substr($currentItem["Name"], 20);
            $productID = "'" . str_replace(' ', '', $productID) ."'" ;      //strip spaces

            $name = "'" . $currentItem["Name"] . "'" ;
            $URL = "'" . $currentItem["URL"] . "'" ;

            $lowestPrice = $currentItem["Price"] ;
            $photoURL = "'" . $currentItem["Photo"] . "'"   ;

            //$currentItem["webID"] = $webID;
        	//prepared statements
                /*	$stmt = $conn->prepare("INSERT INTO Product (webID, name, URL, productID, lowestPrice, DateAdded, photoURL, description )
                    	                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                    	$stmt->bind_param("ssssdsss", $webID, $name, $URL, $productID, $lowestPrice, date('Y-m-d h:i:s'),  $photoURL, "some description");
                    	$stmt->execute();
                */

            $date = "'" . date('Y-m-d h:i:s') . "'";

            $sql = " INSERT INTO Product (webID, name, URL, productID, lowestPrice, DateAdded, photoURL, description ) VALUES ( $webID, $name, $URL, $productID, $lowestPrice,$date , $photoURL, 'some description')";

                   // echo $sql;

                // ERROR INFO
                    //if ($conn->query($sql) === TRUE)  ;
                    //else
                    //    echo "Error: " . $sql . "<br>" . $conn->error;

        }
    } //	end for

    $conn->close();
}

  //###################################################################


else if(isset($_POST['submitWishList'])){

    echo "WISHLIST SAVE";

    echo $_POST['source1'];

//now this is an comma-separated values that corresponds to webID of seleted Items
//echo $_POST['selectedWebIDs'];
//this string should then be saved to the database, indicating the users wishlist
    $conn = setUpConnection();

    //TODO establish user AUTHENTICATION and registration
    //SAVE INTO database, update productList (WISHLIST) of logged-in user
    // we assume a user is logged in and these info are already stored in database
    $userID = 1;
    $username = "user1";
    $password = "userone";
    $address = "123 Fake Street";
    $phone = "123-456-7810";

    $productList = implode(",", $_POST['source1']);

    echo $productList;

    $sql = "UPDATE UserAccount SET productList ='" . $productList . "'" .
            " WHERE username ='" . $username . "'" .
            " AND password ='" . $password . "';";
        echo $sql;

    if ($conn->query($sql) === TRUE)  ;

    else
        echo "Update Error: " . $sql . "<br>" . $conn->error;
}
?>

<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="google-site-verification" content="PtlTebFoue90iB2Sc9zKLJRERVBuDYqTO50mBJqCgt0"/>
    <meta name="viewport" content="initial-scale=1.0; maximum-scale=1.0; width=device-width;">
    <link rel="stylesheet" href="http://apogee.koding.io//css/searchToolbar.css">
    <link rel="stylesheet" href="http://apogee.koding.io//css/shoptable.css">
    <link rel="stylesheet" href="http://apogee.koding.io//css/shoppage.css">
    <link rel="stylesheet" href="http://apogee.koding.io//css/sidebar.css">
    <link href='//fonts.googleapis.com/css?family=Source+Sans+Pro:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>

    <title>The Bargainers</title>
  </head>

  <body>

    <nav class="main-menu">
        <ul class="upper-side">
            <li class="main-menu-list">
                <p><i class="fa fa-users fa-2x"></i> <span class="nav-text">Dexter Kwok</span></p>
            </li>

            <li class="main-menu-list">
                <a href="http://apogee.koding.io/homepage_userloggedIn.html"><i class="fa fa-home fa-2x"></i> <span class=
                "nav-text">Home</span></a>
            </li>

            <li class="main-menu-list">
                <a href="http://apogee.koding.io/shop.php"><i class="fa fa-shopping-cart fa-2x"></i> <span class=
                "nav-text">Search Products</span></a>
            </li>

            <li class="main-menu-list">
                <a href="http://apogee.koding.io/wishlist.php"><i class="fa fa-list fa-2x"></i> <span class=
                "nav-text">Your Wishlist</span></a>
            </li>
        </ul>

        <ul class="bottom-side">
            <li class="main-menu-list">
                <a href="http://apogee.koding.io/accountsettings.html"><i class="fa fa-wrench fa-2x"></i>
                <span class="nav-text">Account Settings</span></a>
            </li>

            <li class="main-menu-list">
                <a href="http://apogee.koding.io/login.html"><i class="fa fa-power-off fa-2x"></i> <span class=
                "nav-text">Logout</span></a>
            </li>
        </ul>
    </nav>



    <div id="container">
        <div id="main" role="main" class="hellobox">
            <header><a href="http://koding.com">Koding.com</a></header>
                <h1 class="shop">The Bargainers</h1>
                <h2>Search Results</h2>
        </div>


    <div id="wishMenu">
            <table id="wishListMenu">
                <thead>
                    <tr>
                        <th class="text-left">List of Items</th>
                    </tr>
                </thead>

                <tbody id="tableBody">

                </tbody>

            </table>

            <span>
                <input id="submitWish" type="submit" value="Add to List" name="submitWish">
                <input id="cancelWish" type="submit" value="Cancel" name="cancelWish">
            </span>
    </div>



<!-- CHEAPEST IN DB -->
    <div>
<?php if (isset($cheapestInDB))  { ?>

    <h2> CHEAPEST IN THE DATABASE</h2>
    <table border="1">

        <tr>
        <th>Name</th>
        <th>Price</th>
        <th>URL</th>
        <th>Photo</th>
        </tr>

        <tr>
        <td><?php echo $cheapestInDB['name'];  ?></td>
        <td style="color:red"><?php echo $cheapestInDB['lowestPrice'];  ?></td>
<?php echo '<td><a target="_blank" href=" ' .$cheapestInDB["URL"]  . ' ">' .$cheapestInDB["URL"] . '  </td>' ; ?>
        <td><img src="<?php echo $cheapestInDB['photoURL'];  ?>" /></td>

        </tr>
    </table>
<?php } ?>

    </div>



    <div id="mainPage">
      <div id="searchQuery">
            <form method="POST" name="productSearch" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
	            <input id="submitSearch" name="submitSearch" type="search" placeholder="Search">
            </form>
        </div>

        <div class="table-title">
            <table class="table-fill">
                <thead>
                    <tr>
                        <th class="text-left">Name</th>
                        <th style="color:red" class="text-left">Lowest Price</th>
                        <th class="text-left">Price</th>
                        <th class="text-left">URL</th>
                        <th class="text-left">Photo</th>
                    </tr>
                </thead>

                <tbody class="table-hover">
                                 <div>
                                   <form id="myForm" method="POST" name="productWish" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
                                    <!--form method="POST" name="productWish" action="wishlist.php"-->
                                     	<?php
                                     	if (isset($allProducts))


                                            $webIDtemp = "";
                                	        $productIDtemp = "";


                                    	    for ($x = 0; $x < count($allProducts); $x++) {
                                    	        echo ' <tr id=searchR' . $x . '> ';


                                                $currentItem = json_decode($allProducts[$x], true);


                                            //ADDED TO PRODUCE the webID
                                                $productID =  substr($currentItem["Name"], 20);
                                                $productID = "'" . str_replace(' ', '', $productID) ."'" ;      //strip spaces

                                            //TODO
                                            //echo "<input type='checkbox'/>";
                                            //accumulate the webID and productID, a selection mechanism should determine only the ones selected

                                            //need a script which checks which ones are selected


                                                $webID =  md5($currentItem["URL"]);
                                            // $webIDtemp .=  md5($currentItem["URL"]) .  ",";

				    						//########### GET THE PRICE OF THIS PRODUCT FROM DATABASE ########

					    						$conn = setUpConnection();

						    					$sql = "SELECT lowestPrice
							    						FROM Product
								    					WHERE webID ='"  . $webID  . "';";

    											$result = $conn->query($sql);

	    										if ($result->num_rows > 0) {

		    									    $row = $result->fetch_assoc();
											  // while($row = $result->fetch_assoc()) {
			    									$lowestPrice =  $row['lowestPrice'];
											   // }
				    							}

					    						$conn->close();
											//###################################################



                                                $name = $currentItem["Name"];
                                                $url = $currentItem["URL"];
                                                $price = $currentItem["Price"];
                                                $photo = $currentItem["Photo"];


                                                echo '<td class="text-left">' . $currentItem["Name"]  . '</td>';
					    						echo '<td style="color:red" class="text-left">$' . $lowestPrice  . '</td>';
                                                echo '<td class="text-left"> $' . $currentItem["Price"]  . '</td>';
                                                echo '<td class="text-left"><a target="_blank" href=" ' . $currentItem["URL"]  . ' ">' . $currentItem["URL"] . '  </td>';
                                                echo '<td class="text-left"><img src="' . $currentItem["Photo"]  . '"/>';

                                                echo "<div style='display:none;'>
                                                        <input type='hidden' id='webID' name='webID' value='$webID' />
                                                    </div>";

                                                echo "<div style='display:none;'>
                                                        <input type='hidden' id='name' name='name' value='$name' />
                                                </div>";

                                                echo "<div style='display:none;'>
                                                        <input type='hidden' id='Price' name='Price' value='$price' />
                                                </div>";

                                                echo "<div style='display:none;'>
                                                    <input type='hidden' id='URL' name='url' value='$url' />
                                                </div>";


                                                echo "<div style='display:none;'>
                                                    <input type='hidden' id='Photo' name='Photo' value='$photo' />
                                                </div>";

                                                echo "</td></tr>";


                                            } //	echo $result;

                                                //THIS WOULD PASS THE webID to POST for PHP when Save to Wishlist is clicked
                                                 //HIDDEN INPUT
                                            echo '<input id="submitWishList" type="hidden" value="Save List" name="submitWishList">';
                                            //echo "<input type='hidden' id='selectedWebIDs' name='selectedWebIDs'/>";

                                    	?>
                    	            </form>
                            </div>
	                </tbody>
	            </table>
	        </div>
        </div>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
        <script type="text/javascript" src="http://apogee.koding.io//js/shop.js"></script>
    </body>
</html>