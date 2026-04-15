import { test as baseTest } from '@playwright/test'

interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
}

export const customTest = baseTest.extend<{ testDataForOrder: TestDataForOrder }>(
    {
        testDataForOrder: {

            username: "something123@yahoo.com",
            password: "Mdowdy79!",
            productName: "iphone 13 pro"
        }

    }

)
module.exports = { customTest }