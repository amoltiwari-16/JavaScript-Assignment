const readline=require('readline');
const fs = require('fs');
var fGrainCount=0;
var chkwrite=false;
var header =[];
var jsonData=[];
var tempData={};
var isHeader=true;
const rl = readline.createInterface({
 input: fs.createReadStream('../datafile.csv')
});
rl.on('line', function(line) {
var lineRecords= line.trim().split(',');

    if(isHeader)
    {       
    	
    		header=line.trim().split(',');
        isHeader=false;
    }
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
                		console.log(tempData);
                  }

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
console.log(tempData); 
chkwrite=false;
       tempData={};

   fs.writeFileSync("../JSON/foodgrain.json",JSON.stringify(jsonData),encoding="utf8");

});