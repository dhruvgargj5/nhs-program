var schoolLimit;
var tutoringLimit;
var communityLimit;
var overallLimit;
var data;

function onOpen() 
{
  SpreadsheetApp.getUi()
      .createMenu('Magic Button')
      .addItem('Send Emails to Students', 'run')
      .addItem ('Prompt Hours','hoursPrompt')
      .addItem('Send Email to Syme/Rice' , 'returnList')
      .addToUi();  
}

function run()
{
  emailSend(indexFind() , data );
}

function hoursPrompt()
{
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt('Enter amount of required tutoring hours');
  
  if (response.getSelectedButton() == ui.Button.OK) 
  {
   tutoringLimit = response.getResponseText();
  }
  
  var response2 = ui.prompt('Enter amount of required community hours');
  
  if (response2.getSelectedButton() == ui.Button.OK) 
  {
   communityLimit = response2.getResponseText();
  }
  
  var response3 = ui.prompt('Enter amount of required school hours');
  
  if (response3.getSelectedButton() == ui.Button.OK) 
  {
   schoolLimit = response3.getResponseText();
  }
  
  var response4 = ui.prompt('Enter amount of required overall hours');
  
  if (response4.getSelectedButton() == ui.Button.OK) 
  {
   overallLimit = response4.getResponseText();
  }
}

function indexFind()
{
  var row = 2; //starting row
  var column = 1; //starting column
  var numRows = 101; //HOW MANY IT WILL PROCESS (SHOULD BE TOTAL AMOUNT OF STUDENTS)
  var numColumns = 7 ;
  var sheet = SpreadsheetApp.getActiveSheet();
  var dataRange = sheet.getRange(row, column , numRows , numColumns);
  data = dataRange.getValues();
  var indexes = [];
  for (var i  = 0 ; i < numRows; i++)
  {
    var sSchool = data[i][2];
    var sCommunity = data[i][3];
    var sTutoring = data[i][4];
    var sTotal = data[i][5];
    if (data[i][0]!="")
    {
      if (sSchool < schoolLimit || sCommunity < communityLimit || sTutoring < tutoringLimit || sTotal < overallLimit)
      {
        indexes.push(i);
      }
    }
    
  }
  //Logger.log(indexes);
  return indexes;
  
}


function returnList(indexes , data)
{
  var names = [];
  var message; 
  for ( var  i  = 0 ; i < indexes.length ; i++ ) 
  {
    names.push(data[indexes[i]][0]);
    message = message + names[i] + "\n";
  }
  var email = 'ssyme@troy.k12.mi.us';
  Mail.App.sendEmail(email,"Students With Low NHS Points" , message);
}

function emailSend(indexes , data) //indexes is an array of all the indexes of the students with low points, data has the data 
{
  
  var requirmentHours = "You are required to have a minimum of " + tutoringLimit + " tutoring hours at this time." + "\n\n" + 
  "You are required to have at a minimum of " + schoolLimit + " school hours at this time." + "\n\n" + 
  "You are required to have at a minimum of " + communityLimit + " community hours at this time." + "\n\n" + 
  "You are required to have at a minimum of " + overallLimit + " overall hours at this time.";
  
  var message = "Your points are low in \n";
  var hourMessage = "You only have \n ";
  
  
  for (var i  = 0 ; i < indexes.length ; i++ ) //sends emails
  {
    if (data[indexes[i]][2] == '')
    {
      data[indexes[i]][2] = 0;
    }
    if (data[indexes[i]][3] == '')
    {
      data[indexes[i]][3] = 0;
    }
    if (data[indexes[i]][4] == '')
    {
      data[indexes[i]][4] = 0;
    }
    if (data[indexes[i]][5] == '')
    {
      data[indexes[i]][5] = 0;
    }
    if (data[indexes[i]][2] < schoolLimit)
    {
      message = message + "school \n";
      hourMessage = hourMessage + data[indexes[i]][2] + " points in school \n ";
    }
    if (data[indexes[i]][3] < communityLimit)
    {
      message = message + "community \n";
      hourMessage = hourMessage + data[indexes[i]][3] + " points in community \n";
    }
    if (data[indexes[i]][4] < tutoringLimit)
    {
      message = message + "tutoring \n";
      hourMessage = hourMessage + data[indexes[i]][4] + " points in tutoring \n";
    }
    if (data[indexes[i]][5] < overallLimit)
    {
      message = message + "total \n";
      hourMessage = hourMessage + data[indexes[i]][5] + " points in total \n";
    }
    
    MailApp.sendEmail (data[indexes[i]][6] , "Low NHS Points" , message + "\n\n" + hourMessage + "\n\n" + requirmentHours);
     message = "Your points are low in \n";
     hourMessage = "You only have \n ";
  } 
}


