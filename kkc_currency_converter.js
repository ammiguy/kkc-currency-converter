/* Currency Values */
var C_Shim = 1;
var C_Drab = 11;
var C_Jot = 110;
var C_Talent = 1100;
var C_Mark = 11000;

var CW_IronPenny = 3;
var CW_HaPenny = 7.5;
var CW_CopperPenny = 15;
var CW_SilverPenny = 150;
var CW_Common = 1800;

var VHalfpenny = 6.5;
var VPenny = 13;
var VBit = 32.5;
var VQuarterBit = 65;
var VRound = 260;
var VRoyal = 2600;
var VHaft = 325;
var VNoble = 650;
var VReel = 1625;
var VFiveReel = 8125;

var ARasteur = 1.5;
var AIronLink  = 4.5;
var ASoftPenny = 13.5;
var AHardPenny = 40.5;
var ABellum = 283.5;
var ALordRose = 3402;

/* exchange variables */
var InputTotal;
var ExchangeFee = .04;

function calculateTotal (form) {
	Ceald = C_Shim * +form.InCShim.value + C_Drab * +form.InCDrab.value + C_Jot * +form.InCJot.value + C_Talent * +form.InCTalent.value + C_Mark * +form.InCMark.value;
	Common = CW_IronPenny * +form.InCWIronPenny.value + CW_HaPenny * +form.InCWHaPenny.value + CW_CopperPenny * +form.InCWCopperPenny.value + CW_SilverPenny * +form.InCWSilverPenny.value + CW_Common * +form.InCWCommon.value;
	Vint = VHalfpenny * +form.InVHalfpenny.value + VPenny * +form.InVPenny.value + VBit * +form.InVBit.value + VQuarterBit * +form.InVQuarterBit.value + VRound * +form.InVRound.value + VRoyal * +form.InVRoyal.value + VHaft * +form.InVHaft.value + VNoble * +form.InVNoble.value + VReel * +form.InVReel.value + VFiveReel * +form.InVFiveReel.value;
	Atur = ARasteur * +form.InARasteur.value + AIronLink  * +form.InAIronLink .value + ASoftPenny * +form.InASoftPenny.value + AHardPenny * +form.InAHardPenny.value + ABellum * +form.InABellum.value + ALordRose * +form.InALordRose.value;
	InputTotal = Ceald + Common + Vint + Atur;
	output = InputTotal;
	ExchangeFee = .04;
	if (document.getElementsByName('WaiveFee')[0].checked) { ExchangeFee = 0; }
	if (isNaN(output)) { alert("Do not scribble on the form. Numbers only please."); }
	form.ValueReceived.value = output;
	form.TransactionFee.value = Math.round(2 * output * ExchangeFee) / 2;
	form.ValueTendered.value = output - form.TransactionFee.value;
	clearTendered(form);
	var currencyType = document.getElementsByName('currencySelection');
	for ( var i = 0; i < currencyType.length; i++) {
		if (currencyType[i].checked) { 
			switch (i) {
			  case 0: 
				ConvertCealdish(form.ValueTendered.value,form);
				break;
			  case 2: 
				ConvertReel(form.ValueTendered.value,form);
				break;
			  case 1: 
				ConvertRound(form.ValueTendered.value,form);
				break;
			  case 3: 
				ConvertCommon(form.ValueTendered.value,form);
				break;
			  case 4: 
				ConvertAturan(form.ValueTendered.value,form);
				break;
			  default: 
				break;
			}	
		}
	}
}

function ConvertCealdish (Cash,form) {
	form.OutCMark.value = ~~(Cash / C_Mark);
	Cash = Cash - (form.OutCMark.value * C_Mark);
	form.OutCTalent.value = ~~(Cash / C_Talent);
	Cash = Cash - (form.OutCTalent.value * C_Talent);
	form.OutCJot.value = ~~(Cash / C_Jot);
	Cash = Cash - (form.OutCJot.value * C_Jot);
	form.OutCDrab.value = ~~(Cash / C_Drab);
	Cash = Cash - (form.OutCDrab.value * C_Drab);
	form.OutCShim.value = ~~(Cash / C_Shim);
}

function ConvertCommon (Cash,form) {
	form.OutCWCommon.value = ~~(Cash / CW_Common);
	Cash = Cash - (form.OutCWCommon.value * CW_Common);
	form.OutCWSilverPenny.value = ~~(Cash / CW_SilverPenny);
	Cash = Cash - (form.OutCWSilverPenny.value * CW_SilverPenny);
	form.OutCWCopperPenny.value = ~~(Cash / CW_CopperPenny);
	Cash = Cash - (form.OutCWCopperPenny.value * CW_CopperPenny);
	form.OutCWHaPenny.value = ~~(Cash / CW_HaPenny);
	Cash = Cash - (form.OutCWHaPenny.value * CW_HaPenny);
	form.OutCWIronPenny.value = ~~(Cash / CW_IronPenny);
	Cash = Cash - (form.OutCWIronPenny.value * CW_IronPenny);
	if (Cash > 1) {form.OutCShim.value = ~~(Cash / C_Shim)}
}

