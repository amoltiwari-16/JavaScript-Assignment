const readline=require('readline');
const fs = require('fs');
var fGrainCount=0;
var flag=false;
var header =[];
var jsonData=[];
var tempData={};
var isHeader=true;
const rl = readline.createInterface({
input: fs.createReadStream('../csv/datafile.csv')
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
                   if(/^Agricultural Production Foodgrains Rice Yield/i.test(lineRecords[i])&&/(karnataka|andhra pradesh|kerala|tamil nadu)$/i.test(lineRecords[i]))
                   {
                    flag=true;
                     if(i==0)
                     {
                       tempData[header[i]]=lineRecords[i].replace("Agricultural Production Foodgrains Rice Yield", "");
                     }
                     else 
                     {
                       tempData[header[i]]=lineRecords[i+1].replace("Agricultural Production Foodgrains Rice Yield", "");
                     }                       
                   }
                 }

                 if(flag==true&&/(3-200[4-9])|(3-201[0-3])/i.test(header[i]))
                 {    
                    
                     if(i==0)
                     {
                       tempData[header[i]]=parseFloat(lineRecords[i]);
                     }
                     else if(i==1)
                     {
                       tempData[header[i]]=parseFloat(lineRecords[i])+parseFloat(lineRecords[i+1]);
                     }
                     else 
                     {
                       tempData[header[i]]=parseFloat(lineRecords[i+1]);
                     }                  
                 
                 }
               }jsonData.push(tempData);

                  }

flag=false;
tempData={};
 fs.writeFileSync("../JSON/rice.json",JSON.stringify(jsonData.filter(function(el) {return Object.keys(el).length > 0;})),encoding="utf8");

});