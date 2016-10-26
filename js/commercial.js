const readline=require('readline');
const fs = require('fs');
var fGrainCount=0;
var chkPush=false;
var tempData={};
var header =[];
var jsonData=[];
var isHeader=true;

var agV = {" 3-1993": 0," 3-1994": 0," 3-1995": 0," 3-1996": 0," 3-1997": 0," 3-1998": 0," 3-1999": 0," 3-2000": 0," 3-2001": 0," 3-2002": 0," 3-2003": 0," 3-2004": 0," 3-2005": 0," 3-2006": 0," 3-2007": 0," 3-2008": 0," 3-2009": 0," 3-2010": 0," 3-2011": 0," 3-2012": 0," 3-2013": 0," 3-2014": 0}


const rl = readline.createInterface({
 input: fs.createReadStream('./datafile.csv')
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
                  yrCount=true;
                  if(/Particulars/i.test(header[i]))
                  {
                    if(/commercial crops [a-zA-Z]+$/i.test(lineRecords[i]))
                    {
                      chkPush=true;
                     
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
    
                    console.log(tempData);  
                    }
                    
                  }

                  if(chkPush==true&&/3-/.test(header[i]))
                  { if(/na/i.test(lineRecords[i]-1))
                    {
                      tempData[header[i]]=0;
                    }
                    else
                    {
                      if(i==0)
                      {
                        tempData[header[i]]=lineRecords[i];
                      }
                      else 
                      {
                        tempData[header[i]]=lineRecords[i+1];
                      }
                    }
                      
                    
                  }

                
                  if(chkPush==true && (header[i]==" 3-1993" || header[i]==" 3-1994" || header[i]==" 3-1995" || header[i]==" 3-1996" || header[i]==" 3-1997" || header[i]==" 3-1998" || header[i]==" 3-1999" || header[i]==" 3-2000" || header[i]==" 3-2001" || header[i]==" 3-2002" || header[i]==" 3-2003" || header[i]==" 3-2004" || header[i]==" 3-2005" || header[i]==" 3-2006" || header[i]==" 3-2007" || header[i]==" 3-2008" || header[i]==" 3-2009" || header[i]==" 3-2010" || header[i]==" 3-2011" || header[i]==" 3-2012" || header[i]==" 3-2013" || header[i]==" 3-2014"))
                  {
                    if(lineRecords[i+1]=="NA")
                    {
                      agV[header[i]] = parseFloat(agV[header[i]])+0;
                    }else
                    {
                      agV[header[i]] = parseFloat(agV[header[i]])+parseFloat(lineRecords[i+1]);
                    }
                    
                  }


                }
        jsonData.push(tempData);
          }
  chkPush=false;
  tempData={};

});

rl.on('close',function(line)
{
  var writeStream = fs.createWriteStream('../JSON/commercial.json',{'flags':'a'});
  writeStream.write("[");
  
  for(var q in agV)
  {
  
  if(q == agV.length-1)
    writeStream.write("{\"year\":\"" +q +"\",\"value\":"+ agV[q]+"}");
  else if(q == 0)
    writeStream.write("\n{\"year\":\"" +q +"\",\"value\":"+ agV[q]+"},");
  else
    writeStream.write("\n{\"year\":\"" +q +"\",\"value\":"+ agV[q]+"},");
  }

  writeStream.write("]");

 
});