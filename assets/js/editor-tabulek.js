/*
 *  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *                   ___
 *                  |  _|___ ___ ___
 *                  |  _|  _| -_| -_|  LICENCE
 *                  |_| |_| |___|___|
 *
 * IT ZPRAVODAJSTVÍ  <>  PROGRAMOVÁNÍ  <>  HW A SW  <>  KOMUNITA
 *
 * Tento zdrojový kód pochází z IT sociální sítě WWW.ITNETWORK.CZ
 *
 * Můžete ho upravovat a používat jak chcete, musíte však zmínit
 * odkaz na http://www.itnetwork.cz
 */

let tabulka;
let vychoziVelikostX = 4;
let vychoziVelikostY = 4;

let aktivniBunka;

function vytvorVychoziTabulku() {
	tabulka = document.createElement("table");
	document.body.appendChild(tabulka);
	for (let y = 0; y < vychoziVelikostY; y++) {
		let tr = document.createElement("tr");
		tabulka.appendChild(tr);

		for (let x = 0; x < vychoziVelikostX; x++) {
			tr.appendChild(vytvorBunku());
		}
	}
}

function vytvorOvladaciTlacitka() {
	vytvorTlacitkoAVlozHo("Přidat řádek dolů", document.body).onclick = pridejRadekDolu;	
	vytvorTlacitkoAVlozHo("Přidat řádek nahoru", document.body).onclick = pridejRadekNahoru;	
	vytvorTlacitkoAVlozHo("Přidat sloupec vlevo", document.body).onclick = pridejSloupecDoleva;
	vytvorTlacitkoAVlozHo("Přidat sloupec vpravo", document.body).onclick = pridejSloupecDoprava;
	vytvorTlacitkoAVlozHo("Odstranit řádek", document.body).onclick = smazRadek;
	vytvorTlacitkoAVlozHo("Odstranit sloupec", document.body).onclick = smazSloupec;
}

function vytvorBunku() {
	let td = document.createElement("td");
	
	let tdInput = document.createElement("input");

	tdInput.type = "text";
	//tdInput.onfocus = (function () {
		aktivniBunka = tdInput;
	//});
	td.appendChild(tdInput);

	return td;
}

function vytvorRadek() {
	let novyRadek = document.createElement("tr");
	
	let prvniRadek = tabulka.firstElementChild;
        
       
        
	let bunkyPrvnihoRadku = prvniRadek.childNodes;
	let pocetBunekVPrvnimRadku = bunkyPrvnihoRadku.length;
	
	/*
	 * table = <TABLE>
	 * table.firstElementChild = <TR>
	 * table.firstElementChild.childNodes = [<TD>]
	 * table.firstElementChild.childNodes.length = number
	 * 
	 * table.	firstElementChild.	childNodes	.length
	 * <TABLE>.	<TR>.			[<TD>]		.length 
	 */
	
	for (let i = 0; i < pocetBunekVPrvnimRadku; i++) {
		novyRadek.appendChild(vytvorBunku());
	}
	return novyRadek;
}

function vytvorTlacitkoAVlozHo(popisek, rodic) {
	let btn = document.createElement("button");
	btn.textContent = popisek;
	rodic.appendChild(btn);
	return btn;
}

function indexRadkuAktivniBunky() {
	let cilHledani = tabulka.childNodes;
        
         console.log(aktivniBunka);
	let hledanyPrvek = aktivniBunka.parentElement.parentElement;
        
       
        
	return Array.prototype.indexOf.call(cilHledani, hledanyPrvek);
}

function indexSloupceAktivniBunky() {
	let bunkyVRadku = aktivniBunka.parentElement.parentElement.childNodes;
	let td = aktivniBunka.parentElement;
	return Array.prototype.indexOf.call(bunkyVRadku, td);
}

function pridejRadekNahoru() {
	let radek = vytvorRadek();
	let indexVybraneho = indexRadkuAktivniBunky();
	tabulka.insertBefore(radek, tabulka.childNodes[indexVybraneho]);
}

function pridejRadekDolu() {
	let radek = vytvorRadek();
	let indexVybraneho = indexRadkuAktivniBunky();
	if (tabulka.lastChild === tabulka.childNodes[indexVybraneho]) {
		tabulka.appendChild(radek);
	} else {
		tabulka.insertBefore(radek, tabulka.childNodes[indexVybraneho + 1]);
	}
}

function pridejSloupecDoleva() {
	let indexVybraneho = indexSloupceAktivniBunky();
	for (let i = 0; i < tabulka.childNodes.length; i++) {
		tabulka.childNodes[i].insertBefore(vytvorBunku(), tabulka.childNodes[i].childNodes[indexVybraneho]);
	}
}

function pridejSloupecDoprava() {
	let indexVybraneho = indexSloupceAktivniBunky();
	for (let i = 0; i < tabulka.childNodes.length; i++) {
		if (tabulka.childNodes[i].childNodes[indexVybraneho] == tabulka.childNodes[i].lastElementChild) {
			tabulka.childNodes[i].appendChild(vytvorBunku());
		} else {
			tabulka.childNodes[i].insertBefore(vytvorBunku(), tabulka.childNodes[i].childNodes[indexVybraneho + 1]);
		}
	}
}

function smazRadek() {
	let indexVybraneho = indexRadkuAktivniBunky();
	tabulka.removeChild(tabulka.childNodes[indexVybraneho]);
}

function smazSloupec() {
	let indexVybraneho = indexSloupceAktivniBunky();
	for (let i = 0; i < tabulka.childNodes.length; i++) {
		tabulka.childNodes[i].removeChild(tabulka.childNodes[i].childNodes[indexVybraneho]);
	}
}

window.onload = function () {
	vytvorOvladaciTlacitka();
	vytvorVychoziTabulku();
}