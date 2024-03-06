
/*** INITIALIZATION ***/

/* This function formats and sets some of the        */
/* values that already exist on the page on start-up */
function initialFormatting() {  

   /* Format initial salary listing */
   var initialSalary = document.getElementById("salary1");
   initialSalary.innerHTML = formatAsCurrency(initialSalary.innerText);
  
  /* Set the 
   
   /* Set the default end date to the date set as the retro date */
   var retroDate = document.getElementById("retrodate");
   retroDate.value = "2024-05-01";
   document.getElementById("enddate1").value = retroDate.value;
   
   /* Set the value of the first start date input to the first effective day of the CA */
   document.getElementById("startdate1").value = "2022-10-01";

}
 
/* Run the initial value setting/formatting */
window.onload = initialFormatting;   


/*** DEFINITIIONS ***/

/* Global index used to keep track of things like number of rows in the table */
var index = 1;

/* Step listing for each group of MA positions */
var stepsByPosition = {
   A: ["1", "2", "3", "4", "5", "6", "7"],
   B: ["1", "2", "3", "4", "5", "6"],
   C: ["1", "2", "3", "4", "5"]
}

/* Salary by step for each MA position as per the last CA */
var salaryTable = new Array();
   salaryTable["ma2"] = new Array(60832, 62564, 64290,	66133, 68294,	70424, 72855);
   salaryTable["ma3"] = new Array(74058,	76615, 79174,	81753, 84338, 87248);
   salaryTable["ma4"] = new Array(88431,	91054, 93934, 96824, 99698, 103137);
   salaryTable["ma5"] = new Array(103597, 106489, 110123, 113712, 117636);
   salaryTable["ma6"] = new Array(115408, 119061, 122557, 125952, 130299);
   salaryTable["ma7"] = new Array(126366, 129806, 133246, 136707, 141424);

/* Applicable period/adjustment dates for the new CA */
var caPeriodDates = new Array();
   caPeriodDates["1"] = new Array("2022-10-01", "2023-09-30");
	caPeriodDates["2"] = new Array("2023-10-01", "2024-09-30");
	caPeriodDates["3"] = new Array("2024-10-01", "2025-09-30");	

/* Salary by step for each MA position as per the new CA */
var caSalaryUpdates = new Array();
   caSalaryUpdates["1"] = new Array();
      caSalaryUpdates["1"]["ma2"] = new Array(63748, 65563, 67372, 69304, 71568, 73800, 76348);
		caSalaryUpdates["1"]["ma3"] = new Array(77608, 80288, 82969, 85672, 88381, 91431);
		caSalaryUpdates["1"]["ma4"] = new Array(92670, 95419, 98437, 101466, 104477, 108081);
		caSalaryUpdates["1"]["ma5"] = new Array(108563, 111594, 115402, 119163, 123275);
		caSalaryUpdates["1"]["ma6"] = new Array(120940, 124768, 128432, 131990, 136545);
		caSalaryUpdates["1"]["ma7"] = new Array(132424, 136028, 139634, 143261, 148204);
	caSalaryUpdates["2"] = new Array();
		caSalaryUpdates["2"]["ma2"] = new Array(65988, 67868, 69740, 71740, 74084, 76394, 79031);
		caSalaryUpdates["2"]["ma3"] = new Array(80336, 83110, 85885, 88683, 91487, 94645);
		caSalaryUpdates["2"]["ma4"] = new Array(95927, 98773, 101897, 105033, 108149, 111880);
		caSalaryUpdates["2"]["ma5"] = new Array(112379, 115517, 119458, 123352, 127608);
		caSalaryUpdates["2"]["ma6"] = new Array(125191, 129154, 132946, 136630, 141344);
		caSalaryUpdates["2"]["ma7"] = new Array(137079, 140810, 144542, 148297, 153413);
			
	caSalaryUpdates["3"] = new Array();
		caSalaryUpdates["3"]["ma2"] = new Array(67476, 69398, 71313, 73358, 75755, 78117, 80814);
		caSalaryUpdates["3"]["ma3"] = new Array(82148, 84984, 87822, 90683, 93550, 96779);
		caSalaryUpdates["3"]["ma4"] = new Array(98091, 101000, 104195, 107402, 110588, 114403);
		caSalaryUpdates["3"]["ma5"] = new Array(114914, 118122, 122152, 126134, 130485);
		caSalaryUpdates["3"]["ma6"] = new Array(128014, 132066, 135944, 139711, 144531);
		caSalaryUpdates["3"]["ma7"] = new Array(140171, 143985, 147802, 151641, 156872);


