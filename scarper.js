const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

const url = "https://www.amazon.com/2022-Apple-MacBook-Laptop-chip/dp/B0B3C5HNXJ/ref=sr_1_2?crid=1HQ1BFLUW96L1&keywords=macbook&qid=1681092530&sprefix=macbook%2Caps%2C494&sr=8-2&th=1"

const product = {
    name:"",
    image:"",
    price:"",
    link:""
}

async function scrape(){
    try{
        //Fatch
        const {data} = await axios.get(url);
        //Load HTML
        const $ = cheerio.load(data);

        //Select div items
        const item = $("div#dp-container");

        product.name = $(item).find("h1 span#productTitle").text();
        product.image = $(item).find("img#landingImage").attr('src');
        product.price = $(item).find("div span.a-offscreen").text();
        product.link = url;

        //Create product.json file
        fs.writeFile("product.json", JSON.stringify(product, null , 2), (err)=>{
            if(err){
                console.log(err);
                return;
            }
            console.log("Completed!")
        })
        
    }catch(err){
        console.log(err);
    }
}
scrape();