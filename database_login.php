<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
<?php
$servername = "localhost";
$username   = "andrebe1_sc";
$password   = "r99RFLG9aGjH3Jy7aDQM";
$dbname     = "andrebe1_sc";

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    http_response_code(500);
    die("Connectie mislukt: " . mysqli_connect_error());
}

// Als iemand de PHP direct opent met GET, redirect naar het loginformulier
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Location: login_page.html', true, 303);
    exit;
}

// Andere methodes dan POST (PUT/DELETE/...) niet toestaan
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo 'Gebruik POST om in te loggen.';
    exit;
}

// Verwacht velden: username, password (komen overeen met `login_page.html`)
$username_input = trim($_POST['username'] ?? '');
$password_input = trim($_POST['password'] ?? '');

if ($username_input === '' || $password_input === '') {
    echo 'Vul gebruikersnaam en wachtwoord in.';
    exit;
}

// Prepared statement om SQL-injectie te voorkomen
$stmt = $conn->prepare('SELECT id FROM logins WHERE naam = ? AND ww = ?');
if (!$stmt) {
    http_response_code(500);
    echo 'Database fout (prepare).';
    exit;
}

$stmt->bind_param('ss', $username_input, $password_input);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo 'Inloggen gelukt!';
} else {
    echo 'Onjuiste gebruikersnaam of wachtwoord.';
}

$stmt->close();
$conn->close();
?>
</body>
</html>