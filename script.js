const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterbutton = document.getElementById('twitter');
const newQuotebutton = document.getElementById('new-quote');

let apiQuotes = [];

//to select new quote functionality
function newQuote()
{
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    // console.log(quote);
    // check if author field is empty then put unknown
    if(!quote.author)
    {
        authorText.textContent = "Unknown";
    }
    else
    {
        authorText.textContent = quote.author;
    }
   
    //if quote size is greater than 130 then add "long-quote"(already written in css) class to minimize size of text
   if(quote.text.length > 130)
   {
    quoteText.classList.add('long-quote');
   }
   else{
       quoteText.classList.remove('long-quote');
   }
    quoteText.textContent = quote.text;
}

async function getQuotes()
{
 const apiUrl = 'https://type.fit/api/quotes';
 try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    //  console.log(apiQuotes[12]);
    newQuote();

 } catch (error) {
     
 }
 
}

//to go to twitter and pass elements

function tweetQuote()
{
    //url with element to passed "quote" - "author"
    

    const twitUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    //_blank to open in new tab
    window.open(twitUrl, '_blank');
    // 
}

//Even listener for add quote and twitter post

newQuotebutton.addEventListener('click',newQuote);
twitterbutton.addEventListener('click',tweetQuote);

//on Load the quote from api
getQuotes();