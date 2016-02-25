<?php
session_start();     //starts the PHP session
$authenticated = false;


// take note of this page (wishlist.php) as the last visited page
// this is for the session.php to know where to redirect after successful login

$_SESSION['lastVisited'] =  basename($_SERVER['PHP_SELF']);         //wishlist.php


include('php-python/db_connect.php');       //needed for DB connection
//hardcode Session user, normally we should get this info after making sure user logged-in (and registered)
//TAKE OFF HARD-CODING FOR NOW, CAN BE USEFUL FOR TESTING OTHER FEATURES
//$_SESSION['login_user'] = 'user1';
if (isset($_SESSION['login_user']))
{
   // if (isset($_POST['submitWish'])) {             //wishlist button clicked
    	$login_session = $_SESSION['login_user'];
    	$authenticated = true;
        	$conn2 = setUpConnection();			//execute query
        	$sql2 = "SELECT name, productList
        	        FROM UserAccount
			        WHERE username = '"  .  $login_session   .  "' ;"  ;
			$result2 = $conn2->query($sql2);
        	if ($result2->num_rows > 0) {
        			$row= $result2->fetch_assoc();
        			$wishListArray =  explode("," , $row['productList']);

        			//ALSO GET USER'S FULL NAME

        			$name = $row['name'];

        	}
        	$conn2->close();
       // echo "WISHLIST SAVE";
         //now this is an underscore-separated values that corresponds to webID of seleted Items
        //echo $_POST['webID'];
        //this string should then be saved to the database, indicating the users wishlist
   // }
}
?>

<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link href='//fonts.googleapis.com/css?family=Source+Sans+Pro:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="..//css/sidebar.css">
    <link rel="stylesheet" href="..//css/viewpage.css">
  </head>

  <body>



  	<!------------- DISPLAY IF USER HAS BEEN AUTHENTICATED-------------------------->
  	<!----- #### THIS CAN BE MOVED WHEREVER APPROPRIATE ----->
	<?php
	// check whether session variable is set
    //	if (isset($_SESSION['login_user'])) {
    if ($authenticated) {
	// if set, greet by name
	echo 'You are logged in as ' . $_SESSION['login_user'] . ' ' ;

	echo '<a href="logout.php">Logout</a>';         // LOGOUT link, we can also put it in a button somewhere
	} else {
            // WE CAN DISPLAY MESSAGE HERE IF USER HAS NOT LOGGED IN YET
	}
	?>
	<!--------------------------------------------------------------->




  <div class="setSide-BarColor">
  </div>
    <nav class="main-menu">
        <ul class="upper-side">
            <li class="main-menu-list">
                <p><i class="fa fa-users fa-2x"></i> <span class="nav-text">
                <?php
                    // DISPLAY NAME OF LOGGED-IN USER IF LOGGED IN

                    if (isset($name))
                    echo $name;
                    else
                        echo " ";        //what should we display here if user not logged in yet
                ?>
                </span></p>
            </li>

            <li class="main-menu-list">
                <a href="homepage_userloggedIn.html"><i class="fa fa-home fa-2x"></i> <span class=
                "nav-text">Home</span></a>
            </li>

            <li class="main-menu-list">
                <a href="shop.php"><i class="fa fa-shopping-cart fa-2x"></i> <span class=
                "nav-text">Search Products</span></a>
            </li>

            <li class="main-menu-list">
                <a href="wishlist.php"><i class="fa fa-list fa-2x"></i> <span class=
                "nav-text">Your Wishlist</span></a>
            </li>
        </ul>

        <ul class="bottom-side">
            <li class="main-menu-list">
                <a href="accountsettings.html"><i class="fa fa-wrench fa-2x"></i>
                <span class="nav-text">Account Settings</span></a>
            </li>

            <li class="main-menu-list">
            <!-- ### CHANGED TO LOGOUT.PHP -->
                <a href="logout.php"><i class="fa fa-power-off fa-2x"></i> <span class=
                "nav-text">Logout</span></a>
            </li>
        </ul>
    </nav>



    <div id="container">


        	<?php   //##### AUTHENTICATED BLOCK #########
        	        //##### only display this if authenticated
        	       // THIS WHOLE BLOCK SURROUNDED BY {} including the
        	       //HTML will only be displayed if authenticated
				if ($authenticated) { ?>

                    <div id="main">
                        <?php
                        if (isset($_SESSION['login_user'])) {
                            echo "<h2>Welcome to your wishlist, ". $name . " </h2>";
                            }
                        ?>
                    </div>

                    <div id="mainPage" ng-controller="TodoListController as todoList">



                        <table border="1">


                        <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>URL</th>
                                    <th>Photo</th>
                        </tr>

                        <?php
                         if (isset($wishListArray)) {
                             $conn2 = setUpConnection();			//execute query
                             foreach ($wishListArray as $value) {
                                    //query DB for all info on a certain wishlist item webID
                                    $sql2 = "SELECT *
                        	        FROM Product
                			        WHERE webID = '"  .  $value   .  "' ;"  ;
                			        //echo $sql2;
                        			$result2 = $conn2->query($sql2);
                                	if ($result2->num_rows > 0) {
                                	    while($row = $result2->fetch_assoc()) {
                                	        echo "<tr>";
                                			 echo '<td>' . $row["name"]  . '</td>';
                                             echo '<td> $' . $row["lowestPrice"]  . '</td>';
                                             echo '<td><a target="_blank" href=" ' . $row["URL"]  . ' ">' . $row["URL"] . '  </td>';
                                             echo '<td><img src="' . $row["photoURL"]  . '"/></td>';
                                            echo "</tr>";
                                	    }
                                	}
                                //	else {
                                //	    echo "Wishlist empty";
                                //	}
                             }
                             	$conn2->close();
                         }
                        ?>


        	<?php }     // ### if not authenticated then display this
        	else    { ?>
		    	<h2>Please log-in to access this page. <a href="login.php">LOGIN</a></h2>
		    	<?php

        	    // ######### END OF AUTHENTICATED block
        	}  ?>

            </table>



        </div>
  </body>
</html>