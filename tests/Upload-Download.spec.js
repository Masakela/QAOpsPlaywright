//Lecture 15
import {test, expect}  from '@playwright/test';
const ExcelJS = require('exceljs')

async function writeExcelTest(serchText, replaceText, change, filePath) {


    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.readFile(filePath)

    const worksheet = workbook.getWorksheet('Sheet1')
    const output = await readExcel(worksheet, serchText,)

    const cellValue = worksheet.getCell(output.row, output.column+change.colChange)
    cellValue.value = replaceText
    await workbook.xlsx.writeFile(filePath)
}


//The then key work acts the same as (async and await combination)
/* const workbook = new ExcelJS.Workbook()
workbook.xlsx.readFile("C:/Users/masak/Downloads/excelTest.xlsx").then(function(){

    const worksheet = workbook.getWorksheet('Sheet1')
    worksheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, colNumber) => {

            console.log(cell.value)
        })
    })
}) */

async function readExcel(worksheet, searchText) {

    let output = { row: -1, column: -1 }

    worksheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, colNumber) => {

            //console.log(cell.value)
            if (cell.value === searchText) {
                output.row = rowNumber
                output.column = colNumber
            }
        })
    })
    return output
}


test('Upload download excel validation', async({page}) => {

    const textSearch = 'Papaya'
    const updateValue = '850'

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html")
    const downloadPromise = page.waitForEvent('download')
    await page.getByRole("button", {name: "Download"}).click()
    await downloadPromise
    writeExcelTest(textSearch, updateValue, {rowChange:0,colChange:2}, "C:/Users/masak/Downloads/download.xlsx")
    await page.locator("#fileinput").click()
    await page.locator("#fileinput").setInputFiles("C:/Users/masak/Downloads/download.xlsx")
    const textLocator = page.getByText(textSearch)
    const desiredRow = await page.getByRole('row').filter({has: textLocator})
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue)
   // page.pause()

})