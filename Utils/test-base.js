const base = require('@playwright/test')

exports.customtest = base.test.extends(
    {
        testDataForOrder: {

            username: "something123@yahoo.com",
            password: "Mdowdy79!",
            productName: "iphone 13 pro"
        }

    }

)