function ConvertRound (Cash,form) {
	form.OutVHaft.value = "0";
	form.OutVNoble.value = "0";
	form.OutVReel.value = "0";
	form.OutVFiveReel.value = "0";
	form.OutVRoyal.value = ~~(Cash / VRoyal);
	Cash = Cash - (form.OutVRoyal.value * VRoyal);
	form.OutVRound.value = ~~(Cash / VRound);
	Cash = Cash - (form.OutVRound.value * VRound);
	form.OutVQuarterBit.value = ~~(Cash / VQuarterBit);
	Cash = Cash - (form.OutVQuarterBit.value * VQuarterBit);
	form.OutVBit.value = ~~(Cash / VBit);
	Cash = Cash - (form.OutVBit.value * VBit);
	form.OutVPenny.value = ~~(Cash / VPenny);
	Cash = Cash - (form.OutVPenny.value * VPenny);
	form.OutVHalfpenny.value = ~~(Cash / VHalfpenny);
	Cash = Cash - (form.OutVHalfpenny.value * VHalfpenny);
	if (Cash > 1) {form.OutCShim.value = ~~(Cash / C_Shim)}
}

function ConvertReel (Cash,form) {
	form.OutVQuarterBit.value = "0";
	form.OutVRound.value = "0";
	form.OutVRoyal.value = "0";
	form.OutVFiveReel.value = ~~(Cash / VFiveReel);
	Cash = Cash - (form.OutVFiveReel.value * VFiveReel);
	form.OutVReel.value = ~~(Cash / VReel);
	Cash = Cash - (form.OutVReel.value * VReel);
	form.OutVNoble.value = ~~(Cash / VNoble);
	Cash = Cash - (form.OutVNoble.value * VNoble);
	form.OutVHaft.value = ~~(Cash / VHaft);
	Cash = Cash - (form.OutVHaft.value * VHaft);
	form.OutVBit.value = ~~(Cash / VBit);
	Cash = Cash - (form.OutVBit.value * VBit);
	form.OutVPenny.value = ~~(Cash / VPenny);
	Cash = Cash - (form.OutVPenny.value * VPenny);
	form.OutVHalfpenny.value = ~~(Cash / VHalfpenny);
	Cash = Cash - (form.OutVHalfpenny.value * VHalfpenny);
	if (Cash > 1) {form.OutCShim.value = ~~(Cash / C_Shim)}
}

function ConvertAturan (Cash,form) {
	form.OutALordRose.value = ~~(Cash / ALordRose);
	Cash = Cash - (form.OutALordRose.value * ALordRose);
	form.OutABellum.value = ~~(Cash / ABellum);
	Cash = Cash - (form.OutABellum.value * ABellum);
	form.OutAHardPenny.value = ~~(Cash / AHardPenny);
	Cash = Cash - (form.OutAHardPenny.value * AHardPenny);
	form.OutASoftPenny.value = ~~(Cash / ASoftPenny);
	Cash = Cash - (form.OutASoftPenny.value * ASoftPenny);
	form.OutAIronLink.value = ~~(Cash / AIronLink);
	Cash = Cash - (form.OutAIronLink.value * AIronLink);
	form.OutARasteur.value = ~~(Cash / ARasteur);
	Cash = Cash - (form.OutARasteur.value * ARasteur);
	if (Cash > 1) {form.OutCShim.value = ~~(Cash / C_Shim)}
}

function clearTendered (form) {
form.OutCShim.value = "";
form.OutCDrab.value = "";
form.OutCJot.value = "";
form.OutCTalent.value = "";
form.OutCMark.value = "";
form.OutCWIronPenny.value = "";
form.OutCWHaPenny.value = "";
form.OutCWCopperPenny.value = "";
form.OutCWSilverPenny.value = "";
form.OutCWCommon.value = "";
form.OutVHalfpenny.value = "";
form.OutVPenny.value = "";
form.OutVBit.value = "";
form.OutVQuarterBit.value = "";
form.OutVRound.value = "";
form.OutVRoyal.value = "";
form.OutVHaft.value = "";
form.OutVNoble.value = "";
form.OutVReel.value = "";
form.OutVFiveReel.value = "";
form.OutARasteur.value = "";
form.OutAIronLink .value = "";
form.OutASoftPenny.value = "";
form.OutAHardPenny.value = "";
form.OutABellum.value = "";
form.OutALordRose.value = "";
}