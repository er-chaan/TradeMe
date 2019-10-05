const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
    {id: 'code', title: 'Code'},
    {id: 'symbol', title: 'Symbol'},
    {id: 'name', title: 'Name'},
  ]
});
const csv = require('csv-parser');
const request = require('request');
const fs = require('fs');
count = 0;
fs.createReadStream('LDE_EQUITIES_MORE_THAN_5_YEARS.csv')
  .pipe(csv())
  .on('data', (row) => {
      count++;
      var company_symbol = row.Symbol;
      var company_name = row.Company;
      var company_name = (company_name).replace("LTD","");
      company_name = (company_name).replace("Limited","");
            request('https://money.rediff.com/snsproxy.php?type=all&prefix='+company_name+'', function (error, response, body) {
                    body = body.replace("Suggestionr.show(","");
                    body = body.replace('"','');
                    company_code= body.substr(0,body.indexOf('#'));
                    body = body.replace("Suggestionr.show(","");
                    console.log(company_code+","+company_symbol+","+row.Company);
                    data = company_code+","+company_symbol+","+company_name+"\n";
                    data = [{
                            code: company_code,
                            symbol: company_symbol,
                            name: row.company
                            }];
                      
                    csvWriter.writeRecords(data);
            })
  })
  .on('end', () => {
    console.log('CSV file successfully processed : '+count);
  });