/*** FUNCTIONS ***/

/* Formats a given number as a currency string with thousand-separating commas */
function formatAsCurrency(num) {
   return Number(num).toLocaleString('en');
}

/* Takes a number formatted as a currency string and reverts it to a number */
function revertToNumber(string, locale) {

   var parts = (1234.5).toLocaleString('en').match(/(\D+)/g);
   var unformatted = document.getElementById("salary1").innerHTML;

   unformatted = unformatted.split(parts[0]).join("");
   unformatted = unformatted.split(parts[1]).join(".");

   return(parseFloat(unformatted));
}

/* Determines the number of working (business) days between two supplied dates */
	
function getWorkingDays(startDate, endDate) {

   var start = new Date(Date.parse(startDate));
	var end   = new Date(Date.parse(endDate));			
	var result = 0;

	while (start <= end) {
      
		var weekDay = start.getDay();
		if(weekDay != 0 && weekDay != 6)
      
      result++;

		start.setDate(start.getDate()+1); 
	}

	return result;
}
      
/* Unhides a table that is hidden by default in its HTML definition */
function unhideTable() {

   var tableRef1 = document.getElementById("resultsTable");
   var tableRef2 = document.getElementById("grandTotal");

   if (table.style.display == "none") {
      
      table.style.display = "block";
      
   } else {
     
      table.style.display = "none";
     
  }
}

/* Adds a row to the initial input table */      
function addRow() {
  
   var tableRef = document.getElementById('salaryTable');
	var awhRef = document.getElementById('awh1');
	var swhRef = document.getElementById('swh1');
   var positionRef = document.getElementById('position1');
   var stepRef = document.getElementById('step1');
   var salaryRef = document.getElementById('salary1');  

   index = Number(index) + 1;
   prevIndex = Number(index) - 1;
   indexString = index.toString();
   prevIndexString = prevIndex.toString();

   let newRow = tableRef.insertRow(-1);

   let periodCell = newRow.insertCell(-1);
      boldIndex = document.createElement('strong');
      boldIndex.appendChild(document.createTextNode(newRow.rowIndex)); 
      periodCell.appendChild(boldIndex);
   
   var startdateIdBase = "startdate";
   var enddateIdBase = "enddate";
   var startdatePrevID = startdateIdBase.concat(prevIndexString);
   var enddatePrevID   = enddateIdBase.concat(prevIndexString);
   var startdatePrev = document.getElementById(startdatePrevID).value;
   var enddatePrev   = document.getElementById(enddatePrevID).value;
   var retrodate     = document.getElementById("retrodate").value; 
   
   var startdateToUse = "";
   var enddateToUse   = "";
   
   if (enddatePrev == retrodate || enddatePrev == "") {
      
      enddateToUse = retrodate;
      document.getElementById(enddatePrevID).value = "";
      
   } else {
           
      var newDate = new Date(enddatePrev);
      var newDate2 = new Date(newDate.setDate(newDate.getDate() + 2));
      
      startdateToUse = newDate2.toLocaleDateString();
      enddateToUse = retrodate;
      
   }
   
   let startdateCell = newRow.insertCell(-1);
      startdateNewID = startdateIdBase.concat(indexString);
      startdateCell.innerHTML = '<td> <input id=' + startdateNewID +' type="date" value=' + startdateToUse + '> </td>';
 
   let enddateCell = newRow.insertCell(-1);
      enddateNewID = enddateIdBase.concat(indexString);
      enddateCell.innerHTML = '<td> <input id=' + enddateNewID +' type="date" value=' + enddateToUse + '> </td>';
      
	let awhCell = newRow.insertCell(-1);
		awhClone = awhRef.cloneNode(true);
		awhIdBase = "awh";
		awhNewID = awhIdBase.concat(indexString);
		awhClone.id = awhNewID;
      awhCell.appendChild(awhClone); 
		 
	let swhCell = newRow.insertCell(-1);
		swhClone = swhRef.cloneNode(true);
		swhIdBase = "swh";
		swhNewID = swhIdBase.concat(indexString);
		swhClone.id = swhNewID;
		swhCell.appendChild(swhClone); 
    
   let positionCell = newRow.insertCell(-1);
      positionClone = positionRef.cloneNode(true);
      positionIdBase = "position";
      positionNewID = positionIdBase.concat(indexString);
      positionClone.id = positionNewID;
      positionCell.appendChild(positionClone);

   let stepCell = newRow.insertCell(-1);
      stepClone = stepRef.cloneNode(true);
      stepIdBase = "step";
      stepNewID = stepIdBase.concat(indexString);
      stepClone.id = stepNewID;
      stepCell.appendChild(stepClone);
    
   let salaryCell = newRow.insertCell(-1);
      salaryIdBase = "salary";
      salaryNewID = salaryIdBase.concat(indexString);
      salaryCell.id = salaryNewID;
      salaryCell.innerHTML = salaryRef.innerHTML;
      
   // Fix issue where steps/salaries of new row addition reflect first period selection
   var newPosition = document.getElementById(positionNewID);
   var newStep = document.getElementById(salaryNewID);
   updateSteps(newPosition);
   updateSalary(newStep);
   
}

