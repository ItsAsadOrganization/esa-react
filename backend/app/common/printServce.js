// const fs = require("fs");
// const PDFDocument = require("pdfkit-table");
// const path = require("path")



// let doc = new PDFDocument({
//     margin: 30, size: 'A4', layout: "landscape",
// });

// const copies = ["student", "office", "bank"]
// const printPdf = async (payload) => {
//     try {
//         const fileName = payload.id ? `${payload.id}.pdf` : `egs-${new Date().toISOString()}.pdf`

//         const dir = path.join(path.resolve('./'), "challans")
//         if (!fs.existsSync(dir)) {
//             fs.mkdirSync(dir)
//         }


//         doc.pipe(fs.createWriteStream(path.join(path.resolve('./'), "challans", fileName)))

//             ; (async function () {
//                 // table
//                 const table = {
//                     title: "Title",
//                     subtitle: "Subtitle",
//                     width: 250,
//                     hideHeader: true,
//                     headers: [
//                         // { label: "Name", property: 'name', width: 60, renderer: null },
//                         // { label: "Description", property: 'description', width: 150, renderer: null },
//                         // { label: "Price 1", property: 'price1', width: 100, renderer: null },
//                         // { label: "Price 2", property: 'price2', width: 100, renderer: null },
//                         // { label: "Price 3", property: 'price3', width: 80, renderer: null },
//                         // {
//                         //     label: "Price 4", property: 'price4', width: 43,
//                         //     renderer: (value, indexColumn, indexRow, row, rectRow, rectCell) => { return `U$ ${Number(value).toFixed(2)}` }
//                         // },
//                     ],
//                     // complex data
//                     datas: [
//                         {
//                             name: 'Name 1',
//                             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis ante in laoreet egestas. ',
//                             price1: '$1',
//                             price3: '$ 3',
//                             price2: '$2',
//                             price4: '4',
//                         },
//                         {
//                             options: { fontSize: 10, separation: true },
//                             name: 'bold:Name 2',
//                             description: 'bold:Lorem ipsum dolor.',
//                             price1: 'bold:$1',
//                             price3: {
//                                 label: 'PRICE $3', options: { fontSize: 12 }
//                             },
//                             price2: '$2',
//                             price4: '4',
//                         },
//                         // {...},
//                     ],
//                 };
//                 // the magic
//                 copies.map(c => (
//                     doc.table({
//                         title: `${c} Copy`,
//                         subtitle: "Encore Group of Colleges",
//                         width: 250,
//                         hideHeader: true,
//                         headers: [
//                             { label: "Name", property: 'name', renderer: null },
//                             { label: "Description", property: 'description', renderer: null },
//                             { label: "Price 1", property: 'price1', renderer: null },
//                             {
//                                 label: "Price 4", property: 'price4',
//                                 renderer: (value, indexColumn, indexRow, row, rectRow, rectCell) => { return `U$ ${Number(value).toFixed(2)}` }
//                             },
//                         ],
//                         // complex data
//                         datas: [
//                             {
//                                 name: 'Name 1',
//                                 description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis ante in laoreet egestas. ',
//                                 price1: '$1',
//                                 price4: '4',
//                             },
//                             {
//                                 options: { fontSize: 10, separation: true },
//                                 name: 'bold:Name 2',
//                                 description: 'bold:Lorem ipsum dolor.',
//                                 price1: 'bold:$1',
//                                 price4: '4',
//                             },
//                             // {...},
//                         ],
//                     }, {
//                         prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
//                         prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
//                             doc.font("Helvetica").fontSize(8);
//                             indexColumn === 0 && doc.addBackground(rectRow, 'blue', 0.15);
//                         },
//                     })
//                 ))
//                 // done!
//                 doc.end();
//             })();
//     } catch (err) {
//         // next(err)
//         console.log("\n\n\n")
//         console.log({ err })
//     }
// }

// module.exports = printPdf


// const puppeteer = require('puppeteer');
// const fs = require('fs');

// (async () => {

//   // Create a browser instance
//   const browser = await puppeteer.launch();

//   // Create a new page
//   const page = await browser.newPage();

//   //Get HTML content from HTML file
//   const html = fs.readFileSync('sample.html', 'utf-8');
//   await page.setContent(html, { waitUntil: 'domcontentloaded' });

//   // To reflect CSS used for screens instead of print
//   await page.emulateMediaType('screen');

//   // Downlaod the PDF
//   const pdf = await page.pdf({
//     path: 'result.pdf',
//     margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
//     printBackground: true,
//     format: 'A4',
//   });

//   // Close the browser instance
//   await browser.close();
// })();