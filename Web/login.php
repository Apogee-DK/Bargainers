<?php 
// initiate session 
session_start(); 



include('php-python/db_connect.php');       //needed for DB connection

// get last visited page that required auth, we will redirect there after successful auth
if (isset($_SESSION['lastVisited']))
    $lastVisited =  $_SESSION['lastVisited'];

//echo $lastVisited;


if ($_POST && (empty($_POST['username'])  || empty($_POST['password'])))
{
    $error = "Empty username or password";
}

// check that form has been submitted and that name and password are not empty
if ($_POST && !empty($_POST['username'])  && !empty($_POST['password'])  ) {

	//validate username and password
	$username = $_POST['username'];
	$password = $_POST['password'];
	
	//echo $username . " " . $password;
		
	//to protect from MySQL injection
	$username = stripslashes($username);
	$password = stripslashes($password);
	
	
	//$username = mysql_real_escape_string($username);
    //	$password = mysql_real_escape_string($password);

	
	$conn = setUpConnection();
	$sql = "SELECT * from UserAccount 
			WHERE password='$password' 
			AND username='$username'"  ;	 
			
		//	echo $sql;

	$result = $conn->query($sql);
	
	//echo $result->num_rows;
	
	//IF FOUND - username and password valid
	if ($result->num_rows == 1 ){
		
	//$_SESSION['username'] = $_POST['username'];	
	$_SESSION['login_user']=$username; 		// Initializing Session

	  header("location: $lastVisited"); 		// Redirecting To last visited page which required auth.
	} else {
	$error = "Username or Password is invalid";
	}
	
	
	$conn->close();
	//###########################################
} 
?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Hello World from HTML by Koding</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="stylesheet" href="//koding.com/hello/css/style.css">
<!--[if IE]>
  <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
    <link href='//fonts.googleapis.com/css?family=Source+Sans+Pro:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
</head>
<body class="html">
    <div id="container">
        <div id="main" role="main" class="hellobox">
            <header><a href="http://koding.com">Koding.com</a></header>
                <h1>The Bargainers</h1>
                <h2>Brought to you by Dexter Kwok and Lenmor Dimanalata</h2>
        </div>
        
        
        <!------- Login Form -------------->
        <h1>LOG-IN PAGE</h1>
        
        <h3><?php if (isset($error)) echo $error; ?>
        </h3>
        
        <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" class="center_form">
				<label>Username:</label>
				<input type="text" placeholder="username" name="username" id="uname" />
				<br />
				<br />
				<label>Password: </label>
				<input type="password" placeholder="********" name="password" id="password" />
				<br/><br/>
				
				<div class="center">
				<input name="submit" type="submit" value="Login"/>		
				</div>
		</form>
			
			

        <!--button id="gotohomepage" onclick="location.href='http://apogee.koding.io/homepage_userloggedIn.html'">Click Here</button-->

        <footer>
           
        </footer>
    </div>
</body>
</html>