/* Removes last row of the input table */
function removeRow() {

   if (index > 1) {

      document.getElementById('salaryTable').deleteRow(index);
      index = index - 1;
   }
}
      
/* Changes the available step selection based on position input */
function updateSteps(rowInit) {

   var rowIndex = rowInit.parentNode.parentNode.rowIndex.toString(); 
   var positionIdBase = "position"
   var positionID = positionIdBase.concat(rowIndex);
   var stepIdBase = "step"
   var stepID = stepIdBase.concat(rowIndex);
   var salaryIdBase = "salary"
   var salaryID = salaryIdBase.concat(rowIndex);
    
   var selectedPosition = document.getElementById(positionID).value;
    
   for (var j = 0; j < document.getElementById(stepID).options.length; ) {
      
      document.getElementById(stepID).options.remove(j)
   }
        
   var catOptions = "";
        
   if (selectedPosition == "ma2") {
          
      for (step in stepsByPosition["A"]) {
         catOptions += "<option>" + stepsByPosition["A"][step] + "</option>";
      }
          
      document.getElementById(stepID).innerHTML = catOptions;
      document.getElementById(salaryID).innerHTML = formatAsCurrency(salaryTable[selectedPosition][0]);

   } else if (selectedPosition == "ma3" || selectedPosition == "ma4") {
        
         for (step in stepsByPosition["B"]) {
            catOptions += "<option>" + stepsByPosition["B"][step] + "</option>";
         }
            
         document.getElementById(stepID).innerHTML = catOptions;
         document.getElementById(salaryID).innerHTML = formatAsCurrency(salaryTable[selectedPosition][0]);
        
      } else if (selectedPosition == "ma4") {
        
         for (step in stepsByPosition["B"]) {
            catOptions += "<option>" + stepsByPosition["B"][step] + "</option>";
         }
            
         document.getElementById(stepID).innerHTML = catOptions;
         document.getElementById(salaryID).innerHTML = formatAsCurrency(salaryTable[selectedPosition][0]);
        
      } else if (selectedPosition == "ma5") {
        
         for (step in stepsByPosition["C"]) {
           catOptions += "<option>" + stepsByPosition["C"][step] + "</option>";
         }
            
         document.getElementById(stepID).innerHTML = catOptions;
         document.getElementById(salaryID).innerHTML = formatAsCurrency(salaryTable[selectedPosition][0]);
        
      } else if (selectedPosition == "ma6") {
        
         for (step in stepsByPosition["C"]) {
            catOptions += "<option>" + stepsByPosition["C"][step] + "</option>";
         }
            
         document.getElementById(stepID).innerHTML = catOptions;
         document.getElementById(salaryID).innerHTML = formatAsCurrency(salaryTable[selectedPosition][0]);
        
      } else if (selectedPosition == "ma7") {
      
         for (step in stepsByPosition["C"]) {
            catOptions += "<option>" + stepsByPosition["C"][step] + "</option>";
         }
        
         document.getElementById(stepID).innerHTML = catOptions;
         document.getElementById(salaryID).innerHTML = formatAsCurrency(salaryTable[selectedPosition][0]);
        
      }  
}

