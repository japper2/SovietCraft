<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
    $servername = "localhost";
    $username   = "andrebe1_sc";
    $password   = "r99RFLG9aGjH3Jy7aDQM";
    $dbname     = "andrebe1_sc";

    $conn = mysqli_connect($servername, $username, $password, $dbname);
    if (!$conn) {
        die("Connectie mislukt: " . mysqli_connect_error());
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = $_POST['fname'];
        if (empty($name)) {
            echo "Name is empty";
        } else {
            echo $name;
        }
    }

    $sql = "SELECT * FROM logins WHERE naam='$get_naam' AND ww='$get_ww'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        echo "Inloggen gelukt!";
    } else {
        echo "Onjuiste gebruikersnaam of wachtwoord.";
    }
    ?>
</body>
</html>