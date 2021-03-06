<?php

        include 'config.php';


        try {
                 // connect to the database

                 $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
                 // set the PDO error mode to exception
                 $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                 // a query get all the records from the users table
                 $sql = 'SELECT date,sum(count) as count FROM events group by date order by date desc';

                 // use prepared statements, even if not strictly required is good practice
                 $stmt = $dbh->prepare($sql);

                 // execute the query
                 $stmt->execute();

                 // fetch the results into an array
                 $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

                 // convert to json
                 $json = json_encode($result);

                 // echo the json string
                 echo $json;
        }
        catch(PDOException $e)
        {
         echo json_encode([]);
        }


?>