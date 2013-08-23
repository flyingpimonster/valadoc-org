public static int main (string[] args) {
	MainLoop loop = new MainLoop ();

	// Create a session:
	Soup.SessionAsync session = new Soup.SessionAsync ();

	// Send a request:
	Soup.Message msg = new Soup.Message ("GET", "http://gnome.org/");
	session.queue_message (msg, (sess, mess) => {
		// Process the result:
		stdout.printf ("Status Code: %u\n", mess.status_code);
		stdout.printf ("Message length: %lld\n", mess.response_body.length);
		stdout.printf ("Data: \n%s\n", (string) mess.response_body.data);
		loop.quit ();
	});

	loop.run ();
	return 0;
}