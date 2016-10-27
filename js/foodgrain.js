//global variable declaration
const readline=require('readline');
const fs = require('fs');
var fGrainCount=0;
var chkwrite=false;
var header =[];
var jsonData=[];
var tempData={};
var isHeader=true;

//Creating interface for reading stream
const rl = readline.createInterface({
 input: fs.createReadStream('../csv/datafile.csv')
});

//reading data line by line
rl.on('line', function(line) {
var lineRecords= line.trim().split(',');
//Reading header data
    if(isHeader)
    {       
    	
    		header=line.trim().split(',');
        isHeader=false;
    } //Reading data excluding header
       else{
                for(var i=0;i<lineRecords.length;i++)
                {

                  if(/Particulars/i.test(header[i]))
                  {
                    if(/agricultural production oilseeds/i.test(lineRecords[i])||(/^agricultural production foodgrains/i.test(lineRecords[i])&&fGrainCount==0))
                    {
                      chkwrite=true;
                      if(/agricultural production oilseeds/i.test(lineRecords[i]))
                      {
                        
                        fGrainCount++;
                        if(fGrainCount>0)
                        {
                          break;
                        }
                      }
                      if(i==0)
                      {
                        tempData[header[i]]=lineRecords[i];
                      }
                      else if(i==1)
                      {
                        tempData[header[i]]=lineRecords[i]+lineRecords[i+1];
                      }
                      else 
                      {
                        tempData[header[i]]=lineRecords[i+1];
                      }
                    }
                  }
                  //Checking only those row data to be taken who matched the above condition
                  if(chkwrite==true&&/3-2013/i.test(header[i]))
                  {
                      if(i==0)
                      {
                        tempData[header[i]]=lineRecords[i];
                      }
                      else if(i==1)
                      {
                        tempData[header[i]]=lineRecords[i]+lineRecords[i+1];
                      }
                      else 
                      {
                        tempData[header[i]]=lineRecords[i+1];
                      }
      
                        jsonData.push(tempData)
                  }
              }
          }
chkwrite=false;
tempData={};
//Writing data to JSON file
fs.writeFileSync("../JSON/foodgrain.json",JSON.stringify(jsonData),encoding="utf8");

});