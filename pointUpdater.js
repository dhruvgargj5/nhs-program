function onOpen() 
{
  SpreadsheetApp.getUi()
      .createMenu('Magic')
      .addItem('Magic Button', 'run')
      .addItem("Reset",'reset')
      .addToUi();
}


function run() 
{
  var row = 2; //starting row
  var column = 2; //starting column
  var numRows = 50; //HOW MANY ENTRIES IT CAN HANDLE
  var numColumns = 5;
  var sheet = SpreadsheetApp.getActiveSheet();
  var dataRange = sheet.getRange(row, column , numRows , numColumns);
  var data = dataRange.getValues();
  updateMaster(data);

}

function reset()
{
  var row = 2; //starting row
  var column = 1; //starting column
  var numRows = 50; //HOW MANY IT WILL RESET
  var numColumns = 9;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ss1 = ss.getActiveSheet();
  var source = ss1.getRange (row, column , numRows , numColumns);
  var destSheet = ss.getSheetByName("Records");
  var destRange = destSheet.getRange(destSheet.getLastRow()+1,1);
  source.copyTo (destRange, {formatsOnly: true}); //,SpreadsheetApp.CopyPasteType.PASTE_VALUESPASTE_VALUES);
  source.clear();
  ss1.deleteRows(row,numRows);
} 

function updateMaster(data) 
{
  //ID's are the random characters that are a part of the URL between /d/ and /edit
  var sheetId = '1FY4SKTjv7BuK0rhkUzxaYcIb8aD6l2q8-sW5DxlCMuY'; //Master Sheet ID - CHANGE YEARLY
  for (i in data) 
  {
    if (data[i] == null || data[i] == "") 
    { 
      data[i] = 0; 
    }
  }
  var sheet = SpreadsheetApp.getActiveSheet();
  var masterSheet = SpreadsheetApp.open(DriveApp.getFileById(sheetId)).getActiveSheet(); //opens up the master sheet
  var dataRange = masterSheet.getRange(1, 1, 150, 6); //150 IS HOW MANY IT WILL PASTE TO
  var values = dataRange.getValues();
  var names = [];
  for (var x = 0; x <data.length;x++) // loops through data from form
  {
    names[x] = data[x][0]; //array of all the response names   
    if (data[x][0] != "" || data[x][0] != 0)
           {
             sheet.getRange(x+2,9).setValue("DONE");
           }
 
    for (var i = 0; i < values.length; i++)
    {
        if (values[i][0] == names[x])
        {
          if (data[x][3] == "School")
          {
            var value = masterSheet.getRange(i+1,3).getValue();
            value = value + (data[x][4]);
            masterSheet.getRange(i+1,3).setValue(value);//school
          }
          else if (data[x][3] == "Community")
          {
            var value1 = masterSheet.getRange(i+1,4).getValue();
            value1 = value1 + (data[x][4]);
            masterSheet.getRange(i+1,4).setValue(value1); //community
          }
          else if (data[x][3] == "Tutoring")
          {
            var value2 = masterSheet.getRange(i+1,5).getValue();
            value2 = value2 + (data[x][4]);
            masterSheet.getRange(i+1,5).setValue(value2); //tutoring
          }
        }
    }
  }
}
