/**
 * Module dependencies
 */
var PDF = require('pdfkitjs'),
    fs = require('fs');

/**
 * Expose the api routes
 */
module.exports = function(app) {

  app.get("/pdf", function(req, res, next) {


    pdf = new PDF('html', '<h1>Hello</h1>');

console.log(pdf);
res.send(pdf)
    // res.pipe(pdf)

    // pdf.pipe(res)

    return

pdf.toFile('google.pdf', function (err, file) {
  console.log('File ' + file + ' written');
});
return
    var html = '<h1>asdf</h1>';
    var doc = new PDF(html);
    console.log(doc);
    doc.pipe(res);

    // doc.info['Title'] = 'People | FamilySearch Photos';
    // var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl. Suspendisse rhoncus nisl posuere tortor tempus et dapibus elit porta. Cras leo neque, elementum a rhoncus ut, vestibulum non nibh. Phasellus pretium justo turpis. Etiam vulputate, odio vitae tincidunt ultricies, eros odio dapibus nisi, ut tincidunt lacus arcu eu elit. Aenean velit erat, vehicula eget lacinia ut, dignissim non tellus. Aliquam nec lacus mi, sed vestibulum nunc. Suspendisse potenti. Curabitur vitae sem turpis. Vestibulum sed neque eget dolor dapibus porttitor at sit amet sem. Fusce a turpis lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;';
    // doc.text(lorem,{
    //   columns: 3,
    //   columnGap: 20,
    //   height: 300,
    //   width: 450,
    //   align: 'left'
    // });
    // doc.fillColor('#333');

    doc.end();
    // res.pipe(doc)
    return;
    // URL
    // wkhtmltopdf('<h1>Test</h1><p>Hello world</p>', { pageSize: 'letter' })
    //   .pipe(res);

    // // HTML
    wkhtmltopdf('<h1>Test</h1><p>Hello world</p>')
      .pipe(res);
    //
    // // output to a file directly
    // wkhtmltopdf('http://apple.com/', { output: 'out.pdf' });
    //
    // // Optional callback
    // wkhtmltopdf('http://google.com/', { pageSize: 'letter' }, function (code, signal) {
    // });
    // wkhtmltopdf('http://google.com/', function (code, signal) {
    // });
    // res.render('angular',{user: req.user});
  });

};
