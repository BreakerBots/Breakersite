/* Code
fileButton.addEventListener('change', function (e) {
//Get the file
var file = e.target.files[0];

document.querySelector('#fileButtonButton').style.display = 'none';

var blob = URL.createObjectURL(e.target.files[0]);

document.querySelector('#avatarPreview').innerHTML =
'<button id="uploadAvatar" class="btn btn-space btn-primary">Upload</button>' +
'<img class="my-image" src="' + blob + '" />';

var mc = $('.my-image');
mc.croppie({
	viewport: {
		width: 150,
		height: 150,
		type: 'circle'
	},
	boundary: {
		width: 300,
		height: 300
	}
});
mc.on('update.croppie', function (ev, data) {
		
});
document.querySelector('#avatarUploaderWrapper').innerHTML = '<progress value="0" max="100" id="avatarUploader">0%</progress>';
mc.croppie('result', {
	circle: false,
}).then(function (base64) {
	//Create a reference to the location
	var storageRef = firebase.storage().ref('Avatars/' + users.getCurrentUid());

	//Convert base64 to blob for upload
	fetch(base64)
		.then(res => res.blob())
		.then(blob => {
			//Upload the file
			var task = storageRef.put(blob);

			//Update progress on progress bar
			task.on('state_changed',
				function progress(snapshot) {
					document.querySelector('#avatarUploader').value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				},
				function error(err) {

				},
				function complete() {
					ProfilePictureDialogue.close();
					document.querySelector('#avatarUploaderWrapper').clear();
					document.querySelector('#avatarPreview').clear();
					startProfile.refreshProfileAvatar(true);
				}
			);
		});
			
});
*/