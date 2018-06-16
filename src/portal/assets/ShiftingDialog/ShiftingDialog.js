//ShiftingDialog.js

/**
 
	The Shifting Dialog is system meant for an easy dialog use across desktop
	and mobile. The System shifts between fullscreen for mobile and a floating
	card (Default) for desktop. The dialog can be opened, closed, listened to
	and have its data set.

 */

var ShiftingDialog = new class ShiftingDialog {
	open() {
		var sdc = document.querySelector('#SD-Container');
		document.querySelector("#SD-Form").removeAttribute('novalidate');
		if (sdc.dataset.sdContainerState != "opening" && sdc.dataset.sdContainerState != "open") {
			this.scrollWasHidden = document.querySelector("#page-scroll").style.overflowY == "hidden";
			document.querySelector("#page-scroll").style.overflowY = "hidden";
			sdc.dataset.sdContainerState = "opening";
			setTimeout(function () {
				if (sdc.dataset.sdContainerState == "opening")
					sdc.dataset.sdContainerState = "open";
			}, 1000);
		}
		document.querySelector("#SD-FooterSubmit").disabled = false;
	}
	close() {
		var sdc = document.querySelector('#SD-Container');
		document.querySelector("#SD-Form").setAttribute('novalidate', '');
		if (sdc.dataset.sdContainerState != "closed" && sdc.dataset.sdContainerState != "closed") {
			if (!this.scrollWasHidden) document.querySelector("#page-scroll").style.overflowY = "auto";
			sdc.dataset.sdContainerState = "closing";
			setTimeout(function () {
				if (sdc.dataset.sdContainerState == "closing")
					sdc.dataset.sdContainerState = "closed";
			}, 1000);
		}
	}
	isOpen() {
		var sdc = document.querySelector('#SD-Container');
		return sdc.dataset.sdContainerState == "opening" || sdc.dataset.sdContainerState == "open";
	}
	/**
	 * Sets the data inside the Shifiting Dialog
	 * @param {String} title The Title of the dialog
	 * @param {any} submitButton The text inside the submit button, entering null or undefined with have no submit button
	 * @param {any} closeButton The text inside the cancel button, entering null or undefined with have no cancel button
	 * @param {any} contents A chunk of html representing the contents that should be inside the dialog. Ids on elements would be advised for grabbing submit data
	 */
	set(id, title, submitButton, cancelButton, contents, centerButtons, swapButtons) {
		//Set the title
		document.querySelector('#SD-HeaderTitle').innerHTML = title ? title : "";
		this.currentId = id;

		//Set the submit button
		document.querySelector('#SD-FooterSubmit').innerHTML = submitButton ? submitButton : "Submit";
		document.querySelector('#SD-FooterSubmit').style.display = submitButton ? "block" : "none";
		document.querySelector("#SD-FooterSubmit").disabled = false;

		//Set the cancel button
		document.querySelector('#SD-FooterCancel').innerHTML = cancelButton ? cancelButton : "Cancel";
		document.querySelector('#SD-FooterCancel').style.display = cancelButton ? "block" : "none";

		//Center and Swap Buttons
		document.querySelector("#SD-Footer").style.justifyContent = swapButtons ? "center" : "flex-end";

		//The the contents
		document.querySelector("#SD-Wrapper").innerHTML = contents ? contents : "";

		//Initialize the components
		window.mdc.autoInit(document.querySelector("#SD-Wrapper"));
		dateTimePickerAutoInit($("#SD-Wrapper"));
		AutocompleteAutoInit();
		AutocompleteUsersAutoInit();
	}
	addSubmitListener(title, callback) {
		SD_Listeners.push({ title: title, callback: callback });
	}
	throwFormError(err, target) {
		if (this.isOpen()) {
			if (target) {
				target.setCustomValidity(err || "Error");
				target.reportValidity();
				if (target.tagName == "BUTTON") target.addEventListener('click', function () { this.setCustomValidity(""); });
				else target.addEventListener('input', function () { this.setCustomValidity(""); });
				return true;
			}
			else {
				document.querySelector("#SD-FooterSubmit").setCustomValidity(err || "Error");
				document.querySelector("#SD-FooterSubmit").reportValidity();
				return true;
			}
			return false;
		}
		return false;
	}
	enableSubmitButton(state) {
		document.querySelector("#SD-FooterSubmit").disabled = state == undefined ? false : !state;
	}
}

var SD_Listeners = [];

//Form Handling
function ShiftingDialogSubmit() {
	if (ShiftingDialog.isOpen()) {
		document.querySelector("#SD-FooterSubmit").disabled = true;
		var currentTitle = ShiftingDialog.currentId;
		var currentPacket = document.querySelector("#SD-Form");
		for (var i = 0; i < SD_Listeners.length; i++) {
			if (SD_Listeners[i].title == currentTitle)
				SD_Listeners[i].callback(currentPacket);
		}
	}
}

//Close the dialog on a press somewhere else
document.querySelector("#SD-Container").addEventListener('click', function () {
	//Making sure it's clicking it and not its child
	if (event.target != this) { return; } 
	ShiftingDialog.close();
});

//Close the dialog on [Escape] pressed.
window.onkeyup = function (e) {
	if (e.key == "Escape" && ShiftingDialog.isOpen()) {
		ShiftingDialog.close();
	}
}

//Close Button
document.querySelector("#SD-HeaderClose").addEventListener('click', function () {
	ShiftingDialog.close();
});

//Shifting between fullscreen (Mobile) and default (Desktop)
window.addEventListener('resize', ShiftingDialogCheckShift);
ShiftingDialogCheckShift();
setInterval(ShiftingDialogCheckShift, 2000);
function ShiftingDialogCheckShift() {
	if (window.innerWidth <= 768) {
		//Fullscreen (Mobile)
		document.querySelector("#SD-Main").dataset.sdMainState = "fullscreen";
	}
	else {
		//Default (Desktop)
		document.querySelector("#SD-Main").dataset.sdMainState = "default";
	}

	//Some extra footer stuff
}

//Header Shadow
document.querySelector("#SD-Wrapper").addEventListener('scroll', SD_HeaderShadow);
document.querySelector("#SD-Wrapper").addEventListener('resize', SD_HeaderShadow);
SD_HeaderShadow(); setInterval(SD_HeaderShadow, 2000);
function SD_HeaderShadow() {
	if (document.querySelector("#SD-Wrapper").scrollTop > 5)
		document.querySelector("#SD-Header").classList.add("mdc-elevation--z10");
	else
		document.querySelector("#SD-Header").classList.remove("mdc-elevation--z10");
}

function dateTimePickerAutoInit(wrapper) {
	var inits = wrapper.find(".datetimepicker");
	inits.datetimepicker({
		format: 'mm-dd-yyyy',
		autoclose: true,
		minView: 2
	});
}