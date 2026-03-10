import {test,expect} from '@playwright/test'
import path from 'path'
import fs from 'fs'
import payload from '../Utils/payload.json'
import { launchBrowser } from '../Utils/browser.js';
import { LoginPage } from "../Pages/login.js";


test.describe('Daily Activity', () => {
 test('Xerox API', async({request})=>{

    //Login API
    const login= await request.post(payload.login.url,{
        data: {
            "apiID": payload.login.apiID,
            "apiKey": payload.login.apiKey,
            "adminEmail": payload.login.adminEmail
          }
    })
    expect(login.status()).toBe(200)

    const loginResponse = await login.json()
    const JwtToken = loginResponse.jwt

  const filePath = path.resolve(__dirname, '../../Files/Do.pdf'); 

    //POST API 
    for (const data of payload.payloads) {
    const sendRPD= await request.post(payload.login.sendurl,{
        headers: {
            'Authorization': `Bearer ${JwtToken}`  
          },
       multipart: {
        senderAddress: data.senderAddress,
        documentOptions: JSON.stringify(data.documentOptions), 
        file: fs.createReadStream(filePath),              
      },
    })
    expect(sendRPD.status()).toBe(200)     
    }
})

test('Corporate Site', async () => {
   const { page } = await launchBrowser();
   const login = new LoginPage(page);
   await login.corporateSiteLogin();
})

})
