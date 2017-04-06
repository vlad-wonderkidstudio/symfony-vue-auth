<?
error_reporting(E_ALL & ~E_NOTICE);
$request_body = file_get_contents('php://input');
$POST = json_decode($request_body);

switch ($_GET['act']) {
	
	case 'login' : 
		if ( $POST->username!= 'admin' || $POST->password != '123' ) {
			header("HTTP/1.0 404 There is no user with such username/password");
			print_r ($POST);
			exit;
		}
		else {
			header("HTTP/1.0 200 OK");
			header('Content-Type: application/json');
			session_start();
			$data = (object) array (
				'id_token' => session_id()
			);
			echo json_encode($data);
			exit;
		}
		break;
	case 'logout' :
		session_destroy();
		break;
    case 'getsettingsitems' :
        header("HTTP/1.0 200 OK");
        header('Content-Type: application/json');
        session_start();

        $data = array();
        for ($i = 0; $i< 20; $i++) {
            $data [$i] = (object) array (
                'id' => $i,
                'name' => "user$i",
                'email' => "user$i\@user.uu",
                'createdAt' => '2017-02-26 12:14:10 ',
                'READ' => rand (0,1),
                'EDIT' => rand (0,1),
                'DELETE' => rand(0,1),
            );
        }
        $out = (object) array (
            'data' => $data,
        );
        $_SESSION['data'] = $out;
        echo json_encode($out);
        exit;
        break;
    case 'savesettingsitems' : 
        header("HTTP/1.0 200 OK");
        header('Content-Type: application/json');
        session_start();
        print_r ($POST);
        echo "\n<br><br>\n";
        print_r($_SESSION['data']);

        //Compare $_SESSION['data'] and $POST
        //and save only those which changed (in Vue it is almost impossible to do so. SO on the backend)

        exit;
        break;

}