/* If the step has been updated, update salary based on new position and step */
function updateSalary(rowInit) {
  
   var rowIndex = rowInit.parentNode.parentNode.rowIndex.toString();
   var positionIdBase = "position"
   var positionID = positionIdBase.concat(rowIndex);  
   var stepIdBase = "step"
   var stepID = stepIdBase.concat(rowIndex);
   var salaryIdBase = "salary"
   var salaryID = salaryIdBase.concat(rowIndex);

   var selectedPosition = document.getElementById(positionID).value;
   var selectedStep = document.getElementById(stepID).value;
   var salaryIndex = selectedStep - 1;

   document.getElementById(salaryID).innerHTML = formatAsCurrency(salaryTable[selectedPosition][salaryIndex]);
}
	  
/* Once ready, calculate the retro pay based on user input for all applicable CA periods */
function calculate() {
	
   var tableRef  = document.getElementById("salaryTable");
	var tableRows = tableRef.rows.length;
	
	var startdateBaseID = "startdate";
	var enddateBaseID = "enddate";
	var swhBaseID = "swh";
	var awhBaseID = "awh";
	var positionBaseID = "position";
	var stepBaseID = "step";

   var resultsTableRef = document.getElementById("resultsTable");
   var resultsTableBody = resultsTableRef.getElementsByTagName('tbody')[0];
        
   resultsTableRef.style.border = "0px solid";
   resultsTableBody.style.border = "0px solid";

   if (resultsTableBody.rows.length > 0) {

      document.getElementById("resultsTable").getElementsByTagName('tbody')[0].innerHTML = null;
   }

   var grandTotalTable = document.getElementById("grandTotal");
   var grandTotal = document.getElementById("grandTotalPay");

   grandTotalPay = 0;

	for (i = 1; i < tableRows; i++) {
		
		startdateID = startdateBaseID.concat(i);
		enddateID 	= enddateBaseID.concat(i);
		swhID 	   = swhBaseID.concat(i);
		awhID       = awhBaseID.concat(i);			
		positionID  = positionBaseID.concat(i);
		stepID      = stepBaseID.concat(i);
		
		startDate = document.getElementById(startdateID).value;
		endDate   = document.getElementById(enddateID).value;
		swh 		 = document.getElementById(swhID).value;
		awh 		 = document.getElementById(awhID).value;
		position	 = document.getElementById(positionID).value;
		step    	 = document.getElementById(stepID).value;
		
		wdPeriod1 = 0;
		wdPeriod2 = 0;
		wdPeriod3 = 0;
      //lwopPeriod1 = 0;
      //lwopPeriod2 = 0;
      //lwopPeriod3 = 0;
      //lwopTotal = lwopPeriod1 + lwopPeriod2 + lwopPeriod3;
		wdTotal = getWorkingDays(startDate, endDate);
		wdFinal = wdTotal;
		
		startPeriod1 = null;
		endPeriod1 = null;
		startPeriod2 = null;
		endPeriod2 = null;
		startPeriod3 = null;
		endPeriod4 = null;
		
		if (caPeriodDates["1"][0] <= startDate && endDate <= caPeriodDates["1"][1]) {
		
			startPeriod1 = startDate;
			endPeriod1 = endDate;
			
			wdPeriod1 = getWorkingDays(startPeriod1, endPeriod1);

		} else if (caPeriodDates["2"][0] <= startDate && endDate <= caPeriodDates["2"][1]) {
    
            startPeriod2 = startDate;
            endPeriod2 = endDate;
      
            wdPeriod2 = getWorkingDays(startPeriod2, endPeriod2);
				
         } else if (caPeriodDates["3"][0] <= startDate && endDate <= caPeriodDates["3"][1]) {
		
            startPeriod3 = startDate;
            endPeriod3 = endDate;
      
				wdPeriod3 = getWorkingDays(startPeriod3, endPeriod3);
				
         } else if (startDate < caPeriodDates["1"][1] && endDate <= caPeriodDates["2"][1]) {
      
            startPeriod1 = startDate;
            endPeriod1 = caPeriodDates["1"][1];
            startPeriod2 = caPeriodDates["2"][0];
            endPeriod2 = endDate;
      
				wdPeriod1 = getWorkingDays(startPeriod1, endPeriod1);
				wdPeriod2 = getWorkingDays(startPeriod2, endPeriod2);
		
         } else if (startDate < caPeriodDates["2"][1] && endDate <= caPeriodDates["3"][1]) {

            startPeriod2 = startDate;
            endPeriod2 = caPeriodDates["2"][1];
            startPeriod3 = caPeriodDates["3"][0];
            endPeriod3 = endDate;
      
				wdPeriod2 = getWorkingDays(startPeriod2, endPeriod2);
				wdPeriod3 = getWorkingDays(startPeriod3, endPeriod3);

         } else {
		
            startPeriod1 = startDate;
            endPeriod1 = caPeriodDates["1"][1];
            startPeriod2 = caPeriodDates["2"][0];
            endPeriod2 = caPeriodDates["2"][1];
            startPeriod3 = caPeriodDates["3"][0];
            endPeriod3 = endDate;
    
            wdPeriod1 = getWorkingDays(startPeriod1, endPeriod1);
            wdPeriod2 = getWorkingDays(startPeriod2, endPeriod2);
            wdPeriod3 = getWorkingDays(startPeriod3, endPeriod3);
			
         }
		
	salary = salaryTable[position][step - 1];
	
	sbPeriod1 = 0;
	sbPeriod2 = 0;
	sbPeriod3 = 0;
	diffPeriod1 = 0;
	diffPeriod2 = 0;
	diffPeriod3 = 0;
		
	if (wdPeriod1 > 0) {
		sbPeriod1 = caSalaryUpdates["1"][position][step - 1];
		diffPeriod1 = Math.round(((sbPeriod1 - salary)+ Number.EPSILON) * 10) / 10; 
	}
	
	if (wdPeriod2 > 0) {
      sbPeriod2 = caSalaryUpdates["2"][position][step - 1];
      diffPeriod2 = Math.round(((sbPeriod2 - salary)+ Number.EPSILON) * 10) / 10;
	}
		
	if (wdPeriod3 > 0) {	
		sbPeriod3 = caSalaryUpdates["3"][position][step - 1];
      diffPeriod3 = Math.round(((sbPeriod3 - salary)+ Number.EPSILON) * 10) / 10;
	}
		
	payPeriod1 = (diffPeriod1 / 260.88) * wdPeriod1;
	payPeriod2 = (diffPeriod2 / 260.88) * wdPeriod2;
	payPeriod3 = (diffPeriod3 / 260.88) * wdPeriod3;
  
	totalPay = (payPeriod1 + payPeriod2 + payPeriod3);
  
   var newRow = resultsTableBody.insertRow(-1);
   var period = newRow.insertCell(-1);
   var salaryTot = newRow.insertCell(-1);
   var totalWD = newRow.insertCell(-1);
   var dw1 = newRow.insertCell(-1);
   //var lwop1 = newRow.insertCell(-1);
   var newSalary1 = newRow.insertCell(-1);
   var diff1 = newRow.insertCell(-1);
   var dw2 = newRow.insertCell(-1);
   //var lwop2 = newRow.insertCell(-1);
   var newSalary2 = newRow.insertCell(-1);
   var diff2 = newRow.insertCell(-1);
   var dw3 = newRow.insertCell(-1);
   //var lwop3 = newRow.insertCell(-1);
   var newSalary3 = newRow.insertCell(-1);
   var diff3 = newRow.insertCell(-1);
   var total = newRow.insertCell(-1);
  
   period.innerHTML = i;
   salaryTot.innerHTML = formatAsCurrency(salary);
   totalWD.innerHTML = wdTotal;
   dw1.innerHTML = wdPeriod1;
   //lwop1.innerHTML = lwopPeriod1;
   newSalary1.innerHTML = formatAsCurrency(sbPeriod1);
   diff1.innerHTML = formatAsCurrency(payPeriod1);
   dw2.innerHTML = wdPeriod2;
   //lwop2.innerHTML = lwopPeriod2;
   newSalary2.innerHTML = formatAsCurrency(sbPeriod2);
   diff2.innerHTML = formatAsCurrency(payPeriod2);
   dw3.innerHTML = wdPeriod3;
   //lwop3.innerHTML = lwopPeriod3;
   newSalary3.innerHTML = formatAsCurrency(sbPeriod3);
   diff3.innerHTML = formatAsCurrency(payPeriod3);
   total.innerHTML = formatAsCurrency(totalPay);
   
   grandTotalPay = grandTotalPay + totalPay;

	}
		
   grandTotal.innerHTML = formatAsCurrency(grandTotalPay);

   resultsTableRef.style.display = "block";
   grandTotalTable.style.display = "block";
	
}